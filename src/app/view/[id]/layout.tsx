import LayoutWithHeader from "@/components/layout/LayoutWithHeader";
import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <LayoutWithHeader>
      <Card>
        <CardContent>{children}</CardContent>
      </Card>
    </LayoutWithHeader>
  );
};

export default Layout;
