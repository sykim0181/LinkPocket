import { getAllLinks, linkRepoEvent } from "@/lib/linkRepository";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const useLinks = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["links"],
    queryFn: getAllLinks,
  });

  useEffect(() => {
    const linksChangedHandler = () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
    };

    linkRepoEvent.addEventListener("changed", linksChangedHandler);

    return () => {
      linkRepoEvent.removeEventListener("changed", linksChangedHandler);
    };
  }, [queryClient]);

  return query;
};

export default useLinks;
