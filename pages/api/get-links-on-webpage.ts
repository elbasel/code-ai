import type { NextApiRequest, NextApiResponse } from "next";
import { isRelativeURL } from "util/isRelativeURL";
import * as cheerio from "cheerio";
type Data = {
  links: string[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const allLinks = new Set<string>();
  const relativeLinks = new Set<string>();
  const uniqueRelativeLinks = new Set<string>();

  try {
    let url: string = req.query?.url as string;

    if (!url) {
      res.status(400).json({ error: "No URL provided" });
    }

    const urlToFetch = url.startsWith("https") ? url : `https://${url}`;
    const response = await fetch(urlToFetch);
    const html = await response.text();
    const $ = cheerio.load(html);
    $("a").each((i, el) => {
      let href = $(el).attr("href");
      // console.log("processing ", href);
      if (href) {
        allLinks.add(href);
        if (isRelativeURL(href)) relativeLinks.add(href);
      }
    });

    Array.from(relativeLinks).forEach((link) => {
      link = link.startsWith("https") ? link : link.replace("https://", "");
      link = link.startsWith("www") ? link : link.replace("www.", "");

      url = url.startsWith("https") ? url : url.replace("https://", "");
      url = url.startsWith("www") ? url : url.replace("www.", "");

      let urlParts = url.split("/");
      urlParts = urlParts.filter((part) => part !== "" && part != null);
      const urlFirstPart = urlParts[1];

      let linkParts = link.split("/");
      linkParts = linkParts.filter((part) => part !== "" && part != null);

      const linkFirstPart = linkParts[1];

      console.log("linkParts", linkParts);
      console.log("urlParts", urlParts);
      uniqueRelativeLinks.add(linkFirstPart);
    });

    res.status(200).json({
      uniqueRelativeLinks: Array.from(uniqueRelativeLinks),
      relativeLinks: Array.from(relativeLinks),
      allLinks: Array.from(allLinks),
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
