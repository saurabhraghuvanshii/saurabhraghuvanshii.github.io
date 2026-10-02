import type { ReactNode } from "react";

// Two-column section: sticky mono label in the gutter, content on the right.
export default function Section({
  id,
  label,
  className,
  children,
  after,
}: {
  id: string;
  label: string;
  className?: string;
  children: ReactNode;
  after?: ReactNode;
}) {
  return (
    <section id={id} className={className}>
      <div className="sec">
        <h2>{label}</h2>
        <div>{children}</div>
      </div>
      {after}
    </section>
  );
}
