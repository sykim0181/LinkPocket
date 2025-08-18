"use client";

import dynamic from "next/dynamic";
import AddLinkForm from "./AddLinkForm";

const Modal = dynamic(() => import("@/components/Modal"), { ssr: false });

const AddLinkModal = () => {
  return (
    <Modal title="링크 추가">
      <AddLinkForm />
    </Modal>
  );
};

export default AddLinkModal;
