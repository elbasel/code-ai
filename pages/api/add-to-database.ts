// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { supabaseClient } from "@lib/supebase";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import type { NextApiRequest, NextApiResponse } from "next";

type RequestBody = {
  inputString: string;
  tableNameString: string;
};

type Response =
  | { response: PostgrestSingleResponse<null>; body: RequestBody }
  | { error: any; body: RequestBody };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const { body } = req;
  const { inputString, tableNameString } = body;

  try {
    const response = await supabaseClient
      .from(tableNameString)
      .insert({ inputString });
    res.status(200).json({ response, body });
  } catch (error: any) {
    res.status(500).json({ error, body });
  }
}
