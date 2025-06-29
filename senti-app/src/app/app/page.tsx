'use client';

import { Box, Button, Container, createListCollection, HStack, Image, Portal, Select, Spinner, Textarea } from "@chakra-ui/react";
import SentiLogo from "../../../public/senti-logo.png";
import { Text } from "@chakra-ui/react";
import { useMutation, useQuery } from "@apollo/client";
import { CreateMessageDocument, CreateSessionDocument, GetMessagesDocument, GetSessionsDocument, GetUserDocument } from "@/gql/graphql";
import { BiSend } from "react-icons/bi";
import ChatInputBox from "@/components/chat-input-box";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toaster } from "@/components/ui/toaster";

export default function AppPage() {
  const { data, loading } = useQuery(GetUserDocument);
  const user = data?.getUser;
  const router = useRouter();
  const [createSession, { loading: createSessionLoading }] = useMutation(CreateSessionDocument)
  const [createMessage, { loading: createMessageLoading }] = useMutation(CreateMessageDocument)
  const [message, setMessage] = useState<string>("");
  const [model, setModel] = useState<string[]>(["chatgpt"]);

  const handleCreateChat = () => {
    if(message.length === 0) {
      toaster.error({
        title: "Please enter a message",
        description: "Please try again",
      });
      return;
    }
    createSession({
      variables: {
        createSessionDto: {
          title: message,
        }
      },
      onCompleted: ({ createSession }) => {
        router.push(`/app/c/${createSession.id}`);
        createMessage({
          variables: {
            createMessageDto: {
              content: message,
              sessionId: createSession.id,
              model: model[0],
            }
          },
          refetchQueries: [GetMessagesDocument]
        })
      },
      onError: () => {
        toaster.error({
          title: "Failed to create chat",
          description: "Please try again",
        });
      },
      refetchQueries: [GetSessionsDocument]
    })
  }

  if(loading || createSessionLoading || createMessageLoading) {
    return (
      <Container w="100%" height="100vh" display="flex" alignItems="center" justifyContent="center">
        <Spinner color="green.300" />
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
          message={message}
          setMessage={setMessage}
          modelsValue={model}
          setModelsValue={setModel}
          onSend={handleCreateChat}
        />
        <Box display="flex" justifyContent="center" alignItems="center" w="100%">
          <Text fontSize="xs" color="gray.500">Developed by DevChiefs 2025</Text>
        </Box>
      </Box>
    </Container>
  )
}
