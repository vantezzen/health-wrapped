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

    // Apple Watch will store naps in shorter parts (e.g 10:00-10:15, 10:17-10:32 instead of one 10:00-10:32) so
    // we first need to cluster the naps together
    const sleepClusters =
      this.wrapped.userData.HKCategoryTypeIdentifierSleepAnalysis?.reduce(
        (acc, cur) => {
          const prevCluster = acc[acc.length - 1];
          if (
            prevCluster &&
            Math.abs(cur.startDate.getTime() - prevCluster.endDate.getTime()) <
              20 * 60 * 1000 // 20 minutes
          ) {
            prevCluster.endDate = cur.endDate;
            return acc;
          }

          return [
            ...acc,
            {
              startDate: cur.startDate,
              endDate: new Date(cur.endDate),
            },
          ];
        },
        [] as Array<{
          startDate: Date;
          endDate: Date;
        }>
      );

    // Number of naps taken during the day
    const totalNapsTaken = sleepClusters?.reduce((acc, cur) => {
      const startDate = new Date(cur.startDate);
      const endDate = new Date(cur.endDate);
      const diff = endDate.getTime() - startDate.getTime();

      if (diff < 4 * 60 * 60 * 1000 && diff > 60 * 1000) {
        // 4 hours < duration < 1 minute
        if (startDate.getHours() >= 11 && startDate.getHours() <= 20) {
          // Between 11:00 and 20:00
          return acc + 1;
        }
      }
      return acc;
    }, 0);

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
