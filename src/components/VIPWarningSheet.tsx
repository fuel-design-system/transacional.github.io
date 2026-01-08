import { useEffect } from 'react';
import '../styles/VIPWarningSheet.scss';

interface VIPWarningSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  pixKey: string;
}

export default function VIPWarningSheet({ isOpen, onClose, onConfirm, pixKey }: VIPWarningSheetProps) {
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

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <>
      <div className={`sheet-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
      <div className={`vip-warning-sheet ${isOpen ? 'open' : ''}`}>
        <div className="sheet-handle"></div>
        
        <div className="sheet-content">
          {/* Title */}
          <h2 className="sheet-title">
            <span className="title-bold">Atenção:</span> Para quem não é VIP, é necessário receber usando o Pix da Carteira Fretebras
          </h2>

          {/* Card */}
          <div className="info-card">
            <div className="card-section">
              <p className="card-text">
                <span className="text-medium">Combine com a empresa para pagar o frete no </span>
                <span className="text-bold">Pix da sua Carteira Fretebras</span>
                <span className="text-medium">:</span>
              </p>
              
              <div className="pix-box">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.82495 8.94134C7.96257 8.80376 8.20214 8.80333 8.3398 8.94134L10.3007 10.9015C10.6634 11.264 11.1457 11.464 11.6585 11.464H11.8945L9.40464 13.9546L9.25308 14.0906C8.52508 14.6842 7.47475 14.6842 6.74683 14.0906L6.59605 13.9546L4.11245 11.471H4.49917C4.94784 11.471 5.37333 11.3184 5.71558 11.0374L5.85699 10.9093L7.82495 8.94134ZM3.5562 5.08509C3.58786 5.09701 3.62188 5.1054 3.65777 5.1054H4.49917C4.85284 5.10545 5.19926 5.249 5.44917 5.49915L7.41714 7.46712C7.60054 7.65028 7.84177 7.74212 8.08277 7.74212C8.3235 7.74202 8.56423 7.64972 8.74761 7.46634L10.7085 5.50618C10.9273 5.28726 11.2198 5.1503 11.5265 5.11946L11.6585 5.11243H12.3429C12.3806 5.11238 12.4162 5.10375 12.4492 5.09055L13.9546 6.59602C14.7298 7.3715 14.7297 8.62834 13.9546 9.40384L12.4492 10.9093C12.4162 10.8961 12.3806 10.8875 12.3429 10.8874H11.6585C11.3048 10.8874 10.9585 10.7438 10.7085 10.4937L8.74761 8.53352C8.3923 8.17793 7.77282 8.17822 7.41714 8.53352L5.44917 10.5007C5.19926 10.7508 4.85284 10.8944 4.49917 10.8945H3.65777C3.62188 10.8945 3.58792 10.9029 3.5562 10.9148L2.04605 9.40384C1.31902 8.6768 1.27325 7.52681 1.90933 6.7468L2.04605 6.59602L3.5562 5.08509ZM6.59605 2.04602C7.37154 1.27047 8.62903 1.27047 9.40464 2.04602L11.8945 4.53587H11.6585C11.1457 4.53587 10.6634 4.73588 10.3007 5.09837L8.3398 7.0593C8.19779 7.20151 7.96663 7.20079 7.82495 7.0593L5.85699 5.09134C5.49437 4.72889 5.01194 4.52889 4.49917 4.52884H4.11245L6.59605 2.04602Z" fill="#636B7E"/>
                </svg>
                <div className="pix-info">
                  <div className="pix-key">{pixKey}</div>
                  <div className="copy-link">
                    <span className="copy-text">Copiar</span>
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.69824 5.26733V16.0935H13.5244V17.156H3.63574V5.26733H4.69824ZM16.3643 2.42749V14.573H6.21875V2.42749H16.3643ZM7.28125 13.5105H15.3018V3.48999H7.28125V13.5105Z" fill="#0769DA" stroke="#0769DA" strokeWidth="0.0208333"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-divider"></div>

            <div className="card-section">
              <p className="card-text">
                <span className="text-medium">Depois o valor é </span>
                <span className="text-bold">transferido automaticamente para sua conta em</span>
                <span className="text-medium">:</span>
              </p>
              
              <div className="bank-box">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.69972 11.6V6.06671H4.56638V11.6H3.69972ZM7.56638 11.6V6.06671H8.43305V11.6H7.56638ZM2.11255 13.2667V12.4H13.8869V13.2667H2.11255ZM11.433 11.6V6.06671H12.2997V11.6H11.433ZM2.11255 5.26671V4.05138L7.99972 1.17188L13.8869 4.05138V5.26671H2.11255Z" fill="#636B7E"/>
                </svg>
                <div className="bank-name">Itaú Unibanco SA.</div>
              </div>
            </div>
          </div>

          {/* Warning Box */}
          <div className="warning-box">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.72119 16.584L9.99994 2.83398L18.2787 16.584H1.72119ZM9.99557 14.3404C10.1614 14.3404 10.3019 14.2843 10.417 14.1721C10.5322 14.0599 10.5897 13.9209 10.5897 13.755C10.5897 13.5892 10.5336 13.4487 10.4214 13.3336C10.3092 13.2184 10.1701 13.1609 10.0043 13.1609C9.83848 13.1609 9.698 13.217 9.58286 13.3292C9.46772 13.4414 9.41015 13.5804 9.41015 13.7463C9.41015 13.9121 9.46626 14.0526 9.57848 14.1677C9.69071 14.2829 9.82973 14.3404 9.99557 14.3404ZM9.45827 12.1609H10.5416V8.16086H9.45827V12.1609Z" fill="#636B7E"/>
            </svg>
            <p className="warning-text">
              <span className="text-medium">Se você não for VIP e o pagamento não for realizado no Pix da sua Carteira Fretebras, </span>
              <span className="text-bold">seu acesso à novos fretes poderá ser bloqueado.</span>
            </p>
          </div>

          {/* Button */}
          <button className="confirm-button" onClick={handleConfirm}>
            Entendi
          </button>
        </div>
      </div>
    </>
  );
}
