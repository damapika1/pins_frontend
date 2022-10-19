
import React, { useCallback } from "react";
import { NavLink,useNavigate } from "react-router-dom";
import { useLogout, useSession } from "../../contexts/AuthProvider";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  Button,
  Flex,
  Box,
  Spacer
} from "@chakra-ui/react";

const NavItem = ({
  to, label
}) => (

  <NavLink to={to}
    _hover={{
    }}>
    {label}
  </NavLink>

);

export default function MainMenu () {
  const { isAuthed } = useSession();
  const logout = useLogout();
  const navigate = useNavigate();
  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);
  const handleSignIn = useCallback(() => {
    navigate("/login");
  }, [navigate]);
  const handleRegister = useCallback(() => {
    navigate("/register");
  }, [navigate]);
  const handleAcc = useCallback(() => {
    navigate("/account",{replace:true});
  }, [navigate]);
  return (
    <Box align={"center"} bg="#ffa4e65c" >
      <Flex align={"center"} py={{ base: 4 }}
        px={{ base: 10 }} gap={10}>
        <NavItem to="/" label="Home" />
        <NavItem to="/pins" label="Pins" />
        <Spacer />
        <Menu >
          <MenuButton as={Button} >
    Profile
          </MenuButton>
          <MenuList>
            <MenuGroup title='Profile'>
              {isAuthed
                ? (<>
                  <MenuItem onClick={handleAcc}>Account</MenuItem>
                  <MenuItem onClick={handleLogout}>Log out </MenuItem>
                </>)
                : (<>
                  <MenuItem onClick={handleSignIn}>Sign in</MenuItem>
                  <MenuItem onClick={handleRegister}>Register</MenuItem>
                </>
                )}
            </MenuGroup>
            <MenuDivider />
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
}
