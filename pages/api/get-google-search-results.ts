import type { NextApiRequest, NextApiResponse } from "next";
import { isValidGoogleSearchResultURL } from "util/isValidGoogleSearchResultURL";
import * as cheerio from "cheerio";

type ServerResponse = {
  allLinks: string[];
  validLinks: string[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any | { error: string }>
) {
  const allLinks = new Set<string>();
  const validLinks = new Set<string>();

  const response = await fetch(
    `https://www.google.com/search?q=${req.query.queryString}`
  );
  const html = await response.text();
  const $ = cheerio.load(html);

  $("a").each((i, el) => {
    let href = $(el).attr("href");
    if (href) {
      allLinks.add(href);

      if (isValidGoogleSearchResultURL(href)) {
        validLinks.add(href.replace("/url?q=", ""));
      }
    }
  });

  res.status(200).json({
    validLinks: Array.from(validLinks),
    allLinks: Array.from(allLinks),
  });
}
