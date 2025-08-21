"use client";

import { LINK_EVENT, linkEventBus } from "@/lib/linkEventBus";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const LinkEventSubscriber = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const removeListener = linkEventBus.on(LINK_EVENT.LINKS_CHANGED, () =>
      queryClient.invalidateQueries({ queryKey: ["links"] })
    );

    return () => removeListener();
  }, [queryClient]);

  return null;
};

export default LinkEventSubscriber;
