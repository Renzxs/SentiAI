"use client";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Code } from '@chakra-ui/react';
import './markdown-styles.css';

interface MarkdownRendererProps {
  content: string;
  fontSize?: string | object;
  lineHeight?: string | object;
  textAlign?: string;
}

export default function MarkdownRenderer({ 
  content, 
  fontSize = { base: "sm", md: "md" }, 
  lineHeight = { base: "1.4", md: "1.5" },
  textAlign = "left"
}: MarkdownRendererProps) {
  return (
    <div
      className="markdown-content"
      style={{
         fontSize: typeof fontSize === 'string' ? fontSize : undefined,
         lineHeight: typeof lineHeight === 'string' ? lineHeight : undefined,
         textAlign: textAlign as any
       }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code: ({ node, inline, className, children, ...props }: any) => {
            if (inline) {
              return (
                <Code
                  fontSize="0.875em"
                  bg="gray.100"
                  _dark={{ bg: "gray.800" }}
                  px={1}
                  py={0.5}
                  borderRadius="sm"
                  {...props}
                >
                  {children}
                </Code>
              );
            }
            return (
              <div
                style={{
                  backgroundColor: '#f3f4f6',
                  padding: '0.75rem',
                  borderRadius: '0.375rem',
                  overflow: 'auto',
                  marginBottom: '0.5rem'
                }}
              >
                <Code
                  display="block"
                  whiteSpace="pre"
                  bg="transparent"
                  p={0}
                  {...props}
                >
                  {children}
                </Code>
              </div>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}