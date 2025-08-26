"use client";

import {
  Container,
  VStack,
  Text,
  Image,
  HStack,
  Box,
  Button,
} from "@chakra-ui/react";
import SignInBtn from "./signin-btn";
import SentiLogo from "../../public/senti-logo.png";
import DarkVeil from "@/components/darkveil-bg";
import { useSearchParams } from "next/navigation";
import { toaster } from "@/components/ui/toaster";
import { useEffect, Suspense } from "react";
import { TbBrandDiscord, TbBrandGithub } from "react-icons/tb";

function ErrorHandler() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    if (error) {
      toaster.error({
        title: "Authentication Error",
        description: decodeURIComponent(error),
      });
    }
  }, [error]);

  return null;
}

export default function Home() {
  return (
    <>
      <style jsx global>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes ping {
          75%,
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
      <DarkVeil />
      <Suspense fallback={null}>
        <ErrorHandler />
      </Suspense>

      {/* Floating Glassy Header Bar */}
      <Box
        position="fixed"
        top={4}
        left={{ base: 4, sm: 4, md: "50%" }}
        right={{ base: 4, sm: 4, md: "auto" }}
        transform={{ base: "none", md: "translateX(-50%)" }}
        zIndex={1000}
        bg="rgba(255, 255, 255, 0.1)"
        backdropFilter="blur(20px)"
        border="1px solid rgba(255, 255, 255, 0.2)"
        borderRadius="full"
        px={{ base: 3, sm: 4, md: 8 }}
        py={{ base: 3, md: 4 }}
        w={{ base: "auto", md: "50%" }}
        maxW={{ base: "none", md: "800px" }}
        boxShadow="0 8px 32px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)"
      >
        <HStack justify="space-between" align="center">
          <HStack gap={{ base: 1, sm: 2 }}>
            <Image
              src={SentiLogo.src}
              alt="SentiAI"
              width={{ base: 6, sm: 8 }}
              height={{ base: 6, sm: 8 }}
            />
            <Text
              fontSize={{ base: "md", sm: "lg" }}
              fontWeight="bold"
              color="white"
            >
              SentiAI
            </Text>
          </HStack>
          <SignInBtn>Get Started</SignInBtn>
        </HStack>
      </Box>

      <Container
        maxW="full"
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
        height="100vh"
        pt="100px"
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <DarkVeil
            hueShift={53}
            scanlineIntensity={0.1}
            speed={1}
            warpAmount={0.5}
          />
        </div>

        <VStack
          align="stretch"
          gap={4}
          textAlign="center"
          w={{ base: "90%", md: "70%", lg: "50%" }}
          maxW="600px"
          zIndex={1}
        >
          <VStack gap={2} mb={4}>
            <div>
              <HStack
                px={{ base: 2, md: 4 }}
                py={{ base: 1, md: 2 }}
                mb={4}
                backdropFilter="blur(20px)"
                bg="rgba(26, 32, 44, 0.85)"
                borderRadius="full"
                gap={{ base: 3, md: 4 }}
                align="center"
                justify="center"
                border="1px solid rgba(255, 255, 255, 0.1)"
                boxShadow="0 4px 20px rgba(0, 0, 0, 0.3)"
              >
                <Box
                  position="relative"
                  w={{ base: 2, md: 3 }}
                  h={{ base: 2, md: 3 }}
                >
                  <Box
                    position="absolute"
                    w="100%"
                    h="100%"
                    bg="#10B981"
                    borderRadius="full"
                    animation="pulse 2s infinite"
                  />
                  <Box
                    position="absolute"
                    w="100%"
                    h="100%"
                    bg="#10B981"
                    borderRadius="full"
                    opacity={0.6}
                    animation="ping 2s infinite"
                  />
                </Box>
                <Text
                  fontWeight="semibold"
                  color="white"
                  fontSize={{ base: "sm", md: "md" }}
                  letterSpacing="0.5px"
                >
                  Grab a coffee and talk to Senti
                </Text>
              </HStack>
            </div>
            <Text fontSize="4xl" fontWeight="bold" color="white">
              Talk to Senti, Feel a Little Lighter. Your emotional health
              companion AI agent.
            </Text>
          </VStack>

          <HStack gap={4} justifyContent="center" alignItems="center">
            <Button
              onClick={() =>
                (window.location.href = "https://discord.gg/ZXcnWz55zg")
              }
              colorScheme="teal"
              variant="outline"
              borderRadius="full"
            >
              <TbBrandDiscord />
              Join our server
            </Button>
            <SignInBtn>
              <TbBrandGithub /> Sign in with Github
            </SignInBtn>
          </HStack>
          <Text fontSize="sm" color="gray.400">
            Developed by DevChiefs 2025
          </Text>
        </VStack>
      </Container>
    </>
  );
}
