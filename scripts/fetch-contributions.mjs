// Fetches the GitHub contribution calendar before `next build` and writes data/contributions.json.
// Uses the GraphQL API when GITHUB_TOKEN is set (GitHub Actions), otherwise a public mirror.
// If both fail, the committed JSON is kept so local and offline builds still work.
import { writeFile } from "node:fs/promises";

const USER = "saurabhraghuvanshii";
const OUT = new URL("../data/contributions.json", import.meta.url);

async function fromGraphQL(token) {
  const query = `query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks { contributionDays { date contributionCount } }
        }
      }
    }
  }`;
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { Authorization: `bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables: { login: USER } }),
  });
  if (!res.ok) throw new Error(`GraphQL HTTP ${res.status}`);
  const json = await res.json();
  const cal = json?.data?.user?.contributionsCollection?.contributionCalendar;
  if (!cal) throw new Error(`GraphQL: ${JSON.stringify(json.errors ?? json)}`);
  return {
    total: cal.totalContributions,
    days: cal.weeks.flatMap((w) => w.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount }))),
  };
}

async function fromMirror() {
  const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${USER}?y=last`);
  if (!res.ok) throw new Error(`mirror HTTP ${res.status}`);
  const json = await res.json();
  return {
    total: json.total.lastYear,
    days: json.contributions.map((d) => ({ date: d.date, count: d.count })),
  };
}

const sources = [];
if (process.env.GITHUB_TOKEN) sources.push(["GraphQL", () => fromGraphQL(process.env.GITHUB_TOKEN)]);
sources.push(["mirror", fromMirror]);

for (const [name, load] of sources) {
  try {
    const data = await load();
    if (!data.days.length) throw new Error("no days");
    await writeFile(OUT, JSON.stringify({ user: USER, fetchedAt: new Date().toISOString(), ...data }) + "\n");
    console.log(`contributions: ${data.total} from ${name}`);
    process.exit(0);
  } catch (err) {
    console.warn(`contributions: ${name} failed (${err.message})`);
  }
}
console.warn("contributions: keeping committed fallback");
