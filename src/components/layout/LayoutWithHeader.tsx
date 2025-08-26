import { ReactNode } from "react";
import Header from "../common/Header";

const LayoutWithHeader = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <div className="max-w-(--max-width) mx-auto p-4">{children}</div>
    </>
  );
};

export default LayoutWithHeader;
