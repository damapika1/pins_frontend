import React,{useState,memo,useCallback} from "react";
import {
  Box,EditablePreview,Editable ,EditableTextarea,Flex,
  Badge,Textarea, HStack

} from "@chakra-ui/react";
import {useComments} from "../../contexts/CommentsProvider";
import { useSession } from "../../contexts/AuthProvider";
import EditableControls from "./EditableControls";
import {Navigate} from "react-router-dom";


const Comment=({props}) =>{
  Comment.displayName = "Comment";
  const {isAuthed } = useSession();
  const{id,comment,date,pin}={...props};
  const {createOrUpdateComment}=useComments();
  const [newComment, setComment]=useState(comment);


  const handleEdit = useCallback(async () => {
    try {
      const newDate = new Date();
      await createOrUpdateComment({id,comment:newComment,date:newDate,pinId:pin.id});

    } catch (error) {
      console.log("Error while trying to update a comment", { error });
    }
  }, [createOrUpdateComment,id,pin.id,newComment]);

  const handleChange = useCallback(async (e) => {
    let value= e.target.value;
    console.log("comment: ",value);
    setComment(value);
  }, []);

  if (!isAuthed) {
    <Navigate to="/login" replace={true}/>;
  }

  return (
    <Box  bg="gray.100" borderRadius={30}>
      <Flex p={6}>
        <Editable submitOnBlur={false} isPreviewFocusable={false} bg="gray.100"  defaultValue={newComment}>
          <EditablePreview  size="2xl" variant="outline"/>
          <Textarea  as={EditableTextarea} onChange={handleChange}/>
          <HStack>
            <Badge  size='lg' variant='solid'>

              {new Date(date).toLocaleDateString("nl-BE", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
              })}
            </Badge>

            <EditableControls id={id} handleEdit={handleEdit}/>
          </HStack>
        </Editable>
      </Flex>
    </Box>
  );
};
export default memo(Comment);
