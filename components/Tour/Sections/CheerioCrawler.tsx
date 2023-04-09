import { WebsiteInput } from "@components/Input/WebsiteInput";
import React, { useState } from "react";
import useSWR from "swr";
import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";
import { Button } from "@components/Button";
import { isValidURL } from "util/isValidURL";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import useDebounce from "@hooks/useDebounce";
import { invalidateData } from "util/invalidateData";

type CheerioCrawlerProps = {};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const CheerioCrawler = ({}: CheerioCrawlerProps) => {
  // user inputs state
  const [url, setURL] = useState<string>("");
  const debouncedURL = useDebounce<string>(url, 500);

  // api state
  const { data, error, isLoading } = useSWR(
    () =>
      debouncedURL?.length > 0
        ? `/api/get-links-on-webpage?url=${debouncedURL}`
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
  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setURL(event.target.value);
  };

  return (
    <div className="space-y-4" ref={parent}>
      <WebsiteInput value={url} onChange={handleUrlChange} />
      <Button
        onClick={() => {
          invalidateData(`/api/get-links-on-webpage?url=${debouncedURL}`);
          setURL("");
        }}
        disabled={debouncedLoading}
        className=""
      >
        {debouncedLoading && <span>Getting links</span>}
        {!debouncedLoading && <span>Get Links</span>}
      </Button>
      <JSONPretty id="cheerio-response" data={data} />
    </div>
  );
};
