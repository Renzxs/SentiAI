"use client";

import { IconButton } from "@chakra-ui/react";
import { useState, useCallback, useEffect } from "react";
import { BiVolumeFull, BiVolumeMute } from "react-icons/bi";

interface TextToSpeechProps {
  text: string;
  size?: "sm" | "md" | "lg";
}

export default function TextToSpeech({ text, size = "sm" }: TextToSpeechProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] =
    useState<SpeechSynthesis | null>(null);
  const [isSpeechSupported, setIsSpeechSupported] = useState(false);

  // Initialize speech synthesis on component mount
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setSpeechSynthesis(window.speechSynthesis);
      setIsSpeechSupported(true);
    }
  }, []);

  const handleSpeak = useCallback(() => {
    const synth = speechSynthesis;

    if (!synth) {
      console.warn("Speech synthesis not supported in this browser");
      return;
    }

    // Stop any ongoing speech
    if (isPlaying) {
      synth.cancel();
      setIsPlaying(false);
      return;
    }

    // Create new utterance
    const utterance = new SpeechSynthesisUtterance(text);

    // Configure speech settings
    utterance.rate = 0.9; // Slightly slower for better comprehension
    utterance.pitch = 1;
    utterance.volume = 1;

    // Set up event listeners
    utterance.onstart = () => {
      setIsPlaying(true);
    };

    utterance.onend = () => {
      setIsPlaying(false);
    };

    utterance.onerror = (event) => {
      setIsPlaying(false);
      // Only show alert for actual errors, not cancellation
      if (event.error !== "canceled" && event.error !== "interrupted") {
        console.warn("Speech synthesis error:", event.error);
      }
    };

    // Start speaking
    synth.speak(utterance);
    setSpeechSynthesis(synth);
  }, [text, isPlaying, speechSynthesis]);

  if (!isSpeechSupported) {
    return null; // Don't render if not supported
  }

  return (
    <IconButton
      aria-label={isPlaying ? "Stop reading" : "Read message aloud"}
      size={size}
      variant="ghost"
      onClick={handleSpeak}
      color={isPlaying ? "gray.100" : "teal.500"}
      bg="transparent"
      _hover={{ bg: "transparent" }}
      _active={{ bg: "transparent" }}
      _focus={{ boxShadow: "none" }}
      minW="auto"
      p={0}
    >
      {isPlaying ? <BiVolumeMute /> : <BiVolumeFull />}
    </IconButton>
  );
}
