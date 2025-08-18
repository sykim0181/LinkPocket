import LinkDetail from "@/components/LinkDetail";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <div className="max-w-[1024px] mx-auto">
      <LinkDetail linkId={id} />
    </div>
  );
};
export default Page;
