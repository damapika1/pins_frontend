import React,{ SearchIcon } from "@chakra-ui/icons";
import { HStack, IconButton, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useCallback, useState } from "react";

const Search = (props) => {
  const { handleSearchText } = props;
  const [text, setText] = useState("");
  const handleText = useCallback((event) => {
    setText(event.target.value);
  }, []);

  const handleSearch = useCallback(() => {
    handleSearchText(text);
  }, [text,handleSearchText]);
  return (
    <HStack minWidth='max-content'>
      <InputGroup size="lg">
        <InputLeftElement width="auto">
          <IconButton size="lg"
            aria-label="Search pin"
            onClick={handleSearch}
            icon={<SearchIcon />}
          />
        </InputLeftElement>
        <Input
          minWidth='max-content'
          variant="filled"
          // width="auto"
          placeholder="Filter by pin name or description..."
          onChange={handleText}
        />
      </InputGroup>
    </HStack>

  );
};
export default Search;
