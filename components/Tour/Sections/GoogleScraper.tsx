import React, { useState } from "react";
import { Button } from "@components/Button";
import { SearchInput } from "@components/Input/SearchInput";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import useDebounce from "@hooks/useDebounce";
import JSONPretty from "react-json-pretty";
import useSWR from "swr";
import { invalidateData } from "util/invalidateData";

type GoogleScraperProps = {};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const GoogleScraper = ({}: GoogleScraperProps): React.ReactElement => {
  // user inputs state
  const [queryString, setQueryString] = useState("");
  const debouncedQueryString = useDebounce<string>(queryString, 500);

  // api state
  const { data, error, isLoading } = useSWR(
    () =>
      debouncedQueryString?.length > 0
        ? `/api/get-google-search-results?queryString=${debouncedQueryString}`
        : null,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );
  const debouncedLoading = useDebounce<boolean>(isLoading, 500);

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
        onClick={() =>
          invalidateData(
            `./api/get-google-search-results&queryString=${debouncedQueryString}`
          )
        }
        disabled={debouncedLoading}
        className=""
      >
        {debouncedLoading && <span>Searching google</span>}
        {!debouncedLoading && <span>Search google</span>}
      </Button>
      {debouncedQueryString && (
        <JSONPretty id="cheerio-response" data={error || data} />
      )}
    </div>
  );
};
