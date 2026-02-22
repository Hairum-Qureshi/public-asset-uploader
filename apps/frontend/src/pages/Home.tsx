import { useState } from "react";
import { Link } from "react-router-dom";
import { GrStorage } from "react-icons/gr";
import { IoGrid } from "react-icons/io5";
import { FaList } from "react-icons/fa";
import useFiles from "../hooks/useFiles";
import ListView from "../components/views/ListView";
import GridView from "../components/views/GridView";

export default function Home() {
	const [currSelected, setCurrSelected] = useState<
		"all" | "images" | "videos" | "documents"
	>("all");
	const [galleryView, setGalleryView] = useState<"grid" | "list">("list");
	const { allUploadedFiles, storageAmount, images, videos, documents } =
		useFiles();

	// TODO - have it so that it shows what file type the file is instead of it being hard coded
	// TODO - handle errors like Cloudinary's 420 error for rate limits and display an appropriate message to the user instead of just console logging it
	// TODO - allow download file feature
	// TODO - allow users to view images
	// TODO - *maybe* allow users to view document content

	return (
		<div className="min-h-screen max-h-auto w-full">
			<div className="mt-10 max-w-3/4 m-auto">
				<h1 className="text-3xl font-semibold">Public Files Archive</h1>
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
							onClick={() => setGalleryView("grid")}
						>
							<IoGrid />
						</button>
						<button
							className="flex items-center text-sky-500 hover:text-sky-700 hover:cursor-pointer text-xl"
							title="List View"
							onClick={() => setGalleryView("list")}
						>
							<FaList />
						</button>
					</div>
				</div>
				{galleryView === "list" ? (
					<ListView
						currSelected={currSelected}
						allUploadedFiles={allUploadedFiles}
						images={images}
						videos={videos}
						documents={documents}
					/>
				) : (
					<GridView
						currSelected={currSelected}
						allUploadedFiles={allUploadedFiles}
						images={images}
						videos={videos}
						documents={documents}
					/>
				)}
			</div>
		</div>
	);
}
