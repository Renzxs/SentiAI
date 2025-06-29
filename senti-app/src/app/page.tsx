import { Container, VStack, Heading, Text, Image, HStack } from "@chakra-ui/react";
import SignInBtn from "./signin-btn";
import SentiLogo from "../../public/senti-logo.png";
import Aurora from "@/components/animations/Aurora";

export default function Home() {
  return (
    <>
      <Aurora
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />
      
      <Container maxW="md" height="70vh" display="flex" alignItems="center" justifyContent="center">
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
    </>
  );
}
