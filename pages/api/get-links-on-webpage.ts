import { CheerioCrawler, FinalStatistics } from "crawlee";
import type { NextApiRequest, NextApiResponse } from "next";

const links = new Set<string>();

type Data = {
  links: string[];
  response: FinalStatistics;
};

const crawler = new CheerioCrawler({
  async requestHandler({ request, enqueueLinks, log }) {
    log.info(request.url);
    links.add(request.url);
    // Add all links from page to RequestQueue
    await enqueueLinks();
  },
  // Limit the number of requests per crawl
  // maxRequestsPerCrawl: 10,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | { error: string }>
) {
  if (!req.query.url) {
    res.status(400).json({ error: "URL is required" });
  }
  const response: FinalStatistics = await crawler.run([
    req.query.url as string,
  ]);

  res.status(200).json({
    links: Array.from(links),
    response,
  });
}

// Run the crawler with initial request
8;
