import SpotifyFramePlayer from "./Spotify/FramePlayer";
import * as Sentry from "@sentry/nextjs";
import { HealthData } from "./types";
import Statistic from "./Statistics/Statistic";
import ActivityStatistic, {
  ActivityStatisticResult,
} from "./Statistics/ActivityStatistic";
import AudioStatistic, {
  AudioStatisticResult,
} from "./Statistics/AudioStatistics";
import HandwashStatistic, {
  HandwashStatisticResult,
} from "./Statistics/HandwashStatistic";
import HeartStatistic, {
  HeartStatisticResult,
} from "./Statistics/HeartStatistics";
import SleepStatistic, {
  SleepStatisticResult,
} from "./Statistics/SleepStatistics";

export type Statistics = {
  activity: ActivityStatisticResult;
  audio: AudioStatisticResult;
  handwash: HandwashStatisticResult;
  heart: HeartStatisticResult;
  sleep: SleepStatisticResult;
};

export const SAMPLE_STATISTICS: Statistics = {
  activity: {
    totalSteps: 3042300,
    walkingRunning: {
      totalDistance: 2271,
      distanceUnit: "km",
      maxDistance: 1,
      totalDuration: 3931974000,
    },
    flightsClimbed: {
      totalDistance: 3799,
      distanceUnit: "count",
      maxDistance: 26,
      totalDuration: 228368000,
    },
    swimming: {
      totalDistance: 1950,
      distanceUnit: "m",
      maxDistance: 25,
      totalDuration: 3885000,
    },
    cycling: {
      totalDistance: 282,
      distanceUnit: "km",
      maxDistance: 31,
      totalDuration: 68491000,
    },
    totalExcerciseTime: 359460000,
    highestWalkingSpeed: 8,
  },
  audio: {
    audioExposureEvents: 11,
    maxEnvironmentalAudioExposure: 111,
  },
  handwash: {
    handwashAmount: 1523,
    totalHandwashDuration: 19538000,
  },
  heart: {
    maxHeartRate: 193,
    minHeartRate: 0,
    dayWithHighestAverageHeartRate: ["19/09/2023", 105],
    dayWithLowestAverageHeartRate: ["", 0],
  },
  sleep: {
    totalSleep: 13559738000,
    longestSleep: ["24/09/2023", 36963000],
    totalNapsTaken: 143,
  },
};

export default class Wrapped {
  public spotifyPlayer: SpotifyFramePlayer | null = null;
  public demoMode = false;
  public possiblyEmptyExport = false;
  private statisticCache: Statistics | null = null;

  constructor(public userData: HealthData) {
    console.log("Creating wrapped");
  }

  public getStatistics(): Statistics {
    console.log("Getting statistics");

    if (this.demoMode) {
      return SAMPLE_STATISTICS;
    }

    if (this.statisticCache) {
      return this.statisticCache;
    }

    const statistics = {
      activity: this.calculateStatistic(ActivityStatistic),
      audio: this.calculateStatistic(AudioStatistic),
      handwash: this.calculateStatistic(HandwashStatistic),
      heart: this.calculateStatistic(HeartStatistic),
      sleep: this.calculateStatistic(SleepStatistic),
    };
    this.statisticCache = statistics;

    console.log("Got statistics", statistics);

    return statistics;
  }

  private calculateStatistic<T>(
    statistic: new (wrapped: Wrapped) => Statistic<T>
  ): T {
    const statisticInstance = new statistic(this);

    try {
      return statisticInstance.calculateResult();
    } catch (e) {
      Sentry.captureException(
        new Error(`Failed to calculate statistic ${statistic.name}`),
        {
          extra: {
            originalException: e,
          },
        }
      );
      console.log(`Failed to calculate statistic ${statistic.name}`, e);
      return statisticInstance.getDefaultValue();
    }
  }
}
