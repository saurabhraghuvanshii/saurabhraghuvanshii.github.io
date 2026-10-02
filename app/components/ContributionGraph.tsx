import data from "@/data/contributions.json";

type Day = { date: string; count: number };
const WEEKS = 53;

// Level 0 for no contributions, then quartiles of the non-zero days.
function leveler(days: Day[]) {
  const counts = days.map((d) => d.count).filter((c) => c > 0).sort((a, b) => a - b);
  const q = (p: number) => counts[Math.min(counts.length - 1, Math.floor(p * counts.length))] ?? 0;
  const [q1, q2, q3] = [q(0.25), q(0.5), q(0.75)];
  return (c: number) => (c === 0 ? 0 : c <= q1 ? 1 : c <= q2 ? 2 : c <= q3 ? 3 : 4);
}

export default function ContributionGraph() {
  const days = [...(data.days as Day[])].sort((a, b) => a.date.localeCompare(b.date));
  const level = leveler(days);
  const lead = days.length ? new Date(`${days[0].date}T00:00:00Z`).getUTCDay() : 0;
  let cells: (Day | null)[] = [...Array<null>(lead).fill(null), ...days];
  const extra = Math.ceil(cells.length / 7) - WEEKS;
  if (extra > 0) cells = cells.slice(extra * 7);

  return (
    <div className="gh">
      <div className="gh-head mono">
        <span>GitHub activity</span>
        <span className="mute">{data.total.toLocaleString("en-US")} contributions in the last year</span>
      </div>
      <div className="gh-scroll">
        <div
          className="gh-grid"
          role="img"
          aria-label={`GitHub contribution graph: ${data.total} contributions in the last year`}
        >
          {cells.map((d, i) =>
            d ? (
              <i key={d.date} className={`l${level(d.count)}`} title={`${d.count} on ${d.date}`} />
            ) : (
              <i key={`pad-${i}`} className="pad" />
            ),
          )}
        </div>
      </div>
      <div className="gh-legend mono mute">
        <span>Less</span>
        <i className="l0" />
        <i className="l1" />
        <i className="l2" />
        <i className="l3" />
        <i className="l4" />
        <span>More</span>
        <a href="https://github.com/saurabhraghuvanshii" target="_blank" rel="noopener">
          @saurabhraghuvanshii ↗
        </a>
      </div>
    </div>
  );
}
