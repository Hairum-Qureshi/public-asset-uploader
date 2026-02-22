import { FaDownload } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Actions({
	isUploader,
	isGridView = false,
	fileURL
}: {
	isUploader: boolean;
	isGridView?: boolean;
	fileURL: string;
}) {
	return (
		<>
			{isGridView ? (
				<div className="absolute top-2 right-2 flex space-x-2 bg-black/40 p-1 rounded-md">
					<button
						className="text-sky-400 hover:text-sky-600 text-sm hover:cursor-pointer"
						title="View"
					>
						<FaRegEye className="inline" />
					</button>
					<Link to={fileURL} target="_blank" rel="noopener noreferrer" download>
						<button
							className="text-slate-200 hover:text-slate-400 text-sm hover:cursor-pointer"
							title="Download"
						>
							<FaDownload className="inline" />
						</button>
					</Link>
					{isUploader && (
						<button
							className="text-red-400 hover:text-red-600 text-sm hover:cursor-pointer"
							title="Delete"
						>
							<FaTrash className="inline" />
						</button>
					)}
				</div>
			) : (
				<td className="px-6 py-4 space-x-4">
					<div className="flex items-center space-x-2">
						<button
							className="text-sky-500 hover:text-sky-700 hover:cursor-pointer text-sm"
							title="View"
						>
							<FaRegEye className="inline mr-1" />
							View
						</button>
						<button
							className="text-slate-500 hover:text-slate-700 hover:cursor-pointer text-sm"
							title="Download"
						>
							<FaDownload className="inline mr-1" />
							Download
						</button>
						{isUploader && (
							<button
								className="text-red-500 hover:text-red-700 hover:cursor-pointer text-sm"
								title="Delete"
							>
								<FaTrash className="inline mr-1" />
								Delete
							</button>
						)}
					</div>
				</td>
			)}
		</>
	);
}
