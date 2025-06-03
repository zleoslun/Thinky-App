// app/context/ChatContext.tsx

import React, {
    createContext,
    useState,
    ReactNode,
    useCallback,
    useEffect,
  } from 'react';
  
  // Importa la chiave da .env (il modulo @env è riconosciuto grazie a env.d.ts)
  import { OPENAI_API_KEY } from '@env';
  
  export interface ChatMessage {
    id: string;
    sender: 'user' | 'bot';
    text: string;
  }
  
  interface ChatContextType {
    messages: ChatMessage[];
    sendUserMessage: (text: string) => void;
    resetChat: () => void;
    loading: boolean;
  }
  
  export const ChatContext = createContext<ChatContextType | null>(null);
  
  interface ChatProviderProps {
    children: ReactNode;
  }
  
  export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [conversationHistory, setConversationHistory] = useState<
      { role: 'user' | 'assistant'; content: string }[]
    >([]);
    const [loading, setLoading] = useState(false);
  
    // All’avvio, mettiamo un messaggio di benvenuto
    useEffect(() => {
      const welcomeText = "Hi! I'm ThinkyBot :)\n How can I assist you?";
      const welcomeMsg: ChatMessage = {
        id: String(Date.now()),
        sender: 'bot',
        text: welcomeText,
      };
      setMessages([welcomeMsg]);
      setConversationHistory([{ role: 'assistant', content: welcomeText }]);
    }, []);
  
    const sendUserMessage = useCallback(
      async (text: string) => {
        const trimmed = text.trim();
        if (!trimmed) return;
  
        // 1) Inserisco subito in UI il messaggio dell’utente
        const userMsg: ChatMessage = {
          id: String(Date.now()),
          sender: 'user',
          text: trimmed,
        };
        setMessages((prev) => [...prev, userMsg]);
        setConversationHistory((prev) => [
          ...prev,
          { role: 'user', content: trimmed },
        ]);
        setLoading(true);
  
        try {
          const response = await fetch(
            'https://api.openai.com/v1/chat/completions',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${OPENAI_API_KEY}`,
              },
              body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [
                  {
                    role: 'system',
                    content:
                      'You are an assistant regarding mental well-being for students, helpful and concise.',
                  },
                  ...conversationHistory,
                  { role: 'user', content: trimmed },
                ],
                max_tokens: 500,
                temperature: 0.5,
              }),
            }
          );
  
          if (!response.ok) {
            const errText = await response.text();
            throw new Error(`OpenAI API error: ${errText}`);
          }
  
          const data = await response.json();
          const botReply = data.choices?.[0]?.message?.content.trim();
  
          if (botReply) {
            // 2) Inserisco la risposta del bot in un unico messaggio
            const botMsg: ChatMessage = {
              id: String(Date.now() + 1),
              sender: 'bot',
              text: botReply,
            };
            setMessages((prev) => [...prev, botMsg]);
            setConversationHistory((prev) => [
              ...prev,
              { role: 'assistant', content: botReply },
            ]);
          } else {
            throw new Error('No response from bot.');
          }
        } catch (err: any) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      },
      [conversationHistory]
    );
  
    const resetChat = useCallback(() => {
      setMessages([]);
      setConversationHistory([]);
  
      const welcomeText = 'Hi! ThinkyBot :). How can I assist you?';
      const welcomeMsg: ChatMessage = {
        id: String(Date.now()),
        sender: 'bot',
        text: welcomeText,
      };
      setMessages([welcomeMsg]);
      setConversationHistory([{ role: 'assistant', content: welcomeText }]);
    }, []);
  
    return (
      <ChatContext.Provider
        value={{ messages, sendUserMessage, resetChat, loading }}
      >
        {children}
      </ChatContext.Provider>
    );
  };
  