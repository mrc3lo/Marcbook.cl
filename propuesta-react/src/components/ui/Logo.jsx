import { branding } from '../../config/branding.js';

export default function Logo({ variant = 'horizontal', decorative = false }) {
  const artwork = branding[variant];
  const [, , width, height] = artwork.bounds;

  return (
    <svg
      className={`brand-logo brand-logo--${variant}`}
      viewBox={artwork.bounds.join(' ')}
      width={width}
      height={height}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : 'Marcbook'}
      aria-hidden={decorative ? 'true' : undefined}
      focusable="false"
    >
      <image
        href={artwork.src}
        width={artwork.canvasSize}
        height={artwork.canvasSize}
      />
    </svg>
  );
}
