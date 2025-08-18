import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/components/QueryProvider";

export const metadata: Metadata = {
  title: "LinkPocket",
  description: "흥미로운 웹 콘텐츠를 포켓에 담아보세요.",
};

export default function RootLayout({
  modal,
  children,
}: Readonly<{
  modal: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <main>
            {modal}
            {children}
          </main>
          <div id="modal-root" />
        </QueryProvider>
      </body>
    </html>
  );
}
