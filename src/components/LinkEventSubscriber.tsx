"use client";

import { LINK_EVENT, linkEvents } from "@/lib/linkEvents";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const LinkEventSubscriber = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const removeListener = linkEvents.on(LINK_EVENT.LINKS_CHANGED, () =>
      queryClient.invalidateQueries({ queryKey: ["links"] })
    );

    return () => removeListener();
  }, [queryClient]);

  return null;
};

export default LinkEventSubscriber;
