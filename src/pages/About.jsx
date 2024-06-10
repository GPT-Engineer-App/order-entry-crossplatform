import React from "react";
import { Container, Text, VStack } from "@chakra-ui/react";

const About = () => {
  return (
    <Container centerContent maxW={["container.sm", "container.md"]} height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize={["xl", "2xl"]}>About Us</Text>
        <Text>This is the About page of the Order Entry Application.</Text>
      </VStack>
    </Container>
  );
};

export default About;
