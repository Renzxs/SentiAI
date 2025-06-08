import { gql } from "@apollo/client";

export const GET_USER = gql`
    query GetUser {
        getUser {
            id
            name
            email
            phone
            avatar
            createdAt
            updatedAt
        }
    }
`;

export const GET_GITHUB_AUTH_URL = gql`
    query GetGithubAuthUrl {
        getGithubAuthUrl
    }
`;

export const GET_SESSIONS = gql`
    query GetSessions {
        sessions {
            id
            title
            description
            createdAt
            updatedAt
        }
    }
`;

export const GET_SESSION = gql`
    query GetSession($id: String!) {
        session(id: $id) {
            id
            title
            description
            createdAt
            updatedAt
        }
    }
`;

export const GET_MESSAGES = gql`
    query GetMessages($sessionId: String!) {
        getMessages(sessionId: $sessionId) {
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
