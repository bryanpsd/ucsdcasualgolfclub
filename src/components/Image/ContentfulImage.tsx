import type { ComponentPropsWithRef, CSSProperties } from "react";

export interface ContentfulImageProps {
	id?: string;
	className?: string;
	style?: CSSProperties;
	/** Path to the image. */
	src?: string;
	/** A textual replacement for the image. Required for accessibility. */
	alt: string;
	/** Explicit width of the image (in px). Used for aspect ratio/layout stability. */
	width?: number | string;
	/** Explicit height of the image (in px). Used for aspect ratio/layout stability. */
	height?: number | string;
	/** How the image should fit in its container (CSS object-fit). */
	objectFit?: CSSProperties["objectFit"];
	/** How the image should be positioned within its container (CSS object-position). */
	objectPosition?: CSSProperties["objectPosition"];
	/** Props that will be passed to the underlying "img" element. */
	imgProps?: Omit<ComponentPropsWithRef<"img">, "src" | "alt" | "width" | "height" | "style">;
}

const isContentfulSrc = (src = "") => src.startsWith("//images.ctfassets.net");

const getProxySrc = (src = "", imgFormat = "") => {
	if (!src) {
		return "";
	}

	const format = imgFormat ? imgFormat : src.split(".").pop();
	return `/api/contentful-image?url=${encodeURIComponent(`${src}?fm=${format}`)}`;
};

/**
 * Renders a "picture" element with optimizations for images from Contentful.
 *
 * Note: When running the server in development mode, images will also appear in the "Fetch/XHR"
 * tab of the browser developer tools as a result of Astro's performance audit. These extra
 * requests don't happen in production builds. Currently, the fallback image is the raw image asset
 * in Contentful. In the future, we may want to consider further optimizations for the fallback image.
 * https://github.com/withastro/astro/blob/386efb33105272c2049d7573287fbe511b20616b/packages/astro/src/runtime/client/dev-toolbar/apps/audit/rules/perf.ts#L6-L28
 */
export const ContentfulImage = ({
	id,
	className,
	style,
	src,
	alt,
	width,
	height,
	objectFit = "contain",
	objectPosition,
	imgProps = {},
}: ContentfulImageProps) => {
	const isContentfulImage = isContentfulSrc(src);
	const defaultImgSrc = isContentfulImage ? getProxySrc(src) : src;

	// Compose the style for the <img> element
	const imgStyle: CSSProperties = {
		width: "100%",
		height: "auto",
		objectFit,
		...(objectPosition ? { objectPosition } : {}),
	};

	return (
		<picture id={id} className={className} style={style}>
			{isContentfulImage && (
				<>
					<source srcSet={getProxySrc(src, "avif")} type="image/avif" />
					<source srcSet={getProxySrc(src, "webp")} type="image/webp" />
				</>
			)}
			<img
				src={defaultImgSrc}
				alt={alt && alt.trim() !== "" ? alt : "UCSD Casual Golf Club image"}
				width={width}
				height={height}
				loading={imgProps.loading ?? "lazy"}
				decoding={imgProps.decoding ?? "async"}
				style={imgStyle}
				{...imgProps}
			/>
		</picture>
	);
};
