import React from "react";
import WrappedContainer, { WrappedSlideProps } from "../WrappedContainer";
import FatHeading from "../FatHeading";
import InfoText from "../InfoText";
import CountUp from "react-countup";
import HideForTime from "../HideForTime";
import lookup from "@/lib/utils/lookup";

const totalDistanceComment = {
  0: "Not a single one?",
  50: "That's barely the distance to the next city, you know?",
  200: "Back and forth to the next city, you know?",
  500: "You know you can leave the car at home from time to time, right?",
  1000: "That's barely the distance to the next country, you know?",
  10000: "That's actually not that bad!",
  40000:
    "You've walked around the world, probably - idk not that good with math.",
  100000:
    "You've walked around the world a few times, probably - idk not that good with math.",
  400000: "You've walked to the moon, probably - idk not that good with math.",
};

function TotalDistance({ statistics }: WrappedSlideProps) {
  return (
    <WrappedContainer>
      <InfoText className="animate-in slide-in-from-bottom fade-in duration-1000">
        Your legs have carried you
      </InfoText>
      <FatHeading className="animate-in slide-in-from-bottom fade-in duration-1000">
        <CountUp
          end={statistics.activity.walkingRunning.totalDistance}
          duration={2}
        />{" "}
        {statistics.activity.walkingRunning.distanceUnit}
      </FatHeading>

      <HideForTime time={500}>
        <InfoText className="animate-in slide-in-from-bottom fade-in duration-1000 delay-500">
          with at total of {statistics.activity.totalSteps} steps.{" "}
          {lookup(
            statistics.activity.walkingRunning.totalDistance ?? 0,
            totalDistanceComment
          )}
        </InfoText>
      </HideForTime>
    </WrappedContainer>
  );
}

export default TotalDistance;
