import { gql } from "@apollo/client";

export const CREATE_SESSION = gql`
    mutation CreateSession($createSessionDto: CreateSessionDto!) {
        createSession(createSessionDto: $createSessionDto) {
            id
            title
            description
            createdAt
            updatedAt
        }
    }
`;

export const CREATE_MESSAGE = gql`
    mutation CreateMessage($createMessageDto: CreateMessageDto!) {
        createMessage(createMessageDto: $createMessageDto) {
            id
            content
            model
            role
            isLiked
            createdAt
            updatedAt
        }
    }
`;