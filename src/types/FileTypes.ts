export type FileBasic = { url: string; title: string };

export type FileWithDetails = {
	url: string;
	title: string;
	details: { image?: { width?: number; height?: number } };
};

export type FileType = FileBasic | FileWithDetails;
