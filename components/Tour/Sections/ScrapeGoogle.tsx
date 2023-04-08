import React, { useState } from "react";
import { SearchInput } from "@components/Input/SearchInput";

type ScrapeGoogleProps = {};

export const ScrapeGoogle = ({}: ScrapeGoogleProps): React.ReactElement => {
  const [queryString, setQueryString] = useState("");

  const handleQueryStringChange = (value: string) => {
    setQueryString(value);
    // * do stuff with value
  };

  return (
    <>
      <SearchInput
        value={queryString}
        onChange={handleQueryStringChange}
        placeholder="Google search"
      />
    </>
  );
};
