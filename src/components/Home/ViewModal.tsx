"use client";

import dynamic from "next/dynamic";
import LinkDetail from "../LinkDetail";

const Modal = dynamic(() => import("@/components/common/Modal"), {
  ssr: false,
});

interface ViewModalProps {
  linkId: string;
}

const ViewModal = ({ linkId }: ViewModalProps) => {
  return (
    <Modal className="w-[min(calc(100dvw-2rem),800px)] h-[min(calc(100dvh-2rem),600px)]">
      <LinkDetail linkId={linkId} />
    </Modal>
  );
};

export default ViewModal;
