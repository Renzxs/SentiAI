"use client";

import { GetUserDocument, User } from "@/gql/graphql";
import { useQuery } from "@apollo/client";
import { Container, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import HeaderNav from "@/components/layouts/header-nav";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { data, loading } = useQuery(GetUserDocument);
  const user = data?.getUser;

  useEffect(() => {
    if (!user && !loading) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <Container
        w="100%"
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        px={{ base: 4, md: 8 }}
      >
        <Spinner />
      </Container>
    );
  }

  return (
    <>
      <link rel="icon" href="/senti-logo.svg" />
      <Container
        bg={{ base: "white", _dark: "black" }}
        maxW="full"
        px={{ base: 0, md: 4 }}
      >
        <HeaderNav user={user as User} />
        <Container
          visibility={user ? "visible" : "hidden"}
          maxW="full"
          px={{ base: 4, md: 8 }}
        >
          {children}
        </Container>
      </Container>
    </>
  );
}
