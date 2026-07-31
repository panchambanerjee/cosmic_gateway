import type { ImageAsset } from "@cosmic-gateway/contracts";

export function CreditedImage({
  image,
  priority = false,
  className = "",
}: {
  image: ImageAsset;
  priority?: boolean;
  className?: string;
}) {
  const src = image.storageUrl ?? image.sourceUrl;

  return (
    <figure className={`overflow-hidden ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={image.altText}
        className="h-full w-full object-cover"
        loading={priority ? "eager" : "lazy"}
      />
      <figcaption className="border-t border-white/10 bg-void-900/90 px-3 py-2 text-xs text-star-200/80">
        <span className="font-medium text-star-100">{image.creditLine}</span>
        {image.caption ? <span className="mt-1 block">{image.caption}</span> : null}
        {image.rightsUrl ? (
          <a
            href={image.rightsUrl}
            className="mt-1 inline-block text-nebula-400 hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            Rights / source
          </a>
        ) : null}
      </figcaption>
    </figure>
  );
}
