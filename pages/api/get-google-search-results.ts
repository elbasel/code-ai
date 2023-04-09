import type { NextApiRequest, NextApiResponse } from "next";
import { isValidGoogleSearchResultURL } from "util/isValidGoogleSearchResultURL";
import * as cheerio from "cheerio";

type googleSearchResult = {
  title: string;
  href: string;
};

type ServerResponse = {
  allHrefs: string[];
  googleSearchResults: googleSearchResult[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ServerResponse>
) {
  const allHrefs = new Set<string>();
  const googleSearchResults: googleSearchResult[] = [];

  const googleSearchHref = `https://www.google.com/search?q=${req.query.queryString}&hl=en`;

  const response = await fetch(googleSearchHref);

  const html = await response.text();
  const $ = cheerio.load(html);

  $("a").each((i, el) => {
    let href = $(el).attr("href");
    if (href) {
      allHrefs.add(href);

      if (isValidGoogleSearchResultURL(href)) {
        const title = $(el).text() || "<NO TITLE>";
        googleSearchResults.push({ title, href: href.replace("/url?q=", "") });
      }
    }
  });

  res.status(200).json({
    googleSearchResults,
    allHrefs: Array.from(allHrefs),
  });
}
