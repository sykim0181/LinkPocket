"use client";

import useLinks from "@/hooks/useLinks";
import LinkItem from "./LinkItem";

const LinkList = () => {
  const { data } = useLinks();

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-bold">All Links</h1>
        <p className="text-gray-600">Manage and organize your saved links</p>
      </div>
      <div className="flex-1 overflow-y-auto">
        {data && (
          <ul className="flex flex-col md:grid md:grid-cols-3 gap-4 md:gap-6">
            {data.map((item) => (
              <li key={item.id} className="w-full">
                <LinkItem link={item} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default LinkList;
