import { useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
	const [currSelected, setCurrSelected] = useState<
		"all" | "images" | "videos" | "documents"
	>("images");

	return (
		<div className="min-h-screen max-h-auto w-full">
			<div className="mt-10 max-w-3/4 m-auto">
				<h1 className="text-3xl font-semibold">Public Files</h1>
				<div className="flex space-x-10">
					<h3
						className={`border-b-2 w-fit mt-4 mb-2 text-lg hover:cursor-pointer ${
							currSelected === "all"
								? "text-sky-600 border-sky-600"
								: "text-gray-500 border-none"
						}`}
						onClick={() => setCurrSelected("all")}
					>
						All
					</h3>
					<h3
						className={`border-b-2 w-fit mt-4 mb-2 text-lg hover:cursor-pointer ${
							currSelected === "images"
								? "text-sky-600 border-sky-600"
								: "text-gray-500 border-none"
						}`}
						onClick={() => setCurrSelected("images")}
					>
						Images
					</h3>
					<h3
						className={`border-b-2 w-fit mt-4 mb-2 text-lg hover:cursor-pointer ${
							currSelected === "videos"
								? "text-sky-600 border-sky-600"
								: "text-gray-500 border-none"
						}`}
						onClick={() => setCurrSelected("videos")}
					>
						Videos
					</h3>
					<h3
						className={`border-b-2 w-fit mt-4 mb-2 text-lg hover:cursor-pointer ${
							currSelected === "documents"
								? "text-sky-600 border-sky-600"
								: "text-gray-500 border-none"
						}`}
						onClick={() => setCurrSelected("documents")}
					>
						Documents
					</h3>
				</div>
				<div className="w-full flex">
					<p className="text-sky-600 mt-2 px-4 py-2 bg-sky-100 w-full rounded-md">
						Wanna upload a file?{" "}
						<Link to="/upload/new-file" className="underline">
							Click here
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
