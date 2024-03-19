import qs from "qs";
import { useNavigate } from "react-router";
import { getQuery } from "../utils/helper";

export const useSearchQuery = () => {
  const navigate = useNavigate();
  const query: any = getQuery();
  const setQuery = (newQuery: object) => {
    const paresNewQp = qs.stringify({ ...query, ...newQuery });

    navigate({ search: paresNewQp });
  };

  return { query, setQuery };
};
