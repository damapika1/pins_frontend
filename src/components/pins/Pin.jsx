import React, { memo,useCallback,useEffect} from "react";
import {ViewIcon, StarIcon,EditIcon,DeleteIcon } from "@chakra-ui/icons";
import { Flex, Heading,Box ,ButtonGroup,IconButton,useDisclosure,
  Badge,Divider,VStack, HStack} from "@chakra-ui/react";
import { usePins } from "../../contexts/PinsProvider";
import AlertDialogDefault from "../shared/AlertDialogDefault";
import AddPin from "./AddPin";
import { Navigate,useNavigate} from "react-router-dom";
import { useSession } from "../../contexts/AuthProvider";

const Pin = memo(({pin}) => {

  Pin.displayName = "Pin";
  const deletePopupControl = useDisclosure();
  const editPopupControl = useDisclosure();
  const {user, isAuthed } = useSession();
  const navigate = useNavigate();

  const { id,title,date,description,fav}={...pin};
  const { deletePin} = usePins();
  const {createOrUpdatePin,setPinToUpdate } = usePins();

  const handleDelete = useCallback(async () => {
    console.log(`Deleting pin with id: ${id}`);
    try {
      await deletePin(id);
    } catch (error) {
      console.log("Error while trying to delete a pin", { error });
    }
  }, [deletePin, id]);

  const handleView = useCallback(async () => {
    navigate(`/pins/${id}`);
  },[id,navigate]);

  const handleStar = useCallback(async () => {
    try {
      const date = new Date();
      await createOrUpdatePin({
        id,
        title,
        date:date,
        description,
        fav:fav?Boolean(false):Boolean(true),
        userId:user.id
      });
      navigate("/pins",{replace:true});
    } catch (error) {
      console.log("Error while trying to update an existing pin", { error });
    }
  }, [createOrUpdatePin,setPinToUpdate,id,title,description,fav,user.id]);

  useEffect(() => {
    setPinToUpdate(id);
  }, [id, setPinToUpdate]);

  if (!isAuthed) {
    return <Navigate from="/pins" to="/login" />;
  }

  return (
    <Flex p={10} w="full" alignItems="center" justifyContent="center">
      <Box p={4}
        maxW="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="md"
        position="relative">

        {deletePopupControl.isOpen &&<AlertDialogDefault
          data_no="cancel_btn"
          data_yes="submit_btn"
          action="delete"
          translation="pins"
          popupControl={deletePopupControl}
          onConfirm={handleDelete}/>}

        {editPopupControl.isOpen && <AddPin
          data_no="cancel_btn"
          data_yes="submit_btn"
          action="update"
          translation="pins"
          popupControl={editPopupControl}
          pin={pin}
        />}
        <VStack>
          <HStack spacing={6}>
            <IconButton data-cy="fav_btn" size='md' aria-label='Edit pin fav' icon={<StarIcon color={fav?"cyan.500":"cyan.100"}/>}
              onClick={handleStar}/>
            <Badge data-cy="date_span" size='lg' variant='subtle' colorScheme='purple'>
              {new Date(date).toLocaleDateString("nl-BE", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
              })}
            </Badge></HStack>
          <Divider/>
          <Heading data-cy="title_h" size="md">{title}</Heading>
          <Divider/>
          <ButtonGroup spacing={6} justifyContent='center' size='md'>
            <IconButton data-cy="view_btn" size='lg' aria-label='View pin' icon={<ViewIcon /> }
              onClick={handleView}/>

            <IconButton data-cy="edit_btn" size='lg' aria-label='Edit pin' icon={<EditIcon />} onClick={editPopupControl.onOpen}/>
            <IconButton data-cy="delete_btn" size='lg' aria-label='Delete pin' icon={<DeleteIcon />} onClick={deletePopupControl.onOpen}/>
          </ButtonGroup>
        </VStack>
      </Box>
    </Flex>
  );
});

export default Pin;
