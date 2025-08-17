"use client";

import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

interface ModalProps {
  children: React.ReactNode;
}

const Modal = ({ children }: ModalProps) => {
  const router = useRouter();

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h1 className="text-xl font-bold">Modal Title</h1>
        <div>{children}</div>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => router.back()}
        >
          Close Modal
        </button>
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
};

export default Modal;
