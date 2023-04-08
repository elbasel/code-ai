import { WebsiteInput } from "@components/Input/WebsiteInput";
import React, { useState } from "react";
import useSWR, { mutate } from "swr";
import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";
import { Button } from "@components/Button";
import { isValidUrl } from "util/isValidUrl";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import useDebounce from "@hooks/useDebounce";

type CheerioCrawlerProps = {};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const CheerioCrawler = ({}: CheerioCrawlerProps) => {
  const [url, setUrl] = useState<string | null>(null);

  const [parent] = useAutoAnimate({});
  const { data, error, isLoading } = useSWR(
    url && `/api/get-links-on-webpage?url=${url}`,
    fetcher
  );

  const debouncedLoading = useDebounce<boolean>(isLoading, 500);

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const invalidateData = (url: string | null) => {
    mutate(isValidUrl(url) && `/api/get-links-on-webpage?url=${url}`);
  };

  return (
    <div className="space-y-4" ref={parent}>
      <WebsiteInput value={url} onChange={handleUrlChange} />
      {!isValidUrl(url) && url && (
        <span className="inline-block my-2 text-red-500">Invalid URL</span>
      )}
      <Button
        onClick={() => invalidateData(url)}
        disabled={isLoading}
        className=""
      >
        {debouncedLoading && <span>Getting links</span>}
        {!debouncedLoading && <span>Get Links</span>}
      </Button>
      {isValidUrl(url) && (
        <JSONPretty id="cheerio-response" data={error || data} />
      )}
    </div>
  );
};
