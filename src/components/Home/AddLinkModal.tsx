"use client";

import dynamic from "next/dynamic";
import AddLinkForm from "../AddLinkForm";

const Modal = dynamic(() => import("@/components/common/Modal"), {
  ssr: false,
});

const AddLinkModal = () => {
  return (
    <Modal
      title="링크 추가"
      className="w-[min(calc(100dvw-2rem),600px)] h-[min(calc(100dvh-2rem),600px)] relative"
    >
      <AddLinkForm />
    </Modal>
  );
};

export default AddLinkModal;
