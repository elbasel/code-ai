import { mutate } from "swr";
import { isValidURL } from "./isValidURL";

export const invalidateData = (url: string | null) => {
  mutate(url, null, false);
};
