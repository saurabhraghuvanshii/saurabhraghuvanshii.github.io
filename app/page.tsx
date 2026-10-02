import Contact from "./components/Contact";
import ContributionGraph from "./components/ContributionGraph";
import FeaturedProject from "./components/FeaturedProject";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Job from "./components/Job";
import ProjectGrid from "./components/ProjectGrid";
import Section from "./components/Section";
import StackTable from "./components/StackTable";
import Stats from "./components/Stats";
import { work } from "@/data/work";

export default function Home() {
  return (
    <main className="wrap" id="top">
      <Hero />

      <Section id="work" label="Work">
        {work.map((job) => (
          <Job key={job.title} job={job} />
        ))}
      </Section>

      <Section id="projects" label="Projects">
        <FeaturedProject />
        <ProjectGrid />
      </Section>

      <Section id="oss" label="Open source">
        <Stats />
        <ContributionGraph />
      </Section>

      <Section id="stack" label="Stack">
        <StackTable />
      </Section>

      <Section id="contact" label="Contact" after={<Footer />}>
        <Contact />
      </Section>
    </main>
  );
}
