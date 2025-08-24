'use client';

import { IconButton } from '@chakra-ui/react';
import { useState, useCallback } from 'react';
import { LuVolume2, LuVolumeX } from 'react-icons/lu';

interface TextToSpeechProps {
  text: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'ghost' | 'outline' | 'solid';
}

export default function TextToSpeech({ text, size = 'sm', variant = 'ghost' }: TextToSpeechProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);

  // Initialize speech synthesis on component mount
  const initSpeechSynthesis = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      return window.speechSynthesis;
    }
    return null;
  }, []);

  const handleSpeak = useCallback(() => {
    const synth = speechSynthesis || initSpeechSynthesis();
    
    if (!synth) {
      console.warn('Speech synthesis not supported in this browser');
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

    utterance.onerror = () => {
      setIsPlaying(false);
      console.error('Speech synthesis error');
    };

    // Start speaking
    synth.speak(utterance);
    setSpeechSynthesis(synth);
  }, [text, isPlaying, speechSynthesis, initSpeechSynthesis]);

  // Check if speech synthesis is supported
  const isSpeechSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  if (!isSpeechSupported) {
    return null; // Don't render if not supported
  }

  return (
    <IconButton
      aria-label={isPlaying ? 'Stop reading' : 'Read message aloud'}
      size={size}
      variant={variant}
      onClick={handleSpeak}
      color={isPlaying ? 'red.500' : 'gray.500'}
      _hover={{
        color: isPlaying ? 'red.600' : 'gray.700',
        bg: isPlaying ? 'red.50' : 'gray.50',
        transform: 'scale(1.05)',
        _dark: {
          color: isPlaying ? 'red.400' : 'gray.400',
          bg: isPlaying ? 'red.900' : 'gray.800'
        }
      }}
      _active={{
        transform: 'scale(0.95)'
      }}
      transition="all 0.2s ease-in-out"
      borderRadius="md"
      minW="auto"
      h="auto"
      p={1}
    >
      {isPlaying ? <LuVolumeX /> : <LuVolume2 />}
    </IconButton>
  );
}