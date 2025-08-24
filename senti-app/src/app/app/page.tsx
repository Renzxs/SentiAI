"use client";

import { Box, Container, HStack, Image, Spinner } from "@chakra-ui/react";
import SentiLogo from "../../../public/senti-logo.png";
import { Text } from "@chakra-ui/react";
import { useMutation, useQuery } from "@apollo/client";
import {
  CreateMessageDocument,
  CreateSessionDocument,
  GetMessagesDocument,
  GetSessionsDocument,
  GetUserDocument,
} from "@/gql/graphql";
import ChatInputBox from "@/components/chat-input-box";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toaster } from "@/components/ui/toaster";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const messageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function AppPage() {
  const { data, loading } = useQuery(GetUserDocument);
  const user = data?.getUser;
  const router = useRouter();
  const [createSession, { loading: createSessionLoading }] = useMutation(
    CreateSessionDocument
  );
  const [createMessage, { loading: createMessageLoading }] = useMutation(
    CreateMessageDocument
  );
  const [message, setMessage] = useState<string>("");
  const [model, setModel] = useState<string[]>(["chatgpt"]);

  const handleCreateChat = () => {
    if (message.length === 0) {
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
        },
      },
      onCompleted: ({ createSession }) => {
        console.log(createSession);
        router.push(`/app/c/${createSession.id}`);
        createMessage({
          variables: {
            createMessageDto: {
              content: message,
              sessionId: createSession.id,
              model: model[0],
            },
          },
          refetchQueries: [GetMessagesDocument],
        });
      },
      onError: () => {
        toaster.error({
          title: "Failed to create chat",
          description: "Please try again",
        });
      },
      refetchQueries: [GetSessionsDocument],
    });
  };

  if (loading || createSessionLoading || createMessageLoading) {
    return (
      <Container
        w="100%"
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        px={{ base: 4, md: 8 }}
      >
        <Spinner color="green.300" />
      </Container>
    );
  }

  return (
    <Container
      w="100%"
      h="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg={{ base: "white", _dark: "black" }}
      px={{ base: 4, md: 8 }}
      py={{ base: 6, md: 8 }}
    >
      <Box
        w="100%"
        maxW={{ base: "100%", md: "600px", lg: "800px" }}
        h="100%"
        display="flex"
        flexDirection="column"
        gap={{ base: 6, md: 8 }}
        justifyContent="center"
        alignItems="center"
        px={{ base: 2, md: 4 }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
        >
          <HStack 
            px={{ base: 3, md: 4 }} 
            py={{ base: 2, md: 3 }} 
            bg="gray.800" 
            borderRadius="full" 
            gap={{ base: 2, md: 4 }}
          >
            <Text 
              fontWeight="medium" 
              color="white"
              fontSize={{ base: "sm", md: "md" }}
            >
              Grab a coffee and talk to Senti
            </Text>
          </HStack>
        </motion.div>

        <HStack gap={{ base: 3, md: 4 }} flexWrap="wrap" justifyContent="center">
          <Image 
            src={SentiLogo.src} 
            alt="SentiAI" 
            width={{ base: 40, md: 50 }} 
            height={{ base: 40, md: 50 }} 
          />
          <motion.div
            variants={messageVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
          >
            <Text 
              fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }} 
              fontWeight="medium"
              textAlign={{ base: "center", md: "left" }}
            >
              Hello, {user?.name}
            </Text>
          </motion.div>
        </HStack>

        <ChatInputBox
          message={message}
          setMessage={setMessage}
          modelsValue={model}
          setModelsValue={setModel}
          onSend={handleCreateChat}
        />

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          w="100%"
          mt={{ base: 4, md: 6 }}
        >
          <Text 
            fontSize={{ base: "xs", md: "sm" }} 
            color="gray.500"
            textAlign="center"
          >
            Developed by DevChiefs 2025
          </Text>
        </Box>
      </Box>
    </Container>
  );
}
