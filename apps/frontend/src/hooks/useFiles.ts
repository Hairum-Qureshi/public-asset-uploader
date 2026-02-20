import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { UseFilesHook } from "../interfaces";

export default function useFiles(): UseFilesHook {
	const { data: allUploadedFiles } = useQuery({
		queryKey: ["all-files"],
		queryFn: async () => {
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_BACKEND_URL}/uploader/all-files`
				);
				return response.data;
			} catch (error) {
				console.error(error);
			}
		}
	});

	return {
		allUploadedFiles
	};
}
