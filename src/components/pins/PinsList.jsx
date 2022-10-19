
import Pin from "./Pin";
import React, { memo, useMemo, useState } from "react";
import Search from "./Search";
import Sidebar from "./Sidebar";
import {Wrap,Flex, WrapItem ,Box,Stack ,Container} from "@chakra-ui/react";
import { useSession } from "../../contexts/AuthProvider";

const PinsList = ({pins}) => {
  const { user } = useSession();
  const [searchText, setSearchText] = useState("");
  const filterPins = useMemo(() => {
    if (searchText.length > 0) {
      return pins.sort((p1,p2) => ( (p1.fav>p2.fav? -1: 1)) | (p1.date>p2.date? -1:1)).filter((pin) => {
        return (
          pin.user.id=== user.id &&
          (pin.title.toLowerCase().includes(searchText.toLowerCase()) ||
          pin.description.toLowerCase().includes(searchText.toLowerCase()))
        );
      });
    } else {
      return pins.sort((p1,p2) => ((p1.fav>p2.fav? -1: 1)) | (p1.date>p2.date? -1:1)).filter((pin)=>{
        return (pin.user.id=== user.id);
      });
    }
  }, [pins, searchText,user]);

  return (
    <Box align ="center" >
      <Container bg="gray.100" maxW='auto'>
        <Search handleSearchText={setSearchText} /></Container>
      <Flex align ="auto" justifyContent="auto">
        <Stack align ="auto" justifyContent="auto-evenly">
          <Sidebar/>
        </Stack>
        <Flex align ="auto" justifyContent="space-evenly">
          <Wrap align ="auto" justifyContent="space-evenly" >
            {filterPins
              .map((pin) => {
                return <WrapItem key={pin.id} ><Pin key={pin.id} pin={pin} /></WrapItem>;
              })}
          </Wrap>
        </Flex>
      </Flex>
    </Box>
  );
};
export default memo(PinsList);
