"use client";

import { Button, Text } from "@chakra-ui/react";
import { TbBrandGithub } from "react-icons/tb";

import { GetGithubAuthUrlDocument } from "@/gql/graphql";
import { useLazyQuery } from "@apollo/client";

export default function SignInBtn() {
  const [getGithubAuthUrl, { loading, error }] = useLazyQuery(
    GetGithubAuthUrlDocument
  );

  const handleSignIn = async () => {
    const { data } = await getGithubAuthUrl();
    window.location.href = data?.getGithubAuthUrl || "";
  };

  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <Button
      colorPalette="teal"
      variant="solid"
      onClick={handleSignIn}
      loading={loading}
    >
      <TbBrandGithub /> Sign in with Github
    </Button>
  );
}
