import { PostgrestSingleResponse } from "@supabase/supabase-js";

export type ServerError = {
  success: false;
  error: {
    errorCode: number;
    longText: string;
    shortText: ShortText;
    rawServerResponse: PostgrestSingleResponse<any>;
  } | null;
};

type ShortText =
  | "You are trying to insert data into a table that doesn't exit Yesteryear, create the table first"
  | string;
