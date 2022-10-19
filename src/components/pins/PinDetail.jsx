import React,{useEffect,memo} from "react";
import {
  Box,
  Container,
  Stack,
  Text,
  Flex,
  Heading,
  SimpleGrid,
  StackDivider,Divider,
  useColorModeValue,
  List,
  ListItem,Icon,Badge,Skeleton
} from "@chakra-ui/react";
import {StarIcon} from "@chakra-ui/icons";
import {useNavigate,Navigate } from "react-router-dom";
import { usePins } from "../../contexts/PinsProvider";
import { useTranslation } from "react-i18next";
import CommentsList from "../comments/CommentsList";
import { useSession } from "../../contexts/AuthProvider";


const PinDetail = memo(({id})=> {
  PinDetail.displayName = "PinDetail";
  const { setPinToUpdate,currentPin,error,loading} = usePins();
  const { isAuthed } = useSession();
  const { t } = useTranslation("pins",{ keyPrefix: "view"});

  const navigate = useNavigate();

  useEffect(() => {
    setPinToUpdate(id);
  }, [id, setPinToUpdate]);
  useEffect(() => {
    if(!isAuthed)
      navigate("/login",{replace:true});
  }, [isAuthed]);
  useEffect(() => {
    if(error)
      navigate("/notFound",{replace:true});
  }, [error]);

  if (loading) {
    return <Skeleton data-cy="loading"><h1>Loading...</h1></Skeleton>;
  }
  if (error) {
    <Navigate to="/notFound" replace={true}/>;
  }

  if (!isAuthed) {
    <Navigate to="/login" replace={true}/>;
  }

  return (
    <Container maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1, lg: 1 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}>

        <Flex>
          {/* <Image
            rounded={'md'}
            alt={'product image'}
            src={
              'https://images.unsplash.com/photo-1596516109370-29001ec8ec36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyODE1MDl8MHwxfGFsbHx8fHx8fHx8fDE2Mzg5MzY2MzE&ixlib=rb-1.2.1&q=80&w=1080'
            }
            fit={'cover'}
            align={'center'}
            w={'100%'}
            h={{ base: '100%', sm: '400px', lg: '500px' }}
          /> */}
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }} divider={
          <StackDivider
            borderColor={useColorModeValue("gray.200", "gray.600")}
          />
        }>
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}>
              {currentPin.title}  {"    "}  {currentPin.fav?<Icon color="red.600"boxSize="0.5em" as={StarIcon}/>:null}
            </Heading>

          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.200", "gray.600")}
              />
            }>
            <Stack spacing={{ base: 4, sm: 6 }}>
              <Text
                color={useColorModeValue("gray.500", "gray.400")}
                fontSize={"2xl"}
                fontWeight={"300"}>
                {currentPin.description}
              </Text>
            </Stack>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}>
                {t("input.user.title")}
              </Text>

              <List spacing={2}>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    {t("input.user.name")}:
                  </Text>{" "}
                  {currentPin.user.name}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    {t("input.user.email")}:
                  </Text>{" "}
                  {currentPin.user.email}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Created on:
                  </Text>{" "}
                  <Badge  size='lg' variant='subtle' colorScheme='purple'>
                    {new Date(currentPin.date).toLocaleDateString("nl-BE", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric"
                    })}
                  </Badge>
                </ListItem>
              </List>
            </Box>
          </Stack>
        </Stack>
      </SimpleGrid>
      <Divider/>
      <Stack align="auto" justifyContent ="auto" p={2}  >
        <CommentsList />
      </Stack>
    </Container>
  );
});
export default PinDetail;
