"use client";

import useLinks from "@/hooks/useLinks";
import Link from "next/link";
import { TiPlus } from "react-icons/ti";
import LinkItem from "./LinkItem";

const LinkList = () => {
  const { data } = useLinks();

  return (
    <div>
      <div className="flex justify-between py-2">
        <div className="text-gray-800 font-bold">{`${
          data?.length ?? 0
        }개의 아이템`}</div>
        <Link
          href="/add"
          className="bg-gray-300 text-gray-600 rounded-full p-2"
        >
          <TiPlus />
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-4 mt-2">
        {data && data.map((link) => <LinkItem key={link.id} link={link} />)}
      </div>
    </div>
  );
};

export default LinkList;
