import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/ChatPage.scss';

interface Contact {
  id: string;
  name: string;
  isOnline: boolean;
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

  const contact = contacts[contactId || '1'];

  const handleBackClick = () => {
    setIsExiting(true);
    setTimeout(() => {
      navigate(`/freight/${freightId}`);
    }, 300);
  };

  if (!contact) {
    return <div>Contato não encontrado</div>;
  }

  return (
    <div className={`chat-page ${isExiting ? 'exiting' : ''}`}>
      {/* Header */}
      <div className="chat-header">
        <div className="status-bar">
          <div className="time">12:30</div>
          <div className="status-icons">
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
              <path d="M2.11719 7.5C2.70196 7.5 3.17676 8.00368 3.17676 8.625V10.875C3.17676 11.4963 2.70196 12 2.11719 12H1.05859C0.473928 11.9999 1.45508e-06 11.4962 0 10.875V8.625C0 8.00376 0.473927 7.50013 1.05859 7.5H2.11719ZM7.05859 5.25C7.64337 5.25 8.11719 5.75368 8.11719 6.375V10.875C8.11719 11.4963 7.64337 12 7.05859 12H6C5.41524 12 4.94141 11.4963 4.94141 10.875V6.375C4.94141 5.75369 5.41524 5.25001 6 5.25H7.05859ZM12 2.625C12.5848 2.62501 13.0586 3.12869 13.0586 3.75V10.875C13.0586 11.4963 12.5848 12 12 12H10.9414C10.3566 12 9.88281 11.4963 9.88281 10.875V3.75C9.88281 3.12868 10.3566 2.625 10.9414 2.625H12ZM16.9414 0C17.5261 0.000132092 18 0.503761 18 1.125V10.875C18 11.4962 17.5261 11.9999 16.9414 12H15.8828C15.298 12 14.8232 11.4963 14.8232 10.875V1.125C14.8232 0.50368 15.298 0 15.8828 0H16.9414Z" fill="#111"/>
            </svg>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
              <path d="M5.68555 9.19238C7.02183 8.01196 8.97916 8.01193 10.3154 9.19238C10.3826 9.25585 10.4219 9.34583 10.4238 9.44043C10.4257 9.5351 10.3899 9.62704 10.3252 9.69336L8.23242 11.8984C8.17108 11.9633 8.08726 12 8 12C7.91292 11.9999 7.82979 11.9631 7.76855 11.8984L5.67578 9.69336C5.61113 9.62699 5.57523 9.5351 5.57715 9.44043C5.57909 9.3458 5.61829 9.25582 5.68555 9.19238ZM2.89355 6.25C5.77269 3.45271 10.2313 3.45254 13.1104 6.25C13.1753 6.31555 13.2119 6.40569 13.2129 6.5C13.2138 6.59424 13.1787 6.68502 13.1152 6.75195L11.9053 8.0293C11.7806 8.15955 11.579 8.16204 11.4512 8.03516C10.5057 7.14097 9.27541 6.64543 8 6.64551C6.7255 6.64617 5.49649 7.14155 4.55176 8.03516C4.42388 8.16207 4.22231 8.15967 4.09766 8.0293L2.88867 6.75195C2.82496 6.6851 2.78919 6.59433 2.79004 6.5C2.79096 6.40566 2.82858 6.31554 2.89355 6.25ZM0.100586 3.31543C4.5165 -1.10519 11.4835 -1.10519 15.8994 3.31543C15.9633 3.3811 15.9995 3.47081 16 3.56445C16.0005 3.65801 15.9654 3.74804 15.9023 3.81445L14.6914 5.09082C14.5666 5.22181 14.364 5.22366 14.2373 5.09473C12.5548 3.4239 10.3215 2.49229 8 2.49219C5.67846 2.4923 3.44526 3.42389 1.7627 5.09473C1.63607 5.22376 1.43422 5.22197 1.30957 5.09082L0.0976562 3.81445C0.0345836 3.748 -0.000547202 3.65803 0 3.56445C0.000589494 3.47086 0.0366912 3.38104 0.100586 3.31543Z" fill="#111"/>
            </svg>
            <div className="battery-icon">
              <div className="battery-border"></div>
              <div className="battery-capacity"></div>
            </div>
          </div>
        </div>

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
        {/* Área vazia para mensagens futuras */}
      </div>

      {/* Bottom Tabs and Input */}
      <div className="chat-bottom">
        <div className="chat-tabs">
          <button 
            className={`tab-item ${activeTab === 1 ? 'active' : ''}`}
            onClick={() => setActiveTab(1)}
          >
            <div className="tab-badge">
              <span>1</span>
            </div>
            <div className="tab-label">Negociação</div>
          </button>
          <button 
            className={`tab-item ${activeTab === 2 ? 'active' : ''}`}
            onClick={() => setActiveTab(2)}
          >
            <div className="tab-badge">
              <span>2</span>
            </div>
            <div className="tab-label">Documentos</div>
          </button>
          <button 
            className={`tab-item ${activeTab === 3 ? 'active' : ''}`}
            onClick={() => setActiveTab(3)}
          >
            <div className="tab-badge">
              <span>3</span>
            </div>
            <div className="tab-label">Fechamento</div>
          </button>
        </div>

        <div className="message-input-container">
          <div className="message-input-wrapper">
            <input
              type="text"
              className="message-input"
              placeholder="Digite sua mensagem"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="input-actions">
              <button className="input-action-btn">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M14.2274 13.4117C14.2274 14.5685 13.8255 15.553 13.0216 16.365C12.2177 17.1771 11.2385 17.5832 10.0841 17.5832C8.91366 17.5832 7.92915 17.1603 7.13053 16.3144C6.33192 15.4687 5.93262 14.4525 5.93262 13.2659V5.37796C5.93262 4.55532 6.2179 3.85609 6.78845 3.28025C7.35887 2.70442 8.0554 2.4165 8.87803 2.4165C9.71456 2.4165 10.4146 2.72178 10.9782 3.33234C11.5419 3.94289 11.8237 4.67338 11.8237 5.5238V12.9278C11.8237 13.4105 11.6555 13.8232 11.3191 14.1657C10.9827 14.508 10.5728 14.6792 10.0893 14.6792C9.59387 14.6792 9.1779 14.5013 8.84137 14.1455C8.50484 13.7896 8.33658 13.3559 8.33658 12.8444V5.32046H9.4197V12.9278C9.4197 13.115 9.48297 13.2732 9.60949 13.4023C9.73602 13.5315 9.8929 13.5961 10.0801 13.5961C10.2672 13.5961 10.424 13.5315 10.5505 13.4023C10.6771 13.2732 10.7403 13.115 10.7403 12.9278V5.37005C10.7456 4.85185 10.5666 4.4106 10.2032 4.0463C9.83991 3.68199 9.39685 3.49984 8.87408 3.49984C8.3538 3.49984 7.91401 3.69025 7.5547 4.07109C7.19553 4.45206 7.01595 4.90157 7.01595 5.41963V13.4117C7.02123 14.2664 7.32088 14.9913 7.91491 15.5863C8.50894 16.1814 9.23296 16.4859 10.087 16.4998C10.9406 16.5137 11.6662 16.2057 12.2639 15.5759C12.8614 14.9462 13.1548 14.19 13.1441 13.3075V5.32046H14.2274V13.4117Z" fill="#636B7E"/>
                </svg>
              </button>
              <button className="input-action-btn">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10.0003 14.1787C10.9149 14.1787 11.6735 13.8705 12.276 13.2541C12.8785 12.6378 13.1797 11.8862 13.1797 10.9993C13.1797 10.1264 12.8785 9.37831 12.276 8.75497C11.6735 8.13164 10.9149 7.81997 10.0003 7.81997C9.08574 7.81997 8.3272 8.13164 7.7247 8.75497C7.1222 9.37831 6.82095 10.1299 6.82095 11.0098C6.82095 11.8896 7.1222 12.6378 7.7247 13.2541C8.3272 13.8705 9.08574 14.1787 10.0003 14.1787ZM10.0003 13.0956C9.38491 13.0956 8.88171 12.8922 8.49074 12.4854C8.09963 12.0787 7.90408 11.5764 7.90408 10.9785C7.90408 10.3923 8.09963 9.89984 8.49074 9.50122C8.88171 9.10247 9.38491 8.9031 10.0003 8.9031C10.6157 8.9031 11.1189 9.10247 11.5099 9.50122C11.901 9.89984 12.0966 10.3923 12.0966 10.9785C12.0966 11.5764 11.901 12.0787 11.5099 12.4854C11.1189 12.8922 10.6157 13.0956 10.0003 13.0956ZM2.41699 16.5827V5.41602H6.17658L7.67658 3.41602H12.3241L13.8241 5.41602H17.5837V16.5827H2.41699ZM3.50033 15.4993H16.5003V6.49935H13.2664L11.7564 4.49935H8.24241L6.73428 6.49935H3.50033V15.4993Z" fill="#636B7E"/>
                </svg>
              </button>
            </div>
          </div>
          <button className="mic-button">
            <svg width="23" height="23" viewBox="0 0 23 23" fill="none">
              <path d="M11.5003 13.4165C13.0912 13.4165 14.3657 12.1323 14.3657 10.5415L14.3753 4.7915C14.3753 3.20067 13.0912 1.9165 11.5003 1.9165C9.90949 1.9165 8.62533 3.20067 8.62533 4.7915V10.5415C8.62533 12.1323 9.90949 13.4165 11.5003 13.4165ZM16.5795 10.5415C16.5795 13.4165 14.1453 15.429 11.5003 15.429C8.85533 15.429 6.42116 13.4165 6.42116 10.5415H4.79199C4.79199 13.8094 7.39866 16.5119 10.542 16.9815V20.1248H12.4587V16.9815C15.602 16.5215 18.2087 13.819 18.2087 10.5415H16.5795Z" fill="white"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
