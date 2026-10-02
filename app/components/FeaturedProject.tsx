import { featured } from "@/data/projects";
import Tags from "./Tags";

export default function FeaturedProject() {
  return (
    <article className="feat">
      <div>
        <span className="badge">{featured.badge}</span>
        <h3>{featured.name}</h3>
        <p>{featured.summary}</p>
        <p className="mute">{featured.detail}</p>
        <Tags tags={featured.tags} />
        <div className="meta mono">
          <a href={featured.github} target="_blank" rel="noopener">
            GitHub ↗
          </a>
          {featured.website && (
            <a href={featured.website} target="_blank" rel="noopener">
              Website ↗
            </a>
          )}
        </div>
      </div>
      <div className="term" role="img" aria-label="Terminal output of the carrel doctor command">
        <div className="tb mono">
          <span>~ carrel doctor</span>
          <span>v0.1.0</span>
        </div>
        <pre>
          <span className="m">$</span>
          {" carrel doctor\nchecking the tools needed to run your code\n  ok       javac  21.0.4\n  ok       java   openjdk 21.0.4\n  missing  g++    install it and add to PATH\n\n"}
          <span className="m">$</span>
          {" carrel\n"}
          <span className="m">→</span>
          {" serving on 127.0.0.1\n"}
          <span className="m">→</span>
          {" solutions in ~/.carrel/solutions/"}
        </pre>
      </div>
    </article>
  );
}
