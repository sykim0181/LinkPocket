"use client";

import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

interface ModalProps {
  title: string;
  children: React.ReactNode;
}

const Modal = ({ title, children }: ModalProps) => {
  const router = useRouter();

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">{title}</h1>
          <button
            className="p-2 bg-black text-white rounded"
            onClick={() => router.back()}
          >
            X
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
};

export default Modal;
