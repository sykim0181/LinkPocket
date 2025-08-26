import { deleteLink } from "@/lib/linkRepository";
import { useMutation } from "@tanstack/react-query";

const useDeleteLinkMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) => {
  const mutation = useMutation({
    mutationFn: (id: string) => deleteLink(id),
    onSuccess: () => {
      onSuccess?.();
    },
    onError: (error: Error) => {
      onError?.(error);
    },
  });

  return mutation;
};

export default useDeleteLinkMutation;
