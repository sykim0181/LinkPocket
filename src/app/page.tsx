import FloatingButton from "@/components/Home/FloatingButton";
import LinkList from "@/components/Home/LinkList";

export default function Home() {
  return (
    <div className="relative h-dvh p-4">
      <LinkList />
      <FloatingButton className="fixed bottom-4 right-4" />
    </div>
  );
}
