import { Sparkles } from 'lucide-react';
import type { CSSProperties } from 'react';

interface TechPillProps {
  label: string;
  iconId?: string;
  hex?: string;
  compact?: boolean;
}

export default function TechPill({ label, iconId, hex, compact = false }: TechPillProps) {
  const style = hex
    ? ({ '--led': hex } as CSSProperties & { '--led': string })
    : undefined;

  return (
    <span className={`tech-pill${compact ? ' tech-pill-compact' : ''}${hex ? '' : ' tech-pill-neutral'}`} style={style}>
      <span className="tech-pill-icon-wrap" aria-hidden="true">
        {iconId ? (
          <span className={`tech-pill-icon tech-icon--${iconId}`} />
        ) : (
          <Sparkles size={compact ? 13 : 15} />
        )}
      </span>
      <span>{label}</span>
    </span>
  );
}
