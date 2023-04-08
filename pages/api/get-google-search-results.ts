import { CheerioCrawler, type FinalStatistics } from "crawlee";
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
    async requestHandler({ request, enqueueLinks, log, $ }) {
      log.info("" + request.url);
      $("a").each((i, el) => {
        const href = $(el).attr("href");
        if (href) {
          links.add(href);
        }
      });

      //   links.add(request.url);
      //   await enqueueLinks();
    },
  });
  const links = new Set<string>();
  if (!req.query.queryString) {
    res.status(400).json({ error: "queryString is required" });
  }

  try {
    const response: FinalStatistics = await crawler.run([
      req.query.queryString as string,
    ]);
    res.status(200).json({
      links: Array.from(links),
      response,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
