import React from "react";
import ProjectCard from "./ProjectCard";

function Projects() {
  return (
    <div className="text-left max-w-3xl mx-auto mt-12">
      <p className="font-bold text-lg">Check out my other projects:</p>
      <div className="grid grid-cols-2 md:grid-cols-4 mt-6 gap-8">
        <ProjectCard
          title="Wrapped for TikTok"
          description="Get insights into your time on TikTok"
          image="/projects/tiktok-wrapped.png"
          link="https://wrapped.vantezzen.io"
        />
        <ProjectCard
          title="Purrsona"
          description="Feline Groovy? Let AI create a Spotify playlist for your pet"
          image="/projects/purrsona.png"
          link="https://purrsona.vantezzen.io"
        />
        <ProjectCard
          title="WonderRail"
          description="Easily plan your Interrail/Eurail trip across Europe"
          image="/projects/wonderrail.png"
          link="https://wonderrail.com"
        />
        <ProjectCard
          title="Melody Mayhem"
          description="Let your Spotify playlists battle it out!"
          image="/projects/melodymayhem.png"
          link="https://melody-mayhem.vantezzen.io/"
        />
      </div>
    </div>
  );
}

export default Projects;
