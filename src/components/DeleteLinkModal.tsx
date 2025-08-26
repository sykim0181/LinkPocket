import useDeleteLinkMutation from "@/hooks/useDeleteLinkMutation";
import Modal from "./common/Modal";
import { Button } from "./ui/button";
import Loading from "./common/Loading";

interface DeleteLinkModalProps {
  linkId: string;
  onCancel?: () => void;
  onDelete?: () => void;
}

const DeleteLinkModal = ({
  linkId,
  onCancel,
  onDelete,
}: DeleteLinkModalProps) => {
  const { mutate, isPending } = useDeleteLinkMutation({
    onSuccess: onDelete,
    onError: (error: Error) => alert("링크 제거 실패"),
  });

  const onClickDeleteButton = () => {
    mutate(linkId);
  };

  return (
    <Modal
      title="Delete Link"
      className="gap-6 w-[min(calc(100dvw-2rem),400px)] relative"
      contentClassName="flex flex-col gap-6"
    >
      <p>정말로 링크를 제거하시겠습니까?</p>
      <div className="grid grid-cols-2 gap-4">
        <Button onClick={onCancel} className="cursor-pointer">
          Cancel
        </Button>
        <Button onClick={onClickDeleteButton} className="cursor-pointer">
          Delete
        </Button>
      </div>

      {isPending && <Loading />}
    </Modal>
  );
};

export default DeleteLinkModal;
