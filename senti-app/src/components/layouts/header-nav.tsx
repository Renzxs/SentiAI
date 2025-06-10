'use client';
import { Avatar, Box, Button, HStack, Image, Menu, Portal, Text } from "@chakra-ui/react";
import { ColorModeButton } from "../ui/color-mode";
import SentiLogo from "../../../public/senti-logo.png";
import { User } from "@/gql/graphql";
import DrawerNav from "./drawer-nav";
import { BiLogOut, BiUser } from "react-icons/bi";
import { toaster } from "../ui/toaster";
import { useRouter } from "next/navigation";

export default function HeaderNav(props: { user: User }) {
    const { user } = props;
    const router = useRouter()

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
        <Box w="100%" p={4} position="fixed" top={0} left={0} right={0} zIndex={1000} bg={{ base: "white", _dark: "black" }}>
            <HStack justifyContent="space-around">
                <HStack>
                    <Image src={SentiLogo.src} alt="SentiAI" width={30} height={30} />
                    <Text fontWeight="bold">SentiAI</Text>
                </HStack>
            
                <HStack>
                    <DrawerNav />
                    <ColorModeButton />
                
                    <Menu.Root positioning={{ placement: "bottom-start" }}>
                        <Menu.Trigger asChild>
                            <Button variant="plain" border="none" outline="none" size="sm">
                                <Avatar.Root size="sm">
                                    <Avatar.Fallback name={user?.name} />
                                    <Avatar.Image src={user?.avatar || ''} />
                                </Avatar.Root>
                            </Button>
                        </Menu.Trigger>
                        <Portal>
                            <Menu.Positioner>
                            <Menu.Content>
                                <Menu.Item value="sign-out" color="red.500" onClick={handleSignOut}>
                                    <BiLogOut /> Sign out
                                </Menu.Item>
                            </Menu.Content>
                            </Menu.Positioner>
                        </Portal>
                    </Menu.Root>
                </HStack>
            </HStack>
        </Box>
    )
}