import ViewModal from "@/components/Home/ViewModal";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <ViewModal linkId={id} />;
};

export default Page;
