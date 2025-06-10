'use client';

import { Box, Button, Container, createListCollection, HStack, Image, Portal, Select, Spinner, Textarea } from "@chakra-ui/react";
import SentiLogo from "../../../public/senti-logo.png";
import { Text } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { GetUserDocument } from "@/gql/graphql";
import { BiSend } from "react-icons/bi";

export default function AppPage() {
  const { data, loading } = useQuery(GetUserDocument);
  const user = data?.getUser;

  const models = createListCollection({
    items: [
      { label: "ChatGPT", value: "chatgpt" },
      { label: "Gemini", value: "gemini" },
      { label: "Deepseek", value: "deepseek" },
      { label: "Grok", value: "grok" },
    ],
  })

  if(loading) {
    return (
      <Container w="100%" height="100vh" display="flex" alignItems="center" justifyContent="center">
        <Spinner />
      </Container>
    )
  }

  return (
    <Container w="100vw" h="100vh" display="flex" justifyContent="center" alignItems="center" bg={{ base: "white", _dark: "black" }}> 
      <Box w="100%" h="100%" display="flex" flexDirection="column" gap={4} justifyContent="center" alignItems="center">
        <HStack px={4} py={2} bg="gray.800" borderRadius="full" gap={4}>
            <Text fontWeight="medium" color="white">Grab a coffee and talk to Senti</Text>
        </HStack>
        <HStack gap={4}>
          <Image src={SentiLogo.src} alt="SentiAI" width={50} height={50} />
          <Text fontSize="4xl" fontWeight="medium">Hello, {user?.name}</Text>
        </HStack>
        <Box maxW="600px" w="100%" border="1px solid" borderColor="gray.400" borderRadius="md" px={2} py={2}>
          <Textarea 
            placeholder="How can I help you today?" 
            resize="none"
            rows={2}
            border="none"
            outline="none"
          />
          <HStack justifyContent="space-between">
            <Select.Root collection={models} defaultValue={["chatgpt"]} size="sm" width="200px" variant="plain">
              <Select.HiddenSelect />
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder="Select a model" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>
              <Portal>
                <Select.Positioner>
                  <Select.Content>
                    {models.items.map((framework) => (
                      <Select.Item item={framework} key={framework.value}>
                        {framework.label}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>

            <Button variant="ghost" border="none" outline="none" size="md" colorPalette="green">
              <BiSend />
            </Button>
          </HStack>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center" w="100%">
          <Text fontSize="xs" color="gray.500">Developed by DevChiefs 2025</Text>
        </Box>
      </Box>
    </Container>
  )
}
