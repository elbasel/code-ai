// TODO make an api playground component
import { WebsiteInput } from "@components/Input/WebsiteInput";
import React, { useState } from "react";
import useSWR from "swr";
import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";
import { Button } from "@components/Button";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import useDebounce from "@hooks/useDebounce";
import toast from "react-hot-toast";
import { Disclosure } from "@components/Disclosure/Disclosure";
import { DisclosurePanel } from "@components/Disclosure/DisclosurePanel";

type ConvertToEmbeddingsProps = {};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const ConvertToEmbeddings = ({}: ConvertToEmbeddingsProps) => {
  // user inputs state
  const [url, setURL] = useState<string>("");
  const debouncedURL = useDebounce<string>(url, 1000);

  // api state
  const { data, error, isLoading, mutate } = useSWR(
    `/api/convert-text-to-embeddings?url=${debouncedURL}`,
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
          mutate(); // this triggers a refetch
          toast.success("Data refreshed");
        }}
        disabled={isLoading}
      >
        {isLoading && <span>Converting</span>}
        {!isLoading && <span>Refresh data</span>}
      </Button>
      {debouncedURL && (
        <a
          target="_blank"
          href={`/api/convert-text-to-embeddings?url=${debouncedURL}`}
          className="inline-block mt-2 hover:text-blue-300"
        >
          See this response in the browser
        </a>
      )}
      <Disclosure title="Response" defaultOpen={true}>
        <DisclosurePanel>
          <JSONPretty id="cheerio-response" data={error || data} />
        </DisclosurePanel>
      </Disclosure>
    </div>
  );
};
