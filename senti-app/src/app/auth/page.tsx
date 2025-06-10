'use client';

import { Container, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";

function Auth() {
    const router = useRouter();
    const route = new URLSearchParams(window.location.search);

    useEffect(() => {
        async function signinWithGitHub() {
            const token = route.get('token') as string | undefined;
            if(token) {
                localStorage.setItem('auth_token', token);
                router.push('/app');
            }
            else {
                router.push('/signin');
            }
        }

        signinWithGitHub();
    }, [route])

    return (
        <Container maxW="md" height="100vh" display="flex" alignItems="center" justifyContent="center">
            <Spinner />
        </Container>
    );
}

export default function AuthPage() {
    return (
        <Suspense>
            <Auth />
        </Suspense>
    );
}
