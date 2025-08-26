"use client";

import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { cn } from "@/lib/utils";

interface ModalProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

const Modal = ({
  title,
  children,
  className,
  contentClassName,
}: ModalProps) => {
  const router = useRouter();

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-gray-200/50">
      <Card className={cn(className, "overflow-y-auto")}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardAction onClick={() => router.back()} className="cursor-pointer">
            <IoClose />
          </CardAction>
        </CardHeader>
        <CardContent className={contentClassName}>{children}</CardContent>
      </Card>
    </div>,
    document.getElementById("modal-root")!
  );
};

export default Modal;
