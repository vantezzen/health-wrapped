import Statistic from "./Statistic";

export type SleepStatisticResult = {
  totalSleep: number | undefined;
  longestSleep: [string, number] | undefined;
  totalNapsTaken: number | undefined;
};

export default class SleepStatistic extends Statistic<SleepStatisticResult> {
  name = "SleepStatistic";

  calculateResult(): SleepStatisticResult {
    const longestSleep =
      this.wrapped.userData.HKCategoryTypeIdentifierSleepAnalysis?.reduce(
        (acc, cur) => {
          const startDate = new Date(cur.startDate);
          const endDate = new Date(cur.endDate);
          const diff = endDate.getTime() - startDate.getTime();

          if (diff > acc[1]) {
            return [startDate.toLocaleDateString(), diff] as [string, number];
          }
          return acc;
        },
        ["", 0] as [string, number] // [date, time in milliseconds]
      );

    // Number of naps taken during the day
    // A nap is defined as a sleep that is shorter than 2 hours and starts between 6am and 6pm
    const totalNapsTaken =
      this.wrapped.userData.HKCategoryTypeIdentifierSleepAnalysis?.reduce(
        (acc, cur) => {
          const startDate = new Date(cur.startDate);
          const endDate = new Date(cur.endDate);
          const diff = endDate.getTime() - startDate.getTime();

          if (
            diff > 1000 * 60 &&
            diff < 2 * 60 * 60 * 1000 &&
            startDate.getHours() >= 6 &&
            startDate.getHours() < 18
          ) {
            return acc + 1;
          }
          return acc;
        },
        0
      );

    const totalSleep =
      this.wrapped.userData.HKCategoryTypeIdentifierSleepAnalysis?.reduce(
        (acc, cur) => {
          const startDate = new Date(cur.startDate);
          const endDate = new Date(cur.endDate);
          const diff = endDate.getTime() - startDate.getTime();
          return acc + diff; // Time in milliseconds
        },
        0
      );

    return {
      totalSleep,
      longestSleep,
      totalNapsTaken,
    };
  }

  getDefaultValue(): SleepStatisticResult {
    return {
      totalSleep: 0,
      longestSleep: undefined,
      totalNapsTaken: 0,
    };
  }
}
