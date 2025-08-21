import { createLinkRecord } from "@/lib/linkFactory";
import { useMutation } from "@tanstack/react-query";
import { addLink } from "@/lib/linkRepository";
import { LinkRecord } from "@/types/link";

const useAddLinkMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) => {
  const mutation = useMutation({
    mutationFn: async ({ url, memo }: { url: string; memo?: string }) => {
      // url에서 데이터 가져오기
      const response = await fetch("/api/metadata", {
        method: "POST",
        body: JSON.stringify({ url }),
      });
      const data = await response.json();

      if (!response.ok) {
        // 에러 처리
        throw new Error(`Failed to fetch metadata: ${data.error}`);
      }

      const metadata = data.metadata;
      const record = createLinkRecord(url, metadata, memo);
      await addLink(record);
      return record;
    },
    onSuccess: (data?: LinkRecord) => {
      onSuccess?.();
    },
    onError: (error: Error) => {
      onError?.(error);
    },
  });

  return mutation;
};

export default useAddLinkMutation;
