"use client";

import ChatInputBox from "@/components/chat-input-box";
import TextToSpeech from "@/components/text-to-speech";
import { CreateMessageDocument, GetMessagesDocument } from "@/gql/graphql";
import {
  Box,
  Card,
  Container,
  HStack,
  Image,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { toaster } from "@/components/ui/toaster";
import SentiLogo from "../../../../../public/senti-logo.svg";
import moment from "moment";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatPage() {
  const { id } = useParams();
  const { data, loading, refetch } = useQuery(GetMessagesDocument, {
    variables: {
      sessionId: id as string,
    },
  });
  const messages = data?.getMessages;
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [message, setMessage] = useState<string>("");
  const [model, setModel] = useState<string[]>(["chatgpt"]);
  const [sendMessage, { loading: sendMessageLoading }] = useMutation(
    CreateMessageDocument
  );

  const handleSendMessage = () => {
    if (message.trim() === "" || model[0] === "") return;

    sendMessage({
      variables: {
        createMessageDto: {
          content: message,
          model: model[0] as string,
          sessionId: id as string,
        },
      },
      onCompleted: () => {
        refetch();
        setMessage("");
      },
      onError: (error) => {
        toaster.error({
          title: "Error",
          description: error.message,
        });
      },
    });
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, sendMessageLoading]);

  if (loading) {
    return (
      <Container
        w="100%"
        h="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        px={{ base: 4, md: 8 }}
      >
        <Spinner />
      </Container>
    );
  }

  const displayedMessages = sendMessageLoading
    ? [
        ...(messages ?? []),
        {
          id: "sending",
          role: "USER",
          content: message,
          createdAt: new Date().toISOString(),
        },
      ]
    : messages ?? [];

  return (
    <Container
      w="100%"
      h="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      p={{ base: 4, md: 6, lg: 10 }}
      bg={{ base: "white", _dark: "black" }}
      maxW="full"
    >
      <Box
        flex={1}
        w="100%"
        maxW={{ base: "100%", md: "800px", lg: "1000px" }}
        h="100%"
        borderRadius="md"
        p={{ base: 2, md: 4 }}
        overflowY="auto"
        pt={{ base: 6, md: 8, lg: 10 }}
        display="flex"
        flexDirection="column"
        gap={{ base: 3, md: 4, lg: 5 }}
      >
        <AnimatePresence initial={false}>
          {displayedMessages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Box display="flex" flexDirection="column" gap={1}>
                <Card.Root
                  maxW={{ base: "95%", md: "85%", lg: "90%" }}
                  p={{ base: 3, md: 4 }}
                  borderRadius="md"
                  variant={"subtle"}
                  style={{
                    backgroundColor:
                      message.role === "USER" ? "gray.900" : "transparent",
                  }}
                  w="fit-content"
                  alignSelf={
                    message.role === "USER" ? "flex-end" : "flex-start"
                  }
                  _dark={{ bg: "gray.900" }}
                >
                  <HStack
                    justify={
                      message.role === "USER" ? "flex-end" : "flex-start"
                    }
                    align="flex-start"
                    gap={{ base: 2, md: 3 }}
                  >
                    <Text
                      fontSize={{ base: "sm", md: "md" }}
                      textAlign={message.role === "USER" ? "right" : "left"}
                      lineHeight={{ base: "1.4", md: "1.5" }}
                      flex={1}
                    >
                      {message.content}
                    </Text>
                  </HStack>
                </Card.Root>
                {message.id !== "sending" && (
                  <HStack
                    justify={
                      message.role === "USER" ? "flex-end" : "flex-start"
                    }
                    align="center"
                    gap={2}
                    px={{ base: 1, md: 2 }}
                  >
                    <Text fontSize={{ base: "xs", md: "sm" }} color="gray.500">
                      {moment(message.createdAt).format("lll")}
                    </Text>
                    {message.role === "SYSTEM" && message.content && (
                      <TextToSpeech text={message.content} size="sm" />
                    )}
                  </HStack>
                )}
              </Box>
            </motion.div>
          ))}

          {sendMessageLoading && (
            <motion.div
              key="senti-thinking"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Card.Root
                maxW={{ base: "95%", md: "85%", lg: "90%" }}
                p={{ base: 3, md: 4 }}
                borderRadius="md"
                variant={"subtle"}
                w="fit-content"
                alignSelf={"flex-start"}
                _dark={{ bg: "gray.900" }}
              >
                <HStack gap={{ base: 2, md: 3 }}>
                  <Spinner size="sm" color="green.300" />
                  <Text fontSize={{ base: "sm", md: "md" }} color="gray.500">
                    Senti is thinking...
                  </Text>
                </HStack>
              </Card.Root>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {messages?.length === 0 && !sendMessageLoading && (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
            >
              <Box
                p={{ base: 4, md: 6 }}
                w="100%"
                h="100%"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                gap={{ base: 3, md: 4 }}
              >
                <Image
                  src={SentiLogo.src}
                  alt="SentiAI"
                  width={{ base: 40, md: 50 }}
                  height={{ base: 40, md: 50 }}
                />
                <Text
                  fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
                  textAlign="center"
                  px={{ base: 2, md: 4 }}
                >
                  What do you want to talk about?
                </Text>
                <Text
                  fontSize={{ base: "sm", md: "md" }}
                  textAlign="center"
                  color="gray.500"
                  px={{ base: 2, md: 4 }}
                >
                  Send a message to get started
                </Text>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </Box>

      <ChatInputBox
        message={message}
        setMessage={setMessage}
        modelsValue={model}
        setModelsValue={setModel}
        onSend={handleSendMessage}
      />
    </Container>
  );
}
