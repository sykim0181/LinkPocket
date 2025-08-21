"use client";

import useAddLinkMutation from "@/hooks/useAddLinkMutation";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";

const AddLinkForm = () => {
  const [url, setUrl] = useState<string>("");
  const memoRef = useRef<HTMLTextAreaElement | null>(null);

  const router = useRouter();

  const { mutate, isPending } = useAddLinkMutation({
    onSuccess: () => router.back(),
    onError: (error: Error) => alert("링크 추가 실패"),
  });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!url) return;
    const memo = memoRef.current?.value;
    mutate({ url, memo });
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="flex gap-4">
        <label className="font-bold">url</label>
        <input
          className="border-1"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-bold">메모</label>
        <textarea className="border-1" ref={memoRef} />
      </div>
      <button
        className="bg-black text-white rounded p-2 cursor-pointer"
        disabled={!url}
      >
        {isPending ? "..." : "추가"}
      </button>
    </form>
  );
};

export default AddLinkForm;
