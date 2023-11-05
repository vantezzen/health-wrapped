import { WrappedSlideProps } from "@/components/Wrapped/WrappedContainer";
import EventEmitter from "events";
import Intro from "@/components/Wrapped/Slides/Intro";
import Roundup from "@/components/Wrapped/Slides/Roundup";
import SpotifyFramePlayer from "../Spotify/FramePlayer";
import { trackEvent } from "../analytics";
import { Statistics } from "../Wrapped";
import TotalDistance from "@/components/Wrapped/Slides/TotalDistance";
import Cycling from "@/components/Wrapped/Slides/Cycling";
import TotalExerciseTime from "@/components/Wrapped/Slides/TotalExerciseTime";
import Handwash from "@/components/Wrapped/Slides/Handwash";
import Sleep from "@/components/Wrapped/Slides/Sleep";
import HighestAverageHeartRate from "@/components/Wrapped/Slides/HighestAverageHeartRate";
import Audio from "@/components/Wrapped/Slides/Audio";

export type Slide = {
  name: string;
  component: React.FC<WrappedSlideProps>;
  duration: number;
  spotify?: {
    uri: string;
  };
  skip?: (statistics: Statistics) => boolean;
};

const SLIDES: Slide[] = [
  {
    name: "Intro",
    component: Intro,
    duration: 6000,
    spotify: {
      uri: "spotify:track:7KA4W4McWYRpgf0fWsJZWB",
    },
  },

  {
    name: "TotalExcerciseTime",
    component: TotalExerciseTime,
    duration: 6000,
    skip: (statistics) => !statistics.activity.totalExcerciseTime,
  },
  {
    name: "TotalDistance",
    component: TotalDistance,
    duration: 6000,
    spotify: {
      uri: "spotify:track:66S14BkJDxgkYxLl5DCqOz",
    },
  },

  {
    name: "Cycling",
    component: Cycling,
    duration: 6000,
    skip: (statistics) => !statistics.activity.cycling.totalDistance,
  },

  {
    name: "Handwash",
    component: Handwash,
    duration: 6000,
    skip: (statistics) => !statistics.handwash.handwashAmount,
  },

  {
    name: "Sleep",
    component: Sleep,
    duration: 6000,
    skip: (statistics) => !statistics.sleep.totalSleep,
  },

  {
    name: "HighestAverageHeartRate",
    component: HighestAverageHeartRate,
    duration: 6000,
    skip: (statistics) => !statistics.heart.dayWithHighestAverageHeartRate[1],
    spotify: {
      uri: "spotify:track:7mitXLIMCflkhZiD34uEQI",
    },
  },

  {
    name: "Audio",
    component: Audio,
    duration: 6000,
    skip: (statistics) =>
      !statistics.audio.audioExposureEvents &&
      !statistics.audio.maxEnvironmentalAudioExposure,
  },

  {
    name: "Roundup",
    component: Roundup,
    duration: 6000,
    spotify: {
      uri: "spotify:track:5odlY52u43F5BjByhxg7wg",
    },
  },
];

export default class WrappedPlayer extends EventEmitter {
  public currentSlide: Slide | null = null;

  constructor(public spotifyPlayer: SpotifyFramePlayer | null = null) {
    super();
  }

  public async play(statistics: Statistics) {
    for (let i = 0; i < SLIDES.length; i++) {
      const slide = SLIDES[i];

      if (slide.skip && slide.skip(statistics)) {
        continue;
      }

      this.currentSlide = slide;
      console.log(`Playing slide`, this.currentSlide, this.spotifyPlayer);
      if (this.currentSlide.spotify && this.spotifyPlayer) {
        console.log(`Playing Spotify song`, this.currentSlide.spotify.uri);
        await this.spotifyPlayer.playSong(this.currentSlide.spotify.uri);
        console.log(`Loaded spotify song`);
      }
      trackEvent(`slide-${slide.name}`);

      this.emit("update");
      await this.wait(slide.duration);
    }
  }

  private wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
