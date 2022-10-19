import React,{useCallback,useState} from "react";
import {
  EditablePreview,Editable ,EditableTextarea,Flex,Textarea,Box

} from "@chakra-ui/react";
import { usePins } from "../../contexts/PinsProvider";
import { useComments } from "../../contexts/CommentsProvider";
import EditableControls from "./EditableControls";

export default function AddComment() {
  AddComment.displayName = "Add Comment";

  const{currentPin}=usePins();
  const {createOrUpdateComment}=useComments();
  const [comment, setComment]=useState("Add a comment");

  const handleAdd = useCallback(async () => {
    try {
      const date = new Date();
      await createOrUpdateComment({comment,date,pinId:currentPin.id});
    } catch (error) {
      console.log("Error while trying to update a comment", { error });
    }
  }, [createOrUpdateComment,currentPin.id,comment]);

  const handleChange = useCallback(async (e) => {
    let value= e.target.value;
    setComment(value);
  }, []);

  return (
    <Box bg="gray.200" borderRadius={20}>
      <Flex p={6}>
        <Editable submitOnBlur={false} bg="gray.200" placeholder="Add a comment">
          <EditablePreview  size="2xl" variant="outline"/>
          <Textarea  as={EditableTextarea} onChange={handleChange}/>
          <EditableControls handleEdit={handleAdd}/>
        </Editable>
      </Flex>
    </Box>
  );
}
