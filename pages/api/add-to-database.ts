// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ServerError } from "@appTypes/ServerError";
import { ServerSuccess } from "@appTypes/ServerSuccess";
import { supabaseClient } from "@lib/supebase";
import { getErrorShortText } from "@util/getErrorShortText";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ServerSuccess | ServerError>
) {
  const { body } = req;
  const { inputString, tableNameString } = body;

  const response = await supabaseClient
    .from(tableNameString)
    .insert({ inputString });

  if (response.error) {
    res.status(response.status).json({
      success: false,
      error: {
        errorCode: response.status,
        longText: `${response.status}(${response.statusText}): ${response.error?.message}`,
        shortText: getErrorShortText(response),
        rawServerResponse: response,
      },
    });
  }

  res.status(200).json({
    success: true,
    error: null,
    rawServerResponse: response,
  });
}
