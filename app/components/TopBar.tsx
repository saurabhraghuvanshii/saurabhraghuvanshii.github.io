import ThemeToggle from "./ThemeToggle";

const links = [
  ["#work", "Work"],
  ["#projects", "Projects"],
  ["#oss", "Open source"],
  ["#stack", "Stack"],
  ["#contact", "Contact"],
];

export default function TopBar() {
  return (
    <header className="bar">
      <div className="wrap">
        <a className="logo" href="#top">
          saurabh.
        </a>
        <nav className="nav mono" aria-label="Sections">
          {links.map(([href, label]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
