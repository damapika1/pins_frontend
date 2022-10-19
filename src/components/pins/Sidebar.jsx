import React from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Link,
  Button,
  Divider,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon} from "@chakra-ui/icons";
import {
  FiMenu,
} from "react-icons/fi";
import AddPin from "./AddPin";


export default function SimpleSidebar({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("white", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <Sidebar display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {

  return (
    <Box
      bg={useColorModeValue("gray.200", "gray.900")}
      borderRight="2px"
      borderRightColor={useColorModeValue("gray.300", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-evenly">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Pins Menu
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex><Divider/>
      {
        <MenuItem key="addpin" icon={<AddIcon/>}>
        Add Pin
        </MenuItem>
      }
    </Box>
  );
};

const MenuItem = ({ icon, children, ...rest }) => {
  const addPopupControl = useDisclosure();

  return (
    <Link  style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
      {addPopupControl.isOpen && <AddPin
        action="create"
        translation="pins"
        popupControl={addPopupControl}
      />}
      <Flex
        justifyContent="space-evenly"
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          // bg: 'cyan.400',
          // color: 'white',
        }}
        {...rest}>

        {/* {icon && ( */}
        <Button
          data-cy="add_btn"
          size="lg"
          mr="4"
          fontSize="16"
          _groupHover={{
            bg: "cyan.400",
            color: "white",
          }}
          leftIcon={icon}
          onClick={addPopupControl.onOpen}
        >{children}</Button>
        {/* )} */}

      </Flex>
    </Link>
  );
};

const Sidebar = ({ onOpen, ...rest } ) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("white", "gray.700")}
      justifyContent="flex-start"
      {...rest}>
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        {/* Menu */}
      </Text>
    </Flex>
  );
};
