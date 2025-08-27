import { LinkRecord } from "@/types/link";
import Link from "next/link";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { useState } from "react";
import { useLongPress } from "use-long-press";
import DeleteLinkModal from "../DeleteLinkModal";

interface LinkItemProps {
  link: LinkRecord;
}

const LinkItem = ({ link }: LinkItemProps) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const longPressHandler = useLongPress(() => {
    setShowDeleteModal(true);
  });

  return (
    <>
      <Link
        href={`/view/${link.id}`}
        className="w-full"
        {...longPressHandler()}
      >
        <Card className="p-4 gap-2">
          <div className="flex w-full gap-4">
            <div className="shrink-0 w-[80px] h-[80px] rounded-2xl overflow-hidden border border-gray-100">
              {link.image ? (
                <img
                  className="shrink-0 w-full h-full object-cover"
                  src={link.image}
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full bg-gray-100" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="font-bold line-clamp-1 w-full text-ellipsis min-h-6">
                {link.title}
              </div>
              <div className="line-clamp-1 w-full text-ellipsis text-sm text-gray-600">
                {link.canonicalUrl ?? link.url}
              </div>
            </div>
          </div>
          <div
            className={cn(
              "w-full text-ellipsis line-clamp-1 text-sm break-words text-gray-800",
              "min-h-[1.25em]"
            )}
          >
            {link.description}
          </div>
          <div>
            {!link.tags ? (
              <Badge>default</Badge>
            ) : (
              link.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)
            )}
          </div>
        </Card>
      </Link>

      {showDeleteModal && (
        <DeleteLinkModal
          linkId={link.id}
          onCancel={() => setShowDeleteModal(false)}
          onDelete={() => setShowDeleteModal(false)}
        />
      )}
    </>
  );
};

export default LinkItem;
