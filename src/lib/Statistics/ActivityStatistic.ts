import { BaseHealthEntry } from "../types";
import Statistic from "./Statistic";

export type ActivityItem = {
  totalDistance: number;
  distanceUnit: string | undefined;
  maxDistance: number;
  totalDuration: number;
};

export type ActivityStatisticResult = {
  totalSteps: number | undefined;
  walkingRunning: ActivityItem;
  flightsClimbed: ActivityItem;
  swimming: ActivityItem;
  cycling: ActivityItem;
  totalExcerciseTime: number | undefined;
  highestWalkingSpeed: number | undefined;
};

export default class ActivityStatistic extends Statistic<ActivityStatisticResult> {
  name = "ActivityStatistic";

  calculateResult(): ActivityStatisticResult {
    const totalSteps =
      this.wrapped.userData.HKQuantityTypeIdentifierStepCount?.reduce(
        (acc, cur) => acc + Number(cur.value),
        0
      );

    const walkingRunning = this.getItemStatistics(
      this.wrapped.userData.HKQuantityTypeIdentifierDistanceWalkingRunning
    );
    const flightsClimbed = this.getItemStatistics(
      this.wrapped.userData.HKQuantityTypeIdentifierFlightsClimbed
    );
    const swimming = this.getItemStatistics(
      this.wrapped.userData.HKQuantityTypeIdentifierDistanceSwimming
    );
    const cycling = this.getItemStatistics(
      this.wrapped.userData.HKQuantityTypeIdentifierDistanceCycling
    );

    const totalExcerciseTime = Math.round(
      this.wrapped.userData.HKQuantityTypeIdentifierAppleExerciseTime?.reduce(
        (acc, cur) => {
          const startDate = new Date(cur.startDate);
          const endDate = new Date(cur.endDate);
          const diff = endDate.getTime() - startDate.getTime();
          return acc + diff; // Time in milliseconds
        },
        0
      ) ?? 0
    );

    const highestWalkingSpeed = Math.round(
      this.wrapped.userData.HKQuantityTypeIdentifierWalkingSpeed?.reduce(
        (acc, cur) => Math.max(acc, Number(cur.value)),
        0
      ) ?? 0
    );

    return {
      totalSteps,
      walkingRunning,
      flightsClimbed,
      swimming,
      cycling,
      totalExcerciseTime,
      highestWalkingSpeed,
    };
  }

  getDefaultValue(): ActivityStatisticResult {
    return {
      totalSteps: undefined,
      walkingRunning: {
        totalDistance: 0,
        distanceUnit: "",
        maxDistance: 0,
        totalDuration: 0,
      },
      flightsClimbed: {
        totalDistance: 0,
        distanceUnit: "",
        maxDistance: 0,
        totalDuration: 0,
      },
      swimming: {
        totalDistance: 0,
        distanceUnit: "",
        maxDistance: 0,
        totalDuration: 0,
      },
      cycling: {
        totalDistance: 0,
        distanceUnit: "",
        maxDistance: 0,
        totalDuration: 0,
      },
      totalExcerciseTime: undefined,
      highestWalkingSpeed: undefined,
    };
  }

  private getItemStatistics(item?: BaseHealthEntry[]) {
    if (!item) {
      return {
        totalDistance: 0,
        distanceUnit: "",
        maxDistance: 0,
        totalDuration: 0,
      };
    }

    const totalDistance = item.reduce((acc, cur) => acc + Number(cur.value), 0);
    const distanceUnit = item[0]?.unit;
    const maxDistance = item.reduce(
      (acc, cur) => Math.max(acc, Number(cur.value)),
      0
    );
    const totalDuration =
      item.reduce((acc, cur) => {
        const startDate = new Date(cur.startDate);
        const endDate = new Date(cur.endDate);
        const diff = endDate.getTime() - startDate.getTime();
        return acc + diff; // Time in milliseconds
      }, 0) ?? 0;

    return {
      totalDistance: Math.round(totalDistance),
      distanceUnit,
      maxDistance: Math.round(maxDistance),
      totalDuration,
    };
  }
}
