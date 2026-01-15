import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCountdown } from '../hooks/useCountdown';
import '../styles/PendingPaymentPage.scss';
import freightsData from '../data/freights.json';

export default function PendingPaymentPage() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<'wallet' | 'vip' | null>(null);

  // Get the freight ID from sessionStorage
  const freightId = sessionStorage.getItem('negotiatedFreightId');
  const freight = freightsData.find(f => f.id === Number(freightId));

  // Set countdown to 24 hours from now (usando useMemo para manter a data fixa)
  const targetDate = useMemo(() => {
    const date = new Date();
    date.setHours(date.getHours() + 24);
    return date;
  }, []);
  const countdown = useCountdown(targetDate);

  return (
    <div className="pending-payment-page">
      {/* Header */}
      <div className="payment-header">
        <button className="back-button" onClick={() => navigate('/')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.95185 17.6537L4.29785 11.9999L9.95185 6.34619L11.0056 7.43069L7.18635 11.2499H19.7019V12.7499H7.18635L11.0056 16.5692L9.95185 17.6537Z" fill="#111111"/>
          </svg>
        </button>
        <h1 className="payment-title">Pagamento pendente</h1>
      </div>

      {/* Content */}
      <div className="page-content">
        {/* Título */}
        <h1 className="page-title">
          Identificamos o fechamento de um frete. Pague a taxa de serviço para continuar buscando fretes:
        </h1>

        {/* Payment Options Cards */}
        <div className="payment-options">
          {/* Card 1: Wallet Payment */}
          <div className="payment-card">
            <div className="card-tag-wrapper">
              <div className="card-tag">
                <span className="tag-label">PRA 1 FRETE</span>
              </div>
            </div>
            <div className="card-content">
              <button
                className="option-row"
                onClick={() => setSelectedOption('wallet')}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.4873 3.5127V7.4873H19.0127V4.9873H4.9873V19.0127H19.0127V16.5127H20.4873V20.4873H3.5127V3.5127H20.4873ZM18.9873 7.5127V8.04102H20.5127V7.5127H21.4873V16.4873H20.5127V15.959H18.9873V16.4873H11.5127V7.5127H18.9873ZM20.4873 15.9834V16.4873H19.0127V15.9834H20.4873ZM12.9873 15.0127H20.0127V8.9873H12.9873V15.0127ZM16 10.5127C16.4134 10.5127 16.7644 10.657 17.0537 10.9463C17.343 11.2356 17.4873 11.5866 17.4873 12C17.4873 12.4134 17.343 12.7644 17.0537 13.0537C16.7644 13.343 16.4134 13.4873 16 13.4873C15.5866 13.4873 15.2356 13.343 14.9463 13.0537C14.657 12.7644 14.5127 12.4134 14.5127 12C14.5127 11.5866 14.657 11.2356 14.9463 10.9463C15.2356 10.657 15.5866 10.5127 16 10.5127ZM20.4873 7.5127V8.0166H19.0127V7.5127H20.4873Z" fill="#636B7E" stroke="#636B7E" strokeWidth="0.025"/>
                </svg>
                <div className="option-text">
                  <div className="option-title">Recebe na carteira Fretebras</div>
                  <div className="option-subtitle">Descontar do adiantamento</div>
                </div>
                <div className={`radio-button ${selectedOption === 'wallet' ? 'selected' : ''}`}>
                  {selectedOption === 'wallet' && <div className="radio-dot"></div>}
                </div>
              </button>

              <div className="divider"></div>

              <div className="value-row">
                <span className="value-label">Valor a ser descontado:</span>
                <span className="value-amount">R$ 29,90</span>
              </div>
            </div>
          </div>

          {/* Divider "ou" */}
          <div className="or-divider">
            <div className="divider-line"></div>
            <span className="divider-text">ou</span>
            <div className="divider-line"></div>
          </div>

          {/* Card 2: VIP Subscription */}
          <div className="payment-card">
            <div className="card-tag-wrapper">
              <div className="card-tag">
                <span className="tag-label">QUEM CARREGA SEMPRE</span>
              </div>
            </div>
            <div className="card-content">
              <button
                className="option-row"
                onClick={() => setSelectedOption('vip')}
              >
                <div className="vip-badge">
                  <span className="vip-label">VIP</span>
                </div>
                <div className="option-text">
                  <div className="option-title">Assinar o VIP</div>
                </div>
                <div className={`radio-button ${selectedOption === 'vip' ? 'selected' : ''}`}>
                  {selectedOption === 'vip' && <div className="radio-dot"></div>}
                </div>
              </button>

              <div className="divider"></div>

              <div className="value-row">
                <span className="value-label">Plano VIP Mensal</span>
                <span className="value-amount">R$ 49,90</span>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        {selectedOption && (
          <button
            className="continue-button"
          >
            Continuar
          </button>
        )}

        {/* Menu de ajuda */}
        <div className="help-menu">
          <button className="help-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22.1923V20.6923H19V19.5H15.4615V12.423H19V11C19 9.06667 18.3167 7.41667 16.95 6.05C15.5833 4.68333 13.9333 4 12 4C10.0667 4 8.41667 4.68333 7.05 6.05C5.68333 7.41667 5 9.06667 5 11V12.423H8.5385V19.5H3.5V10.9963C3.5 9.83092 3.72308 8.7325 4.16925 7.701C4.61542 6.6695 5.22442 5.76792 5.99625 4.99625C6.76792 4.22442 7.66992 3.61542 8.70225 3.16925C9.73458 2.72308 10.8338 2.5 12 2.5C13.1662 2.5 14.2654 2.72308 15.2977 3.16925C16.3301 3.61542 17.2321 4.22442 18.0038 4.99625C18.7756 5.76792 19.3846 6.66992 19.8307 7.70225C20.2769 8.73458 20.5 9.83383 20.5 11V22.1923H12ZM5 18H7.0385V13.923H5V18ZM16.9615 18H19V13.923H16.9615V18Z" fill="#111111"/>
            </svg>
            <span className="help-item-text">Atendimento Fretebras</span>
            <svg className="chevron-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.05 12L8.32495 7.275L9.59995 6L15.6 12L9.59995 18L8.32495 16.725L13.05 12Z" fill="#111111"/>
            </svg>
          </button>

          <button className="help-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.989 17.6152C12.2745 17.6152 12.5157 17.5168 12.7125 17.3198C12.9093 17.1226 13.0078 16.8812 13.0078 16.5955C13.0078 16.31 12.9092 16.0688 12.712 15.872C12.5148 15.6753 12.2735 15.577 11.988 15.577C11.7025 15.577 11.4613 15.6756 11.2645 15.8728C11.0677 16.0699 10.9692 16.3113 10.9692 16.5968C10.9692 16.8823 11.0678 17.1234 11.265 17.3203C11.4622 17.5169 11.7035 17.6152 11.989 17.6152ZM11.2808 14.0345H12.6885C12.7013 13.5423 12.7734 13.1491 12.9048 12.8548C13.0363 12.5606 13.3552 12.1706 13.8615 11.6848C14.3013 11.2449 14.6382 10.8388 14.872 10.4663C15.106 10.0939 15.223 9.65417 15.223 9.147C15.223 8.28617 14.9138 7.61375 14.2953 7.12975C13.6766 6.64592 12.9448 6.404 12.1 6.404C11.2653 6.404 10.5747 6.62675 10.028 7.07225C9.48117 7.51775 9.09108 8.04242 8.85775 8.64625L10.1423 9.1615C10.2641 8.8295 10.4724 8.50608 10.7673 8.19125C11.0621 7.87658 11.4999 7.71925 12.0808 7.71925C12.6718 7.71925 13.1086 7.88108 13.3913 8.20475C13.6741 8.52858 13.8155 8.88467 13.8155 9.273C13.8155 9.61283 13.7187 9.92375 13.525 10.2057C13.3315 10.4877 13.0848 10.7602 12.7848 11.023C12.1283 11.6153 11.7135 12.0878 11.5405 12.4405C11.3673 12.793 11.2808 13.3243 11.2808 14.0345ZM12.0018 21.5C10.6878 21.5 9.45267 21.2507 8.2965 20.752C7.14033 20.2533 6.13467 19.5766 5.2795 18.7218C4.42433 17.8669 3.74725 16.8617 3.24825 15.706C2.74942 14.5503 2.5 13.3156 2.5 12.0018C2.5 10.6878 2.74933 9.45267 3.248 8.2965C3.74667 7.14033 4.42342 6.13467 5.27825 5.2795C6.13308 4.42433 7.13833 3.74725 8.294 3.24825C9.44967 2.74942 10.6844 2.5 11.9983 2.5C13.3123 2.5 14.5473 2.74933 15.7035 3.248C16.8597 3.74667 17.8653 4.42342 18.7205 5.27825C19.5757 6.13308 20.2528 7.13833 20.7518 8.294C21.2506 9.44967 21.5 10.6844 21.5 11.9983C21.5 13.3123 21.2507 14.5473 20.752 15.7035C20.2533 16.8597 19.5766 17.8653 18.7218 18.7205C17.8669 19.5757 16.8617 20.2528 15.706 20.7518C14.5503 21.2506 13.3156 21.5 12.0017 21.5ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z" fill="#111111"/>
            </svg>
            <span className="help-item-text">Preciso de ajuda</span>
            <svg className="chevron-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.05 12L8.32495 7.275L9.59995 6L15.6 12L9.59995 18L8.32495 16.725L13.05 12Z" fill="#111111"/>
            </svg>
          </button>

          <button className="help-item" onClick={() => navigate('/contest-service-fee')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.4 16.6538L12 13.0538L15.6 16.6538L16.6538 15.6L13.0538 12L16.6538 8.4L15.6 7.34625L12 10.9462L8.4 7.34625L7.34625 8.4L10.9462 12L7.34625 15.6L8.4 16.6538ZM12.0017 21.5C10.6877 21.5 9.45267 21.2507 8.2965 20.752C7.14033 20.2533 6.13467 19.5766 5.2795 18.7218C4.42433 17.8669 3.74725 16.8617 3.24825 15.706C2.74942 14.5503 2.5 13.3156 2.5 12.0017C2.5 10.6877 2.74933 9.45267 3.248 8.2965C3.74667 7.14033 4.42342 6.13467 5.27825 5.2795C6.13308 4.42433 7.13833 3.74725 8.294 3.24825C9.44967 2.74942 10.6844 2.5 11.9983 2.5C13.3123 2.5 14.5473 2.74933 15.7035 3.248C16.8597 3.74667 17.8653 4.42342 18.7205 5.27825C19.5757 6.13308 20.2528 7.13833 20.7518 8.294C21.2506 9.44967 21.5 10.6844 21.5 11.9983C21.5 13.3123 21.2507 14.5473 20.752 15.7035C20.2533 16.8597 19.5766 17.8653 18.7218 18.7205C17.8669 19.5757 16.8617 20.2528 15.706 20.7518C14.5503 21.2506 13.3156 21.5 12.0017 21.5ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z" fill="#111111"/>
            </svg>
            <span className="help-item-text">Não fiz esse frete</span>
            <svg className="chevron-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.05 12L8.32495 7.275L9.59995 6L15.6 12L9.59995 18L8.32495 16.725L13.05 12Z" fill="#111111"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
