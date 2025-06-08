import { Container, Spinner } from "@chakra-ui/react";
import { Suspense } from "react";

function Auth() {


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
