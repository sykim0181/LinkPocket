"use client";

import { FormEvent, useState } from "react";

const AddLinkForm = () => {
  const [url, setUrl] = useState<string>("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!url) return;

    // url에서 데이터 가져오기
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
