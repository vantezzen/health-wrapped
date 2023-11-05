import React from "react";
import WrappedContainer from "./WrappedContainer";
import FatHeading from "./FatHeading";
import InfoText from "./InfoText";
import MutedText from "./MutedText";
import { Button } from "../ui/button";
import { ArrowRight, PlugZap } from "lucide-react";
import Faq from "../Preparation/Faq";
import heroImage from "@/app/hero.png";
import Image from "next/image";
import Footer from "../Footer";
import Projects from "../Projects";

function IntroInformation({
  onContinue,
  onDemo,
}: {
  onContinue: () => void;
  onDemo: () => void;
}) {
  return (
    <WrappedContainer>
      <div className="grid md:grid-cols-2 gap-6 p-6 md:p-12">
        <div className="flex flex-col justify-center gap-6 text-left">
          <FatHeading>Wrapped for Apple Health</FatHeading>
          <InfoText>Get insights into your activity 🚀</InfoText>

          <div className="max-w-xl">
            <MutedText className="break-words hyphens-auto">
              Your Apple Watch and iPhone records a lot of data about your
              activity and health. Wrapped for Apple Health allows you to
              generate a beautiful report about your activity, sleep, and more!
              <br />
              Your data is never uploaded to any server, all statistics are
              generated locally in your browser.
            </MutedText>
          </div>

          <div className="flex flex-col gap-4">
            <Button onClick={onContinue} className="w-full">
              Let's get started
              <ArrowRight className="ml-2" size={16} />
            </Button>
            <Button className="dark w-full bg-starship-100" onClick={onDemo}>
              Show demo Wrapped
              <PlugZap className="ml-2" size={16} />
            </Button>
          </div>
        </div>

        <div>
          <Image
            src={heroImage}
            alt="Wrapped for Apple Health"
            width={1080}
            height={1920}
            style={{
              maxHeight: "70vh",
              objectFit: "contain",
              borderRadius: 10,
            }}
          />
        </div>
      </div>

      <FatHeading className="mt-12 mb-6 text-xl">
        Frequently Asked Questions
      </FatHeading>
      <Faq />

      <Projects />

      <div className="max-w-lg mx-auto mt-6 text-sm font-medium text-zinc-600 text-left">
        <strong>For the Search Engines:</strong>
        <p>
          Welcome to Wrapped for Apple Health - Your Personalized Health
          Activity Summary:
        </p>
        <p>
          Curious to see the peaks of your fitness journey or those serene heart
          rate valleys? Wrapped for Apple Health is here to bring you insightful
          analytics of your physical activities throughout the year.
        </p>

        <p>
          With Wrapped for Apple Health, dive into a detailed retrospective of
          your health data, from daily step counts and heart rate patterns to
          exercise durations and sleep quality.
        </p>

        <p>
          Ready to unwrap your health stats? Start by exporting your Apple
          Health data directly from the Health app on your iPhone. Tap on your
          profile picture, scroll down, and select "Export Health Data". Once
          you have your data exported, upload the "Healthexport.zip" to Wrapped
          for Apple Health, and we'll handle the rest, right in your browser.
        </p>

        <p>
          Your privacy is our top priority. With Wrapped for Apple Health, your
          data stays yours - unuploaded, unshared, securely sealed. Our process
          is transparent: your health data remains strictly within your browser,
          untouched and unstored by our servers.
        </p>

        <p>
          For those who love a good look under the hood, our full source code is
          openly available on GitHub. Check it out at{" "}
          <a
            href="https://github.com/vantezzen/health-wrapped"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://github.com/vantezzen/health-wrapped
          </a>{" "}
          to see exactly how Wrapped for Apple Health respects your data and
          privacy.
        </p>

        <p>
          Wrapped for Apple Health is the result of passion - a project born out
          of a love for health data and the joy of sharing the 'Wrapped'
          experience, akin to Spotify's year-end tradition. It's your personal,
          playful, and private way to revisit a year's worth of health and
          fitness achievements.
        </p>

        <p>
          And for an added beat to your data review, you can enable background
          tunes from Spotify, giving you a soundtrack to your stats without any
          need to share your Spotify credentials with us. It's all about
          celebrating your health, securely and with a smile.
        </p>

        <p>
          Launch into Wrapped for Apple Health and let's make those stats dance.
          Join a community where your health data gets a fun twist and discover
          a new way to appreciate your year's progress.
        </p>
      </div>

      <Footer />
    </WrappedContainer>
  );
}

export default IntroInformation;
