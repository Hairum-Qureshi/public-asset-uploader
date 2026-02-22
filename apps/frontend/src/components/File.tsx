import type { FileProps } from "../interfaces";
import Actions from "./Actions";
import { IoIosDocument } from "react-icons/io";

export default function File({
	date,
	size,
	isUploader,
	name,
	isGridView = false
}: FileProps) {
	return (
		<>
			{isGridView ? (
				<div className="relative flex flex-col items-center justify-center w-full h-40 bg-slate-800 rounded-md overflow-hidden">
					<IoIosDocument className="text-5xl text-gray-400" />
					<p className="mt-2 truncate text-center text-sm font-medium text-slate-100">
						{name}
					</p>
					{isUploader && (
						<div className="absolute top-2 right-2">
							<Actions isGridView isUploader={isUploader} />
						</div>
					)}
				</div>
			) : (
				<tr className="bg-neutral-primary">
					<th
						scope="row"
						className="px-6 py-4 font-medium text-heading whitespace-nowrap"
					>
						<IoIosDocument className="inline w-14 h-14 object-cover rounded mr-4 text-black" />
						<div className="inline-block align-middle">
							<p className="text-sm font-medium text-gray-900">{name}</p>
							<p className="text-sm text-gray-500">PDF Document</p>
						</div>
					</th>
					<td className="px-6 py-4">
						<p className="text-sm text-gray-500">
							{new Date(date).toLocaleDateString("en-US", {
								year: "numeric",
								month: "2-digit",
								day: "2-digit"
							})}
						</p>
					</td>
					<td className="px-6 py-4">{size} MB</td>
					<Actions isUploader />
				</tr>
			)}
		</>
	);
}
