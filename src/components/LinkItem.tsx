"use client";

import { LinkRecord } from "@/types/link";
import Link from "next/link";
import { useState } from "react";
import { useLongPress } from "use-long-press";
import Modal from "./Modal";
import { deleteLink } from "@/lib/linkRepository";

interface LinkItemProps {
  link: LinkRecord;
}

const LinkItem = ({ link }: LinkItemProps) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const longPressHandler = useLongPress(() => {
    setShowDeleteModal(true);
  });

  const deleteItem = async () => {
    await deleteLink(link.id);
    setShowDeleteModal(false);
  };

  return (
    <>
      <Link
        className="link-item"
        href={link.canonicalUrl ?? link.url}
        target="_blank"
        {...longPressHandler()}
      >
        <img
          src={link.image}
          alt={link.title}
          className="w-full aspect-square object-cover bg-white"
        />
        <div className="link-title line-clamp-2 mt-2">{link.title}</div>
      </Link>

      {showDeleteModal && (
        <Modal title="아이템 제거">
          <p>정말로 이 아이템을 제거하시겠습니까?</p>
          <div className="flex justify-end mt-4">
            <button
              className="bg-black text-white w-full rounded px-4 py-2 mr-2 cursor-pointer"
              onClick={deleteItem}
            >
              확인
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default LinkItem;
