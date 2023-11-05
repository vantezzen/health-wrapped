import { z } from "zod";

const DateSchema = z.coerce.date(); // Assuming validation for ISO8601 date strings with timezone will be handled elsewhere
const SourceVersionStringSchema = z.string();

const BaseHealthEntrySchema = z.object({
  sourceName: z.string(),
  sourceVersion: SourceVersionStringSchema,
  unit: z.string().optional(),
  creationDate: DateSchema,
  startDate: DateSchema,
  endDate: DateSchema,
  value: z.string(),
});
export type BaseHealthEntry = z.infer<typeof BaseHealthEntrySchema>;

const HealthEntryWithDeviceSchema = BaseHealthEntrySchema.extend({
  device: z.string().optional(),
});
export type HealthEntryWithDevice = z.infer<typeof HealthEntryWithDeviceSchema>;

// Schemas for Health Data Categories
const HealthDataCategorySchema = z.union([
  BaseHealthEntrySchema.array(),
  HealthEntryWithDeviceSchema.array(),
]);

const HealthCategoryEntrySchema = BaseHealthEntrySchema.extend({
  value: z.union([
    z.literal("HKCategoryValueSleepAnalysisInBed"),
    z.literal("HKCategoryValueAppleStandHourIdle"),
    z.literal("HKCategoryValueNotApplicable"),
    z.string(), // If other string values are valid, otherwise list them all as literals
  ]),
});
export type HealthCategoryEntry = z.infer<typeof HealthCategoryEntrySchema>;

export const HealthDataSchema = z.object({
  HKQuantityTypeIdentifierHeight: BaseHealthEntrySchema.array().optional(),
  HKQuantityTypeIdentifierBodyMass: BaseHealthEntrySchema.array().optional(),
  HKQuantityTypeIdentifierHeartRate:
    HealthEntryWithDeviceSchema.array().optional(),
  HKQuantityTypeIdentifierOxygenSaturation:
    HealthEntryWithDeviceSchema.array().optional(),
  HKQuantityTypeIdentifierRespiratoryRate:
    HealthEntryWithDeviceSchema.array().optional(),
  HKQuantityTypeIdentifierStepCount: BaseHealthEntrySchema.array().optional(),
  HKQuantityTypeIdentifierDistanceWalkingRunning:
    BaseHealthEntrySchema.array().optional(),
  HKQuantityTypeIdentifierBasalEnergyBurned:
    HealthEntryWithDeviceSchema.array().optional(),
  HKQuantityTypeIdentifierActiveEnergyBurned:
    HealthEntryWithDeviceSchema.array().optional(),
  HKQuantityTypeIdentifierFlightsClimbed:
    HealthEntryWithDeviceSchema.array().optional(),
  HKQuantityTypeIdentifierAppleExerciseTime:
    HealthEntryWithDeviceSchema.array().optional(),
  HKQuantityTypeIdentifierDistanceCycling:
    BaseHealthEntrySchema.array().optional(),
  HKQuantityTypeIdentifierDistanceSwimming:
    HealthEntryWithDeviceSchema.array().optional(),
  HKQuantityTypeIdentifierSwimmingStrokeCount:
    HealthEntryWithDeviceSchema.array().optional(),
  HKQuantityTypeIdentifierRestingHeartRate:
    BaseHealthEntrySchema.array().optional(),
  HKQuantityTypeIdentifierVO2Max: BaseHealthEntrySchema.array().optional(),
  HKQuantityTypeIdentifierWalkingHeartRateAverage:
    BaseHealthEntrySchema.array().optional(),
  HKQuantityTypeIdentifierEnvironmentalAudioExposure:
    HealthEntryWithDeviceSchema.array().optional(),
  HKQuantityTypeIdentifierHeadphoneAudioExposure:
    HealthEntryWithDeviceSchema.array().optional(),
  HKQuantityTypeIdentifierWalkingDoubleSupportPercentage:
    HealthEntryWithDeviceSchema.array().optional(),
  HKQuantityTypeIdentifierSixMinuteWalkTestDistance:
    HealthEntryWithDeviceSchema.array().optional(),
  HKQuantityTypeIdentifierAppleStandTime:
    BaseHealthEntrySchema.array().optional(),
  HKQuantityTypeIdentifierWalkingSpeed:
    HealthEntryWithDeviceSchema.array().optional(),
  HKQuantityTypeIdentifierWalkingStepLength:
    HealthEntryWithDeviceSchema.array().optional(),
  HKQuantityTypeIdentifierWalkingAsymmetryPercentage:
    HealthEntryWithDeviceSchema.array().optional(),
  HKQuantityTypeIdentifierStairAscentSpeed:
    BaseHealthEntrySchema.array().optional(),
  HKQuantityTypeIdentifierStairDescentSpeed:
    BaseHealthEntrySchema.array().optional(),
  HKDataTypeSleepDurationGoal: BaseHealthEntrySchema.array().optional(),
  HKQuantityTypeIdentifierAppleWalkingSteadiness:
    HealthEntryWithDeviceSchema.array().optional(),
  HKQuantityTypeIdentifierAppleSleepingWristTemperature:
    HealthEntryWithDeviceSchema.array().optional(),
  HKQuantityTypeIdentifierHeartRateRecoveryOneMinute:
    BaseHealthEntrySchema.array().optional(),
  HKQuantityTypeIdentifierEnvironmentalSoundReduction:
    HealthEntryWithDeviceSchema.array().optional(),
  HKQuantityTypeIdentifierTimeInDaylight:
    HealthEntryWithDeviceSchema.array().optional(),
  HKQuantityTypeIdentifierPhysicalEffort:
    BaseHealthEntrySchema.array().optional(),
  HKCategoryTypeIdentifierSleepAnalysis:
    HealthCategoryEntrySchema.array().optional(),
  HKCategoryTypeIdentifierAppleStandHour:
    HealthCategoryEntrySchema.array().optional(),
  HKCategoryTypeIdentifierMindfulSession:
    HealthCategoryEntrySchema.array().optional(),
  HKCategoryTypeIdentifierHighHeartRateEvent:
    HealthCategoryEntrySchema.array().optional(),
  HKCategoryTypeIdentifierAudioExposureEvent:
    BaseHealthEntrySchema.array().optional(),
  HKCategoryTypeIdentifierHandwashingEvent:
    BaseHealthEntrySchema.array().optional(),
});

export type HealthData = z.infer<typeof HealthDataSchema>;

export const ShareImageDataSchema = z.object({
  totalWalkingDistance: z.string(),
  totalExcerciseTime: z.string(),
  flightsClimbed: z.number(),
  maxHeartRate: z.number(),
  maxLoudness: z.number(),
  handwashes: z.number(),
  totalSleep: z.string(),
  napsTaken: z.number(),
});

export type ShareImageData = z.infer<typeof ShareImageDataSchema>;
