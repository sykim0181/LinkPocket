import LinkList from "@/components/LinkList";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-blue-200 h-dvh">
      <h1>메인</h1>
      <Link href="/add">Open Modal</Link>
      <LinkList />
    </div>
  );
}
