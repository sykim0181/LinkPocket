import LinkDetail from "@/components/LinkDetail";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return <LinkDetail linkId={id} />;
};
export default Page;
