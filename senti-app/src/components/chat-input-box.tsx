import {
  Box,
  Button,
  HStack,
  Portal,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { createListCollection } from "@chakra-ui/react";
import { BiSend, BiX } from "react-icons/bi";

export default function ChatInputBox(props: {
  message: string;
  setMessage: (message: string) => void;
  modelsValue: string[];
  setModelsValue: (models: string[]) => void;
  onSend: () => void;
}) {
  const { message, setMessage, modelsValue, setModelsValue, onSend } = props;
  const models = createListCollection({
    items: [
      { label: "ChatGPT", value: "chatgpt" },
      { label: "Llama Meta", value: "llama" },
      { label: "Deepseek", value: "deepseek" },
    ],
  });

  return (
    <Box
      maxW="600px"
      w="100%"
      border="1px solid"
      borderColor="gray.400"
      borderRadius="md"
      px={2}
      py={2}
    >
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="How can I help you today?"
        resize="none"
        rows={2}
        border="none"
        outline="none"
      />
      <HStack justifyContent="space-between">
        <Select.Root
          collection={models}
          defaultValue={["chatgpt"]}
          value={modelsValue}
          onValueChange={(value) => setModelsValue(value.value)}
          size="sm"
          width="200px"
        >
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

        <HStack gap={2}>
          {message.length > 0 && (
            <Button
              variant="ghost"
              border="none"
              outline="none"
              size="md"
              colorPalette="red"
              onClick={() => setMessage("")}
            >
              <BiX />
            </Button>
          )}
          <Button
            variant="ghost"
            border="none"
            outline="none"
            size="md"
            colorPalette="green"
            onClick={onSend}
            disabled={message.length === 0}
          >
            <BiSend />
          </Button>
        </HStack>
      </HStack>
    </Box>
  );
}
