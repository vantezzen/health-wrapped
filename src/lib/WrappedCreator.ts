import Wrapped from "./Wrapped";
import JSZip from "jszip";
import * as Sentry from "@sentry/nextjs";
import { HealthData, HealthDataSchema } from "./types";
import debugging from "debug";
const debug = debugging("WrappedCreator");

export default class WrappedCreator {
  fromFile(file: File): Promise<Wrapped> {
    return new Promise((resolve, reject) => {
      Sentry.setContext("file", {
        name: file.name,
        size: file.size,
        type: file.type,
      });

      debug("Reading file", file.name, file.size, file.type);

      if (
        [
          "application/zip",
          "application/x-zip-compressed",
          "multipart/x-zip",
          "application/x-compressed",
        ].includes(file.type) ||
        file.name.endsWith(".zip")
      ) {
        debug("File is ZIP");
        this.fromZip(file).then(resolve).catch(reject);
      } else {
        debug("File is XML");
        this.fromXml(file).then(resolve).catch(reject);
      }
    });
  }

  private fromXml(file: File, isRetry = false): Promise<Wrapped> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          try {
            debug("Parsing XML", (e.target.result as string)?.length);
            const userData = this.parseExport(e.target.result as string);
            debug("Parsed XML");
            this.investigateSchema(userData);
            resolve(new Wrapped(userData));
          } catch (e) {
            debug("Failed to parse XML", e);
            Sentry.captureException(new Error("Cannot read XML file"), {
              extra: {
                originalException: e,
                fileName: file.name,
                fileSize: file.size,
                fileType: file.type,
              },
            });
            if (!isRetry) {
              this.fromZip(file, true).then(resolve).catch(reject);
            } else {
              reject(e);
            }
          }
        } else {
          debug("Failed to read file");
          reject(new Error("Failed to read file"));
        }
      };
      reader.readAsText(file);
    });
  }

  private async fromZip(file: File, isRetry = false): Promise<Wrapped> {
    try {
      debug("Reading ZIP file", file.name, file.size, file.type);
      const zip = new JSZip();
      await zip.loadAsync(file);

      debug("Loading export.xml");
      let xmlContent = "";
      if (zip.files["apple_health_export/export.xml"]) {
        xmlContent = await zip.files["apple_health_export/export.xml"].async(
          "string"
        );
      } else {
        debug("export.xml not found in the ZIP file.", zip.files);
        throw new Error("export.xml not found in the ZIP file.");
      }

      debug(
        "Parsing XML from ZIP",
        xmlContent.length,
        xmlContent.substring(0, 1000)
      );
      const userData = this.parseExport(xmlContent);
      this.investigateSchema(userData);
      return new Wrapped(userData);
    } catch (e) {
      debug("Failed to read ZIP file", e);
      Sentry.captureException(new Error("Cannot read ZIP file"), {
        extra: {
          originalException: e,
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type,
        },
      });

      if (!isRetry) {
        return await this.fromXml(file, true);
      } else {
        throw e;
      }
    }
  }

  forDemoMode(): Wrapped {
    const wrapped = new Wrapped({} as any);
    wrapped.demoMode = true;
    return wrapped;
  }

  private investigateSchema(content: any) {
    const parsed = HealthDataSchema.safeParse(content);
    if (!parsed.success) {
      // Log schema errors to Sentry
      Sentry.captureException(new Error("Schema validation failed"), {
        extra: {
          errors: parsed.error,
        },
      });
    }
  }

  private parseExport(textData: string) {
    // Parse XML
    const parser = new DOMParser();
    debug("Parsing XML schema");
    const xml = parser.parseFromString(textData, "text/xml");

    const cutoffDate = new Date();
    cutoffDate.setFullYear(cutoffDate.getFullYear() - 1);

    // The XML is a Apple Health export XML
    // Convert to JSON object, sorting by type
    const data: HealthData = {};
    debug("Transforming XML to UserData schema");
    const records = xml.getElementsByTagName("Record");
    for (const record of records) {
      const jsonRecord: any = {};
      const type = record.getAttribute("type") as keyof HealthData;
      for (const attribute of record.attributes) {
        if (attribute.name === "type") continue;
        jsonRecord[attribute.name] = attribute.value;
      }

      const startDate = new Date(jsonRecord.startDate);
      if (startDate < cutoffDate) continue;

      if (!data[type]) data[type] = [];
      data[type]!.push(jsonRecord);
    }

    debug("Transformed data");
    return HealthDataSchema.parse(data);
  }
}
