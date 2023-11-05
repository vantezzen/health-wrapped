import React from "react";
import WrappedContainer, { WrappedSlideProps } from "../WrappedContainer";
import FatHeading from "../FatHeading";
import InfoText from "../InfoText";
import CountUp from "react-countup";
import formatTimeLength from "@/lib/utils/formatTimeLength";

function TotalExerciseTime({ statistics }: WrappedSlideProps) {
  const duration = formatTimeLength(
    statistics.activity.totalExcerciseTime! / 1000
  );

  return (
    <WrappedContainer bg="bg-zinc-900" text="text-starship-400">
      <InfoText className="!text-zinc-200 animate-in slide-in-from-bottom fade-in duration-1000">
        You've exercised
      </InfoText>
      <FatHeading className="animate-in slide-in-from-bottom fade-in duration-1000">
        <CountUp end={duration.amount} duration={2} /> {duration.unit}
      </FatHeading>

      <InfoText className="!text-zinc-200 animate-in slide-in-from-bottom fade-in duration-1000">
        this year.
      </InfoText>
    </WrappedContainer>
  );
}

export default TotalExerciseTime;
