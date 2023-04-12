import { PostgrestSingleResponse } from "@supabase/supabase-js";

export type ServerSuccess = {
  success: true;
  error: null;
  rawServerResponse: PostgrestSingleResponse<null>;
};
