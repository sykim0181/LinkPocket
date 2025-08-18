import AddLinkForm from "@/components/AddLinkForm";

const Page = () => {
  return (
    <div className="max-w-[500px] m-auto flex flex-col gap-5">
      <h1 className="text-2xl">링크 추가</h1>
      <AddLinkForm />
    </div>
  );
};

export default Page;
