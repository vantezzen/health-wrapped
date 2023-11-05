import { Statistics } from "../Wrapped";
import { ShareImageData } from "../types";
import formatTimeLength from "./formatTimeLength";

export default function getShareUrl(statistics: Statistics) {
  const totalSleep = formatTimeLength(
    (statistics.sleep.totalSleep ?? 0) / 1000
  );
  const totalExcerciseTime = formatTimeLength(
    (statistics.activity.totalExcerciseTime ?? 0) / 1000
  );

  const data: ShareImageData = {
    totalWalkingDistance: `${statistics.activity.walkingRunning.totalDistance} ${statistics.activity.walkingRunning.distanceUnit}`,
    totalExcerciseTime: `${totalExcerciseTime.amount} ${totalExcerciseTime.unit}`,
    flightsClimbed: statistics.activity.flightsClimbed.totalDistance ?? 0,
    maxHeartRate: statistics.heart.maxHeartRate ?? 0,
    maxLoudness: statistics.audio.maxEnvironmentalAudioExposure ?? 0,
    handwashes: statistics.handwash.handwashAmount ?? 0,
    totalSleep: `${totalSleep.amount} ${totalSleep.unit}`,
    napsTaken: statistics.sleep.totalNapsTaken ?? 0,
  };

  const url = new URL("/api/image", window.location.href);
  url.searchParams.set("data", JSON.stringify(data));

  return url.toString();
}
