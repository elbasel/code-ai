import { CheerioCrawler, FinalStatistics } from "crawlee";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  links: string[];
  response: FinalStatistics;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | { error: string }>
) {
  const crawler = new CheerioCrawler({
    async requestHandler({ request, enqueueLinks, log }) {
      log.info(request.url);
      links.add(request.url);
      await enqueueLinks();
    },
  });
  const links = new Set<string>();
  if (!req.query.url) {
    res.status(400).json({ error: "URL is required" });
  }

  try {
    const response: FinalStatistics = await crawler.run([
      req.query.url as string,
    ]);
    res.status(200).json({
      links: Array.from(links),
      response,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
