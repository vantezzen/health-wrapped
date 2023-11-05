"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const items = [
  {
    question: "How can I get my Apple Health data?",
    answer: (
      <>
        You can export your Apple Health data from the Health app on your
        iPhone.
        <br />
        Simply open the app, click the profile icon in the top right corner,
        then click "Export Health Data" at the bottom.
        <br />
        Depending on how much data you have, this process can take a few
        minutes. After that, simply save the ZIP file to your computer and
        upload it to Wrapped for Apple Health.
      </>
    ),
  },
  {
    question: "Which file should I use for Wrapped for Apple Health?",
    answer: (
      <>
        After downloading your Apple Health data export, you can choose the ZIP
        file you downloaded (it should be called "Healthexport.zip"). Wrapped
        will the automatically extract the ZIP file and use the file inside.
        Alternatively, you can extract the ZIP file yourself and upload file
        named "export.xml" inside.
      </>
    ),
  },
  {
    question: "Is this safe? Is Wrapped for Apple Health legit?",
    answer: (
      <>
        Wrapped for Apple Health is safe and privacy-centered. If you know how
        to read code, you can look at Wrapped for Apple Health's full source
        code at{" "}
        <a
          href="https://github.com/vantezzen/health-wrapped"
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-bold"
        >
          https://github.com/vantezzen/health-wrapped
        </a>
        . Your Apple Health data is only used in your browser and never uploaded
        to any server. We will not store or process your data on our server in
        any way.
      </>
    ),
  },
  {
    question: "What is this website for?",
    answer: (
      <>
        I always like Spotify Wrapped and wanted to have something similar for
        Apple Health. So I built Wrapped for Apple Health, a website that
        generates a personalized summary of your Apple Health activity based on
        your Apple Health data export.
        <br />
        <br />
        Wrapped for Apple Health is simply a fun little project for me to work
        on in my free time.
      </>
    ),
  },
  {
    question: "Can you get access to my Apple account with my data?",
    answer: (
      <>
        The short answer is <strong>no</strong>. Your Apple Health data export
        only contains data about your activity data, not your login credentials!
        <br />
        You can <strong>verify this yourself</strong> by opening your Apple
        Health data export and looking at the file "export.xml" in a text
        editor. You can try searching for your password in the file and you'll
        see that it's not there.
        <br />
        In general, Apple Health doesn't store your unencrypted password
        anywhere and only stores a hashed version of it. Due to this, it's
        impossible for the data export to contain your password.
        <br />
        Wrapped for Apple Health will never ask you for your Apple login
        credentials and doesn't require you to enter them anywhere.
        <br />
        <br />
        Your data is <strong>not used or transferred</strong> by Wrapped for
        Apple Health!
      </>
    ),
  },
  {
    question: "Does my Wrapped contain my full activity history?",
    answer: (
      <>
        Due to the size of the Apple Health data export, Wrapped for Apple
        Health will only show your activity history for the last 365 days.
      </>
    ),
  },
  {
    question: "How does Wrapped for Apple Health work?",
    answer: (
      <>
        Wrapped for Apple Health uses your Apple Health data export to calculate
        your Wrapped. We use Apple's exported data about steps, heart rate, and
        more and generate statistics based on that.
      </>
    ),
  },
  {
    question: "How does the Spotify integration work?",
    answer: (
      <>
        If you want to, Wrapped for Apple Health can play fitting songs in the
        background while you're looking at your Wrapped - similar to how Spotify
        Wrapped works.
        <br />
        To achieve this, Wrapped for Apple Health uses{" "}
        <a
          href="https://developer.spotify.com/documentation/embeds"
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-bold"
        >
          Spotify Embeds
        </a>{" "}
        to embed a Spotify player to the bottom right of the screen.
        <br />
        For this to work, you'll only need to be logged into Spotify in your
        browser - you don't need to connect your Spotify account to Wrapped for
        Apple Health! Because Spotify is embedded using Spotify's build-in
        support for websites to do so, we don't have access to your Spotify
        account in any way.
      </>
    ),
  },
];

function Faq() {
  return (
    <Accordion
      type="single"
      collapsible
      className="max-w-lg dark mx-auto text-left"
    >
      {items.map((item) => (
        <AccordionItem value={item.question} key={item.question}>
          <AccordionTrigger className="text-left">
            {item.question}
          </AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default Faq;
