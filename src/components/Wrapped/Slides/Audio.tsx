import React from "react";
import WrappedContainer, { WrappedSlideProps } from "../WrappedContainer";
import FatHeading from "../FatHeading";
import InfoText from "../InfoText";
import CountUp from "react-countup";
import lookup from "@/lib/utils/lookup";
import HideForTime from "../HideForTime";

const eventsComments = {
  0: "You've been great to your ears!",
  5: "Gotta party from time to time, huh?",
  20: "Look, we've got a party animal who doesn't care about their ears!",
  50: "You're earning yourself a hearing aid soon, how great!",
  100: "You're going to be deaf soon, congratulations!",
  300: "That's almost daily, hope you'll enjoy your hearing aid! :)",
  500: "Now that's just rediclous, are you deaf?",
};

function Audio({ statistics }: WrappedSlideProps) {
  return (
    <WrappedContainer>
      <InfoText className="animate-in slide-in-from-bottom fade-in duration-1000">
        Your Watched warned you about loud music
      </InfoText>
      <FatHeading className="animate-in slide-in-from-bottom fade-in duration-1000">
        <CountUp end={statistics.audio.audioExposureEvents!} duration={2} />{" "}
        times
      </FatHeading>

      <HideForTime time={500}>
        <InfoText className="animate-in slide-in-from-bottom fade-in duration-1000 delay-500">
          and reached {statistics.audio.maxEnvironmentalAudioExposure}dB once.
          <br />
          {lookup(statistics.audio.audioExposureEvents ?? 0, eventsComments)}
        </InfoText>
      </HideForTime>
    </WrappedContainer>
  );
}

export default Audio;
