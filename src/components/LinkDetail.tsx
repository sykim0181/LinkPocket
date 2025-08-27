"use client";

import { getLink } from "@/lib/linkRepository";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Badge } from "./ui/badge";

interface LinkDetailProps {
  linkId: string;
}

const LinkDetail = ({ linkId }: LinkDetailProps) => {
  const { data } = useQuery({
    queryKey: ["link", linkId],
    queryFn: () => getLink(linkId),
  });

  return (
    data && (
      <div className="flex flex-col gap-8">
        <div className="flex flex-row gap-4">
          <div className="w-[150px] h-[150px] border border-gray-100 shrink-0">
            {data.image && (
              <img src={data.image} className="w-full h-full object-cover" />
            )}
          </div>
          <div className="flex flex-col gap-4">
            <div className="font-bold text-2xl">{data.title}</div>
            <div>
              <Link
                href={data.canonicalUrl ?? data.url}
                className="text-sm text-(--primary)"
              >
                {data.canonicalUrl ?? data.url}
              </Link>
            </div>
            <div className="text-sm text-gray-600">
              {`Added ${data.createdAt.toUTCString()}`}
            </div>
          </div>
        </div>
        <div>
          <h2 className="font-bold text-xl">Notes</h2>
          <div className="bg-gray-100 p-4 rounded-lg mt-4">
            <p>{data.memo}</p>
          </div>
        </div>
        <div>
          <h2 className="font-bold text-xl">Tags</h2>
          <div className="flex flex-row gap-4">
            {data.tags?.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default LinkDetail;
