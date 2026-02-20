import Actions from "./Actions";

interface ImageProps {
	date: string;
	size: number;
	isUploader: boolean;
	sourceURL: string;
	name: string;
}

export default function Image({
	date,
	size,
	isUploader,
	sourceURL,
	name
}: ImageProps) {
	return (
		<tr className="bg-neutral-primary">
			<th
				scope="row"
				className="px-6 py-4 font-medium text-heading whitespace-nowrap flex items-center"
			>
				<img
					src={sourceURL}
					alt="Image"
					className="w-16 h-16 object-cover rounded mr-4"
				/>
				<div className="inline-block align-middle">
					<p className="text-sm font-medium text-gray-900">{name}</p>
					<p className="text-sm text-gray-500">PNG Image</p>
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
	);
}
