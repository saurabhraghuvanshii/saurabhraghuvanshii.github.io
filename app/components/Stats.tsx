import { stats } from "@/data/stack";

export default function Stats() {
  return (
    <div className="stats">
      {stats.map(([value, label]) => (
        <div key={value} className="stat">
          <b>{value}</b>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
