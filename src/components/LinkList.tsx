"use client";

import { getAllLinks } from "@/lib/linkRepository";
import { LinkRecord } from "@/types/Link";
import Link from "next/link";
import { useEffect, useState } from "react";

const LinkList = () => {
  const [linkItems, setLinkItems] = useState<LinkRecord[]>([]);

  useEffect(() => {
    getAllLinks().then((links) => {
      setLinkItems(links);
    });
  }, []);

  return (
    <div>
      <h2>Link List</h2>

      <div className="grid grid-cols-4 gap-4">
        {linkItems.map((link) => (
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
