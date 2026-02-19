import Actions from "./Actions";

export default function File() {
	return (
		<tr className="bg-neutral-primary">
			<th
				scope="row"
				className="px-6 py-4 font-medium text-heading whitespace-nowrap"
			>
				<div className="inline-block align-middle">
					<p className="text-sm font-medium text-gray-900">Document.pdf</p>
					<p className="text-sm text-gray-500">PDF Document</p>
				</div>
			</th>
			<td className="px-6 py-4">
				<p className="text-sm text-gray-500">2/20/2026</p>
			</td>
			<td className="px-6 py-4">1.5 MB</td>
			<Actions />
		</tr>
	);
}
