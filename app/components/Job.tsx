import type { Job as JobData } from "@/data/work";
import Rich from "./Rich";
import Tags from "./Tags";

export default function Job({ job }: { job: JobData }) {
  return (
    <article className="job">
      <span className="mono mute">{job.when}</span>
      <h3>{job.title}</h3>
      <span className="role">{job.role}</span>
      <ul>
        {job.bullets.map((b) => (
          <li key={b}>
            <Rich text={b} />
          </li>
        ))}
      </ul>
      {job.more && (
        <details>
          <summary>More from this term</summary>
          <ul>
            {job.more.map((b) => (
              <li key={b}>
                <Rich text={b} />
              </li>
            ))}
          </ul>
        </details>
      )}
      {job.tags && <Tags tags={job.tags} />}
    </article>
  );
}
