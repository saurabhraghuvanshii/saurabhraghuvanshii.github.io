export default function Tags({ tags, className }: { tags: string[]; className?: string }) {
  return (
    <div className={className ? `tags ${className}` : "tags"}>
      {tags.map((t) => (
        <span key={t} className="tag">
          {t}
        </span>
      ))}
    </div>
  );
}
