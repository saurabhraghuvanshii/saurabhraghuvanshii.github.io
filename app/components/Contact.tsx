import { email, socials } from "@/data/stack";
import CopyButton from "./CopyButton";

export default function Contact() {
  return (
    <>
      <h3 className="big">Have something worth building?</h3>
      <div className="mail">
        <code id="email">{email}</code>
        <CopyButton text={email} targetId="email" />
      </div>
      <div className="links">
        {socials.map((s) => (
          <a key={s.label} className="btn" href={s.href} target="_blank" rel="noopener">
            {s.label}
          </a>
        ))}
      </div>
    </>
  );
}
