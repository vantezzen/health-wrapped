import Statistic from "./Statistic";

export type HeartStatisticResult = {
  maxHeartRate: number | undefined;
  minHeartRate: number | undefined;
  dayWithHighestAverageHeartRate: [string, number];
  dayWithLowestAverageHeartRate: [string, number];
};

export default class HeartStatistic extends Statistic<HeartStatisticResult> {
  name = "HeartStatistic";

  calculateResult(): HeartStatisticResult {
    const maxHeartRate =
      this.wrapped.userData.HKQuantityTypeIdentifierHeartRate?.reduce(
        (acc, cur) => Math.max(acc, Number(cur.value)),
        0
      );
    const minHeartRate =
      this.wrapped.userData.HKQuantityTypeIdentifierHeartRate?.reduce(
        (acc, cur) => Math.min(acc, Number(cur.value)),
        0
      );

    const averageHeartRatePerDay: { [date: string]: number } =
      this.wrapped.userData.HKQuantityTypeIdentifierHeartRate?.reduce(
        (acc, cur) => {
          const date = new Date(cur.startDate);
          const day = date.toLocaleDateString();
          if (acc[day]) {
            acc[day] = Math.round((acc[day] + Number(cur.value)) / 2);
          } else {
            acc[day] = Math.round(Number(cur.value));
          }
          return acc;
        },
        {} as { [date: string]: number }
      ) ?? {};
    const dayWithHighestAverageHeartRate = Object.entries(
      averageHeartRatePerDay
    ).reduce(
      (acc, cur) => {
        if (cur[1] > acc[1]) {
          return cur;
        } else {
          return acc;
        }
      },
      ["", 0] as [string, number]
    );
    const dayWithLowestAverageHeartRate = Object.entries(
      averageHeartRatePerDay
    ).reduce(
      (acc, cur) => {
        if (cur[1] < acc[1]) {
          return cur;
        } else {
          return acc;
        }
      },
      ["", 0] as [string, number]
    );

    return {
      maxHeartRate,
      minHeartRate,
      dayWithHighestAverageHeartRate,
      dayWithLowestAverageHeartRate,
    };
  }

  getDefaultValue(): HeartStatisticResult {
    return {
      maxHeartRate: undefined,
      minHeartRate: undefined,
      dayWithHighestAverageHeartRate: ["", 0],
      dayWithLowestAverageHeartRate: ["", 0],
    };
  }
}
