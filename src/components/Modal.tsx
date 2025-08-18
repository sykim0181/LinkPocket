"use client";

import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";

interface ModalProps {
  title?: string;
  children: React.ReactNode;
}

const Modal = ({ title, children }: ModalProps) => {
  const router = useRouter();

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-gray-200/50">
      <div className="flex flex-col gap-4 bg-white p-6 rounded shadow-lg max-h-dvh">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">{title}</h1>
          <button className="cursor-pointer" onClick={() => router.back()}>
            <IoClose />
          </button>
        </div>
        <div className="overflow-auto">{children}</div>
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
};

export default Modal;
