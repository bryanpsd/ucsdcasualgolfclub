// Auto-generated helper to assist the TypeScript checker in this workspace.
// This declares a few common `~` aliases used across the project so the
// language server / type checker can resolve imports during automated checks.

declare module "~styles" {
	export * from "styles/index";
}

declare module "~styles/*" {
	const content: unknown;
	export default content;
}

declare module "~components/*" {
	const content: unknown;
	export default content;
}

declare module "~services/*" {
	const content: unknown;
	export default content;
}

declare module "~types/*" {
	const content: unknown;
	export default content;
}

declare module "*.svg?react" {
	import type * as React from "react";
	const ReactComponent: React.FC<React.SVGProps<SVGElement> & { title?: string }>;
	export default ReactComponent;
}

declare module "~icons/*.svg?react" {
	import type * as React from "react";
	const ReactComponent: React.FC<React.SVGProps<SVGElement> & { title?: string }>;
	export default ReactComponent;
}

declare module "~assets/*" {
	import type { ImageMetadata } from "astro/assets";
	const value: ImageMetadata | string;
	export default value;
}

declare module "~/assets/*" {
	import type { ImageMetadata } from "astro/assets";
	const value: ImageMetadata | string;
	export default value;
}

declare module "~/*.png" {
	import type { ImageMetadata } from "astro/assets";
	const value: ImageMetadata | string;
	export default value;
}

declare module "~/*.jpg" {
	import type { ImageMetadata } from "astro/assets";
	const value: ImageMetadata | string;
	export default value;
}

declare module "~/*.jpeg" {
	import type { ImageMetadata } from "astro/assets";
	const value: ImageMetadata | string;
	export default value;
}

declare module "~/*.webp" {
	import type { ImageMetadata } from "astro/assets";
	const value: ImageMetadata | string;
	export default value;
}

declare module "~/*.svg" {
	import type { ImageMetadata } from "astro/assets";
	const value: ImageMetadata | string;
	export default value;
}
