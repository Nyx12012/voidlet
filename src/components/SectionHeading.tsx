type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  lede?: string;
};

export default function SectionHeading({ eyebrow, title, lede }: SectionHeadingProps) {
  return (
    <div className="mb-12 max-w-2xl">
      {eyebrow && (
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-accent">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-[2rem] font-bold leading-tight tracking-tight text-fg">
        {title}
      </h2>
      {lede && <p className="mt-4 text-base text-muted">{lede}</p>}
    </div>
  );
}
