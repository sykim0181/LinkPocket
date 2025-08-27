import { ReactNode } from "react";
import Header from "../common/Header";
import { cn } from "@/lib/utils";

const LayoutWithHeader = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <>
      <Header />
      <main className={cn("max-w-(--max-width) mx-auto", className)}>
        {children}
      </main>
    </>
  );
};

export default LayoutWithHeader;
