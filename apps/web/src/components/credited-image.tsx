import type { ImageAsset } from "@cosmic-gateway/contracts";

export function CreditedImage({
  image,
  priority = false,
  size = "hero",
  className = "",
}: {
  image: ImageAsset;
  priority?: boolean;
  /** card = list thumbnails; hero = discovery detail */
  size?: "card" | "hero";
  className?: string;
}) {
  const src = image.storageUrl ?? image.sourceUrl;
  const maxHeightClass = size === "card" ? "max-h-64" : "max-h-[28rem]";

  return (
    <figure className={`overflow-hidden ${className}`}>
      <div className={`bg-void-950 ${maxHeightClass}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={image.altText}
          className={`mx-auto block h-auto w-full object-contain ${maxHeightClass}`}
          loading={priority ? "eager" : "lazy"}
        />
      </div>
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
