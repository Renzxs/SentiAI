'use client'

import { Drawer, Button, Portal, Box, Text, VStack, Image, HStack, Skeleton, Alert } from "@chakra-ui/react";
import { BiLogOut, BiTrash } from "react-icons/bi";
import { RiMenuLine } from "react-icons/ri";
import SentiLogo from "../../../public/senti-logo.svg";
import CreateChatModal from "../modals/create-chat.modal";
import { DeleteSessionDocument, GetSessionsDocument } from "@/gql/graphql";
import { useMutation, useQuery } from "@apollo/client";
import { toaster } from "../ui/toaster";
import { usePathname, useRouter } from "next/navigation";

export default function DrawerNav() {
    const { data, loading } = useQuery(GetSessionsDocument);
    const [deleteSession, { loading: deleteSessionLoading }] = useMutation(DeleteSessionDocument);
    const router = useRouter()
    const pathname = usePathname()
    const currentSessionId = pathname.split('/').pop()

    if (loading) {
        return (
            <Skeleton w="100%" h="100%" />
        )
    }

    const handleDeleteSession = (id: string) => {
        toaster.info({
            title: "Are you sure you want to delete this session?",
            description: "This action cannot be undone",
            action: {
                label: "Delete",
                onClick: () => {
                    deleteSession({ 
                        variables: { id }, 
                        onCompleted: () => {
                            toaster.success({
                                title: "Session deleted successfully",
                                description: "The session has been deleted",
                            });
                        },
                        onError: () => {
                            toaster.error({
                                title: "Failed to delete session",
                                description: "Please try again",
                            });
                        },
                        refetchQueries: [GetSessionsDocument]
                    });
                }
            }
        });
    }

    const handleSignOut = () => {
        toaster.info({
            title: "Are you sure you want to sign out?",
            description: "This action cannot be undone",
            closable: true,
            action: {
                label: "Sign out",
                onClick: () => {
                    localStorage.clear();
                    router.push('/');
                }
            }
        })
    }

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
                            <Drawer.Title display="flex" alignItems="center" gap={2} onClick={() => router.push('/app')}>
                                <Image src={SentiLogo.src} alt="SentiAI" width={30} height={30} />
                                <Text fontWeight="bold">SentiAI</Text>
                            </Drawer.Title>

                            <HStack>
                                <CreateChatModal />
                            </HStack>
                        </Drawer.Header>
                        <Box w="100%" pl={6} overflowY="auto">
                            <Text fontSize="sm" fontWeight="bold" mb={2} color="gray.400">Recent Chats</Text>
                        </Box>

                        <Drawer.Body>
                            <VStack w="100%" h="100%" overflowY="auto">
                                {data?.sessions.map((session) => (
                                    <HStack 
                                        onClick={() => router.push(`/app/c/${session.id}`)} 
                                        w="100%" 
                                        justifyContent="space-between" 
                                        key={session.id} 
                                        bg={currentSessionId === session.id ? "teal.100" : "transparent"} 
                                        _dark={{ bg: currentSessionId === session.id ? "teal.900" : "transparent" }} 
                                        px={2} 
                                        borderRadius="md"
                                        cursor="pointer"
                                        transition="all 0.2s ease-in-out"
                                    >
                                        <Text fontSize="sm" color="gray.500" flex={1} overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">{session.title}</Text>
                                        <HStack flex={1} justifyContent="flex-end">
                                            <Button variant={currentSessionId === session.id ? "plain" : "outline"} size="sm" onClick={() => handleDeleteSession(session.id)} loading={deleteSessionLoading} colorPalette="teal">
                                                <BiTrash />
                                            </Button>
                                        </HStack>
                                    </HStack>                                    
                                ))}

                            </VStack>
                        </Drawer.Body>
                        <Drawer.Footer>
                            <VStack w="100%">
                                <Button colorPalette="teal" variant="solid" w="100%" onClick={handleSignOut}>
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