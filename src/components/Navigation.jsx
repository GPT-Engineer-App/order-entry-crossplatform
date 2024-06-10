import React from "react";
import { HStack, Link } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <HStack spacing={4} padding={4} bg="gray.100">
      <Link as={NavLink} to="/">
        Home
      </Link>
      <Link as={NavLink} to="/about">
        About
      </Link>
      <Link as={NavLink} to="/sales">
        Sales Dashboard
      </Link>
      <Link as={NavLink} to="/admin">
        Admin Dashboard
      </Link>
    </HStack>
  );
};

export default Navigation;
