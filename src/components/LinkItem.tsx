import { LinkRecord } from "@/types/link";
import Link from "next/link";

interface LinkItemProps {
  link: LinkRecord;
}

const LinkItem = ({ link }: LinkItemProps) => {
  return (
    <Link className="link-item" href={link.canonicalUrl ?? link.url}>
      <img
        src={link.image}
        alt={link.title}
        className="w-full aspect-square object-cover bg-white"
      />
      <div className="link-title line-clamp-2 mt-2">{link.title}</div>
    </Link>
  );
};

export default LinkItem;
