import Statistic from "./Statistic";

export type AudioStatisticResult = {
  audioExposureEvents: number | undefined;
  maxEnvironmentalAudioExposure: number | undefined;
};

export default class AudioStatistic extends Statistic<AudioStatisticResult> {
  name = "AudioStatistic";

  calculateResult(): AudioStatisticResult {
    const audioExposureEvents =
      this.wrapped.userData.HKCategoryTypeIdentifierAudioExposureEvent
        ?.length ?? 0;

    const maxEnvironmentalAudioExposure =
      this.wrapped.userData.HKQuantityTypeIdentifierEnvironmentalAudioExposure?.reduce(
        (acc, cur) => Math.max(acc, Number(cur.value)),
        0
      );

    return {
      audioExposureEvents,
      maxEnvironmentalAudioExposure: Math.round(
        maxEnvironmentalAudioExposure ?? 0
      ),
    };
  }

  getDefaultValue(): AudioStatisticResult {
    return {
      audioExposureEvents: undefined,
      maxEnvironmentalAudioExposure: undefined,
    };
  }
}
