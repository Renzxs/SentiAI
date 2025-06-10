'use client';

import { Box, Button, Container, createListCollection, HStack, Image, Portal, Select, Spinner, Textarea } from "@chakra-ui/react";
import SentiLogo from "../../../public/senti-logo.png";
import { Text } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { GetUserDocument } from "@/gql/graphql";
import { BiSend } from "react-icons/bi";
import ChatInputBox from "@/components/chat-input-box";

export default function AppPage() {
  const { data, loading } = useQuery(GetUserDocument);
  const user = data?.getUser;

  if(loading) {
    return (
      <Container w="100%" height="100vh" display="flex" alignItems="center" justifyContent="center">
        <Spinner />
      </Container>
    )
  }

  return (
    <Container w="100%" h="100vh" display="flex" justifyContent="center" alignItems="center" bg={{ base: "white", _dark: "black" }}> 
      <Box w="100%" h="100%" display="flex" flexDirection="column" gap={4} justifyContent="center" alignItems="center">
        <HStack px={4} py={2} bg="gray.800" borderRadius="full" gap={4}>
            <Text fontWeight="medium" color="white">Grab a coffee and talk to Senti</Text>
        </HStack>
        <HStack gap={4}>
          <Image src={SentiLogo.src} alt="SentiAI" width={50} height={50} />
          <Text fontSize="4xl" fontWeight="medium">Hello, {user?.name}</Text>
        </HStack>
        <ChatInputBox 
          message=""
          setMessage={() => {}}
          modelsValue={["chatgpt"]}
          setModelsValue={() => {}}
          onSend={() => {}}
        />
        <Box display="flex" justifyContent="center" alignItems="center" w="100%">
          <Text fontSize="xs" color="gray.500">Developed by DevChiefs 2025</Text>
        </Box>
      </Box>
    </Container>
  )
}
