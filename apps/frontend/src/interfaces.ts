export interface BaseMediaFile {
	asset_id: string;
	public_id: string;
	asset_folder: string;
	filename: string;
	display_name: string;
	format: string;
	uploaded_at: string; // ISO 8601
	megaBytes: number;
	secure_url: string;
}

export interface FileDocument extends BaseMediaFile {
	resource_type: "document";
	pages?: number;
	specific_type: "pdf" | "other";
}

export interface FileImage extends BaseMediaFile {
	resource_type: "image";
	width: number;
	height: number;
	aspect_ratio: number;
}

export interface FileVideo extends BaseMediaFile {
	resource_type: "video";
	width: number;
	height: number;
	aspect_ratio: number;
	duration: number; // seconds
	frame_rate?: number;
}

export interface UseFilesHook {
	allUploadedFiles: UploadedFiles | undefined;
	storageAmount: number | undefined;
	images: FileImage[];
	videos: FileVideo[];
	documents: FileDocument[];
	uploadImages: (formData: FormData) => void;
}

export interface FileProps {
	date: string;
	size: number;
	isUploader: boolean;
	sourceURL: string;
	name: string;
}

export type UploadedFiles = (FileDocument | FileImage | FileVideo)[];
