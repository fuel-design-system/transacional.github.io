import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentBlockBottomSheet.scss';

interface PaymentBlockBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PaymentBlockBottomSheet({ isOpen, onClose }: PaymentBlockBottomSheetProps) {
  const navigate = useNavigate();

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

  const handleGoToPayment = () => {
    onClose();
    navigate('/pending-payment');
  };

  return (
    <div className={`payment-block-overlay ${isOpen ? 'open' : ''}`} onClick={handleOverlayClick}>
      <div className={`payment-block-sheet ${isOpen ? 'open' : ''}`} onClick={handleContentClick}>
        <div className="payment-sheet-header">
          <div className="holder"></div>
        </div>

        <div className="payment-sheet-content">
          <div className="icon-title-section">
            <svg className="warning-icon" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.50781 53.0688L31.9998 9.06885L58.4918 53.0688H5.50781ZM31.9858 45.8895C32.5165 45.8895 32.966 45.71 33.3345 45.3508C33.7029 44.9917 33.8871 44.5468 33.8871 44.0162C33.8871 43.4855 33.7076 43.036 33.3485 42.6675C32.9894 42.2991 32.5445 42.1148 32.0138 42.1148C31.4831 42.1148 31.0336 42.2944 30.6651 42.6535C30.2967 43.0126 30.1125 43.4575 30.1125 43.9882C30.1125 44.5189 30.292 44.9684 30.6511 45.3369C31.0103 45.7053 31.4551 45.8895 31.9858 45.8895ZM30.2665 38.9148H33.7331V26.1148H30.2665V38.9148Z" fill="#D92641"/>
            </svg>

            <h2 className="payment-sheet-title">Para visualizar esse frete, pague a taxa de serviço pendente.</h2>
          </div>

          <div className="button-group">
            <button className="primary-button" onClick={handleGoToPayment}>
              <span>Ir para pagamento</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.3335 8.00006H14.6668M14.6668 8.00006L10.6668 12M14.6668 8.00006L10.6668 4" stroke="white" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <button className="secondary-button" onClick={onClose}>
              <span>Agora não, voltar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
