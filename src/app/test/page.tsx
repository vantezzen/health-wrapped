"use client";
import React from "react";

function TestPage() {
  return (
    <div>
      <input
        type="file"
        name=""
        id=""
        onChange={(e) => {
          if (e.target.files) {
            console.log(e.target.files[0]);

            // Read file
            const reader = new FileReader();
            reader.onload = (e) => {
              console.log((e.target?.result as string)?.substring(0, 100));

              // Parse XML
              const parser = new DOMParser();
              const xml = parser.parseFromString(
                e.target?.result as string,
                "text/xml"
              );

              // The XML is a Apple Health export XML
              // Convert to JSON object, sorting by type
              const data: Record<string, any[]> = {};
              const records = xml.getElementsByTagName("Record");
              for (const record of records) {
                const jsonRecord: any = {};
                const type = record.getAttribute("type");
                for (const attribute of record.attributes) {
                  if (attribute.name === "type") continue;
                  jsonRecord[attribute.name] = attribute.value;
                }

                if (data[type]) continue;

                if (!data[type]) data[type] = [];
                data[type].push(jsonRecord);
              }
              console.log(data);
            };
            reader.readAsText(e.target.files[0]);
          }
        }}
      />
    </div>
  );
}

export default TestPage;
