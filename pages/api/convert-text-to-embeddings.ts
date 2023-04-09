import type { NextApiRequest, NextApiResponse } from "next";
import { CheerioWebBaseLoader } from "langchain/document_loaders";
import { OpenAIEmbeddings } from "langchain/embeddings";

type ServerResponse = {
  embeddings?: number[][];
  error?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ServerResponse>
) {
  const requestUrl = req.query?.url as string;
  try {
    if (!requestUrl) res.status(400).json({ error: "No URL provided" });

    const parsedRequestUrl = requestUrl.startsWith("https")
      ? requestUrl
      : `https://${requestUrl}`;

    const response = await convertWebsiteContentToEmbeddings(parsedRequestUrl);

    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({ error });
  }
}

const convertWebsiteContentToEmbeddings = async (href: string) => {
  const loader = new CheerioWebBaseLoader(href);

  const embeddingsInstance = new OpenAIEmbeddings();

  const docs = await loader.load();
  const embeddings = await embeddingsInstance.embedDocuments([
    docs[0].pageContent,
  ]);

  return { docs, embeddings };
};
