'use client';

import ChatInputBox from "@/components/chat-input-box";
import { CreateMessageDocument, GetMessagesDocument, MessageRole } from "@/gql/graphql";
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
  const [sendMessage, { loading: sendMessageLoading }] =
    useMutation(CreateMessageDocument);

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
  }, [messages]);

  if (loading) {
    return (
      <Container
        w="100%"
        h="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Spinner />
      </Container>
    );
  }

  const displayedMessages = sendMessageLoading
    ? [...(messages ?? []), { id: "sending", role: "USER", content: message, createdAt: new Date().toISOString() }]
    : messages ?? [];

  return (
    <Container
      w="100%"
      h="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      p={10}
      bg={{ base: "white", _dark: "black" }}
    >
      <Box
        flex={1}
        w="100%"
        maxW="1000px"
        h="100%"
        borderRadius="md"
        p={4}
        overflowY="auto"
        pt={10}
        display="flex"
        flexDirection="column"
        gap={5}
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
                  maxW="90%"
                  p={2}
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
                  <Text
                    fontSize="sm"
                    textAlign={
                      message.role === "USER" ? "right" : "left"
                    }
                  >
                    {message.content}
                  </Text>
                </Card.Root>
                {message.id !== "sending" && (
                  <Text
                    fontSize="smaller"
                    color="gray.500"
                    textAlign={
                      message.role === "USER" ? "right" : "left"
                    }
                  >
                    {moment(message.createdAt).format("lll")}
                  </Text>
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
                maxW="90%"
                p={2}
                borderRadius="md"
                variant={"subtle"}
                w="fit-content"
                alignSelf={"flex-start"}
                _dark={{ bg: "gray.900" }}
              >
                <HStack gap={2}>
                  <Spinner size="sm" color="green.300" />
                  <Text fontSize="sm" color="gray.500">
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
                p={2}
                w="100%"
                h="100%"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                gap={2}
              >
                <Image
                  src={SentiLogo.src}
                  alt="SentiAI"
                  width={50}
                  height={50}
                />
                <Text fontSize="3xl" textAlign="center">
                  What do you want to talk about?
                </Text>
                <Text fontSize="md" textAlign="center" color="gray.500">
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
