import type { NextApiRequest, NextApiResponse } from "next";
import * as cheerio from "cheerio";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const allHrefs = new Set<string>();
  const relativeHrefs = new Set<string>();
  const relativePathNames = new Set<string>();

  try {
    const requestUrl = req.query?.url as string;

    if (!requestUrl) {
      res.status(400).json({ error: "No URL provided" });
    }

    const parsedRequestUrl = requestUrl.startsWith("https")
      ? requestUrl
      : `https://${requestUrl}`;

    const parsedRequestUrlObject = new URL(parsedRequestUrl);

    const response = await fetch(parsedRequestUrl);
    const html = await response.text();

    const $ = cheerio.load(html);

    // get the links from the page
    $("a").each((i, el) => {
      const crawledHrefString = $(el).attr("href") || "";
      const crawledUrlObject = new URL(crawledHrefString, parsedRequestUrl);
      console.log(new Date(), ": found link", crawledUrlObject.href);

      // relative links & pathnames
      if (crawledUrlObject.hostname === parsedRequestUrlObject.hostname) {
        relativeHrefs.add(crawledUrlObject.href);
        const pathName = crawledUrlObject.pathname.split("/")[1];
        if (pathName) relativePathNames.add(pathName);
      }

      allHrefs.add(crawledUrlObject.href);
    });

    res.status(200).json({
      relativePathNames: Array.from(relativePathNames),
      relativeHrefs: Array.from(relativeHrefs),
      allHrefs: Array.from(allHrefs),
    });
  } catch (error: any) {
    res.status(500).json({ error });
  }
}
