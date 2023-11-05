import React from "react";
import WrappedContainer, { WrappedSlideProps } from "../WrappedContainer";
import FatHeading from "../FatHeading";
import InfoText from "../InfoText";
import CountUp from "react-countup";
import formatTimeLength from "@/lib/utils/formatTimeLength";

function Cycling({ statistics }: WrappedSlideProps) {
  const duration = formatTimeLength(
    statistics.activity.cycling.totalDuration / 1000
  );

  return (
    <WrappedContainer bg="bg-zinc-900" text="text-starship-400">
      <InfoText className="!text-zinc-200 animate-in slide-in-from-bottom fade-in duration-1000">
        You've cycled
      </InfoText>
      <FatHeading className="animate-in slide-in-from-bottom fade-in duration-1000">
        <CountUp end={statistics.activity.cycling.totalDistance} duration={2} />{" "}
        {statistics.activity.cycling.distanceUnit}
      </FatHeading>

      <InfoText className="!text-zinc-200 animate-in slide-in-from-bottom fade-in duration-1000">
        That's a total of {duration.amount} {duration.unit} on the bike.
      </InfoText>
    </WrappedContainer>
  );
}

export default Cycling;
