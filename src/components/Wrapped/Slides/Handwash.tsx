import React from "react";
import WrappedContainer, { WrappedSlideProps } from "../WrappedContainer";
import FatHeading from "../FatHeading";
import InfoText from "../InfoText";
import CountUp from "react-countup";
import HideForTime from "../HideForTime";
import formatTimeLength from "@/lib/utils/formatTimeLength";

function Handwash({ statistics }: WrappedSlideProps) {
  const duration = formatTimeLength(
    statistics.handwash.totalHandwashDuration! / 1000
  );

  return (
    <WrappedContainer>
      <InfoText className="animate-in slide-in-from-bottom fade-in duration-1000">
        You've washed your hands
      </InfoText>
      <FatHeading className="animate-in slide-in-from-bottom fade-in duration-1000">
        <CountUp end={statistics.handwash.handwashAmount!} duration={2} /> times
      </FatHeading>

      <HideForTime time={500}>
        <InfoText className="animate-in slide-in-from-bottom fade-in duration-1000 delay-500">
          That's a total of {duration.amount} {duration.unit} washing your
          hands.
        </InfoText>
      </HideForTime>
    </WrappedContainer>
  );
}

export default Handwash;
