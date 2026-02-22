import { useState } from "react";
import { Link } from "react-router-dom";
import { GrStorage } from "react-icons/gr";
import { IoGrid } from "react-icons/io5";
import { FaList } from "react-icons/fa";
import File from "../components/File";
import Image from "../components/Image";
import useFiles from "../hooks/useFiles";

export default function Home() {
	const [currSelected, setCurrSelected] = useState<
		"all" | "images" | "videos" | "documents"
	>("all");
	const { allUploadedFiles, storageAmount, images, videos, documents } =
		useFiles();

	// TODO - have it so that it shows what file type the file is instead of it being hard coded
	// TODO - display the centered text if no files for that category instead of the table with empty rows
	// TODO - have the different gallery views (grid, list) actually work instead of just being buttons with no functionality
	// TODO - handle errors like Cloudinary's 420 error for rate limits and display an appropriate message to the user instead of just console logging it
	return (
		<div className="min-h-screen max-h-auto w-full">
			<div className="mt-10 max-w-3/4 m-auto">
				<h1 className="text-3xl font-semibold">Public Files</h1>
				<div className="flex items-center h-14 px-2">
					<div className="flex items-center space-x-10">
						<h3
							className={`border-b-2 w-fit text-base hover:cursor-pointer ${
								currSelected === "all"
									? "text-sky-600 border-sky-600"
									: "text-gray-500 border-transparent"
							}`}
							onClick={() => setCurrSelected("all")}
						>
							All ({allUploadedFiles?.length || 0})
						</h3>

						<h3
							className={`border-b-2 w-fit text-base hover:cursor-pointer ${
								currSelected === "images"
									? "text-sky-600 border-sky-600"
									: "text-gray-500 border-transparent"
							}`}
							onClick={() => setCurrSelected("images")}
						>
							Images ({images?.length || 0})
						</h3>

						<h3
							className={`border-b-2 w-fit text-base hover:cursor-pointer ${
								currSelected === "videos"
									? "text-sky-600 border-sky-600"
									: "text-gray-500 border-transparent"
							}`}
							onClick={() => setCurrSelected("videos")}
						>
							Videos ({videos?.length || 0})
						</h3>

						<h3
							className={`border-b-2 w-fit text-base hover:cursor-pointer ${
								currSelected === "documents"
									? "text-sky-600 border-sky-600"
									: "text-gray-500 border-transparent"
							}`}
							onClick={() => setCurrSelected("documents")}
						>
							Documents ({documents?.length || 0})
						</h3>
					</div>

					<div className="ml-auto flex items-center">
						<p className="text-slate-500">
							<GrStorage className="inline mr-2 text-base" />
							{storageAmount && (
								<span className="text-sm">
									{(storageAmount / 1024).toFixed(4)} GB of Storage Uploaded
								</span>
							)}
						</p>
					</div>
				</div>
				<div className="w-full flex bg-sky-100 px-4 py-2 rounded-md">
					<p className="text-sky-600">
						Wanna upload a file?{" "}
						<Link to="/upload/new-file" className="underline">
							Click here
						</Link>
					</p>
					<div className="ml-auto flex items-center space-x-4 justify-end">
						<button
							className="flex items-center text-sky-500 hover:text-sky-700 hover:cursor-pointer text-xl"
							title="Grid View"
						>
							<IoGrid />
						</button>
						<button
							className="flex items-center text-sky-500 hover:text-sky-700 hover:cursor-pointer text-xl"
							title="List View"
						>
							<FaList />
						</button>
					</div>
				</div>
				<div>
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
				</div>
			</div>
		</div>
	);
}
