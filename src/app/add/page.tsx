import AddLinkForm from "@/components/AddLinkForm";

const Page = () => {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Add New Link</h1>
        <p className="text-gray-500">Save a link to your LinkPocket</p>
      </div>
      <AddLinkForm />
    </>
  );
};

export default Page;
