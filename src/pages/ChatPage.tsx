import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/ChatPage.scss';

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
}

const contacts: { [key: string]: Contact } = {
  '1': { id: '1', name: 'Carlos S.', isOnline: true },
  '2': { id: '2', name: 'Carla Moura', isOnline: false },
  '3': { id: '3', name: 'Rodrigo Santos', isOnline: false },
};

export default function ChatPage() {
  const navigate = useNavigate();
  const { freightId, contactId } = useParams();
  const [isExiting, setIsExiting] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const [message, setMessage] = useState('');
  const [completedTabs, setCompletedTabs] = useState<number[]>([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickReplies = [
    'Onde carrega?',
    'Quando carrega?',
    'Quanto está pagando?',
    'Consegue melhorar o preço?'
  ];
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'contact',
      senderName: 'Rafael T (DDD 11)',
      senderInitial: 'R',
      senderRating: '4.9',
      senderVehicle: 'Bitruck | Graneleiro',
      text: 'Olá. Estou interessado no seu frete de Curitiba-PR para Porto Alegre-RS de Eletrônicos.\n\nA carga ainda está disponível?',
      timestamp: '09:41',
      isRead: true,
    },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages(prev => [...prev, {
        id: '2',
        sender: 'user',
        text: 'Sim, seu veículo é truck?',
        timestamp: '09:41',
      }]);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const contact = contacts[contactId || '1'];

  const handleBackClick = () => {
    setIsExiting(true);
    setTimeout(() => {
      navigate(`/freight/${freightId}`);
    }, 300);
  };

  const handleStepChange = (step: number) => {
    // Ao mudar para um step posterior, marca os anteriores como completados
    const newCompleted = [...completedTabs];
    for (let i = 1; i < step; i++) {
      if (!newCompleted.includes(i)) {
        newCompleted.push(i);
      }
    }
    setCompletedTabs(newCompleted);
    setActiveTab(step);
  };

  const handleSendMessage = () => {
    if (message.trim() === '') return;

    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const timestamp = `${hours}:${minutes}`;

    const newMessage: Message = {
      id: String(Date.now()),
      sender: 'user',
      text: message.trim(),
      timestamp,
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    setIsInputFocused(false);

    // Remove o foco do input
    (document.activeElement as HTMLElement)?.blur();
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
    <div className={`chat-page ${isExiting ? 'exiting' : ''}`}>
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
            {messages.map((msg) => (
              <div key={msg.id} className={`message ${msg.sender}`}>
                {msg.sender === 'contact' && (
                  <div className="message-stack">
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
                {msg.sender === 'user' && (
                  <div className="user-message">
                    <div className="user-message-text">{msg.text}</div>
                    <div className="user-message-footer">
                      <span className="timestamp">{msg.timestamp}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
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
          <div className="chat-stepper">
            <button
              className={`step-item ${activeTab === 1 ? 'active' : ''} ${completedTabs.includes(1) ? 'completed' : ''}`}
              onClick={() => handleStepChange(1)}
            >
              <div className="step-badge-wrapper">
                {activeTab === 1 && !completedTabs.includes(1) && (
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
              className={`step-item ${activeTab === 2 ? 'active' : ''} ${completedTabs.includes(2) ? 'completed' : ''}`}
              onClick={() => handleStepChange(2)}
            >
              <div className="step-badge-wrapper">
                {activeTab === 2 && !completedTabs.includes(2) && (
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
              className={`step-item ${activeTab === 3 ? 'active' : ''} ${completedTabs.includes(3) ? 'completed' : ''}`}
              onClick={() => handleStepChange(3)}
            >
              <div className="step-badge-wrapper">
                {activeTab === 3 && !completedTabs.includes(3) && (
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
                  activeTab === 3 || completedTabs.includes(2) ? '83%' :
                  activeTab === 2 || completedTabs.includes(1) ? '50%' :
                  '16%'
              }}
            ></div>
          </div>
        ) : (
          <div className="quick-replies">
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                className="quick-reply-btn"
                onMouseDown={(e) => {
                  e.preventDefault();
                  setMessage(reply);
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
              <button className="input-action-btn">
                <svg width="24" height="24" viewBox="0 0 20 20" fill="none">
                  <path d="M14.2274 13.4117C14.2274 14.5685 13.8255 15.553 13.0216 16.365C12.2177 17.1771 11.2385 17.5832 10.0841 17.5832C8.91366 17.5832 7.92915 17.1603 7.13053 16.3144C6.33192 15.4687 5.93262 14.4525 5.93262 13.2659V5.37796C5.93262 4.55532 6.2179 3.85609 6.78845 3.28025C7.35887 2.70442 8.0554 2.4165 8.87803 2.4165C9.71456 2.4165 10.4146 2.72178 10.9782 3.33234C11.5419 3.94289 11.8237 4.67338 11.8237 5.5238V12.9278C11.8237 13.4105 11.6555 13.8232 11.3191 14.1657C10.9827 14.508 10.5728 14.6792 10.0893 14.6792C9.59387 14.6792 9.1779 14.5013 8.84137 14.1455C8.50484 13.7896 8.33658 13.3559 8.33658 12.8444V5.32046H9.4197V12.9278C9.4197 13.115 9.48297 13.2732 9.60949 13.4023C9.73602 13.5315 9.8929 13.5961 10.0801 13.5961C10.2672 13.5961 10.424 13.5315 10.5505 13.4023C10.6771 13.2732 10.7403 13.115 10.7403 12.9278V5.37005C10.7456 4.85185 10.5666 4.4106 10.2032 4.0463C9.83991 3.68199 9.39685 3.49984 8.87408 3.49984C8.3538 3.49984 7.91401 3.69025 7.5547 4.07109C7.19553 4.45206 7.01595 4.90157 7.01595 5.41963V13.4117C7.02123 14.2664 7.32088 14.9913 7.91491 15.5863C8.50894 16.1814 9.23296 16.4859 10.087 16.4998C10.9406 16.5137 11.6662 16.2057 12.2639 15.5759C12.8614 14.9462 13.1548 14.19 13.1441 13.3075V5.32046H14.2274V13.4117Z" fill="#636B7E"/>
                </svg>
              </button>
              <button className="input-action-btn">
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
    </div>
  );
}
