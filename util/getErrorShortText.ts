import { PostgrestSingleResponse } from "@supabase/supabase-js";

type ErrorCodeShortText = {
  [key: string]: string;
};

const errorCodeShortText: ErrorCodeShortText = {
  "404": "Probably trying to insert into a non-existent table!",
};

export const getErrorShortText = (
  response: PostgrestSingleResponse<any>
): string => {
  if (!response.status)
    return "No response.status returned by the server, check raw response!";

  return (
    errorCodeShortText[response.status] ||
    "No short text implemented yet, please check raw response or util/getErrorShortText.ts"
  );
};
