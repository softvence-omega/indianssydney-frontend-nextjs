declare module 'react-speech' {
  import { ReactNode } from 'react';

  export interface SpeechProps {
    text: string;
    voice?:
      | string
      | ((voices: SpeechSynthesisVoice[]) => SpeechSynthesisVoice | null);
    rate?: number;
    pitch?: number;
    volume?: number;
    lang?: string;
    play?: ReactNode;
    pause?: ReactNode;
    stop?: ReactNode;
    speaking?: ReactNode;
    displayText?: ReactNode;
  }

  const SpeechComponent: (props: SpeechProps) => JSX.Element;
  export default SpeechComponent;
}