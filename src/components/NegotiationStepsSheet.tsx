import { useEffect } from 'react';
import '../styles/NegotiationStepsSheet.scss';

interface NegotiationStepsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  currentStep: number;
  completedTabs: number[];
}

export default function NegotiationStepsSheet({ isOpen, onClose, currentStep, completedTabs }: NegotiationStepsSheetProps) {
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

  return (
    <>
      <div className={`sheet-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
      <div className={`negotiation-steps-sheet ${isOpen ? 'open' : ''}`}>
        <div className="sheet-content">
          {/* Header */}
          <div className="sheet-header">
            <div className="sheet-handle"></div>
            <div className="sheet-title-row">
              <h2 className="sheet-title">Etapas da negociação</h2>
              <button className="close-button" onClick={onClose}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.16675 15.8333L15.8334 4.16666M4.16675 4.16666L15.8334 15.8333" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Steps */}
          <div className="steps-container">
            {/* Step 1 - Always Completed */}
            <div className="step-item">
              <div className="step-row">
                <div className="step-badge completed">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="40" rx="20" fill="#0C884C"/>
                    <path d="M17.5951 27L12 21.3119L13.3988 19.8898L17.5951 24.1559L26.6012 15L28 16.422L17.5951 27Z" fill="white"/>
                  </svg>
                </div>
                <div className="step-content">
                  <div className="step-title muted">Negociação inicial</div>
                  <div className="step-description">Acerte condições e preço do frete.</div>
                </div>
              </div>
              <div className="step-connector"></div>
            </div>

            {/* Step 2 */}
            <div className="step-item">
              <div className="step-row">
                {completedTabs.includes(2) ? (
                  <div className="step-badge completed">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="40" height="40" rx="20" fill="#0C884C"/>
                      <path d="M17.5951 27L12 21.3119L13.3988 19.8898L17.5951 24.1559L26.6012 15L28 16.422L17.5951 27Z" fill="white"/>
                    </svg>
                  </div>
                ) : (
                  <div className="step-badge active">
                    <span>2</span>
                  </div>
                )}
                <div className="step-content">
                  <div className={`step-title ${completedTabs.includes(2) ? 'muted' : 'active'}`}>Libere seus documentos</div>
                  <div className={`step-description ${completedTabs.includes(2) ? '' : 'active'}`}>
                    Seus documentos serão enviados para análise da empresa.
                  </div>

                  {/* Waiting status - only show if step 2 is active and not completed */}
                  {currentStep === 2 && !completedTabs.includes(2) && (
                    <div className="waiting-status">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.0088 2.42871C11.0541 2.42875 12.0368 2.62711 12.957 3.02441C13.8778 3.42195 14.6794 3.96122 15.3604 4.64258C16.0413 5.32393 16.5803 6.12559 16.9775 7.04688C17.3747 7.96802 17.5732 8.9526 17.5732 10C17.5732 11.0431 17.3765 12.0236 16.9824 12.9414C16.5882 13.8593 16.0488 14.6637 15.3652 15.3545C14.6817 16.0452 13.8789 16.5879 12.957 16.9824C12.0352 17.3767 11.0501 17.5742 10.002 17.5742C8.95893 17.5742 7.97833 17.3774 7.06055 16.9834C6.14257 16.5892 5.33733 16.046 4.64648 15.3555C3.95581 14.665 3.41298 13.8599 3.01855 12.9404C2.62433 12.0211 2.42773 11.0387 2.42773 9.99316C2.42774 8.94757 2.62441 7.96439 3.01855 7.04395C3.41271 6.12351 3.95512 5.32149 4.64551 4.6377C5.33608 3.95378 6.14185 3.41403 7.06152 3.01953C7.98073 2.62539 8.96337 2.42871 10.0088 2.42871ZM9.44824 9.9209H9.44434L9.45117 9.92871L12.9287 13.4062L12.9365 13.4131L13.7246 12.625L13.7178 12.6172L10.5527 9.45215V4.99121H9.44824V9.9209Z" fill="#0769DA" stroke="#0769DA" strokeWidth="0.0208333"/>
                      </svg>
                      <span className="waiting-text">Aguardando resposta da empresa...</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="step-connector"></div>
            </div>

            {/* Step 3 - Fechamento */}
            <div className="step-item">
              <div className="step-row">
                {completedTabs.includes(3) ? (
                  <div className="step-badge completed">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="40" height="40" rx="20" fill="#0C884C"/>
                      <path d="M17.5951 27L12 21.3119L13.3988 19.8898L17.5951 24.1559L26.6012 15L28 16.422L17.5951 27Z" fill="white"/>
                    </svg>
                  </div>
                ) : (
                  <div className={`step-badge ${currentStep >= 3 ? 'active' : 'inactive'}`}>
                    <span>3</span>
                  </div>
                )}
                <div className="step-content">
                  <div className={`step-title ${completedTabs.includes(3) ? 'muted' : currentStep >= 3 ? 'active' : ''}`}>Fechamento do frete</div>
                  <div className={`step-description ${currentStep >= 3 ? 'active' : ''}`}>
                    Faça a coleta e receba o adiantamento no Pix da sua Carteira Fretebras:
                  </div>

                  {/* Pix info - only show if step 3 is active */}
                  {currentStep >= 3 && (
                    <div className="pix-info">
                      <div className="pix-key-row">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.82495 8.94134C7.96257 8.80376 8.20214 8.80333 8.3398 8.94134L10.3007 10.9015C10.6634 11.264 11.1457 11.464 11.6585 11.464H11.8945L9.40464 13.9546L9.25308 14.0906C8.52508 14.6842 7.47475 14.6842 6.74683 14.0906L6.59605 13.9546L4.11245 11.471H4.49917C4.94784 11.471 5.37333 11.3184 5.71558 11.0374L5.85699 10.9093L7.82495 8.94134ZM3.5562 5.08509C3.58786 5.09701 3.62188 5.1054 3.65777 5.1054H4.49917C4.85284 5.10545 5.19926 5.249 5.44917 5.49915L7.41714 7.46712C7.60054 7.65028 7.84177 7.74212 8.08277 7.74212C8.3235 7.74202 8.56423 7.64972 8.74761 7.46634L10.7085 5.50618C10.9273 5.28726 11.2198 5.1503 11.5265 5.11946L11.6585 5.11243H12.3429C12.3806 5.11238 12.4162 5.10375 12.4492 5.09055L13.9546 6.59602C14.7298 7.3715 14.7297 8.62834 13.9546 9.40384L12.4492 10.9093C12.4162 10.8961 12.3806 10.8875 12.3429 10.8874H11.6585C11.3048 10.8874 10.9585 10.7438 10.7085 10.4937L8.74761 8.53352C8.3923 8.17793 7.77282 8.17822 7.41714 8.53352L5.44917 10.5007C5.19926 10.7508 4.85284 10.8944 4.49917 10.8945H3.65777C3.62188 10.8945 3.58792 10.9029 3.5562 10.9148L2.04605 9.40384C1.31902 8.6768 1.27325 7.52681 1.90933 6.7468L2.04605 6.59602L3.5562 5.08509ZM6.59605 2.04602C7.37154 1.27047 8.62903 1.27047 9.40464 2.04602L11.8945 4.53587H11.6585C11.1457 4.53587 10.6634 4.73588 10.3007 5.09837L8.3398 7.0593C8.19779 7.20151 7.96663 7.20079 7.82495 7.0593L5.85699 5.09134C5.49437 4.72889 5.01194 4.52889 4.49917 4.52884H4.11245L6.59605 2.04602Z" fill="#636B7E"/>
                        </svg>
                        <span className="pix-key">(11) 9 9999-8888</span>
                        <button className="copy-button">
                          <span>Copiar</span>
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.69824 5.26721V16.0934H13.5244V17.1559H3.63574V5.26721H4.69824ZM16.3643 2.42737V14.5729H6.21875V2.42737H16.3643ZM7.28125 13.5104H15.3018V3.48987H7.28125V13.5104Z" fill="#0769DA" stroke="#0769DA" strokeWidth="0.0208333"/>
                          </svg>
                        </button>
                      </div>
                      <button className="learn-more-button">Saiba mais</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Points Card */}
          <div className="points-card">
            <svg width="21" height="24" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.5143 0L20.9956 6V18L10.5143 24L0.032959 18L0.032959 6L10.5143 0Z" fill="#F7C53B"/>
              <path opacity="0.1" d="M10.5144 11.9998L20.9957 17.9999L10.5144 24L10.5144 11.9998Z" fill="white"/>
              <path opacity="0.05" d="M10.5142 12L20.9955 6L20.9955 18L10.5142 12Z" fill="#111111"/>
              <path opacity="0.1" d="M10.5142 12L0.0280919 18L0.0280914 6L10.5142 12Z" fill="white"/>
              <path opacity="0.05" d="M10.5142 12L10.5142 6.6482e-05L20.9955 6.00008L10.5142 12Z" fill="white"/>
              <path opacity="0.05" d="M10.5096 12L10.5096 24L0.0330103 18L10.5096 12Z" fill="#111111"/>
              <path d="M10.6076 6L15.857 9V15L10.6076 18L5.35823 15V9L10.6076 6Z" fill="#FFE5A0"/>
            </svg>
            <div className={`points-text ${currentStep >= 3 ? 'completed' : ''}`}>
              {currentStep >= 3 ? 'Você ganhou + 55 pontos. Parabéns!' : '+55 pontos ao concluir todas as etapas.'}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
