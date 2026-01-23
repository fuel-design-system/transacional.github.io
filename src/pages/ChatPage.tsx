import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import '../styles/ChatPage.scss';
import freightsData from '../data/freights.json';
import NegotiationStepsSheet from '../components/NegotiationStepsSheet';
import Toast from '../components/Toast';

interface Contact {
  id: string;
  name: string;
  isOnline: boolean;
}

interface Message {
  id: string;
  sender: 'user' | 'contact';
  senderName?: string;
  senderInitial?: string;
  senderRating?: string;
  senderVehicle?: string;
  text: string;
  timestamp: string;
  isRead?: boolean;
  type?: 'text' | 'document-request' | 'document-submitted' | 'agreement-review' | 'trip-confirmed';
}

const contacts: { [key: string]: Contact } = {
  '1': { id: '1', name: 'Carlos S.', isOnline: true },
  '2': { id: '2', name: 'Carla Moura', isOnline: false },
  '3': { id: '3', name: 'Rodrigo Santos', isOnline: false },
};

export default function ChatPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { freightId, contactId } = useParams();

  // Chave única para cada conversa
  const chatStorageKey = `chat_${freightId}_${contactId}`;

  // Limpa o chat se vier da página de detalhes do frete
  useEffect(() => {
    const state = location.state as { fromFreightDetails?: boolean };
    if (state?.fromFreightDetails) {
      // Limpa todas as mensagens e estados do chat
      sessionStorage.removeItem(chatStorageKey);
      sessionStorage.removeItem(`${chatStorageKey}_autoReplied`);
      sessionStorage.removeItem(`${chatStorageKey}_step`);
      sessionStorage.removeItem(`${chatStorageKey}_activeTab`);
      sessionStorage.removeItem(`${chatStorageKey}_currentStep`);
      sessionStorage.removeItem(`${chatStorageKey}_completedTabs`);
      sessionStorage.removeItem(`${chatStorageKey}_clickedDocButton`);

      // Limpa o state para não limpar novamente ao navegar
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, []);

  const [activeTab, setActiveTab] = useState(() => {
    const saved = sessionStorage.getItem(`${`chat_${freightId}_${contactId}`}_activeTab`);
    return saved ? JSON.parse(saved) : 1;
  });
  const [currentStep, setCurrentStep] = useState(() => {
    const saved = sessionStorage.getItem(`${`chat_${freightId}_${contactId}`}_currentStep`);
    return saved ? JSON.parse(saved) : 1;
  });
  const [message, setMessage] = useState('');
  const [completedTabs, setCompletedTabs] = useState<number[]>(() => {
    const saved = sessionStorage.getItem(`${`chat_${freightId}_${contactId}`}_completedTabs`);
    return saved ? JSON.parse(saved) : [];
  });
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [hasAutoReplied, setHasAutoReplied] = useState(() => {
    const saved = sessionStorage.getItem(`${chatStorageKey}_autoReplied`);
    return saved ? JSON.parse(saved) : false;
  });
  const [conversationStep, setConversationStep] = useState(() => {
    const saved = sessionStorage.getItem(`${chatStorageKey}_step`);
    return saved ? JSON.parse(saved) : 0;
  });
  const [isRouteCardExpanded, setIsRouteCardExpanded] = useState(false);
  const [isStepsSheetOpen, setIsStepsSheetOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [hasClickedDocumentButton, setHasClickedDocumentButton] = useState(() => {
    const saved = sessionStorage.getItem(`${chatStorageKey}_clickedDocButton`);
    return saved ? JSON.parse(saved) : false;
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasAddedDocumentMessage = useRef(false);

  // Salva estados importantes no sessionStorage
  useEffect(() => {
    sessionStorage.setItem(`${chatStorageKey}_autoReplied`, JSON.stringify(hasAutoReplied));
  }, [hasAutoReplied, chatStorageKey]);

  useEffect(() => {
    sessionStorage.setItem(`${chatStorageKey}_step`, JSON.stringify(conversationStep));
  }, [conversationStep, chatStorageKey]);

  useEffect(() => {
    sessionStorage.setItem(`${chatStorageKey}_activeTab`, JSON.stringify(activeTab));
  }, [activeTab, chatStorageKey]);

  useEffect(() => {
    sessionStorage.setItem(`${chatStorageKey}_currentStep`, JSON.stringify(currentStep));
  }, [currentStep, chatStorageKey]);

  useEffect(() => {
    sessionStorage.setItem(`${chatStorageKey}_completedTabs`, JSON.stringify(completedTabs));
  }, [completedTabs, chatStorageKey]);

  useEffect(() => {
    sessionStorage.setItem(`${chatStorageKey}_clickedDocButton`, JSON.stringify(hasClickedDocumentButton));
  }, [hasClickedDocumentButton, chatStorageKey]);

  // Busca os dados do frete
  const freight = freightsData.find(f => f.id === Number(freightId));

  const quickReplies = [
    'Onde carrega?',
    'Quando carrega?',
    'Quanto está pagando?',
    'Consegue melhorar o preço?'
  ];

  const [messages, setMessages] = useState<Message[]>(() => {
    // Tenta recuperar mensagens do sessionStorage
    const savedMessages = sessionStorage.getItem(chatStorageKey);
    if (savedMessages) {
      return JSON.parse(savedMessages);
    }

    // Se não houver mensagens salvas, cria a inicial
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const timestamp = `${hours}:${minutes}`;

    return [
      {
        id: '1',
        sender: 'contact',
        senderName: 'Rafael T (DDD 11)',
        senderInitial: 'R',
        senderRating: '4.9',
        senderVehicle: 'Bitruck | Graneleiro',
        text: 'Olá. Estou interessado no seu frete de Curitiba-PR para Porto Alegre-RS de Eletrônicos.\n\nA carga ainda está disponível?',
        timestamp,
        isRead: true,
      },
    ];
  });

  // Salva mensagens no sessionStorage sempre que mudam
  useEffect(() => {
    sessionStorage.setItem(chatStorageKey, JSON.stringify(messages));
  }, [messages, chatStorageKey]);

  // Detecta quando documentos foram enviados e adiciona mensagem
  useEffect(() => {
    const state = location.state as { documentsSubmitted?: boolean };
    if (state?.documentsSubmitted && !hasAddedDocumentMessage.current) {
      hasAddedDocumentMessage.current = true;

      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const timestamp = `${hours}:${minutes}`;

      const documentSubmittedMessage: Message = {
        id: String(Date.now()),
        sender: 'contact',
        text: '',
        timestamp,
        isRead: true,
        type: 'document-submitted',
      };

      setMessages(prev => [...prev, documentSubmittedMessage]);

      // Marca a etapa 1 como concluída e ativa a etapa 2
      setCompletedTabs(prev => prev.includes(1) ? prev : [...prev, 1]);
      setCurrentStep(2);

      // Após 3 segundos, envia a mensagem de revisão do acordo
      setTimeout(() => {
        const now2 = new Date();
        const hours2 = String(now2.getHours()).padStart(2, '0');
        const minutes2 = String(now2.getMinutes()).padStart(2, '0');
        const timestamp2 = `${hours2}:${minutes2}`;

        const agreementReviewMessage: Message = {
          id: String(Date.now()),
          sender: 'user',
          text: '',
          timestamp: timestamp2,
          isRead: true,
          type: 'agreement-review',
        };

        setMessages(prev => [...prev, agreementReviewMessage]);

        // Marca a etapa 2 como concluída e ativa a etapa 3 (Fechamento)
        setCompletedTabs(prev => prev.includes(2) ? prev : [...prev, 2]);
        setCurrentStep(3);

        // Após mais 5 segundos, envia mensagem de confirmação de viagem
        setTimeout(() => {
          const now3 = new Date();
          const hours3 = String(now3.getHours()).padStart(2, '0');
          const minutes3 = String(now3.getMinutes()).padStart(2, '0');
          const timestamp3 = `${hours3}:${minutes3}`;

          const tripConfirmedMessage: Message = {
            id: String(Date.now()),
            sender: 'user',
            text: '',
            timestamp: timestamp3,
            isRead: true,
            type: 'trip-confirmed',
          };

          setMessages(prev => [...prev, tripConfirmedMessage]);

          // Marca a etapa 3 (Fechamento) como concluída
          setCompletedTabs(prev => prev.includes(3) ? prev : [...prev, 3]);
        }, 5000);
      }, 3000);

      // Limpa o state para não adicionar a mensagem novamente
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, location.pathname, navigate]);

  // Script de conversa com etapas definidas
  const conversationFlowSteps = [
    // Step 0: Primeira mensagem automática do operador
    { step: 0, response: 'Sim, está disponível', type: 'text' },
    // Step 1: Aguardando "Onde carrega?"
    { step: 1, response: 'Carrega na Fazenda 2 irmãos', type: 'text' },
    // Step 2: Aguardando "Livre de descarga?"
    { step: 2, response: 'Isso e não precisa agendar descarga', type: 'text' },
    // Step 3: Aguardando "Ta pagando quanto?"
    {
      step: 3,
      type: 'text',
      response: () => {
        if (!freight) return 'R$ 5.500 + pedágio incluso';
        const priceFormatted = `R$ ${freight.price}`;
        const tollInfo = freight.priceType === 'Pedágio incluso' ? 'pedágio incluso' : 'pedágio a parte';
        return `${priceFormatted} + ${tollInfo}`;
      },
      afterResponse: () => {
        // Após enviar o valor, aguarda 2 segundos e envia a solicitação de documentos
        setTimeout(() => {
          const now = new Date();
          const hours = String(now.getHours()).padStart(2, '0');
          const minutes = String(now.getMinutes()).padStart(2, '0');
          const timestamp = `${hours}:${minutes}`;

          const documentMessage: Message = {
            id: String(Date.now()),
            sender: 'contact',
            senderName: contact?.name || 'Carlos S.',
            senderInitial: contact?.name?.charAt(0) || 'C',
            text: 'solicitou seus documentos.',
            timestamp,
            isRead: true,
            type: 'document-request',
          };

          setMessages(prev => [...prev, documentMessage]);

          // Marca a etapa 1 (Negociação) como concluída
          setCompletedTabs(prev => prev.includes(1) ? prev : [...prev, 1]);

          // Muda para o step de documentos (step 2)
          setCurrentStep(2);
        }, 2000);
      }
    },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simula a primeira resposta automática do operador (branco, esquerda)
  useEffect(() => {
    if (messages.length === 1 && !hasAutoReplied) {
      const timer = setTimeout(() => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const timestamp = `${hours}:${minutes}`;

        const userMessage: Message = {
          id: '2',
          sender: 'user',
          text: 'Sim, está disponível',
          timestamp,
        };

        setMessages(prev => [...prev, userMessage]);
        setHasAutoReplied(true);
        setConversationStep(0);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [messages.length, hasAutoReplied]);

  const contact = contacts[contactId || '1'];

  const handleBackClick = () => {
    // Se a negociação foi concluída, volta para a home
    if (messages.some(msg => msg.type === 'trip-confirmed')) {
      // Marca que a negociação foi concluída para mostrar o banner de taxa pendente
      sessionStorage.setItem('negotiationCompleted', 'true');
      // Armazena o ID do frete negociado
      sessionStorage.setItem('negotiatedFreightId', freightId || '');
      navigate('/');
    } else {
      navigate(`/freight/${freightId}`);
    }
  };

  const handleStepChange = (step: number) => {
    // Abre o bottom sheet ao clicar em qualquer step
    setIsStepsSheetOpen(true);
  };

  const handleCopyPix = () => {
    const pixKey = '7192d4fd-1d90-4b2c-90fa-67a4akfl';
    navigator.clipboard.writeText(pixKey);
    setShowToast(true);
  };

  const simulateUserResponse = (contactMessage: string) => {
    const lowerMessage = contactMessage.toLowerCase();
    let response = '';
    let nextStep = conversationStep;

    // Detecção de palavras-chave para pular etapas
    if (lowerMessage.includes('onde') && lowerMessage.includes('carrega')) {
      // Pergunta sobre local de carga (Step 1)
      nextStep = 1;
    } else if (lowerMessage.includes('livre') || lowerMessage.includes('descarga')) {
      // Pergunta sobre descarga (Step 2)
      nextStep = 2;
    } else if (
      lowerMessage.includes('pagando') ||
      lowerMessage.includes('valor') ||
      lowerMessage.includes('quanto') ||
      lowerMessage.includes('preço') ||
      lowerMessage.includes('r$')
    ) {
      // Pergunta sobre valor (Step 3)
      nextStep = 3;
    } else {
      // Segue o fluxo sequencial
      nextStep = conversationStep + 1;
    }

    // Busca a resposta correspondente ao step
    const stepData = conversationFlowSteps.find(s => s.step === nextStep);

    if (stepData) {
      response = typeof stepData.response === 'function'
        ? stepData.response()
        : stepData.response;
      setConversationStep(nextStep);
    } else {
      // Resposta padrão se não houver match
      response = 'Entendi. Pode me dar mais detalhes sobre isso?';
    }

    // Simula delay de digitação (1.5-3 segundos)
    const delay = Math.random() * 1500 + 1500;

    setTimeout(() => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const timestamp = `${hours}:${minutes}`;

      const userMessage: Message = {
        id: String(Date.now()),
        sender: 'user',
        text: response,
        timestamp,
      };

      setMessages(prev => [...prev, userMessage]);

      // Executa ação após a resposta, se houver
      if (stepData?.afterResponse) {
        stepData.afterResponse();
      }
    }, delay);
  };

  const handleSendMessage = () => {
    if (message.trim() === '') return;

    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const timestamp = `${hours}:${minutes}`;

    const contactMessageText = message.trim();

    const newMessage: Message = {
      id: String(Date.now()),
      sender: 'contact',
      senderName: 'Rafael T (DDD 11)',
      senderInitial: 'R',
      senderRating: '4.9',
      senderVehicle: 'Bitruck | Graneleiro',
      text: contactMessageText,
      timestamp,
      isRead: true,
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    setIsInputFocused(false);

    // Remove o foco do input
    (document.activeElement as HTMLElement)?.blur();

    // Simula resposta do usuário (branco, esquerda)
    simulateUserResponse(contactMessageText);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!contact) {
    return <div>Contato não encontrado</div>;
  }

  return (
    <div className="chat-page">
      {/* Header */}
      <div className="chat-header">
        <div className="header-bar">
          <button className="back-button" onClick={handleBackClick}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M10.9883 7.4292L7.17773 11.2407L7.15625 11.2622H19.6895V12.7378H7.15625L7.17773 12.7583L10.9883 16.5688L9.95117 17.6353L4.31543 11.9995L9.95117 6.36377L10.9883 7.4292Z" fill="#111111" stroke="#111111" strokeWidth="0.025"/>
            </svg>
          </button>

          <div className="contact-header-info">
            <div className="avatar-with-status">
              <div className="header-avatar">
                <img src="https://cdn.builder.io/api/v1/image/assets%2F7de6902bb7ea42d4be5082a42dd00e60%2Fd2326185d8c14e199fd0ea93d543d691?format=webp&width=800" alt={contact.name} />
              </div>
              {contact.isOnline && <span className="online-indicator"></span>}
            </div>
            <div className="contact-text-info">
              <div className="contact-header-name">{contact.name}</div>
              <div className="contact-status">{contact.isOnline ? 'Online' : 'Offline'}</div>
            </div>
          </div>

          <div className="header-actions">
            <button className="action-icon">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M12.5332 18.6582L12.5432 18.664C14.3665 19.8248 16.7515 19.5633 18.2798 18.0349L18.9248 17.3899C19.5247 16.7893 19.5247 15.8163 18.9248 15.2157L16.2073 12.4999C15.6067 11.9 14.6338 11.9 14.0332 12.4999V12.4999C13.7451 12.7883 13.3542 12.9504 12.9465 12.9504C12.5389 12.9504 12.1479 12.7883 11.8598 12.4999L7.51151 8.15069C6.91166 7.55009 6.91166 6.57712 7.51151 5.97652V5.97652C7.79994 5.68844 7.96202 5.29751 7.96202 4.88985C7.96202 4.4822 7.79994 4.09126 7.51151 3.80319L4.79484 1.08319C4.19424 0.483339 3.22128 0.483339 2.62068 1.08319L1.97568 1.72819C0.447582 3.25664 0.18571 5.6412 1.34568 7.46485L1.35234 7.47485C4.33019 11.883 8.12566 15.6794 12.5332 18.6582V18.6582Z" fill="#636B7E"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="chat-area">
        {activeTab === 1 && (
          <div className="messages-content">
            {/* Route Info Card */}
            <div className={`route-info-card ${isRouteCardExpanded ? 'expanded' : ''}`}>
              <button
                className="route-card-header"
                onClick={() => setIsRouteCardExpanded(!isRouteCardExpanded)}
              >
                <div className="route-icon">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.27006 4.80281L10.3895 1.03264C10.4705 0.99969 10.5595 0.991461 10.6453 1.00898C10.731 1.02651 10.8096 1.069 10.8713 1.13112C10.9329 1.19323 10.9748 1.27219 10.9917 1.35806C11.0085 1.44393 10.9996 1.53287 10.9661 1.61369L7.20033 10.7331C7.16456 10.8172 7.10365 10.8883 7.02593 10.9365C6.94822 10.9847 6.8575 11.0077 6.76621 11.0024C6.67491 10.997 6.5875 10.9636 6.51594 10.9067C6.44438 10.8497 6.39217 10.7721 6.36645 10.6843L5.26201 6.81653C5.25538 6.79868 5.24473 6.7826 5.23088 6.76953C5.21704 6.75645 5.20037 6.74674 5.18217 6.74113L1.31885 5.63669C1.23109 5.61098 1.15342 5.55877 1.09647 5.48721C1.03953 5.41565 1.0061 5.32823 1.00076 5.23694C0.995416 5.14564 1.01842 5.05492 1.06663 4.97721C1.11484 4.8995 1.18589 4.83858 1.27006 4.80281Z" fill="white"/>
                  </svg>
                </div>
                <div className="route-text">
                  {freight ? `${freight.origin.split(',')[1]?.trim() || freight.origin}→${freight.destination.split(',')[1]?.trim() || freight.destination} (${freight.product})` : 'SP→MG (Diversos)'}
                </div>
                <svg className="chevron-icon" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.41421 4C2.52331 4 2.07714 5.07714 2.70711 5.70711L5.29289 8.29289C5.68342 8.68342 6.31658 8.68342 6.70711 8.29289L9.2929 5.70711C9.92286 5.07714 9.47669 4 8.58579 4H3.41421Z" fill="#636B7E"/>
                </svg>
              </button>

              <div className="route-card-content">
                <div className="route-title-section">
                  <div className="route-icon-large">
                    <div className="icon-wrapper">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.6935 6.40376L13.8527 1.37686C13.9608 1.33293 14.0795 1.32196 14.1938 1.34532C14.3081 1.36869 14.4129 1.42535 14.4951 1.50817C14.5773 1.59099 14.6332 1.69627 14.6557 1.81076C14.6781 1.92525 14.6663 2.04384 14.6215 2.15159L9.60052 14.3108C9.55283 14.423 9.47161 14.5177 9.36799 14.582C9.26437 14.6463 9.14342 14.677 9.02169 14.6699C8.89996 14.6627 8.78341 14.6182 8.688 14.5422C8.59258 14.4663 8.52297 14.3628 8.48869 14.2457L7.0161 9.08872C7.00725 9.06492 6.99305 9.04348 6.97459 9.02605C6.95613 9.00861 6.93391 8.99566 6.90965 8.98818L1.75855 7.5156C1.64153 7.48132 1.53797 7.4117 1.46205 7.31629C1.38612 7.22087 1.34155 7.10432 1.33442 6.98259C1.3273 6.86086 1.35798 6.73991 1.42226 6.63629C1.48654 6.53267 1.58127 6.45146 1.6935 6.40376Z" fill="white"/>
                      </svg>
                    </div>
                  </div>
                  <div className="route-text-info">
                    <div className="route-title">Motorista está próximo da coleta</div>
                    <div className="route-subtitle">{freight ? `${freight.origin} • Há 19 min` : 'Belo Horizonte, MG • Há 19 min'}</div>
                  </div>
                </div>
                <div className="route-banner-section">
                  <div className="route-toast">
                    <div className="toast-content">
                      Mensagem automática Fretebras
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {messages.map((msg, msgIndex) => {
              const isFirstContactMessage = msg.sender === 'contact' && msgIndex === 0;

              return (
                <div key={msg.id} className={`message ${msg.sender} ${msg.type === 'document-request' ? 'document-request' : ''}`}>
                  {msg.sender === 'contact' && msg.type === 'document-request' && (
                    <div className="message-stack document-message">
                      <div className="document-card">
                        <div className="document-icon-wrapper">
                          <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.1076 19.6616H25.2924V17.846H13.1076V19.6616ZM13.1076 24.2768H25.2924V22.4616H13.1076V24.2768ZM13.1076 28.8924H20.4924V27.0768H13.1076V28.8924ZM7.20001 34.4V4H23.4092L31.2 11.7908V34.4H7.20001ZM22.5016 12.6092H29.3844L22.5016 5.8156V12.6092Z" fill="#0769DA"/>
                          </svg>
                        </div>
                      </div>
                      <div className="document-text">
                        <span className="sender-name-bold">{msg.senderName}</span> {msg.text}
                      </div>
                      <div className="document-action">
                        <button className="document-button" onClick={() => {
                          setHasClickedDocumentButton(true);
                          navigate(`/freight/${freightId}/chat/${contactId}/documents`);
                        }}>
                          Liberar meus documentos
                        </button>
                      </div>
                      <div className="message-footer">
                        <span className="timestamp">{msg.timestamp}</span>
                      </div>
                    </div>
                  )}
                  {msg.sender === 'contact' && msg.type !== 'document-request' && msg.type !== 'document-submitted' && (
                    <div className="message-stack">
                      {isFirstContactMessage && (
                        <div className="message-header">
                          <div className="message-avatar">
                            <span>{msg.senderInitial}</span>
                          </div>
                          <div className="message-sender-info">
                            <div className="sender-name">{msg.senderName}</div>
                            <div className="sender-details">
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M6.32286 1.19811L7.80986 4.14441L10.6719 4.42798C10.811 4.43954 10.9307 4.53098 10.9784 4.66218C11.0262 4.79339 10.9932 4.94038 10.8941 5.03866L8.53869 7.37339L9.41196 10.5459C9.44846 10.6834 9.40094 10.8294 9.29057 10.9191C9.18019 11.0088 9.02749 11.0254 8.90045 10.9615L5.99889 9.52456L3.10133 10.9597C2.97429 11.0236 2.82158 11.007 2.71121 10.9173C2.60084 10.8277 2.55332 10.6816 2.58982 10.5441L3.46308 7.37161L1.10593 5.03688C1.00677 4.9386 0.973838 4.79161 1.02158 4.66041C1.06932 4.5292 1.18901 4.43776 1.32813 4.4262L4.19014 4.14264L5.67491 1.19811C5.73717 1.0765 5.86228 1 5.99889 1C6.1355 1 6.2606 1.0765 6.32286 1.19811Z" fill="white" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              <span className="rating">{msg.senderRating}</span>
                              <span className="separator">•</span>
                              <span className="vehicle">{msg.senderVehicle}</span>
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="message-text">
                        {msg.text.split('\n\n').map((line, index) => (
                          <span key={index}>
                            {index === 1 ? <strong>{line}</strong> : line}
                            {index < msg.text.split('\n\n').length - 1 && <><br /><br /></>}
                          </span>
                        ))}
                      </div>
                      <div className="message-footer">
                        {msg.isRead && (
                          <svg className="read-status" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M11.9767 4.46978L11.0367 3.52979L6.81 7.75645L7.75 8.69645L11.9767 4.46978ZM14.8033 3.52979L7.75 10.5831L4.96333 7.80312L4.02333 8.74312L7.75 12.4698L15.75 4.46978L14.8033 3.52979ZM0.25 8.74312L3.97667 12.4698L4.91667 11.5298L1.19667 7.80312L0.25 8.74312Z" fill="#3993F9"/>
                          </svg>
                        )}
                        <span className="timestamp">{msg.timestamp}</span>
                      </div>
                    </div>
                  )}
                  {msg.sender === 'contact' && msg.type === 'document-submitted' && (
                    <div className="document-submitted-message">
                      <div className="document-images">
                        <div className="image-grid">
                          <div className="doc-image"></div>
                          <div className="doc-image"></div>
                          <div className="doc-image"></div>
                          <div className="doc-badge">+2</div>
                        </div>
                      </div>
                      <div className="document-caption">
                        <span className="caption-bold">Você enviou os documentos para formalizar a negociação!</span>
                        <br />
                        Aguarde a análise dos documentos pela empresa.
                      </div>
                      <div className="document-footer">
                        <span className="timestamp">{msg.timestamp}</span>
                      </div>
                    </div>
                  )}
                  {msg.sender === 'user' && msg.type !== 'agreement-review' && msg.type !== 'trip-confirmed' && (
                    <div className="user-message">
                      <div className="user-message-text">{msg.text}</div>
                      <div className="user-message-footer">
                        <span className="timestamp">{msg.timestamp}</span>
                      </div>
                    </div>
                  )}
                  {msg.sender === 'user' && msg.type === 'agreement-review' && (
                    <div className="agreement-review-message">
                      <div className="agreement-card">
                        <div className="agreement-icon-wrapper">
                          <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.08006 34.4003C8.0878 34.4003 7.24486 34.0535 6.55126 33.3599C5.85766 32.6663 5.51086 31.8257 5.51086 30.8383V26.6927H10.5141V4.30786L12.7245 6.21586L14.9657 4.30786L17.2069 6.21586L19.4481 4.30786L21.6893 6.21586L23.9353 4.30786L26.1817 6.21586L28.4277 4.30786L30.6737 6.21586L32.8893 4.30786V30.8311C32.8893 31.8233 32.5425 32.6663 31.8489 33.3599C31.1553 34.0535 30.3123 34.4003 29.3201 34.4003H9.08006ZM29.2833 32.5847C29.7774 32.5847 30.1845 32.4219 30.5045 32.0963C30.8245 31.7707 30.9845 31.3469 30.9845 30.8251V6.94506H12.4185V28.1543H27.6953V30.8311C27.6953 31.3439 27.8363 31.7644 28.1185 32.0927C28.4006 32.4207 28.7889 32.5847 29.2833 32.5847ZM14.7077 12.7663V10.9511H23.7845V12.7663H14.7077ZM14.7077 17.9879V16.1727H23.7845V17.9879H14.7077ZM27.4893 12.9819C27.1898 12.9819 26.9278 12.8696 26.7033 12.6451C26.4785 12.4203 26.3661 12.1581 26.3661 11.8587C26.3661 11.5592 26.4785 11.2972 26.7033 11.0727C26.9278 10.8481 27.1898 10.7359 27.4893 10.7359C27.7887 10.7359 28.0507 10.8481 28.2753 11.0727C28.5001 11.2972 28.6125 11.5592 28.6125 11.8587C28.6125 12.1581 28.5001 12.4203 28.2753 12.6451C28.0507 12.8696 27.7887 12.9819 27.4893 12.9819ZM27.4893 18.0495C27.1898 18.0495 26.9278 17.9372 26.7033 17.7127C26.4785 17.4881 26.3661 17.226 26.3661 16.9263C26.3661 16.6268 26.4785 16.3648 26.7033 16.1403C26.9278 15.9157 27.1898 15.8035 27.4893 15.8035C27.7887 15.8035 28.0507 15.9157 28.2753 16.1403C28.5001 16.3648 28.6125 16.6268 28.6125 16.9263C28.6125 17.226 28.5001 17.4881 28.2753 17.7127C28.0507 17.9372 27.7887 18.0495 27.4893 18.0495Z" fill="#0769DA"/>
                          </svg>
                          <div className="agreement-check">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" clipRule="evenodd" d="M14.1 3.55776L5.17302 12.4848L0.300049 7.61181L1.93789 5.97398L5.17302 9.20911L12.4622 1.91992L14.1 3.55776Z" fill="white"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="agreement-caption">
                        <div className="agreement-text">
                          <span className="agreement-name">Carlos S. revisou</span> o acordo de frete e esta analisando os documentos
                        </div>
                      </div>
                      <div className="agreement-footer">
                        <span className="timestamp">{msg.timestamp}</span>
                      </div>
                    </div>
                  )}
                  {msg.sender === 'user' && msg.type === 'trip-confirmed' && (
                    <div className="trip-confirmed-message">
                      <div className="trip-card">
                        <div className="trip-map-wrapper">
                          <img src="https://api.builder.io/api/v1/image/assets/TEMP/585043fe1e5b9f44ad6ec936da40202e66728234?width=783" alt="Mapa da rota" className="trip-map-bg" />
                        </div>
                        <div className="trip-icon-wrapper">
                          <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.1418 32.278L16.9202 21.4504L6.09257 17.198L6.06177 15.9552L32.3386 6.03198L22.3846 32.278H21.1418Z" fill="white"/>
                          </svg>
                          <div className="trip-check">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" clipRule="evenodd" d="M14.1 3.55776L5.17302 12.4848L0.300049 7.61181L1.93789 5.97398L5.17302 9.20911L12.4622 1.91992L14.1 3.55776Z" fill="white"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="trip-caption">
                        <div className="trip-title">
                          Carlos S. confirmou a viagem!
                          {freight && (
                            <>
                              <br /><br />
                              📍 {freight.origin.split(',')[1]?.trim() || freight.origin.split('-')[1]?.trim() || 'MG'} → {freight.destination.split(',')[1]?.trim() || freight.destination.split('-')[1]?.trim() || 'MT'} | {freight.product}
                              <br /><br />
                            </>
                          )}
                          Combine a coleta e receba o adiantamento no Pix da sua Carteira Fretebras.
                        </div>
                      </div>
                      <div className="trip-footer">
                        <span className="timestamp">{msg.timestamp}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        )}
        {activeTab === 2 && (
          <div className="documents-content">
            <div className="documents-empty">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <path d="M13.3333 10C13.3333 7.79086 15.1242 6 17.3333 6H42L60 24V70C60 72.2091 58.2091 74 56 74H17.3333C15.1242 74 13.3333 72.2091 13.3333 70V10Z" fill="#F4F4F5"/>
                <path d="M42 6L60 24H42V6Z" fill="#DFE1E6"/>
                <path d="M23.3333 36H50M23.3333 46H50M23.3333 56H40" stroke="#BABEC9" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <div className="empty-title">Nenhum documento enviado</div>
              <div className="empty-subtitle">Os documentos compartilhados aparecerão aqui</div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Tabs and Input */}
      <div className="chat-bottom">
        {!isInputFocused ? (
          // Check if trip is confirmed to show success bar
          messages.some(msg => msg.type === 'trip-confirmed') ? (
            <div className="copy-pix-bar">
              <div className="pix-bar-title">
                <span className="title-normal">Envie seu Pix para a empresa pagar o adiantamento na Carteira Fretebras e garanta o desconto da taxa de serviço!</span>
              </div>
              <button className="copy-pix-button" onClick={handleCopyPix}>
                <span>Enviar Pix</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.78147 11.1765C9.95348 11.0046 10.253 11.004 10.425 11.1765L12.8762 13.6267C13.3295 14.0799 13.9324 14.3299 14.5735 14.3299H14.8684L11.7561 17.4431L11.5666 17.6131C10.6566 18.3551 9.34371 18.3551 8.43381 17.6131L8.24533 17.4431L5.14084 14.3387H5.62424C6.18507 14.3386 6.71694 14.1479 7.14475 13.7967L7.32151 13.6365L9.78147 11.1765ZM8.09885 14.4139C7.87162 14.641 7.61704 14.8317 7.34397 14.9861L9.02268 16.6648C9.56245 17.2046 10.4379 17.2047 10.9778 16.6648L12.7336 14.908C12.5541 14.7969 12.3837 14.6692 12.2248 14.5252L12.0979 14.4051L10.1028 12.409L8.09885 14.4139ZM4.44553 6.35624C4.4851 6.37114 4.52763 6.38163 4.57248 6.38163H5.62424C6.06633 6.3817 6.49935 6.56113 6.81174 6.87381L9.2717 9.33377C9.50094 9.56272 9.80248 9.67752 10.1037 9.67752C10.4046 9.6774 10.7056 9.56202 10.9348 9.3328L13.386 6.8826C13.6594 6.60895 14.025 6.43775 14.4084 6.3992L14.5735 6.39042H15.4289C15.4761 6.39036 15.5205 6.37956 15.5617 6.36307L17.4436 8.24491C18.4125 9.21425 18.4125 10.7853 17.4436 11.7547L15.5617 13.6365C15.5205 13.62 15.476 13.6092 15.4289 13.6092H14.5735C14.1313 13.6092 13.6984 13.4297 13.386 13.117L10.9348 10.6668C10.4906 10.2223 9.71629 10.2227 9.2717 10.6668L6.81174 13.1258C6.49935 13.4384 6.06633 13.6179 5.62424 13.618H4.57248C4.52763 13.618 4.48517 13.6284 4.44553 13.6433L2.55783 11.7547C1.64904 10.8459 1.59184 9.4084 2.38694 8.43338L2.55783 8.24491L4.44553 6.35624ZM14.5735 7.49002C14.4232 7.49002 14.2703 7.55394 14.1643 7.65995L11.8235 9.99979L14.1633 12.3396C14.2694 12.4457 14.4231 12.5096 14.5735 12.5096H15.133L16.6653 10.9773L16.76 10.8728C17.2032 10.3299 17.1715 9.52853 16.6653 9.02225L15.133 7.49002H14.5735ZM3.33518 9.02225C2.79531 9.56212 2.79532 10.4375 3.33518 10.9773L4.87619 12.5183H5.62424C5.77468 12.5183 5.9275 12.4544 6.03342 12.3484L8.38205 9.99979L6.03342 7.65116C5.92753 7.54517 5.77468 7.48131 5.62424 7.48124H4.87619L3.33518 9.02225ZM8.24533 2.55741C9.2147 1.58796 10.7866 1.58796 11.7561 2.55741L14.8684 5.66971H14.5735C13.9324 5.66971 13.3295 5.91973 12.8762 6.37284L10.425 8.82401C10.2475 9.00177 9.95857 9.00086 9.78147 8.82401L7.32151 6.36405C6.86824 5.911 6.2652 5.661 5.62424 5.66092H5.14084L8.24533 2.55741ZM10.9778 3.33475C10.4716 2.82866 9.671 2.79732 9.12815 3.24002L9.02268 3.33475L7.34397 5.01249C7.56774 5.139 7.77902 5.28995 7.97287 5.46561L8.09885 5.58573L10.1028 7.58963L12.0979 5.59452C12.2919 5.40059 12.5054 5.23186 12.7336 5.09061L10.9778 3.33475Z" fill="white"/>
                </svg>
              </button>
            </div>
          ) : (
          <div className="chat-stepper">
            <button
              className={`step-item ${currentStep === 1 ? 'active' : ''} ${completedTabs.includes(1) ? 'completed' : ''}`}
              onClick={() => handleStepChange(1)}
            >
              <div className="step-badge-wrapper">
                {currentStep === 1 && !completedTabs.includes(1) && (
                  <div className="pulse"></div>
                )}
                <div className="step-badge">
                  {completedTabs.includes(1) ? (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6.36641 12.0001L2.56641 8.20007L3.51641 7.25007L6.36641 10.1001L12.4831 3.9834L13.4331 4.9334L6.36641 12.0001Z" fill="white"/>
                    </svg>
                  ) : (
                    <span>1</span>
                  )}
                </div>
              </div>
              <div className="step-label">Negociação</div>
            </button>
            <button
              className={`step-item ${currentStep === 2 ? 'active' : ''} ${completedTabs.includes(2) ? 'completed' : ''}`}
              onClick={() => handleStepChange(2)}
            >
              <div className="step-badge-wrapper">
                {currentStep === 2 && !completedTabs.includes(2) && hasClickedDocumentButton && (
                  <>
                    <div className="pulse"></div>
                    <div className="clock-icon">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="16" height="16" rx="8" fill="white"/>
                        <path d="M8.00684 1.94507C8.843 1.94508 9.62917 2.10378 10.3652 2.42163C11.1014 2.7395 11.7417 3.17085 12.2861 3.71558C12.8307 4.2605 13.2624 4.90159 13.5801 5.63843C13.8977 6.37505 14.0566 7.16214 14.0566 7.99976C14.0566 8.834 13.8991 9.61826 13.584 10.3523C13.2688 11.0863 12.8376 11.7296 12.291 12.282C11.7443 12.8344 11.1016 13.2692 10.3643 13.5847C9.6272 13.8999 8.83911 14.0574 8.00098 14.0574C7.16683 14.0573 6.38239 13.8999 5.64844 13.5847C4.9144 13.2695 4.27117 12.8352 3.71875 12.283C3.16635 11.7307 2.73245 11.0867 2.41699 10.3513C2.10179 9.61629 1.94438 8.83086 1.94434 7.99487C1.94434 7.15876 2.10187 6.37249 2.41699 5.63647C2.7322 4.90036 3.16568 4.25852 3.71777 3.71167C4.26998 3.16479 4.91401 2.73322 5.64941 2.41772C6.38461 2.10242 7.17063 1.94507 8.00684 1.94507ZM7.55664 7.93726H7.55176L7.55957 7.94409L10.3418 10.7263L10.3486 10.7341L10.9834 10.0994L10.9756 10.0925L8.44434 7.5603V3.99097H7.55664V7.93726Z" fill="#0769DA" stroke="#0769DA" strokeWidth="0.0208333"/>
                      </svg>
                    </div>
                  </>
                )}
                {currentStep === 2 && !completedTabs.includes(2) && !hasClickedDocumentButton && (
                  <div className="pulse"></div>
                )}
                <div className="step-badge">
                  {completedTabs.includes(2) ? (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6.36641 12.0001L2.56641 8.20007L3.51641 7.25007L6.36641 10.1001L12.4831 3.9834L13.4331 4.9334L6.36641 12.0001Z" fill="white"/>
                    </svg>
                  ) : (
                    <span>2</span>
                  )}
                </div>
              </div>
              <div className="step-label">Documentos</div>
            </button>
            <button
              className={`step-item ${currentStep === 3 ? 'active' : ''} ${completedTabs.includes(3) ? 'completed' : ''}`}
              onClick={() => handleStepChange(3)}
            >
              <div className="step-badge-wrapper">
                {currentStep === 3 && !completedTabs.includes(3) && (
                  <div className="pulse"></div>
                )}
                <div className="step-badge">
                  {completedTabs.includes(3) ? (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6.36641 12.0001L2.56641 8.20007L3.51641 7.25007L6.36641 10.1001L12.4831 3.9834L13.4331 4.9334L6.36641 12.0001Z" fill="white"/>
                    </svg>
                  ) : (
                    <span>3</span>
                  )}
                </div>
              </div>
              <div className="step-label">Fechamento</div>
            </button>
            <div className="stepper-divider"></div>
            <div
              className="stepper-divider-active"
              style={{
                width:
                  completedTabs.includes(3) ? '100%' :
                  currentStep === 3 || completedTabs.includes(2) ? '83%' :
                  currentStep === 2 || completedTabs.includes(1) ? '50%' :
                  '16%'
              }}
            ></div>
          </div>
          )
        ) : (
          <div className="quick-replies">
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                className="quick-reply-btn"
                onClick={(e) => {
                  e.preventDefault();
                  setMessage(reply);

                  // Envia a mensagem automaticamente
                  const now = new Date();
                  const hours = String(now.getHours()).padStart(2, '0');
                  const minutes = String(now.getMinutes()).padStart(2, '0');
                  const timestamp = `${hours}:${minutes}`;

                  const contactMessageText = reply.trim();

                  const newMessage: Message = {
                    id: String(Date.now()),
                    sender: 'contact',
                    senderName: 'Rafael T (DDD 11)',
                    senderInitial: 'R',
                    senderRating: '4.9',
                    senderVehicle: 'Bitruck | Graneleiro',
                    text: contactMessageText,
                    timestamp,
                    isRead: true,
                  };

                  setMessages(prev => [...prev, newMessage]);
                  setMessage('');
                  setIsInputFocused(false);

                  // Remove o foco do input
                  (document.activeElement as HTMLElement)?.blur();

                  // Simula resposta do usuário (branco, esquerda)
                  simulateUserResponse(contactMessageText);
                }}
              >
                {reply}
              </button>
            ))}
          </div>
        )}

        <div className="message-input-container">
          <div className="message-input-wrapper">
            <input
              type="text"
              className="message-input"
              placeholder="Digite sua mensagem"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setTimeout(() => setIsInputFocused(false), 200)}
              onKeyPress={handleKeyPress}
            />
            <div className="input-actions">
              <button className="input-action-btn" onClick={() => navigate(`/freight/${freightId}/chat/${contactId}/documents`)}>
                <svg width="24" height="24" viewBox="0 0 20 20" fill="none">
                  <path d="M14.2274 13.4117C14.2274 14.5685 13.8255 15.553 13.0216 16.365C12.2177 17.1771 11.2385 17.5832 10.0841 17.5832C8.91366 17.5832 7.92915 17.1603 7.13053 16.3144C6.33192 15.4687 5.93262 14.4525 5.93262 13.2659V5.37796C5.93262 4.55532 6.2179 3.85609 6.78845 3.28025C7.35887 2.70442 8.0554 2.4165 8.87803 2.4165C9.71456 2.4165 10.4146 2.72178 10.9782 3.33234C11.5419 3.94289 11.8237 4.67338 11.8237 5.5238V12.9278C11.8237 13.4105 11.6555 13.8232 11.3191 14.1657C10.9827 14.508 10.5728 14.6792 10.0893 14.6792C9.59387 14.6792 9.1779 14.5013 8.84137 14.1455C8.50484 13.7896 8.33658 13.3559 8.33658 12.8444V5.32046H9.4197V12.9278C9.4197 13.115 9.48297 13.2732 9.60949 13.4023C9.73602 13.5315 9.8929 13.5961 10.0801 13.5961C10.2672 13.5961 10.424 13.5315 10.5505 13.4023C10.6771 13.2732 10.7403 13.115 10.7403 12.9278V5.37005C10.7456 4.85185 10.5666 4.4106 10.2032 4.0463C9.83991 3.68199 9.39685 3.49984 8.87408 3.49984C8.3538 3.49984 7.91401 3.69025 7.5547 4.07109C7.19553 4.45206 7.01595 4.90157 7.01595 5.41963V13.4117C7.02123 14.2664 7.32088 14.9913 7.91491 15.5863C8.50894 16.1814 9.23296 16.4859 10.087 16.4998C10.9406 16.5137 11.6662 16.2057 12.2639 15.5759C12.8614 14.9462 13.1548 14.19 13.1441 13.3075V5.32046H14.2274V13.4117Z" fill="#636B7E"/>
                </svg>
              </button>
              <button className="input-action-btn" onClick={() => navigate(`/freight/${freightId}/chat/${contactId}/documents`)}>
                <svg width="24" height="24" viewBox="0 0 20 20" fill="none">
                  <path d="M10.0003 14.1787C10.9149 14.1787 11.6735 13.8705 12.276 13.2541C12.8785 12.6378 13.1797 11.8862 13.1797 10.9993C13.1797 10.1264 12.8785 9.37831 12.276 8.75497C11.6735 8.13164 10.9149 7.81997 10.0003 7.81997C9.08574 7.81997 8.3272 8.13164 7.7247 8.75497C7.1222 9.37831 6.82095 10.1299 6.82095 11.0098C6.82095 11.8896 7.1222 12.6378 7.7247 13.2541C8.3272 13.8705 9.08574 14.1787 10.0003 14.1787ZM10.0003 13.0956C9.38491 13.0956 8.88171 12.8922 8.49074 12.4854C8.09963 12.0787 7.90408 11.5764 7.90408 10.9785C7.90408 10.3923 8.09963 9.89984 8.49074 9.50122C8.88171 9.10247 9.38491 8.9031 10.0003 8.9031C10.6157 8.9031 11.1189 9.10247 11.5099 9.50122C11.901 9.89984 12.0966 10.3923 12.0966 10.9785C12.0966 11.5764 11.901 12.0787 11.5099 12.4854C11.1189 12.8922 10.6157 13.0956 10.0003 13.0956ZM2.41699 16.5827V5.41602H6.17658L7.67658 3.41602H12.3241L13.8241 5.41602H17.5837V16.5827H2.41699ZM3.50033 15.4993H16.5003V6.49935H13.2664L11.7564 4.49935H8.24241L6.73428 6.49935H3.50033V15.4993Z" fill="#636B7E"/>
                </svg>
              </button>
            </div>
          </div>
          {message.length > 0 || isInputFocused ? (
            <button className="send-button" onClick={handleSendMessage}>
              <svg width="33" height="33" viewBox="0 0 34 34" fill="none">
                <path d="M4.86133 26.7361V18.9013L14.1756 16.6666L4.86133 14.3947V6.59717L28.7662 16.6666L4.86133 26.7361Z" fill="white"/>
              </svg>
            </button>
          ) : (
            <button className="mic-button">
              <svg width="23" height="23" viewBox="0 0 23 23" fill="none">
                <path d="M11.5003 13.4165C13.0912 13.4165 14.3657 12.1323 14.3657 10.5415L14.3753 4.7915C14.3753 3.20067 13.0912 1.9165 11.5003 1.9165C9.90949 1.9165 8.62533 3.20067 8.62533 4.7915V10.5415C8.62533 12.1323 9.90949 13.4165 11.5003 13.4165ZM16.5795 10.5415C16.5795 13.4165 14.1453 15.429 11.5003 15.429C8.85533 15.429 6.42116 13.4165 6.42116 10.5415H4.79199C4.79199 13.8094 7.39866 16.5119 10.542 16.9815V20.1248H12.4587V16.9815C15.602 16.5215 18.2087 13.819 18.2087 10.5415H16.5795Z" fill="white"/>
              </svg>
            </button>
          )}
        </div>
      </div>

      <NegotiationStepsSheet
        isOpen={isStepsSheetOpen}
        onClose={() => setIsStepsSheetOpen(false)}
        currentStep={currentStep}
        completedTabs={completedTabs}
      />

      <Toast
        message="Pix copiado"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}
