import { Container } from "@chakra-ui/react";

export default function ChatLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Container 
            w="100%" 
            h="100vh" 
            display="flex" 
            flexDirection="column" 
            justifyContent="center" 
            alignItems="center"
            maxW="full"
            px={{ base: 0, md: 4 }}
        >
            {children}
        </Container>
    )
}