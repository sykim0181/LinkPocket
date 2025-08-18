"use client";

import { FormEvent, useState } from "react";

const AddLinkForm = () => {
  const [url, setUrl] = useState<string>("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!url) return;

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
    console.log("Fetched metadata:", metadata);
    // db에 저장
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        className="border-1"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button>추가</button>
    </form>
  );
};

export default AddLinkForm;
