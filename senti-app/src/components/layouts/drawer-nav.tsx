'use client'

import { Drawer, Button, Portal, Box, Text, VStack, Image, HStack } from "@chakra-ui/react";
import { BiEdit, BiLogOut, BiPlus, BiTrash } from "react-icons/bi";
import { RiMenuLine } from "react-icons/ri";
import SentiLogo from "../../../public/senti-logo.png";

export default function DrawerNav() {
  return (
    <Drawer.Root placement="start">
        <Drawer.Trigger asChild>
            <Button variant="ghost" size="sm">
                <RiMenuLine />
            </Button>
        </Drawer.Trigger>
        <Portal>
            <Drawer.Backdrop />
            <Drawer.Positioner>
                    <Drawer.Content>
                    <Drawer.Header>
                        <Drawer.Title display="flex" alignItems="center" gap={2}>
                            <Image src={SentiLogo.src} alt="SentiAI" width={30} height={30} />
                            <Text fontWeight="bold">SentiAI</Text>
                        </Drawer.Title>

                        <HStack>
                            <Button variant="outline" size="sm">
                                <BiPlus /> Add chat
                            </Button>
                        </HStack>
                    </Drawer.Header>
                    <Box w="100%" pl={6} overflowY="auto">
                        <Text fontSize="sm" fontWeight="bold" mb={2} color="gray.400">Recent Chats</Text>
                    </Box>

                    <Drawer.Body>
                        <VStack w="100%" h="100%" overflowY="auto">
                            <HStack w="100%" justifyContent="space-between">
                                <Text fontSize="sm" color="gray.500" flex={1} overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">Example Chat asdasdasddasdasdasdsada</Text>
                                <HStack flex={1} justifyContent="flex-end">
                                    <Button variant="outline" size="sm">
                                        <BiTrash />
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        <BiEdit />
                                    </Button>
                                </HStack>
                            </HStack>

                        </VStack>
                    </Drawer.Body>
                    <Drawer.Footer>
                        <VStack w="100%">
                            <Button colorPalette="teal" variant="solid" w="100%">
                                <BiLogOut /> Sign out
                            </Button>
                            <Box display="flex" justifyContent="center" alignItems="center" w="100%">
                                <Text fontSize="xs" color="gray.500">Developed by DevChiefs 2025</Text>
                            </Box>
                        </VStack>
                    </Drawer.Footer>
                </Drawer.Content>
            </Drawer.Positioner>
        </Portal>
    </Drawer.Root>
  )
}