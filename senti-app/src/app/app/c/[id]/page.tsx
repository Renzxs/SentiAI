'use client';

import ChatInputBox from "@/components/chat-input-box";
import { Box, Container, Text } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";

export default function ChatPage() {
    const { id } = useParams();

    console.log(id);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [])

    return (
        <Container w="100%" h="100vh" display="flex" justifyContent="center" alignItems="center" flexDirection="column" p={10} bg={{ base: "white", _dark: "black" }}> 
            <Box flex={1} w="100%" maxW="1000px" h="100%" borderRadius="md" p={4} overflowY="auto" pt={10}>

                <div ref={messagesEndRef} />
            </Box>
            <ChatInputBox 
                message=""
                setMessage={() => {}}
                modelsValue={["chatgpt"]}
                setModelsValue={() => {}}
                onSend={() => {}}
            />
        </Container>
    )
}