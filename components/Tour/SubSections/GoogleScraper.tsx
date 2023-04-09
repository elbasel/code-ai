import React, { useState } from "react";
import { Button } from "@components/Button";
import { SearchInput } from "@components/Input/SearchInput";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import useDebounce from "@hooks/useDebounce";
import JSONPretty from "react-json-pretty";
import useSWR from "swr";
import toast from "react-hot-toast";

type GoogleScraperProps = {};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const GoogleScraper = ({}: GoogleScraperProps): React.ReactElement => {
  // user inputs state
  const [queryString, setQueryString] = useState("");
  const debouncedQueryString = useDebounce<string>(queryString, 1500);

  // api state
  const { data, error, isLoading, mutate } = useSWR(
    `/api/get-google-search-results?queryString=${debouncedQueryString}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );
  // const debouncedLoading = useDebounce<boolean>(isLoading, 1500);

  // TODO make an <AutoAnimate> component
  const [parent] = useAutoAnimate({});

  // event handlers
  const handleQueryStringChange = (value: string) => {
    setQueryString(value);
  };

  return (
    <div className="space-y-4" ref={parent}>
      <SearchInput
        value={queryString}
        onChange={handleQueryStringChange}
        placeholder="Google search"
      />
      <Button
        onClick={() => {
          mutate();
          toast.success("Data refreshed");
        }}
        disabled={isLoading}
        className=""
      >
        {isLoading && <span>Searching google</span>}
        {!isLoading && <span>Refresh Data</span>}
      </Button>
      {debouncedQueryString && (
        <JSONPretty id="cheerio-response" data={error || data} />
      )}
    </div>
  );
};
