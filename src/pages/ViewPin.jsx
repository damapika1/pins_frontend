import React,{useEffect} from "react";
import {Stack,Flex,IconButton,} from "@chakra-ui/react";
import {ArrowBackIcon} from "@chakra-ui/icons";
import { useParams,useNavigate} from "react-router-dom";
import PinDetail from "../components/pins/PinDetail";
import { usePins } from "../contexts/PinsProvider";

const ViewPin = ()=> {
  const { id } = useParams();
  const navigate = useNavigate();

  const { setPinToUpdate} = usePins();


  useEffect(() => {
    setPinToUpdate(id);
  }, [id, setPinToUpdate]);
  return (
    <Flex >
      <Stack p={6} >
        <IconButton size='lg' aria-label='View pin' icon={<ArrowBackIcon /> }onClick={()=>navigate(-1)}/>
      </Stack>
      <PinDetail id={id}/>
    </Flex>
  );
};
export default ViewPin;
