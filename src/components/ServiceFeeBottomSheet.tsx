import { useEffect, useState } from 'react';
import '../styles/ServiceFeeBottomSheet.scss';

interface ServiceFeeBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ServiceFeeBottomSheet({ isOpen, onClose }: ServiceFeeBottomSheetProps) {
  const [showPixContent, setShowPixContent] = useState(false);

  // Prevent body scroll when sheet is open
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

  // Reset to initial state when closing
  useEffect(() => {
    if (!isOpen) {
      setShowPixContent(false);
    }
  }, [isOpen]);

  const handleContinue = () => {
    setShowPixContent(true);
  };

  const handleCopyPix = () => {
    const pixKey = '7192d4fd-1d90-4b2c-90fa-67a4akfl';
    navigator.clipboard.writeText(pixKey);
    // You can add a toast notification here if needed
  };

  const handleWhatsApp = () => {
    const pixKey = '7192d4fd-1d90-4b2c-90fa-67a4akfl';
    const message = `Olá! Aqui está minha chave Pix para receber o pagamento do frete: ${pixKey}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="service-fee-overlay" onClick={onClose} />
      <div className="service-fee-bottom-sheet">
        <div className="sheet-holder" />
        
        <button className="sheet-close-button" onClick={onClose} aria-label="Fechar">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.75 16.25L16.25 3.75M3.75 3.75L16.25 16.25" stroke="#BABEC9" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Initial Content - Service Fee Warning */}
        <div className={`sheet-content ${showPixContent ? 'hide' : ''}`}>
          <div className="sheet-title-section">
            <h2 className="sheet-title">Atenção! Caso feche esse frete, será cobrado uma taxa de serviço:</h2>
          </div>

          <div className="fee-card">
            <div className="fee-row">
              <div className="fee-label">Valor da taxa:</div>
              <div className="fee-value">R$ 49,90</div>
            </div>
          </div>

          <div className="sheet-buttons">
            <button className="primary-button" onClick={handleContinue}>
              Continuar
            </button>
          </div>
        </div>

        {/* Pix Content - Wallet Information */}
        <div className={`pix-content ${showPixContent ? '' : 'hide'}`}>
          <div className="pix-title-section">
            <h2 className="pix-title">Receba o frete na sua Carteira Fretebras e faremos o desconto da taxa:</h2>
          </div>

          <div className="pix-card">
            <div className="pix-info-row">
              <div className="pix-text-content">
                <div className="pix-label">Receba nessa Chave Pix:</div>
                <div className="pix-key-row">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.82508 8.94134C7.96269 8.80376 8.20226 8.80333 8.33992 8.94134L10.3009 10.9015C10.6635 11.264 11.1458 11.464 11.6587 11.464H11.8946L9.40476 13.9546L9.2532 14.0906C8.52521 14.6842 7.47487 14.6842 6.74695 14.0906L6.59617 13.9546L4.11258 11.471H4.4993C4.94796 11.471 5.37345 11.3184 5.7157 11.0374L5.85711 10.9093L7.82508 8.94134ZM3.55633 5.08509C3.58798 5.09701 3.622 5.1054 3.65789 5.1054H4.4993C4.85297 5.10545 5.19938 5.249 5.4493 5.49915L7.41726 7.46712C7.60066 7.65028 7.84189 7.74212 8.08289 7.74212C8.32362 7.74202 8.56435 7.64972 8.74773 7.46634L10.7087 5.50618C10.9274 5.28726 11.2199 5.1503 11.5266 5.11946L11.6587 5.11243H12.343C12.3807 5.11238 12.4163 5.10375 12.4493 5.09055L13.9548 6.59602C14.7299 7.3715 14.7299 8.62834 13.9548 9.40384L12.4493 10.9093C12.4163 10.8961 12.3807 10.8875 12.343 10.8874H11.6587C11.3049 10.8874 10.9586 10.7438 10.7087 10.4937L8.74773 8.53352C8.39242 8.17793 7.77294 8.17822 7.41726 8.53352L5.4493 10.5007C5.19938 10.7508 4.85297 10.8944 4.4993 10.8945H3.65789C3.622 10.8945 3.58804 10.9029 3.55633 10.9148L2.04617 9.40384C1.31914 8.67679 1.27338 7.52681 1.90945 6.7468L2.04617 6.59602L3.55633 5.08509ZM6.59617 2.04602C7.37167 1.27047 8.62915 1.27047 9.40476 2.04602L11.8946 4.53587H11.6587C11.1458 4.53587 10.6635 4.73588 10.3009 5.09837L8.33992 7.0593C8.19791 7.20151 7.96675 7.20079 7.82508 7.0593L5.85711 5.09134C5.49449 4.72889 5.01206 4.52889 4.4993 4.52884H4.11258L6.59617 2.04602Z" fill="#111111"/>
                  </svg>
                  <div className="pix-key-value">7192d4fd-1d90-4b2c-90fa-67a4akfl</div>
                </div>
              </div>
              <button className="copy-button-small" onClick={handleCopyPix}>
                Copiar
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.20833 14.5832V2.4165H16.375V14.5832H6.20833ZM7.29167 13.4998H15.2917V3.49984H7.29167V13.4998ZM3.625 17.1665V5.2563H4.70833V16.0832H13.5352V17.1665H3.625Z" fill="#636B7E"/>
                </svg>
              </button>
            </div>

            <div className="pix-divider"></div>

            <div className="pix-transfer-info">
              <span className="transfer-bold">Fique tranquilo! </span>
              <span className="transfer-normal">Iremos transferir todo o valor para sua conta em: </span>
              <span className="transfer-bold">Itaú Unibanco SA.</span>
            </div>
          </div>

          <button className="whatsapp-button" onClick={handleWhatsApp}>
            Enviar no WhatsApp
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.9992 0.666603C6.06394 0.666548 4.20713 1.43546 2.83355 2.8057C1.45998 4.17595 0.681025 6.03641 0.66651 7.98151C0.664569 9.47001 1.12139 10.9226 1.97417 12.1395L1.14313 14.5963C1.12602 14.6502 1.12381 14.7079 1.13672 14.7631C1.14963 14.8182 1.17719 14.8688 1.21646 14.9095C1.25654 14.9495 1.30689 14.9776 1.36191 14.9906C1.41693 15.0037 1.47446 15.0011 1.5281 14.9832L4.08843 14.1663C5.04334 14.7841 6.12853 15.1692 7.25762 15.2912C8.38672 15.4131 9.52855 15.2685 10.5922 14.8688C11.6559 14.4691 12.6121 13.8253 13.3846 12.9887C14.1572 12.1521 14.7248 11.1459 15.0423 10.05C15.3597 8.95408 15.4183 7.79883 15.2133 6.67617C15.0084 5.55352 14.5455 4.49445 13.8616 3.58327C13.1776 2.67208 12.2915 1.93394 11.2738 1.42759C10.2561 0.921243 9.13478 0.660667 7.9992 0.666603V0.666603ZM12.3988 10.9357C12.1948 11.3271 11.8871 11.6542 11.5096 11.8808C11.1322 12.1073 10.6997 12.2245 10.2601 12.2194C9.52615 12.1349 8.81148 11.9273 8.14585 11.6052C6.65715 10.9228 5.3966 9.82218 4.51617 8.43601C3.34294 6.88213 3.29406 5.42651 4.41229 4.22272C4.56718 4.07671 4.75413 3.96948 4.95798 3.90972C5.16183 3.84996 5.37683 3.83936 5.58552 3.87878C5.74341 3.8987 5.89362 3.9588 6.02193 4.05338C6.15025 4.14796 6.25243 4.27389 6.31879 4.41925L6.5571 4.9843L6.94207 5.91172C6.99035 6.00681 7.01552 6.11205 7.01552 6.21881C7.01552 6.32557 6.99035 6.43081 6.94207 6.5259C6.78567 6.83816 6.57923 7.12243 6.33101 7.36733C6.64891 7.84442 7.01773 8.28515 7.43091 8.68168C7.92298 9.11443 8.48789 9.45553 9.0991 9.68894C9.2702 9.46169 9.60017 9.07475 9.71016 8.90278C9.79266 8.76766 9.92394 8.66983 10.0766 8.62977C10.2292 8.5897 10.3913 8.6105 10.529 8.68782C10.7612 8.76766 12.0627 9.41255 12.0627 9.41255C12.2291 9.46678 12.3744 9.57202 12.4782 9.7135V9.7135C12.5725 9.90641 12.6148 10.1208 12.6009 10.3353C12.587 10.5498 12.5173 10.7568 12.3988 10.9357Z" fill="white"/>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
