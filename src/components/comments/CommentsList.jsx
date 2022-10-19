
import React ,{useMemo} from "react";
import { useComments} from "../../contexts/CommentsProvider";
import {Skeleton,Collapse,Button,useDisclosure,Box,Stack,VStack} from "@chakra-ui/react";
import Comment from "./Comment";
import { usePins } from "../../contexts/PinsProvider";
import {ChatIcon} from "@chakra-ui/icons";
import AddComment from "./AddComment";

const CommentsList = () => {
  const { comments, loading } = useComments();
  const {currentPin} = usePins();
  const { isOpen, onToggle } = useDisclosure();

  const filterComments = useMemo(() => {
    return comments.filter((com)=>{
      return (com.pin.id===currentPin.id);
    });
  }
  , [comments,currentPin]);

  if (loading) {
    return <Skeleton><h1>Loading...</h1></Skeleton>;
  }

  return (
    <Box align ="left">
      {/* maxW="auto" */}
      {/* align ="left" justifyContent="left" */}

      <Stack p={6}>
        <Button leftIcon={<ChatIcon/>} onClick={onToggle}>Comments (
          {filterComments.length} )</Button>

      </Stack>

      <Collapse in={isOpen} animateOpacity>

        <VStack p={6} align ="auto" justifyContent="auto">
          <AddComment/>
          {/* <Heading size="md">Comments</Heading> */}

          {/* <Flex align ="auto" justifyContent="space-evenly"> */}
          {/* <Wrap align ="auto" justifyContent="space-evenly" > */}

          {filterComments
            .sort((c1,c2) => ((c1.date > c2.date)? -1: 1))
            .map((com) => {
              return <Comment key={com.id} props={com} />;
            })}
          {/* </Wrap> */}
          {/* </Flex> */}
        </VStack>
      </Collapse>
    </Box>
  );
};
export default CommentsList;
