import { useEffect } from 'react';
import '../styles/ChatBottomSheet.scss';

interface Contact {
  id: string;
  name: string;
  avatar?: string;
  initials: string;
  isOnline?: boolean;
  fastResponse?: boolean;
}

interface ChatBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatBottomSheet({ isOpen, onClose }: ChatBottomSheetProps) {
  const contacts: Contact[] = [
    {
      id: '1',
      name: 'Carlos S.',
      avatar: 'https://cdn.builder.io/api/v1/image/assets%2F7de6902bb7ea42d4be5082a42dd00e60%2Fb18d9b635d514b509474d0d0a21a532c?format=webp&width=800',
      initials: 'CS',
      isOnline: true,
      fastResponse: true,
    },
    {
      id: '2',
      name: 'Carla Moura',
      initials: 'CM',
      isOnline: false,
      fastResponse: false,
    },
    {
      id: '3',
      name: 'Rodrigo Santos',
      initials: 'CM',
      isOnline: false,
      fastResponse: false,
    },
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleOverlayClick = () => {
    onClose();
  };

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (!isOpen) return null;

  return (
    <div className={`chat-bottom-sheet-overlay ${isOpen ? 'open' : ''}`} onClick={handleOverlayClick}>
      <div className={`chat-bottom-sheet ${isOpen ? 'open' : ''}`} onClick={handleContentClick}>
        <div className="bottom-sheet-header">
          <div className="holder"></div>
          <div className="header-content">
            <div className="title-close">
              <h2 className="sheet-title">Converse sobre o frete com:</h2>
              <button className="close-button" onClick={onClose}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.16675 15.8333L15.8334 4.16666" stroke="#111111" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4.16675 4.16666L15.8334 15.8333" stroke="#111111" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="bottom-sheet-content">
          <div className="contacts-list">
            {contacts.map((contact, index) => (
              <div key={contact.id}>
                <div className="contact-item">
                  <div className="contact-info">
                    <div className="avatar-container">
                      {contact.avatar ? (
                        <div className="avatar-image">
                          <img src={contact.avatar} alt={contact.name} />
                          {contact.isOnline && <span className="online-badge"></span>}
                        </div>
                      ) : (
                        <div className="avatar-initials">
                          {contact.initials}
                        </div>
                      )}
                    </div>
                    <div className="contact-details">
                      <div className="contact-name">{contact.name}</div>
                      {contact.fastResponse && (
                        <div className="fast-response-tag">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_clock)">
                              <path d="M6 0C4.81331 0 3.65328 0.351894 2.66658 1.01118C1.67989 1.67047 0.910851 2.60754 0.456726 3.7039C0.00259972 4.80026 -0.11622 6.00666 0.115291 7.17054C0.346802 8.33443 0.918247 9.40353 1.75736 10.2426C2.59648 11.0818 3.66558 11.6532 4.82946 11.8847C5.99335 12.1162 7.19975 11.9974 8.2961 11.5433C9.39246 11.0892 10.3295 10.3201 10.9888 9.33342C11.6481 8.34673 12 7.18669 12 6C12 4.4087 11.3679 2.88258 10.2426 1.75736C9.11742 0.632141 7.5913 0 6 0V0ZM8.6 8.61C8.55553 8.65888 8.50182 8.69846 8.44196 8.72645C8.3821 8.75445 8.31728 8.7703 8.25126 8.77309C8.18524 8.77588 8.11932 8.76555 8.05731 8.74271C7.9953 8.71986 7.93844 8.68496 7.89 8.64L5.39 6.37C5.34273 6.32109 5.30593 6.26305 5.28185 6.19943C5.25778 6.13582 5.24694 6.06795 5.25 6V3.25C5.25 3.11739 5.30268 2.99021 5.39645 2.89645C5.49022 2.80268 5.61739 2.75 5.75 2.75C5.88261 2.75 6.00979 2.80268 6.10356 2.89645C6.19732 2.99021 6.25 3.11739 6.25 3.25V5.78L8.565 7.905C8.66292 7.99397 8.72159 8.11813 8.72815 8.25027C8.73471 8.38241 8.68863 8.51177 8.6 8.61Z" fill="white"/>
                            </g>
                            <defs>
                              <clipPath id="clip0_clock">
                                <rect width="12" height="12" fill="white"/>
                              </clipPath>
                            </defs>
                          </svg>
                          <span>RESPONDE RÁPIDO</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 4L9.91964 7.81156C9.97109 7.86151 10 7.9293 10 8C10 8.0707 9.97109 8.13849 9.91964 8.18844L6 12" stroke="#636B7E" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                {index < contacts.length - 1 && <div className="contact-divider"></div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
