"use client";

import dynamic from "next/dynamic";
import LinkDetail from "./LinkDetail";

const Modal = dynamic(() => import("@/components/Modal"), { ssr: false });

interface ViewModalProps {
  linkId: string;
}

const ViewModal = ({ linkId }: ViewModalProps) => {
  return (
    <Modal>
      <LinkDetail linkId={linkId} />
    </Modal>
  );
};

export default ViewModal;
