import { getAllLinks } from "@/lib/linkRepository";
import { useQuery } from "@tanstack/react-query";

const useLinks = () => {
  const query = useQuery({
    queryKey: ["links"],
    queryFn: getAllLinks,
  });

  return query;
};

export default useLinks;
