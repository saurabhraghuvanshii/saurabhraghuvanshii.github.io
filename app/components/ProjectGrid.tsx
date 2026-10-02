import { earlier, projects } from "@/data/projects";
import Tags from "./Tags";

export default function ProjectGrid() {
  return (
    <>
      <div className="projs">
        {projects.map((p) => (
          <article key={p.name} className="proj">
            <h3>
              {p.name}{" "}
              <a href={p.github} target="_blank" rel="noopener">
                GitHub ↗
              </a>
            </h3>
            <p>{p.summary}</p>
            <p className="mute">{p.detail}</p>
            <Tags tags={p.tags} className="stack" />
          </article>
        ))}
      </div>
      <div className="earlier mono">
        <span>Earlier:</span>
        {earlier.map((e) => (
          <a key={e.href} href={e.href} target="_blank" rel="noopener">
            {e.label} ↗
          </a>
        ))}
      </div>
    </>
  );
}
