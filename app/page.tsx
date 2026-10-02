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
import { ossGist } from "@/data/stack";
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
        <p className="oss-more">
          Every contribution, project by project, in one place.{" "}
          <a href={ossGist} target="_blank" rel="noopener">
            Full write-up of my open source work ↗
          </a>
        </p>
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
