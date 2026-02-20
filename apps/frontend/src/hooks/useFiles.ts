import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { UseFilesHook } from "../interfaces";
import { useNavigate } from "react-router-dom";

export default function useFiles(): UseFilesHook {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

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

	const { data: storageAmount } = useQuery({
		queryKey: ["storage-amount"],
		queryFn: async () => {
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_BACKEND_URL}/uploader/upload-size`
				);
				return response.data.totalSizeInMB;
			} catch (error) {
				console.error(error);
			}
		}
	});

	const { data: images } = useQuery({
		queryKey: ["images"],
		queryFn: async () => {
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_BACKEND_URL}/uploader/all-images`
				);
				return response.data;
			} catch (error) {
				console.error(error);
			}
		}
	});

	const { data: videos } = useQuery({
		queryKey: ["videos"],
		queryFn: async () => {
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_BACKEND_URL}/uploader/all-videos`
				);
				return response.data;
			} catch (error) {
				console.error(error);
			}
		}
	});

	const { data: documents } = useQuery({
		queryKey: ["documents"],
		queryFn: async () => {
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_BACKEND_URL}/uploader/all-documents`
				);
				return response.data;
			} catch (error) {
				console.error(error);
			}
		}
	});

	const { mutate: uploadImages } = useMutation({
		mutationFn: async (formData: FormData) => {
			try {
				await axios.post(
					`${import.meta.env.VITE_BACKEND_URL}/uploader/new-file`,
					formData,
					{
						headers: {
							"Content-Type": "multipart/form-data"
						}
					}
				);
			} catch (error) {
				console.error(error);
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["all-files"] });
			navigate("/");
		}
	});

	return {
		allUploadedFiles,
		storageAmount,
		images,
		videos,
		documents,
		uploadImages
	};
}
