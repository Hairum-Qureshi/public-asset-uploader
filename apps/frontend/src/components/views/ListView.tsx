import type {
	FileDocument,
	FileImage,
	FileVideo,
	UploadedFiles
} from "../../interfaces";
import Video from "../Video";
import Image from "../Image";
import File from "../File";

export default function ListView({
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
		<div>
			<div className="relative overflow-x-auto">
				{currSelected === "all" &&
					(allUploadedFiles?.length ? (
						<table className="w-full text-base text-left rtl:text-right text-body my-5">
							<thead className="text-heading border-b border-gray-200">
								<tr>
									<th className="px-6 py-3 font-semibold">Name</th>
									<th className="px-6 py-3 font-semibold">Date</th>
									<th className="px-6 py-3 font-semibold">Size</th>
									<th className="px-6 py-3 font-semibold">Actions</th>
								</tr>
							</thead>
							<tbody>
								{allUploadedFiles.map(file => {
									if (file.resource_type === "image") {
										return (
											<Image
												key={file.asset_id}
												name={file.display_name}
												date={file.uploaded_at}
												size={file.megaBytes}
												sourceURL={file.secure_url}
												isUploader
											/>
										);
									}

									if (file.resource_type === "video") {
										return (
											<Video
												key={file.asset_id}
												name={file.display_name}
												date={file.uploaded_at}
												size={file.megaBytes}
												sourceURL={file.secure_url}
												isUploader
											/>
										);
									}

									return (
										<File
											key={file.asset_id}
											name={file.display_name}
											date={file.uploaded_at}
											size={file.megaBytes}
											sourceURL={file.secure_url}
											isUploader
										/>
									);
								})}
							</tbody>
						</table>
					) : (
						<p className="text-center mt-10 text-gray-500">
							No files uploaded yet.
						</p>
					))}

				{currSelected === "images" &&
					(images?.length ? (
						<table className="w-full text-base text-left rtl:text-right text-body my-5">
							<thead className="text-heading border-b border-gray-200">
								<tr>
									<th className="px-6 py-3 font-semibold">Name</th>
									<th className="px-6 py-3 font-semibold">Date</th>
									<th className="px-6 py-3 font-semibold">Size</th>
									<th className="px-6 py-3 font-semibold">Actions</th>
								</tr>
							</thead>
							<tbody>
								{images.map(image => (
									<Image
										key={image.asset_id}
										name={image.display_name}
										date={image.uploaded_at}
										size={image.megaBytes}
										sourceURL={image.secure_url}
										isUploader
									/>
								))}
							</tbody>
						</table>
					) : (
						<p className="text-center mt-10 text-gray-500">
							No images uploaded yet.
						</p>
					))}

				{currSelected === "videos" &&
					(videos?.length ? (
						<table className="w-full text-base text-left rtl:text-right text-body my-5">
							<thead className="text-heading border-b border-gray-200">
								<tr>
									<th className="px-6 py-3 font-semibold">Name</th>
									<th className="px-6 py-3 font-semibold">Date</th>
									<th className="px-6 py-3 font-semibold">Size</th>
									<th className="px-6 py-3 font-semibold">Actions</th>
								</tr>
							</thead>
							<tbody>
								{videos.map(video => (
									<Video
										key={video.asset_id}
										name={video.display_name}
										date={video.uploaded_at}
										size={video.megaBytes}
										sourceURL={video.secure_url}
										isUploader
									/>
								))}
							</tbody>
						</table>
					) : (
						<p className="text-center mt-10 text-gray-500">
							No videos uploaded yet.
						</p>
					))}

				{currSelected === "documents" &&
					(documents?.length ? (
						<table className="w-full text-base text-left rtl:text-right text-body my-5">
							<thead className="text-heading border-b border-gray-200">
								<tr>
									<th className="px-6 py-3 font-semibold">Name</th>
									<th className="px-6 py-3 font-semibold">Date</th>
									<th className="px-6 py-3 font-semibold">Size</th>
									<th className="px-6 py-3 font-semibold">Actions</th>
								</tr>
							</thead>
							<tbody>
								{documents.map(document => (
									<File
										key={document.asset_id}
										name={document.display_name}
										date={document.uploaded_at}
										size={document.megaBytes}
										sourceURL={document.secure_url}
										isUploader
									/>
								))}
							</tbody>
						</table>
					) : (
						<p className="text-center mt-10 text-gray-500">
							No documents uploaded yet.
						</p>
					))}
			</div>
		</div>
	);
}
