import React from "react";
import WrappedContainer, { WrappedSlideProps } from "../WrappedContainer";
import InfoText from "../InfoText";
import FatHeading from "../FatHeading";
import CountUp from "react-countup";
import HideForTime from "../HideForTime";
import lookup from "@/lib/utils/lookup";

const totalStepComments = {
  0: "Not a single one?",
  1: "Just one?",
  1000: "Just getting started, huh?",
  20000: "You should've walked that in a single day, you know?",
  100000: "That's barely 10k steps a month, you know?",
  2000000: "You should probably get a dog to get out more.",
  5000000: "That's a lot of steps, but you can do better.",
  7000000: "Hey, that's not too bad!",
  10000000: "My goodness, you're a walking machine!",
  15000000: "You're probably in great shape, huh?",
};

function TotalSteps({ statistics }: WrappedSlideProps) {
  return (
    <WrappedContainer bg="bg-zinc-900" text="text-starship-400">
      <InfoText className="!text-zinc-200">In the last year, you took</InfoText>

      <FatHeading className="animate-in slide-in-from-bottom fade-in duration-1000">
        <CountUp end={statistics.activity.totalSteps ?? 0} duration={2} /> steps
      </FatHeading>

      <HideForTime time={500}>
        <InfoText className="!text-zinc-200 animate-in slide-in-from-bottom fade-in duration-1000 delay-500">
          {lookup(statistics.activity.totalSteps ?? 0, totalStepComments)}
        </InfoText>
      </HideForTime>
    </WrappedContainer>
  );
}

export default TotalSteps;
