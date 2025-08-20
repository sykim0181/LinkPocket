import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/components/QueryProvider";
import Header from "@/components/Header";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

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
      <body className="bg-gray-100">
        <QueryProvider>
          <Header />
          <main>
            {modal}
            {children}
          </main>
          <div id="modal-root" />
        </QueryProvider>
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
