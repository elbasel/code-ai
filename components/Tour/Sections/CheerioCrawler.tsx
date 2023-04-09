import { WebsiteInput } from "@components/Input/WebsiteInput";
import React, { useState } from "react";
import useSWR from "swr";
import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";
import { Button } from "@components/Button";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import useDebounce from "@hooks/useDebounce";
import toast from "react-hot-toast";

type CheerioCrawlerProps = {};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const CheerioCrawler = ({}: CheerioCrawlerProps) => {
  // user inputs state
  const [url, setURL] = useState<string>("");
  const debouncedURL = useDebounce<string>(url, 1000);

  // api state
  const { data, error, isLoading, mutate } = useSWR(
    `/api/get-links-on-webpage?url=${debouncedURL}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

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
          mutate();
          toast.success("Data refreshed");
        }}
        disabled={isLoading}
      >
        {isLoading && <span>Getting links</span>}
        {!isLoading && <span>Refresh data</span>}
      </Button>
      <JSONPretty id="cheerio-response" data={error || data} />
    </div>
  );
};
