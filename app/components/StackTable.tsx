import { Fragment } from "react";
import { stack } from "@/data/stack";

export default function StackTable() {
  return (
    <div className="kv">
      {stack.map(([k, v]) => (
        <Fragment key={k}>
          <div className="k mono">{k}</div>
          <div>{v}</div>
        </Fragment>
      ))}
    </div>
  );
}
