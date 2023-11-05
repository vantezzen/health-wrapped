import React from "react";
import WrappedContainer, { WrappedSlideProps } from "../WrappedContainer";
import FatHeading from "../FatHeading";
import InfoText from "../InfoText";
import CountUp from "react-countup";
import HideForTime from "../HideForTime";

function HighestAverageHeartRate({ statistics }: WrappedSlideProps) {
  return (
    <WrappedContainer>
      <InfoText className="animate-in slide-in-from-bottom fade-in duration-1000">
        On {statistics.heart.dayWithHighestAverageHeartRate[0]} you've had an
        average heart rate of
      </InfoText>
      <FatHeading className="animate-in slide-in-from-bottom fade-in duration-1000">
        <CountUp
          end={statistics.heart.dayWithHighestAverageHeartRate[1]}
          duration={2}
        />{" "}
        bpm
      </FatHeading>

      <HideForTime time={500}>
        <InfoText className="animate-in slide-in-from-bottom fade-in duration-1000 delay-500">
          Must've been a stressful day!
        </InfoText>
      </HideForTime>
    </WrappedContainer>
  );
}

export default HighestAverageHeartRate;
