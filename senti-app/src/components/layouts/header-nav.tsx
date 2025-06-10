import { Avatar, Box, Button, HStack, Image, Menu, Portal, Text } from "@chakra-ui/react";
import { ColorModeButton } from "../ui/color-mode";
import SentiLogo from "../../../public/senti-logo.png";
import { User } from "@/gql/graphql";
import DrawerNav from "./drawer-nav";
import { BiLogOut, BiUser } from "react-icons/bi";

export default function HeaderNav(props: { user: User }) {
    const { user } = props;

    return (
        <Box w="100%" p={4} position="fixed" top={0} left={0} right={0} zIndex={1000}>
            <HStack justifyContent="space-between">
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
                            <Menu.Item value="my-account" color="gray.500">
                                <BiUser /> My Account
                            </Menu.Item>
                            <Menu.Item value="sign-out" color="red.500">
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