export const isValidGoogleSearchResultURL = (url: string): boolean => {
  return url.startsWith("/url?q");
};
