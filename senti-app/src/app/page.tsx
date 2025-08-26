"use client";

import { Container, VStack, Text, Image, HStack } from "@chakra-ui/react";
import SignInBtn from "./signin-btn";
import SentiLogo from "../../public/senti-logo.png";
import DarkVeil from "@/components/darkveil-bg";
import { useSearchParams } from "next/navigation";
import { toaster } from "@/components/ui/toaster";
import { useEffect, Suspense } from "react";

function ErrorHandler() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

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
      <Suspense fallback={null}>
        <ErrorHandler />
      </Suspense>
      <Container
        maxW="full"
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
        height="100vh"
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
        <VStack align="stretch" gap={4} textAlign="center" zIndex={1}>
        <VStack gap={2} mb={4}>
          <HStack justifyContent="center" alignItems="center" gap={2}>
            <Image src={SentiLogo.src} alt="SentiAI" width={30} height={30} />
            <Text fontSize="2xl" fontWeight="bold" color="white">
              SentiAI
            </Text>
          </HStack>
          <Text fontSize="sm" color="white">
            Talk to Senti, Feel a Little Lighter. Your emotional health
            companion AI agent.
          </Text>
        </VStack>

        <SignInBtn />
        <Text fontSize="sm" color="gray.400">
          Developed by DevChiefs 2025
        </Text>
      </VStack>
    </Container>
    </>
  );
}
