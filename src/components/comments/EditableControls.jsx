import React,{useCallback} from "react";
import {
  useEditableControls,ButtonGroup,IconButton
} from "@chakra-ui/react";
import {CheckIcon,CloseIcon,EditIcon,DeleteIcon} from "@chakra-ui/icons";
import {useComments} from "../../contexts/CommentsProvider";
export default function EditableControls({handleEdit,id}) {
  const isCreating = id?false:true;
  const {setCommentToUpdate,deleteComment}=useComments();
  const {
    isEditing,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls();

  const handleDelete = useCallback(async () => {
    try {
      await deleteComment(id);
      setCommentToUpdate(null);
    } catch (error) {
      console.log("Error while trying to delete a comment", { error });
    }
  }, [setCommentToUpdate,deleteComment,id]);

  return isEditing ? (
    <ButtonGroup justifyContent='center' size='lg'>
      <IconButton icon={<CheckIcon />} onClick={handleEdit}/>
      <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
    </ButtonGroup>
  ) : (
    isCreating?null:(
      <ButtonGroup justifyContent='center' size='lg'>
        <IconButton  icon={<EditIcon />}  {...getEditButtonProps()} />
        <IconButton  icon={<DeleteIcon />}  onClick={handleDelete} />
      </ButtonGroup>)
  );
}
