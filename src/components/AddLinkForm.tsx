"use client";

import { createLinkRecord } from "@/lib/linkFactory";
import { addLink } from "@/lib/linkRepository";
import { FormEvent, useRef, useState } from "react";

const AddLinkForm = () => {
  const [url, setUrl] = useState<string>("");
  const memoRef = useRef<HTMLTextAreaElement | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!url) return;

    const memo = memoRef.current?.value;

    // url에서 데이터 가져오기
    const response = await fetch("/api/metadata", {
      method: "POST",
      body: JSON.stringify({ url }),
    });
    const data = await response.json();

    if (!response.ok) {
      // 에러 처리
      console.error(`Failed to fetch metadata: ${data.error}`);
      return;
    }

    const metadata = data.metadata;

    // db에 저장
    const record = createLinkRecord(url, metadata, memo);
    await addLink(record);
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
      <button className="bg-black text-white rounded p-2" disabled={!url}>
        추가
      </button>
    </form>
  );
};

export default AddLinkForm;
