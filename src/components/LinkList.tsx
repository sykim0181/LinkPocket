"use client";

import useLinks from "@/hooks/useLinks";
import Link from "next/link";

const LinkList = () => {
  const { data } = useLinks();

  return (
    <div>
      <h2>Link List</h2>

      <div className="grid grid-cols-4 gap-4">
        {data &&
          data.map((link) => (
            <Link key={link.id} href={link.canonicalUrl ?? link.url}>
              {link.image && <img src={link.image} />}
              <h3>{link.title}</h3>
              <p>{link.description}</p>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default LinkList;
