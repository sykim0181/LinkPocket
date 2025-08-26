"use client";

import useAddLinkMutation from "@/hooks/useAddLinkMutation";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import Loading from "./common/Loading";

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
    <>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <Label htmlFor="url">URL</Label>
          <Input
            id="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="Notes">메모</Label>
          <Textarea ref={memoRef} placeholder="Add notes (optional)" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button disabled={!url} type="submit" className="cursor-pointer">
            Save Link
          </Button>
        </div>
      </form>
      
      {isPending && <Loading />}
    </>
  );
};

export default AddLinkForm;
