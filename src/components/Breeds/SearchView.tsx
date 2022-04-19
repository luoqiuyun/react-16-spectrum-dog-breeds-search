import React, { useState } from "react";
import { SearchField, View, Flex, } from "@adobe/react-spectrum";

const SearchView = ({ setSearch }: SearchProps) => {
  const [keywords, setKeywords] = useState("");
  const [timeoutId, setTimeoutId] = useState();

  const onChange = (value: string) => {
    setKeywords(value);
    const search = value.trim();
    if(search.length > 0 && search.length < 3) return;
    setTimeout(() => {
      setSearch(search);
    }, 1000)
  };

  return (
    <View gridArea="header">
      <Flex gap="size-100" alignItems="center" justifyContent="center">
        <SearchField
          marginStart={"size-200"}
          marginBottom={"size-200"}
          marginTop={"size-200"}
          width={"size-3600"}
          aria-label={"Search on page"}
          placeholder={"Search on page"}
          value={keywords}
          onChange={onChange}
        />
      </Flex>
    </View>
  );
};

export default SearchView;

interface SearchProps {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}
