import { FaDownload } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

export default function Actions() {
	return (
		<td className="px-6 py-4 space-x-4">
			<div className="flex flex-col mr-auto items-start">
				<button
					className="text-sky-500 hover:text-sky-700 hover:cursor-pointer"
					title="View"
				>
					<FaRegEye className="inline mr-1" />
					View
				</button>
				<button
					className="text-slate-500 hover:text-slate-700 hover:cursor-pointer"
					title="Download"
				>
					<FaDownload className="inline mr-1" />
					Download
				</button>
				<button
					className="text-red-500 hover:text-red-700 hover:cursor-pointer"
					title="Delete"
				>
					<FaTrash className="inline mr-1" />
					Delete
				</button>
			</div>
		</td>
	);
}
