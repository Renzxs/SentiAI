import { Button, CloseButton, Dialog, Input, Portal, Text, VStack } from "@chakra-ui/react"
import { BiPlus } from "react-icons/bi"
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CreateSessionDocument, GetSessionsDocument } from "@/gql/graphql";
import { toaster } from "../ui/toaster";

export default function CreateChatModal() {
  const [topic, setTopic] = useState<string>("");
  const [createSession, { loading }] = useMutation(CreateSessionDocument)
  
  const handleCreateChat = () => {
    createSession({
      variables: {
        createSessionDto: {
          title: topic,
        }
      },
      onCompleted: () => {
        toaster.success({
          title: "Chat created successfully",
          description: "You can now start chatting with Senti",
        });
      },
      onError: () => {
        toaster.error({
          title: "Failed to create chat",
          description: "Please try again",
        });
      },
      refetchQueries: [GetSessionsDocument]
    })
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm">
          <BiPlus /> Add chat
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <VStack w="100%" alignItems="flex-start">
                <Dialog.Title>Create a new chat</Dialog.Title>
                <Text fontSize="sm" color="gray.500">What do you want to talk about?</Text>
              </VStack>
            </Dialog.Header>
            <Dialog.Body>
              <Input placeholder="Enter a topic" size="sm" value={topic} onChange={(e) => setTopic(e.target.value)} />
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
                <Button colorPalette="teal" variant="solid" disabled={topic.length === 0} onClick={handleCreateChat} loading={loading}>Create chat</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
