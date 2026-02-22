import type {
	FileDocument,
	FileImage,
	FileVideo,
	UploadedFiles
} from "../../interfaces";
import Image from "../Image";
import File from "../File";
import Video from "../Video";

export default function GridView({
	currSelected,
	allUploadedFiles,
	images,
	videos,
	documents
}: {
	currSelected: "all" | "images" | "videos" | "documents";
	allUploadedFiles: UploadedFiles | undefined;
	images: FileImage[];
	videos: FileVideo[];
	documents: FileDocument[];
}) {
	return (
		<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-5">
			{!allUploadedFiles?.length ? (
				<p className="col-span-full mt-10 text-center text-slate-500">
					No files uploaded yet.
				</p>
			) : currSelected === "all" ? (
				allUploadedFiles.map(file => (
					<div
						key={file.asset_id}
						className="group overflow-hidden rounded-lg bg-slate-900/40 hover:bg-slate-900/60 transition"
					>
						{file.resource_type === "image" && (
							<>
								<div className="aspect-[4/3] w-full bg-black overflow-hidden">
									<Image
										sourceURL={file.secure_url}
										name={file.display_name}
										isUploader
										isGridView
										date={file.uploaded_at}
										size={file.megaBytes}
									/>
								</div>
								<div className="px-3 py-2 text-sm">
									<p className="truncate font-medium text-slate-100">
										{file.display_name}
									</p>
									<p className="text-xs text-slate-400">{file.megaBytes} MB</p>
								</div>
							</>
						)}
						{file.resource_type === "video" && (
							<>
								<div className="aspect-video w-full bg-black overflow-hidden">
									<Video
										sourceURL={file.secure_url}
										name={file.display_name}
										isUploader
										isGridView
										date={file.uploaded_at}
										size={file.megaBytes}
									/>
								</div>
								<div className="px-3 py-2 text-sm">
									<p className="truncate font-medium text-slate-100">
										{file.display_name}
									</p>
									<p className="text-xs text-slate-400">{file.megaBytes} MB</p>
								</div>
							</>
						)}
						{file.resource_type === "document" && (
							<File
								name={file.display_name}
								date={file.uploaded_at}
								size={file.megaBytes}
								sourceURL={file.secure_url}
								isUploader
								isGridView
							/>
						)}
					</div>
				))
			) : currSelected === "images" ? (
				images.map(image => (
					<div
						key={image.asset_id}
						className="group overflow-hidden rounded-lg bg-slate-900/40 hover:bg-slate-900/60 transition"
					>
						<div className="aspect-[4/3] w-full bg-black overflow-hidden">
							<Image
								sourceURL={image.secure_url}
								name={image.display_name}
								isUploader
								isGridView
								date={image.uploaded_at}
								size={image.megaBytes}
							/>
						</div>
						<div className="px-3 py-2 text-sm">
							<p className="truncate font-medium text-slate-100">
								{image.display_name}
							</p>
							<p className="text-xs text-slate-400">{image.megaBytes} MB</p>
						</div>
					</div>
				))
			) : currSelected === "videos" ? (
				videos.map(video => (
					<div
						key={video.asset_id}
						className="group overflow-hidden rounded-lg bg-slate-900/40 hover:bg-slate-900/60 transition"
					>
						<div className="aspect-video w-full bg-black overflow-hidden">
							<Video
								sourceURL={video.secure_url}
								name={video.display_name}
								isUploader
								isGridView
								date={video.uploaded_at}
								size={video.megaBytes}
							/>
						</div>
						<div className="px-3 py-2 text-sm">
							<p className="truncate font-medium text-slate-100">
								{video.display_name}
							</p>
							<p className="text-xs text-slate-400">{video.megaBytes} MB</p>
						</div>
					</div>
				))
			) : (
				documents.map(document => (
					<File
						key={document.asset_id}
						name={document.display_name}
						date={document.uploaded_at}
						size={document.megaBytes}
						sourceURL={document.secure_url}
						isUploader
						isGridView
					/>
				))
			)}
		</div>
	);
}
