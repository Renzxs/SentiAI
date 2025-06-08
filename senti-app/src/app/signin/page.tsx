'use client';

import { Container, VStack, Text } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import SignInBtn from "./signin-btn";

export default function SignIn() {
  return (
    <Container maxW="md" height="100vh" display="flex" alignItems="center" justifyContent="center">
      <VStack align="stretch" gap={4} textAlign="center">
        <Heading>SentiAI</Heading>
        <Text>Sign in to your account to continue.</Text>
        <SignInBtn />
      </VStack>
    </Container>
  );
}