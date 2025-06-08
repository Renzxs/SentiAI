'use client';

import { Button, Spinner, Text } from "@chakra-ui/react";
import { TbBrandGithub } from "react-icons/tb";

import { GET_GITHUB_AUTH_URL } from "../queries";
import { useLazyQuery } from "@apollo/client";

export default function SignInBtn() {
    const [getGithubAuthUrl, { loading, error }] = useLazyQuery(GET_GITHUB_AUTH_URL);

    const handleSignIn = async () => {
        const { data } = await getGithubAuthUrl();
        window.location.href = data.getGithubAuthUrl;
    };

    if (loading) return <Spinner />;
    if (error) return <Text>Error: {error.message}</Text>;

    return (
        <Button colorPalette="teal" variant="solid" onClick={handleSignIn}>
          <TbBrandGithub /> Sign in with Github
        </Button>
    );
}