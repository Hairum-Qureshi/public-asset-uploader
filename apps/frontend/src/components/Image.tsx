import Actions from "./Actions";

export default function Image() {
	return (
		<tr className="bg-neutral-primary">
			<th
				scope="row"
				className="px-6 py-4 font-medium text-heading whitespace-nowrap flex items-center"
			>
				<img
					src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
					alt="Image"
					className="w-16 h-16 object-cover rounded mr-4"
				/>
				<div className="inline-block align-middle">
					<p className="text-sm font-medium text-gray-900">Image.png</p>
					<p className="text-sm text-gray-500">PNG Image</p>
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
