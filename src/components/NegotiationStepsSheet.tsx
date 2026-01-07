import { useEffect } from 'react';
import '../styles/NegotiationStepsSheet.scss';

interface NegotiationStepsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  currentStep: number;
}

export default function NegotiationStepsSheet({ isOpen, onClose, currentStep }: NegotiationStepsSheetProps) {
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
            {/* Step 1 */}
            <div className="step-item">
              <div className="step-row">
                <div className={`step-badge ${currentStep >= 1 ? 'active' : ''}`}>
                  <span>1</span>
                </div>
                <div className="step-content">
                  <div className="step-title active">Negociação inicial</div>
                  <div className="step-description">Acerte condições e preço do frete</div>
                </div>
              </div>
              <div className="step-connector"></div>
            </div>

            {/* Step 2 */}
            <div className="step-item">
              <div className="step-row">
                <div className={`step-badge ${currentStep >= 2 ? 'active' : ''}`}>
                  <span>2</span>
                </div>
                <div className="step-content">
                  <div className={`step-title ${currentStep >= 2 ? 'active' : ''}`}>Libere seus documentos</div>
                  <div className="step-description">Envie seus documentos para análise da empresa.</div>
                </div>
              </div>
              <div className="step-connector"></div>
            </div>

            {/* Step 3 */}
            <div className="step-item">
              <div className="step-row">
                <div className={`step-badge ${currentStep >= 3 ? 'active' : ''}`}>
                  <span>3</span>
                </div>
                <div className="step-content">
                  <div className={`step-title ${currentStep >= 3 ? 'active' : ''}`}>Fechamento do frete</div>
                  <div className="step-description">Faça a coleta e receba o adiantamento.</div>
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
            <div className="points-text">+55 pontos ao concluir todas as etapas.</div>
          </div>
        </div>
      </div>
    </>
  );
}
