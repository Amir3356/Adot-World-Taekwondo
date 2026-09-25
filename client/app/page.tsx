import SmoothScroll from "./components/SmoothScroll";
import Scene3D from "./components/Scene3D";
import ScrollRail from "./components/ScrollRail";
import ScrollCue from "./components/ScrollCue";
import Hero from "./components/Hero";
import Journey from "./components/Journey";
import Marquee from "./components/Marquee";
import Oath from "./components/Oath";
import Masters from "./components/Masters";
import Poster from "./components/Poster";
import EventDetails from "./components/EventDetails";
import Finale from "./components/Finale";

/**
 * One page, no navigation: the scroll itself carries the story from the
 * club's title card through the graduate's journey to the event details.
 */
export default function Home() {
  return (
    <>
      <SmoothScroll />
      <ScrollRail />
      <ScrollCue />
      <Scene3D />

      <main className="relative">
        <Hero />
        <Journey />
        <Marquee />
        <Oath />
        <Masters />
        <Poster />
        <EventDetails />
        <Finale />
      </main>
    </>
  );
}
