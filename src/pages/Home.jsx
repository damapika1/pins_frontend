
import React from "react";
import { LoremIpsum } from "react-lorem-ipsum";
import {
  Box,Heading,Stack
} from "@chakra-ui/react";
const Home = () => {

  return (

    <Box p={10}>
      <Stack spacing={10}>
        <Heading as="h1">This is the home page</Heading>
        <LoremIpsum p={2}/>
      </Stack>
    </Box>


  );
};

export default Home;
