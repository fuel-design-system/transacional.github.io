import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCountdown } from '../hooks/useCountdown';
import '../styles/PendingPaymentPage.scss';
import freightsData from '../data/freights.json';

export default function PendingPaymentPage() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<'pix' | 'card' | 'vip' | 'new-card' | null>(null);

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

        {/* Divider */}
        <div className="page-divider"></div>

        {/* VIP Card */}
        <div className="vip-card">
          <div className="vip-card-content">
            {/* Icon and Title */}
            <div className="vip-header">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24.7704 26.0091L31.2831 12.8657H32.0524L39.1651 26.0091H24.7704ZM30.8111 53.6351L8.33978 28.3891H30.8111V53.6351ZM33.1911 53.6351V28.3891H55.6624L33.1911 53.6351ZM41.8678 26.0091L34.2371 11.8657H50.7911L56.3958 26.0091H41.8678ZM7.60645 26.0091L13.2111 11.8657H29.1651L22.0678 26.0091H7.60645Z" fill="#0769DA"/>
              </svg>
              <h2 className="vip-title">Assine o VIP agora e fique isento das taxas de serviço.</h2>
            </div>

            {/* Divider 1 */}
            <div className="vip-divider"></div>

            {/* Price Info */}
            <div className="vip-price-row">
              <span className="vip-price-label">Mensalidade:</span>
              <span className="vip-price-value">R$ 49,90</span>
            </div>

            {/* Divider 2 */}
            <div className="vip-divider"></div>

            {/* Benefits and Button */}
            <div className="vip-benefits-section">
              <div className="vip-benefits">
                {/* Benefit 1 */}
                <div className="vip-benefit">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.85694 0.857178C5.67025 0.857178 4.51021 1.20907 3.52351 1.86836C2.53682 2.52765 1.76778 3.46472 1.31366 4.56108C0.859533 5.65743 0.740713 6.86383 0.972225 8.02772C1.20374 9.1916 1.77518 10.2607 2.6143 11.0998C3.45341 11.9389 4.52251 12.5104 5.68639 12.7419C6.85028 12.9734 8.05668 12.8546 9.15304 12.4005C10.2494 11.9463 11.1865 11.1773 11.8458 10.1906C12.505 9.2039 12.8569 8.04386 12.8569 6.85718C12.8569 5.26588 12.2248 3.73975 11.0996 2.61454C9.97436 1.48932 8.44823 0.857178 6.85694 0.857178V0.857178ZM7.58693 10.1522C7.5582 10.1568 7.53199 10.1714 7.51282 10.1933C7.49365 10.2152 7.48273 10.2431 7.48193 10.2722V10.6572C7.48193 10.8229 7.41609 10.9819 7.29888 11.0991C7.18167 11.2163 7.0227 11.2822 6.85694 11.2822C6.69117 11.2822 6.5322 11.2163 6.41499 11.0991C6.29778 10.9819 6.23194 10.8229 6.23194 10.6572V10.3022C6.23194 10.269 6.21877 10.2372 6.19532 10.2138C6.17188 10.1903 6.14009 10.1772 6.10694 10.1772H5.53194C5.36618 10.1772 5.2072 10.1113 5.08999 9.99412C4.97278 9.87691 4.90694 9.71794 4.90694 9.55218C4.90694 9.38642 4.97278 9.22744 5.08999 9.11023C5.2072 8.99302 5.36618 8.92718 5.53194 8.92718H7.32693C7.45314 8.92256 7.57408 8.87542 7.67012 8.79341C7.76616 8.71139 7.83166 8.59933 7.85598 8.4754C7.8803 8.35147 7.86202 8.22296 7.8041 8.11074C7.74619 7.99851 7.65203 7.90915 7.53693 7.85718L5.71694 7.12218C5.34569 6.97721 5.03304 6.71314 4.82804 6.37136C4.62303 6.02958 4.53725 5.62943 4.58415 5.23365C4.63105 4.83787 4.80797 4.46885 5.08718 4.18445C5.36639 3.90005 5.73209 3.71636 6.12694 3.66218C6.15651 3.65739 6.18339 3.64213 6.20266 3.61918C6.22193 3.59624 6.23232 3.56714 6.23194 3.53718V3.15718C6.23194 2.99142 6.29778 2.83245 6.41499 2.71524C6.5322 2.59803 6.69117 2.53218 6.85694 2.53218C7.0227 2.53218 7.18167 2.59803 7.29888 2.71524C7.41609 2.83245 7.48193 2.99142 7.48193 3.15718V3.50718C7.48193 3.54033 7.4951 3.57212 7.51855 3.59557C7.54199 3.61901 7.57378 3.63218 7.60693 3.63218H8.18193C8.34769 3.63218 8.50667 3.69803 8.62388 3.81524C8.74109 3.93245 8.80693 4.09142 8.80693 4.25718C8.80693 4.42294 8.74109 4.58191 8.62388 4.69912C8.50667 4.81633 8.34769 4.88218 8.18193 4.88218H6.38694C6.25659 4.88167 6.13016 4.92665 6.02942 5.00936C5.92868 5.09208 5.85994 5.20734 5.83507 5.33529C5.81019 5.46323 5.83072 5.59585 5.89313 5.71029C5.95553 5.82472 6.0559 5.9138 6.17694 5.96218L7.99693 6.69218C8.36818 6.83714 8.68083 7.10121 8.88583 7.44299C9.09084 7.78477 9.17662 8.18492 9.12972 8.5807C9.08282 8.97648 8.9059 9.3455 8.62669 9.6299C8.34748 9.9143 7.98178 10.098 7.58693 10.1522V10.1522Z" fill="#0769DA"/>
                  </svg>
                  <div className="benefit-text">
                    <div className="benefit-title">100% isento de taxa de serviço</div>
                    <div className="benefit-subtitle">Você só paga a mensalidade do plano.</div>
                  </div>
                </div>

                {/* Benefit 2 */}
                <div className="vip-benefit">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_1106_7165)">
                      <path d="M13.196 5.51993C13.1446 5.45136 10.401 2.28564 6.85714 2.28564C4.5708 2.28564 2.28445 3.55422 0.518253 5.51993C0.184877 5.88437 0 6.36036 0 6.85422C0 7.34808 0.184877 7.82406 0.518253 8.1885C3.06753 10.9999 5.59394 11.4285 6.85714 11.4285C8.12035 11.4285 10.6696 10.9771 13.196 8.1885C13.5294 7.82406 13.7143 7.34808 13.7143 6.85422C13.7143 6.36036 13.5294 5.88437 13.196 5.51993ZM12.3501 7.4285C12.2929 7.49707 9.83511 10.3599 6.85714 10.2856C4.03922 10.2171 1.98723 8.11422 1.35849 7.4285C1.21549 7.27253 1.13617 7.06864 1.13617 6.85707C1.13617 6.6455 1.21549 6.44161 1.35849 6.28564C2.71314 4.79993 4.75942 3.38279 6.85714 3.4285C9.38927 3.37136 11.6699 5.54279 12.3501 6.28564C12.4943 6.441 12.5745 6.64512 12.5745 6.85707C12.5745 7.06903 12.4943 7.27315 12.3501 7.4285Z" fill="#0769DA"/>
                      <path d="M6.85714 4.57136H6.63429C6.60999 4.57381 6.58672 4.58245 6.56671 4.59646C6.54671 4.61047 6.53062 4.62937 6.52 4.65136C6.50746 4.67308 6.50086 4.69771 6.50086 4.72279C6.50086 4.74786 6.50746 4.7725 6.52 4.79422C6.63473 4.96617 6.70067 5.16602 6.7108 5.37248C6.72093 5.57895 6.67488 5.78429 6.57754 5.96666C6.4802 6.14902 6.33523 6.30156 6.15805 6.40805C5.98088 6.51454 5.77814 6.57098 5.57143 6.57136C5.31099 6.56954 5.05898 6.47882 4.85714 6.31422C4.83629 6.30218 4.81265 6.29584 4.78857 6.29584C4.7645 6.29584 4.74085 6.30218 4.72 6.31422C4.69674 6.32124 4.67589 6.33456 4.65975 6.35272C4.64361 6.37088 4.63282 6.39315 4.62857 6.41707C4.59367 6.56124 4.57451 6.70877 4.57143 6.85707C4.57143 7.30914 4.70548 7.75106 4.95664 8.12695C5.2078 8.50283 5.56478 8.7958 5.98244 8.9688C6.4001 9.1418 6.85968 9.18706 7.30306 9.09887C7.74645 9.01067 8.15372 8.79298 8.47339 8.47332C8.79305 8.15365 9.01074 7.74638 9.09894 7.30299C9.18713 6.85961 9.14187 6.40003 8.96887 5.98237C8.79587 5.56471 8.5029 5.20773 8.12702 4.95657C7.75113 4.70541 7.30921 4.57136 6.85714 4.57136Z" fill="#0769DA"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_1106_7165">
                        <rect width="13.7143" height="13.7143" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="benefit-text">
                    <div className="benefit-title">Seu perfil destacado</div>
                    <div className="benefit-subtitle">Seja visto pelas melhores empresas</div>
                  </div>
                </div>
              </div>

              {/* VIP Button */}
              <button className="vip-button">
                <span>Assinar VIP</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.3335 8.00006H14.6668M14.6668 8.00006L10.6668 12M14.6668 8.00006L10.6668 4" stroke="white" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Service Fee Info Card */}
        <div className="service-fee-info-card">
          <div className="fee-info-content">
            {/* Title and Description */}
            <div className="fee-info-header">
              <h3 className="fee-info-title">
                O que é a <span className="title-highlight">taxa de serviço</span>?
              </h3>
              <p className="fee-info-description">
                É a taxa que a Fretebras usa pra manter a plataforma, o atendimento e sua segurança nas negociações.
              </p>
            </div>

            {/* Topics */}
            <div className="fee-info-topics">
              {/* Topic 1 */}
              <div className="fee-topic">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.37293 2.11536L8.00157 14.9545L12.6296 2.11536M0.5 6.14547H15.4995M4.88705 6.14546L8.00141 2L11.1158 6.14546M12.9844 2.41455C12.8877 2.28583 12.7623 2.18136 12.6182 2.10941C12.474 2.03746 12.3151 2 12.1539 2H3.84896C3.6878 2 3.52885 2.03746 3.3847 2.10941C3.24055 2.18136 3.11516 2.28583 3.01846 2.41455L0.708987 5.48979C0.56883 5.67646 0.495863 5.90489 0.501892 6.1381C0.507921 6.37131 0.592592 6.59567 0.742206 6.77488L7.20486 14.5822C7.3023 14.6983 7.42406 14.7917 7.56157 14.8558C7.69908 14.9199 7.849 14.9531 8.00076 14.9531C8.15252 14.9531 8.30243 14.9199 8.43994 14.8558C8.57745 14.7917 8.69921 14.6983 8.79665 14.5822L15.2593 6.77488C15.4089 6.59567 15.4936 6.37131 15.4996 6.1381C15.5056 5.90489 15.4327 5.67646 15.2925 5.48979L12.9844 2.41455Z" stroke="#0769DA" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="topic-text topic-bold">Motoristas VIP não pagam essa taxa</span>
              </div>

              <div className="topic-divider"></div>

              {/* Topic 2 */}
              <div className="fee-topic">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.5 3.5L8 0.5L15.5 3.5M0.5 3.5L8 6.5M0.5 3.5V12.5L8 15.5M8 6.5L15.5 3.5M8 6.5V15.5M15.5 3.5V12.5L8 15.5M12.1247 4.85L4.62467 1.85M13.75 11L12.5 11.5" stroke="#0769DA" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="topic-text">Só é cobrada quando você carrega um frete pela Fretebras</span>
              </div>

              <div className="topic-divider"></div>

              {/* Topic 3 */}
              <div className="fee-topic">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 5H7.19267C6.86912 4.97417 6.55052 5.0915 6.32101 5.32101C6.0915 5.55052 5.97417 5.86912 6 6.19267C6 7.5 10 8.5 10 9.80733C10.0058 10.1254 9.88207 10.4322 9.65712 10.6571C9.43217 10.8821 9.12541 11.0058 8.80733 11H6M8 5V3.5M8 12.5V11M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z" stroke="#0769DA" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="topic-text">Não mexe no valor que a empresa te paga pelo frete.</span>
              </div>
            </div>

            {/* Learn More Button */}
            <button className="learn-more-button">
              <span>Saiba mais sobre a taxa</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1106_7220)">
                  <path d="M1.55859 2.17001V13.83C1.55858 14.0029 1.60339 14.1728 1.68865 14.3233C1.77391 14.4737 1.89671 14.5994 2.04507 14.6882C2.19342 14.777 2.36226 14.8258 2.53511 14.8298C2.70795 14.8339 2.8789 14.7931 3.03126 14.7113L13.9133 8.88135C14.0727 8.79588 14.2059 8.66878 14.2988 8.51358C14.3917 8.35838 14.4408 8.18089 14.4408 8.00001C14.4408 7.81914 14.3917 7.64165 14.2988 7.48645C14.2059 7.33124 14.0727 7.20414 13.9133 7.11868L3.03126 1.28868C2.8789 1.20696 2.70795 1.16614 2.53511 1.1702C2.36226 1.17426 2.19342 1.22306 2.04507 1.31185C1.89671 1.40063 1.77391 1.52636 1.68865 1.67677C1.60339 1.82718 1.55858 1.99712 1.55859 2.17001V2.17001Z" stroke="#111111" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
                <defs>
                  <clipPath id="clip0_1106_7220">
                    <rect width="16" height="16" fill="white"/>
                  </clipPath>
                </defs>
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
