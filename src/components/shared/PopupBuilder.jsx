import React,{useRef} from "react";
import {useColorModeValue,ModalFooter,Box,Stack,ModalBody,ModalCloseButton,ModalHeader,
  Button,Modal,ModalOverlay,ModalContent} from "@chakra-ui/react";

export default function PopupBuilder(props) {
  const {
    popupControl, onSubmit, children, title,
    no, yes,data_no,data_yes
  } = props;
  const { isOpen, onClose } = popupControl;
  const initialRef = useRef();
  const finalRef = useRef();

  return (

    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent >
        <ModalHeader >{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Box
            rounded="lg"
            bg={useColorModeValue("white", "gray.700")}
            boxShadow="none"
            p={8}
          >
            <Stack spacing={4}>
              {children}
            </Stack>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button
            data-cy={data_yes}
            colorScheme='blue' mr={3} ml={3} onClick={() => {
              onSubmit();
            }}>
            {yes}
          </Button>
          <Button data-cy={data_no} ml={3} onClick={onClose}>{no}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
