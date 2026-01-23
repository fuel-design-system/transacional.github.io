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
          Identificamos que você carregou um frete. Pague a taxa de serviço pendente para continuar negociando fretes:
        </h1>

        {/* Service Fee Card */}
        <div className="service-fee-card">
          <div className="fee-info-row">
            <span className="fee-label">Valor da taxa:</span>
            <span className="fee-value">R$ 29,90</span>
          </div>
        </div>

        {/* Freight Loaded Card */}
        {freight && (
          <div className="freight-loaded-card">
            <div className="freight-loaded-title">Frete que você carregou:</div>

            <div className="freight-loaded-info">
              {/* Price and Product */}
              <div className="freight-price-section">
                <div className="freight-price">R$ {freight.price}</div>
                <div className="freight-details">
                  <span className="freight-product">{freight.product}</span>
                  <span className="freight-separator">•</span>
                  <span className="freight-weight">{freight.weight}</span>
                </div>
              </div>

              {/* Route */}
              <div className="freight-route">
                <svg className="route-icon" width="7" height="46" viewBox="0 0 7 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="3.5" cy="8.5" r="3" stroke="#BABEC9"/>
                  <rect x="3" y="16" width="1" height="14" fill="#BABEC9"/>
                  <path d="M6.19141 34.5L3.5 39.8818L0.808594 34.5H6.19141Z" stroke="#BABEC9"/>
                </svg>
                <div className="route-cities">
                  <div className="origin-city">{freight.origin}</div>
                  <div className="destination-city">{freight.destination}</div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="freight-divider"></div>

            {/* Confirmation Info */}
            <div className="confirmation-info">
              <div className="confirmation-avatar">
                {freight.companyAvatar ? (
                  <img src={freight.companyAvatar} alt={freight.company} />
                ) : (
                  <div className="avatar-placeholder">
                    {freight.company.charAt(0)}
                  </div>
                )}
              </div>
              <div className="confirmation-text">
                <span className="confirmation-normal">Viagem confirmada por</span>{' '}
                <span className="confirmation-bold">Carlos S.</span>{' '}
                <span className="confirmation-normal">em {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' })}</span>{' '}
                <span className="confirmation-normal">(Operador da empresa </span>
                <span className="confirmation-bold">{freight.company}</span>
                <span className="confirmation-normal">)</span>
              </div>
            </div>
          </div>
        )}

        {/* Payment Options Card */}
        <div className="payment-options-card">
          <div className="payment-options-title">Escolha uma forma de pagamento:</div>

          <div className="payment-options-list">
            {/* Option 1: Pagar via Pix */}
            <button
              className="payment-option"
              onClick={() => setSelectedOption('pix')}
            >
              <div className="option-content">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.7319 13.4361C11.9419 13.2261 12.3089 13.2254 12.519 13.4361L15.5112 16.4283C16.0646 16.9815 16.8007 17.2867 17.5834 17.2867H17.9438L14.143 21.0875L14.0297 21.1949C12.8784 22.2349 11.1214 22.2349 9.97013 21.1949L9.85685 21.0875L6.06681 17.2974H6.65665C7.43922 17.2974 8.17545 16.993 8.72892 16.44L11.7319 13.4361ZM5.21818 7.55128C5.26644 7.56946 5.31777 7.5825 5.37247 7.58253H6.65665C7.19652 7.58253 7.72537 7.80128 8.10685 8.18312L11.1098 11.1861C11.3897 11.4658 11.7575 11.606 12.1254 11.606C12.493 11.606 12.861 11.4661 13.141 11.1861L16.1332 8.19386C16.467 7.85986 16.9133 7.6502 17.3813 7.60304L17.5834 7.59327H18.6274C18.6852 7.59327 18.7399 7.58031 18.7905 7.56007L21.0873 9.85695C22.2707 11.0406 22.2708 12.9595 21.0873 14.1431L18.7905 16.44C18.7399 16.4197 18.6852 16.4068 18.6274 16.4068H17.5834C17.0436 16.4068 16.5147 16.1879 16.1332 15.8062L13.141 12.814C12.5987 12.2712 11.6526 12.2716 11.1098 12.814L8.10685 15.8169C7.72537 16.1987 7.19652 16.4175 6.65665 16.4175H5.37247C5.31777 16.4175 5.26653 16.4306 5.21818 16.4488L2.91251 14.1431C1.76592 12.9965 1.73026 11.16 2.80509 9.97023L2.91251 9.85695L5.21818 7.55128ZM9.85685 2.91259C11.0404 1.72902 12.9593 1.72899 14.143 2.91259L17.9438 6.71339H17.5834C16.8009 6.71339 16.0646 7.01785 15.5112 7.57081L12.518 10.564C12.3011 10.7811 11.948 10.7803 11.7319 10.564L8.72892 7.56007C8.17545 7.00693 7.43927 6.70265 6.65665 6.70264H6.06681L9.85685 2.91259Z" fill="#636B7E"/>
                </svg>
                <span className="option-label">Pagar via Pix</span>
              </div>
              <div className={`radio-button ${selectedOption === 'pix' ? 'selected' : ''}`}>
                {selectedOption === 'pix' && <div className="radio-dot"></div>}
              </div>
            </button>

            <div className="option-divider"></div>

            {/* Option 2: Card Payment */}
            <button
              className="payment-option"
              onClick={() => setSelectedOption('card')}
            >
              <div className="option-content">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.2451 6.1792H8.75537V17.8413H15.2451V6.1792Z" fill="#FF5F00"/>
                  <path d="M9.16737 12.0105C9.16635 10.8874 9.42086 9.77873 9.91165 8.76848C10.4024 7.75824 11.1166 6.87289 12.0002 6.17946C10.906 5.31945 9.59201 4.78462 8.20829 4.63611C6.82457 4.48759 5.42699 4.73138 4.17527 5.33961C2.92356 5.94784 1.86822 6.89597 1.12988 8.07562C0.391546 9.25528 0 10.6189 0 12.0105C0 13.4022 0.391546 14.7658 1.12988 15.9455C1.86822 17.1251 2.92356 18.0732 4.17527 18.6815C5.42699 19.2897 6.82457 19.5335 8.20829 19.385C9.59201 19.2365 10.906 18.7016 12.0002 17.8416C11.1166 17.1482 10.4024 16.2628 9.91165 15.2526C9.42087 14.2423 9.16635 13.1337 9.16737 12.0105V12.0105Z" fill="#EB001B"/>
                  <path d="M23.9998 12.0105C23.9998 13.4022 23.6083 14.7658 22.87 15.9454C22.1317 17.1251 21.0764 18.0732 19.8247 18.6814C18.5731 19.2897 17.1755 19.5335 15.7918 19.385C14.4081 19.2365 13.0941 18.7016 12 17.8416C12.8828 17.1475 13.5964 16.262 14.0871 15.2519C14.5778 14.2418 14.8328 13.1335 14.8328 12.0105C14.8328 10.8876 14.5778 9.77925 14.0871 8.76917C13.5964 7.75908 12.8828 6.87359 12 6.17946C13.0941 5.31945 14.4081 4.78462 15.7918 4.63611C17.1755 4.48759 18.5731 4.73139 19.8247 5.33962C21.0764 5.94786 22.1317 6.89599 22.87 8.07565C23.6083 9.25531 23.9998 10.6189 23.9998 12.0105V12.0105Z" fill="#F79E1B"/>
                  <path d="M23.2925 16.6062V16.3675H23.3887V16.3188H23.1436V16.3675H23.2399V16.6062H23.2925ZM23.7685 16.6062V16.3184H23.6933L23.6069 16.5164L23.5204 16.3184H23.4452V16.6062H23.4983V16.3891L23.5794 16.5763H23.6344L23.7154 16.3886V16.6062H23.7685Z" fill="#F79E1B"/>
                </svg>
                <div className="card-info">
                  <span className="option-label">•••• 4296</span>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.375 15.625H5.30125L13.0817 7.84454L12.1554 6.93913L4.375 14.7195V15.625ZM2.75 17.25V14.0337L14.375 2.33496L17.694 5.5385L5.96625 17.25H2.75ZM12.6313 7.38954L12.1554 6.93913L13.0817 7.84454L12.6313 7.38954Z" fill="#111111"/>
                  </svg>
                </div>
              </div>
              <div className={`radio-button ${selectedOption === 'card' ? 'selected' : ''}`}>
                {selectedOption === 'card' && <div className="radio-dot"></div>}
              </div>
            </button>

            <div className="option-divider"></div>

            {/* Option 3: VIP Subscription */}
            <button
              className="payment-option"
              onClick={() => setSelectedOption('vip')}
            >
              <div className="option-content">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.11365 8.40375L11.7059 3.25H12.2944L14.8866 8.40375H9.11365ZM11.4039 19.8885L2.82715 9.59625H11.4039V19.8885ZM12.5964 19.8885V9.59625H21.1731L12.5964 19.8885ZM16.2001 8.40375L13.6386 3.25H18.8464L21.4231 8.40375H16.2001ZM2.57715 8.40375L5.1539 3.25H10.3616L7.80015 8.40375H2.57715Z" fill="#0769DA"/>
                </svg>
                <div className="vip-text">
                  <span className="option-label">Assine o VIP e não pague a taxa!</span>
                  <span className="vip-price">Mensalidade: R$ 49,90</span>
                </div>
              </div>
              <div className={`radio-button ${selectedOption === 'vip' ? 'selected' : ''}`}>
                {selectedOption === 'vip' && <div className="radio-dot"></div>}
              </div>
            </button>

            <div className="option-divider"></div>

            {/* Option 4: Add New Card */}
            <button
              className="payment-option"
              onClick={() => setSelectedOption('new-card')}
            >
              <div className="option-content">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.5 19.5V4.5H21.5V19.5H2.5ZM4 11.596H20V8.404H4V11.596Z" fill="#636B7E"/>
                </svg>
                <span className="option-label">Adicionar novo cartão</span>
              </div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.25 16.75H12.75V12.75H16.75V11.25H12.75V7.25H11.25V11.25H7.25V12.75H11.25V16.75ZM12.0018 21.5C10.6878 21.5 9.45267 21.2507 8.2965 20.752C7.14033 20.2533 6.13467 19.5766 5.2795 18.7218C4.42433 17.8669 3.74725 16.8617 3.24825 15.706C2.74942 14.5503 2.5 13.3156 2.5 12.0018C2.5 10.6878 2.74933 9.45267 3.248 8.2965C3.74667 7.14033 4.42342 6.13467 5.27825 5.2795C6.13308 4.42433 7.13833 3.74725 8.294 3.24825C9.44967 2.74942 10.6844 2.5 11.9982 2.5C13.3123 2.5 14.5473 2.74933 15.7035 3.248C16.8597 3.74667 17.8653 4.42342 18.7205 5.27825C19.5757 6.13308 20.2528 7.13833 20.7518 8.294C21.2506 9.44967 21.5 10.6844 21.5 11.9982C21.5 13.3123 21.2507 14.5473 20.752 15.7035C20.2533 16.8597 19.5766 17.8653 18.7218 18.7205C17.8669 19.5757 16.8617 20.2528 15.706 20.7518C14.5503 21.2506 13.3156 21.5 12.0018 21.5ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z" fill="#111111"/>
              </svg>
            </button>
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
