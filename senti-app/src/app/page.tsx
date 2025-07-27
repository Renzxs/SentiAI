import { Container, VStack, Heading, Text, Image, HStack } from "@chakra-ui/react";
import SignInBtn from "./signin-btn";
import SentiLogo from "../../public/senti-logo.png";

export default function Home() {
  return (
      <Container maxW="md" height="100vh" display="flex" alignItems="center" justifyContent="center">
        <VStack align="stretch" gap={4} textAlign="center">
          <VStack gap={2} mb={4}>
            <HStack justifyContent="center" alignItems="center" gap={2}>
              <Image src={SentiLogo.src} alt="SentiAI" width={30} height={30} />
              <Text fontSize="2xl" fontWeight="bold">SentiAI</Text>
            </HStack>
            <Text fontSize="sm">Talk to Senti, Feel a Little Lighter. Your emotional health companion AI agent.</Text>
          </VStack>

          <SignInBtn />
          <Text fontSize="sm" color="gray.400">Developed by DevChiefs 2025</Text>
        </VStack>
      </Container>   
  );
}
