import { cn } from "@/lib/utils";
import Link from "next/link";
import { TiPlus } from "react-icons/ti";

interface FloatingButtonProps {
  className?: string;
}

const FloatingButton = ({ className }: FloatingButtonProps) => {
  return (
    <Link
      href="/add"
      className={cn(
        "bg-(--primary) text-(--background) text-xl w-10 h-10 flex justify-center items-center rounded-full py-2",
        className
      )}
    >
      <TiPlus />
    </Link>
  );
};

export default FloatingButton;
