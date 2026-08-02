interface SectionHeadingProps {
  title: string;

  kicker: string;
  description?: string;
  align?: 'left' | 'center';
}

export default function SectionHeading({
  title,
  kicker,
  description,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <div className={align === 'center' ? 'section-heading text-center' : 'section-heading'}>
      <p className="section-kicker">{kicker}</p>
      <h2>{title}</h2>
      {description ? <p className="section-description">{description}</p> : null}
    </div>
  );
}
