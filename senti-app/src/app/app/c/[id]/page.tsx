'use client';

import ChatInputBox from "@/components/chat-input-box";
import { CreateMessageDocument, GetMessagesDocument, MessageRole } from "@/gql/graphql";
import { Box, Card, Container, HStack, Image, Spinner, Text } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { toaster } from "@/components/ui/toaster";
import SentiLogo from "../../../../../public/senti-logo.svg";
import moment from "moment";

export default function ChatPage() {
    const { id } = useParams();
    const { data, loading, refetch } = useQuery(GetMessagesDocument, {
        variables: {
            sessionId: id as string
        }
    })
    const messages = data?.getMessages;
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const [message, setMessage] = useState<string>("");
    const [model, setModel] = useState<string[]>(["chatgpt"]);
    const [sendMessage, { loading: sendMessageLoading }] = useMutation(CreateMessageDocument);

    const handleSendMessage = () => {
        if(message.trim() === "" || model[0] === "") return;

        sendMessage({
            variables: {
                createMessageDto: {
                    content: message,
                    model: model[0] as string,
                    sessionId: id as string
                }
            },
            onCompleted: () => {
                refetch();
                setMessage("");
            },
            onError: (error) => {
                toaster.error({
                    title: "Error",
                    description: error.message
                })
            }
        })
    }

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages])

    if(loading) {
        return (
            <Container w="100%" h="100vh" display="flex" justifyContent="center" alignItems="center">
                <Spinner />
            </Container>
        )
    }

    return (
        <Container w="100%" h="100vh" display="flex" justifyContent="center" alignItems="center" flexDirection="column" p={10} bg={{ base: "white", _dark: "black" }}> 
            <Box flex={1} w="100%" maxW="1000px" h="100%" borderRadius="md" p={4} overflowY="auto" pt={10} display="flex" flexDirection="column" gap={5}>
                {
                    sendMessageLoading ? (
                        <>
                            {messages?.map((message) => (
                                <Card.Root key={message.id} maxW="90%" p={2} borderRadius="md" variant={"subtle"} w="fit-content" alignSelf={message.role === "USER" as MessageRole ? "flex-end" : "flex-start"} _dark={{ bg: "gray.900" }}>
                                    <Text fontSize="sm" textAlign={"left"}>
                                        {message.content}
                                    </Text>
                                </Card.Root>     
                            ))}

                            <Card.Root maxW="90%" p={2} borderRadius="md" variant={"subtle"} w="fit-content" alignSelf={"flex-end"} _dark={{ bg: "gray.900" }}>
                                <Text fontSize="sm" textAlign={"right"}>{message}</Text>
                            </Card.Root>    

                            <Card.Root maxW="90%" p={2} borderRadius="md" variant={"subtle"} w="fit-content" alignSelf={"flex-start"} _dark={{ bg: "gray.900" }}>
                                <HStack gap={2}>
                                    <Spinner size="sm" color="green.300" />
                                    <Text fontSize="sm" color="gray.500">Senti is thinking...</Text>
                                </HStack>
                            </Card.Root>    
                        </>
                    ) : (
                        messages?.map((message) => (
                            <Box key={message.id} display="flex" flexDirection="column" gap={1}>
                                <Card.Root maxW="90%" p={2} borderRadius="md" variant={"subtle"} style={{ backgroundColor: message.role === "USER" as MessageRole ? "gray.900" : "transparent" }} w="fit-content" alignSelf={message.role === "USER" as MessageRole ? "flex-end" : "flex-start"} _dark={{ bg: "gray.900" }}>
                                    <Text fontSize="sm" textAlign={message.role === "USER" as MessageRole ? "right" : "left"}>{message.content}</Text>
                                </Card.Root>           
                                <Text fontSize="smaller" color="gray.500" textAlign={message.role === "USER" as MessageRole ? "right" : "left"}>{moment(message.createdAt).format("lll")}</Text>
                            </Box>
                        ))
                    )
                }

                {(messages?.length === 0 && !sendMessageLoading) && (
                    <Box p={2} w="100%" h="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap={2}>
                        <Image src={SentiLogo.src} alt="SentiAI" width={50} height={50} />
                        <Text fontSize="3xl" textAlign="center">What do you want to talk about?</Text>
                        <Text fontSize="md" textAlign="center" color="gray.500">Send a message to get started</Text>
                    </Box>
                )}
                
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
    )
}