"use client";

import { getLink } from "@/lib/linkRepository";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { IoLink } from "react-icons/io5";

interface LinkDetailProps {
  linkId: string;
}

const LinkDetail = ({ linkId }: LinkDetailProps) => {
  const { data } = useQuery({
    queryKey: ["link", linkId],
    queryFn: () => getLink(linkId),
  });

  return data ? (
    <div className="w-full flex flex-col gap-4">
      <div className="flex justify-end">
        <Link
          className="cursor-pointer px-4 py-2 bg-black text-white rounded flex"
          href={data.canonicalUrl ?? data.url}
          target="_blank"
        >
          페이지로 이동
        </Link>
      </div>
      <img
        src={data.image}
        alt={data.title}
        className="max-w-[min(100dvw,800px)] mx-auto"
      />
      <div className="font-bold">{data?.title}</div>
      <div className="text-gray-600">{data?.description}</div>
      <div>{data?.memo}</div>
    </div>
  ) : (
    <p>loading...</p>
  );
};

export default LinkDetail;
