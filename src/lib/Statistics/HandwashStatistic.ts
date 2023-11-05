import Statistic from "./Statistic";

export type HandwashStatisticResult = {
  handwashAmount: number | undefined;
  totalHandwashDuration: number | undefined; // Time in milliseconds
};

export default class HandwashStatistic extends Statistic<HandwashStatisticResult> {
  name = "HandwashStatistic";

  calculateResult(): HandwashStatisticResult {
    const handwashAmount =
      this.wrapped.userData.HKCategoryTypeIdentifierHandwashingEvent?.length ??
      0;
    const totalHandwashDuration =
      this.wrapped.userData.HKCategoryTypeIdentifierHandwashingEvent?.reduce(
        (acc, cur) => {
          const startDate = new Date(cur.startDate);
          const endDate = new Date(cur.endDate);
          const diff = endDate.getTime() - startDate.getTime();
          return acc + diff; // Time in milliseconds
        },
        0
      );

    return {
      handwashAmount,
      totalHandwashDuration,
    };
  }

  getDefaultValue(): HandwashStatisticResult {
    return {
      handwashAmount: undefined,
      totalHandwashDuration: undefined,
    };
  }
}
