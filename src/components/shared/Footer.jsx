import React from "react";
import {
  Box,
  Container,
  Text,
} from "@chakra-ui/react";

export default function SmallWithLogoLeft () {
  return (
    <Box
      bg
      color>
      <Container
        // as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}>
        {/* <Logo /> */}
        <Text align="center">© 2022 All rights reserved</Text>
        {/* <Stack direction={"row"} spacing={6}>
        </Stack> */}
      </Container>
    </Box>
  );
}
