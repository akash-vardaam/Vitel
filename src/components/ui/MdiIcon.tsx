/**
 * MdiIcon — wraps @mdi/react with a consistent visual weight.
 * All icons rendered through this component share the same
 * apparent stroke density regardless of size.
 */
import MdiReactIcon from "@mdi/react";

interface MdiIconProps {
  path: string;
  /** Size in px — default 20. Internally scales to keep visual weight consistent. */
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  /** Colour override — defaults to currentColor */
  color?: string;
}

export default function MdiIcon({ path, size = 20, className, style, color = "currentColor" }: MdiIconProps) {
  // @mdi/react expects size in rem (1 = 24px). Convert px → rem units for the lib.
  const remSize = size / 24;
  return (
    <MdiReactIcon
      path={path}
      size={remSize}
      color={color}
      className={className}
      style={style}
    />
  );
}
