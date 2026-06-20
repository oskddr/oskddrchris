export const PATTERN_BACKGROUND_DIRECTION = {
  Top: 'top',
  Bottom: 'bottom',
  Left: 'left',
  Right: 'right',
  TopRight: 'top-right',
  TopLeft: 'top-left',
  BottomRight: 'bottom-right',
  BottomLeft: 'bottom-left',
} as const;

export const PATTERN_BACKGROUND_VARIANT = {
  Grid: 'grid',
  BigDot: 'big-dot',
  Lines: 'lines',
} as const;

export const PATTERN_BACKGROUND_SPEED = {
  Slow: 22000,
  Default: 14000,
} as const;

export type PatternBackgroundDirection =
  (typeof PATTERN_BACKGROUND_DIRECTION)[keyof typeof PATTERN_BACKGROUND_DIRECTION];
export type PatternBackgroundVariant =
  (typeof PATTERN_BACKGROUND_VARIANT)[keyof typeof PATTERN_BACKGROUND_VARIANT];
export type PatternBackgroundSize = 'sm' | 'md' | 'lg';
export type PatternBackgroundMask = 'ellipse-top' | 'ellipse-center' | 'none';

export type BaseProps = {
  variant?: PatternBackgroundVariant;
  size?: PatternBackgroundSize;
  mask?: PatternBackgroundMask;
  direction?: PatternBackgroundDirection;
  speed?: number;
  animate?: boolean;
  class?: string;
};

export const patternBackgroundVariants = ({
  variant = PATTERN_BACKGROUND_VARIANT.Grid,
  size,
}: {
  variant?: PatternBackgroundVariant;
  size?: PatternBackgroundSize;
}) => {
  const variantClass = `pattern-background--${variant}`;
  const sizeClass = size ? `pattern-background--size-${size}` : '';
  return ['pattern-background', variantClass, sizeClass].filter(Boolean).join(' ');
};

export const patternBackgroundMaskVariants = ({ mask }: { mask?: PatternBackgroundMask }) => {
  if (!mask || mask === 'none') return '';
  return `pattern-background--mask-${mask}`;
};
