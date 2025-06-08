/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n    mutation CreateSession($createSessionDto: CreateSessionDto!) {\n        createSession(createSessionDto: $createSessionDto) {\n            id\n            title\n            description\n            createdAt\n            updatedAt\n        }\n    }\n": typeof types.CreateSessionDocument,
    "\n    mutation CreateMessage($createMessageDto: CreateMessageDto!) {\n        createMessage(createMessageDto: $createMessageDto) {\n            id\n            content\n            model\n            role\n            isLiked\n            createdAt\n            updatedAt\n        }\n    }\n": typeof types.CreateMessageDocument,
    "\n    query GetUser {\n        getUser {\n            id\n            name\n            email\n            phone\n            avatar\n            createdAt\n            updatedAt\n        }\n    }\n": typeof types.GetUserDocument,
    "\n    query GetGithubAuthUrl {\n        getGithubAuthUrl\n    }\n": typeof types.GetGithubAuthUrlDocument,
    "\n    query GetSessions {\n        sessions {\n            id\n            title\n            description\n            createdAt\n            updatedAt\n        }\n    }\n": typeof types.GetSessionsDocument,
    "\n    query GetSession($id: String!) {\n        session(id: $id) {\n            id\n            title\n            description\n            createdAt\n            updatedAt\n        }\n    }\n": typeof types.GetSessionDocument,
    "\n    query GetMessages($sessionId: String!) {\n        getMessages(sessionId: $sessionId) {\n            id\n            content\n            model\n            role\n            isLiked\n            createdAt\n            updatedAt\n        }\n    }\n": typeof types.GetMessagesDocument,
};
const documents: Documents = {
    "\n    mutation CreateSession($createSessionDto: CreateSessionDto!) {\n        createSession(createSessionDto: $createSessionDto) {\n            id\n            title\n            description\n            createdAt\n            updatedAt\n        }\n    }\n": types.CreateSessionDocument,
    "\n    mutation CreateMessage($createMessageDto: CreateMessageDto!) {\n        createMessage(createMessageDto: $createMessageDto) {\n            id\n            content\n            model\n            role\n            isLiked\n            createdAt\n            updatedAt\n        }\n    }\n": types.CreateMessageDocument,
    "\n    query GetUser {\n        getUser {\n            id\n            name\n            email\n            phone\n            avatar\n            createdAt\n            updatedAt\n        }\n    }\n": types.GetUserDocument,
    "\n    query GetGithubAuthUrl {\n        getGithubAuthUrl\n    }\n": types.GetGithubAuthUrlDocument,
    "\n    query GetSessions {\n        sessions {\n            id\n            title\n            description\n            createdAt\n            updatedAt\n        }\n    }\n": types.GetSessionsDocument,
    "\n    query GetSession($id: String!) {\n        session(id: $id) {\n            id\n            title\n            description\n            createdAt\n            updatedAt\n        }\n    }\n": types.GetSessionDocument,
    "\n    query GetMessages($sessionId: String!) {\n        getMessages(sessionId: $sessionId) {\n            id\n            content\n            model\n            role\n            isLiked\n            createdAt\n            updatedAt\n        }\n    }\n": types.GetMessagesDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CreateSession($createSessionDto: CreateSessionDto!) {\n        createSession(createSessionDto: $createSessionDto) {\n            id\n            title\n            description\n            createdAt\n            updatedAt\n        }\n    }\n"): (typeof documents)["\n    mutation CreateSession($createSessionDto: CreateSessionDto!) {\n        createSession(createSessionDto: $createSessionDto) {\n            id\n            title\n            description\n            createdAt\n            updatedAt\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CreateMessage($createMessageDto: CreateMessageDto!) {\n        createMessage(createMessageDto: $createMessageDto) {\n            id\n            content\n            model\n            role\n            isLiked\n            createdAt\n            updatedAt\n        }\n    }\n"): (typeof documents)["\n    mutation CreateMessage($createMessageDto: CreateMessageDto!) {\n        createMessage(createMessageDto: $createMessageDto) {\n            id\n            content\n            model\n            role\n            isLiked\n            createdAt\n            updatedAt\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetUser {\n        getUser {\n            id\n            name\n            email\n            phone\n            avatar\n            createdAt\n            updatedAt\n        }\n    }\n"): (typeof documents)["\n    query GetUser {\n        getUser {\n            id\n            name\n            email\n            phone\n            avatar\n            createdAt\n            updatedAt\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetGithubAuthUrl {\n        getGithubAuthUrl\n    }\n"): (typeof documents)["\n    query GetGithubAuthUrl {\n        getGithubAuthUrl\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetSessions {\n        sessions {\n            id\n            title\n            description\n            createdAt\n            updatedAt\n        }\n    }\n"): (typeof documents)["\n    query GetSessions {\n        sessions {\n            id\n            title\n            description\n            createdAt\n            updatedAt\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetSession($id: String!) {\n        session(id: $id) {\n            id\n            title\n            description\n            createdAt\n            updatedAt\n        }\n    }\n"): (typeof documents)["\n    query GetSession($id: String!) {\n        session(id: $id) {\n            id\n            title\n            description\n            createdAt\n            updatedAt\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetMessages($sessionId: String!) {\n        getMessages(sessionId: $sessionId) {\n            id\n            content\n            model\n            role\n            isLiked\n            createdAt\n            updatedAt\n        }\n    }\n"): (typeof documents)["\n    query GetMessages($sessionId: String!) {\n        getMessages(sessionId: $sessionId) {\n            id\n            content\n            model\n            role\n            isLiked\n            createdAt\n            updatedAt\n        }\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;