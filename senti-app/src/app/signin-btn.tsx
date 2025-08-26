"use client";

import { Button, Text } from "@chakra-ui/react";

import { GetGithubAuthUrlDocument } from "@/gql/graphql";
import { useLazyQuery } from "@apollo/client";
import { ReactNode } from "react";

export default function SignInBtn({ children }: { children?: ReactNode }) {
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
      borderRadius="full"
    >
      {children || "Sign in with Github"}
    </Button>
  );
}
