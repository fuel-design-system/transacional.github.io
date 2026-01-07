import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/FreightDetail.scss';
import freightsData from '../data/freights.json';

export default function FreightDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isExiting, setIsExiting] = useState(false);
  const freight = freightsData.find(f => f.id === Number(id));

  if (!freight) {
    return <div>Frete não encontrado</div>;
  }

  const handleBackClick = () => {
    setIsExiting(true);
    setTimeout(() => {
      navigate(-1);
    }, 300);
  };

  return (
    <div className={`freight-detail-page ${isExiting ? 'exiting' : ''}`}>
      <div className="detail-content">
        {/* Top Bar */}
        <div className="top-bar">
          <button className="back-button" onClick={handleBackClick}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.95185 17.6537L4.29785 11.9999L9.95185 6.34619L11.0056 7.43069L7.18635 11.2499H19.7019V12.7499H7.18635L11.0056 16.5692L9.95185 17.6537Z" fill="#111111"/>
            </svg>
          </button>
          <h1 className="page-title">Frete {freight.origin.split(',')[1]?.trim()}-{freight.destination.split(',')[1]?.trim()}, {freight.product}</h1>
        </div>

        {/* Route Card */}
        <div className="detail-card">
          {/* Time Info */}
          <div className="time-info">
            Há 3min • 50km da sua localização
          </div>

          <div className="route-section">
            <svg className="route-graphic" width="7" height="90" viewBox="0 0 7 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="3.5" cy="7.5" r="3" stroke="#BABEC9"/>
              <rect x="3" y="15" width="1" height="60" fill="#DFE1E6"/>
              <path d="M6.19141 79.5L3.5 84.8818L0.808594 79.5H6.19141Z" stroke="#BABEC9"/>
            </svg>
            <div className="route-details">
              <div className="location-block">
                <div className="city-name">{freight.origin}</div>
                <div className="date-info">14/01/2026</div>
              </div>
              <div className="location-block">
                <div className="city-name">{freight.destination}</div>
                <div className="date-info">15/01/2026</div>
              </div>
            </div>
          </div>
        </div>

        {/* Description Card */}
        <div className="detail-card">
          <div className="description-section">
            CARRETA DE 15 METROS / PESO 5 TON LIVRE DE CARGA E DESCARGA / 5 DIAS PARA DEPOSITO DEPOIS DO CANHOTO.
          </div>
        </div>

        {/* Cargo Card */}
        <div className="detail-card">
          <div className="cargo-section">
            <div className="section-title">Carga</div>
            <div className="cargo-items">
              <div className="cargo-item">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.5 3.5C3.42893 2.32843 5.07107 1.67157 8 0.5L15.5 3.5M0.5 3.5L8 6.5M0.5 3.5V12.5L8 15.5M8 6.5L15.5 3.5M8 6.5V15.5M15.5 3.5V12.5L8 15.5M13.75 11L12.5 11.5" stroke="#636B7E" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>{freight.product}</span>
              </div>
              <div className="cargo-item">
                <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.513672 4.68359L2.49121 0.774306C2.57631 0.606062 2.74883 0.5 2.93737 0.5H7.52892M14.1563 4.68359L12.5837 0.811849C12.5071 0.623319 12.324 0.5 12.1205 0.5H7.52892M12.5837 13.1121H8.32526M7.52892 0.5V4.34143M7.52892 4.34143H0.5V14.9979H14.1561V4.34143H7.52892Z" stroke="black" strokeLinejoin="bevel"/>
                </svg>
                <span>{freight.weight} (total)</span>
              </div>
              <div className="cargo-item-row">
                <div className="cargo-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="11" height="11" x="0" y="5" stroke="#636B7E"/>
                    <path d="M0.0732233 1.6533C-0.0244078 1.75093 -0.0244078 1.90922 0.0732233 2.00685L1.66421 3.59784C1.76184 3.69548 1.92014 3.69548 2.01777 3.59784C2.1154 3.50021 2.1154 3.34192 2.01777 3.24429L0.603553 1.83008L2.01777 0.415864C2.1154 0.318233 2.1154 0.159942 2.01777 0.062311C1.92014 -0.03532 1.76184 -0.03532 1.66421 0.062311L0.0732233 1.6533ZM11.4268 2.00685C11.5244 1.90922 11.5244 1.75093 11.4268 1.6533L9.83579 0.0623103C9.73815 -0.0353207 9.57986 -0.0353207 9.48223 0.0623104C9.3846 0.159941 9.3846 0.318233 9.48223 0.415864L10.8964 1.83008L9.48223 3.24429C9.3846 3.34192 9.3846 3.50021 9.48223 3.59784C9.57986 3.69548 9.73816 3.69548 9.83579 3.59784L11.4268 2.00685ZM0.25 1.83008L0.25 2.08008L11.25 2.08008L11.25 1.83008L11.25 1.58008L0.25 1.58008L0.25 1.83008Z" fill="#636B7E"/>
                    <path d="M1.66404 11.4268C1.76167 11.5244 1.91997 11.5244 2.0176 11.4268L3.60859 9.83579C3.70622 9.73816 3.70622 9.57986 3.60859 9.48223C3.51096 9.3846 3.35266 9.3846 3.25503 9.48223L1.84082 10.8964L0.426607 9.48223C0.328976 9.3846 0.170684 9.3846 0.0730533 9.48223C-0.0245778 9.57986 -0.0245778 9.73816 0.0730533 9.83579L1.66404 11.4268ZM2.0176 0.0732236C1.91997 -0.0244075 1.76167 -0.0244075 1.66404 0.0732236L0.0730529 1.66421C-0.0245781 1.76185 -0.0245781 1.92014 0.073053 2.01777C0.170684 2.1154 0.328975 2.1154 0.426606 2.01777L1.84082 0.603554L3.25503 2.01777C3.35266 2.1154 3.51096 2.1154 3.60859 2.01777C3.70622 1.92014 3.70622 1.76184 3.60859 1.66421L2.0176 0.0732236ZM1.84082 11.25L2.09082 11.25L2.09082 0.25L1.84082 0.25L1.59082 0.25L1.59082 11.25L1.84082 11.25Z" fill="#636B7E"/>
                    <rect width="3" height="4" x="4" y="5" stroke="#636B7E"/>
                  </svg>
                  <span>1.00 m³ (unidade)</span>
                </div>
                <div className="cargo-item">
                  <span>1 unidade</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vehicle Compatibility Card */}
        <div className="detail-card">
          <div className="compatibility-section">
            <div className="check-icon">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.793 4.04004L5.79688 13.0361L1.20703 8.44629L2.28027 7.37305L5.79688 10.8896L13.7197 2.9668L14.793 4.04004Z" fill="#0769DA" stroke="#0769DA"/>
              </svg>
            </div>
            <div className="compatibility-text">
              <span className="medium-text">Seu veículo Bitruck | Graneleiro é compatível com a carga</span>
              <span className="link-text">...Ver todos</span>
            </div>
          </div>
        </div>

        {/* Service Fee Section Card */}
        <div className="detail-card service-fee-section">
          <div className="fee-title">
            Uma taxa de serviço será cobrada caso você carregue esse frete
          </div>
          <div className="fee-details">
            <div className="fee-left">
              <div className="fee-label">Valor da taxa:</div>
              <a href="#" className="fee-link">Saiba mais</a>
            </div>
            <div className="fee-price">R$ 49,90</div>
          </div>
          
          <div className="divider-thin"></div>
          
          <div className="vip-section">
            <div className="vip-info">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.7407 8.1278L9.77591 4.02051H10.0163L12.239 8.1278H7.7407ZM9.62841 16.7609L2.60612 8.87155H9.62841V16.7609ZM10.3722 16.7609V8.87155H17.3945L10.3722 16.7609ZM13.0836 8.1278L10.699 3.70801H15.8722L17.6236 8.1278H13.0836ZM2.37695 8.1278L4.12841 3.70801H9.11404L6.89612 8.1278H2.37695Z" fill="#0769DA"/>
              </svg>
              <span className="vip-text">Motorista VIP fica isento de pagar a taxa.</span>
            </div>
            <button className="vip-button">
              Assine o VIP por R$ 79,00/ mês
            </button>
          </div>
        </div>

        {/* Company Section Card */}
        <div className="detail-card company-detail-section">
          <div className="company-info">
            <div className="company-title">Transportadora ativa há 4 anos</div>
            <div className="company-rating">
              <div className="rating-value">4.4</div>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M6.32286 1.19811L7.80986 4.14441L10.6719 4.42798C10.811 4.43954 10.9307 4.53098 10.9784 4.66218C11.0262 4.79339 10.9932 4.94038 10.8941 5.03866L8.53869 7.37339L9.41196 10.5459C9.44846 10.6834 9.40094 10.8294 9.29057 10.9191C9.18019 11.0088 9.02749 11.0254 8.90045 10.9615L5.99889 9.52456L3.10133 10.9597C2.97429 11.0236 2.82158 11.007 2.71121 10.9173C2.60084 10.8277 2.55332 10.6816 2.58982 10.5441L3.46308 7.37161L1.10593 5.03688C1.00677 4.9386 0.973838 4.79161 1.02158 4.66041C1.06932 4.5292 1.18901 4.43776 1.32813 4.4262L4.19014 4.14264L5.67491 1.19811C5.73717 1.0765 5.86228 1 5.99889 1C6.1355 1 6.2606 1.0765 6.32286 1.19811Z" fill="#F5963D"/>
              </svg>
              <span className="rating-count">(1.700 avaliações)</span>
            </div>
          </div>
          <button className="profile-button">Ver perfil</button>
        </div>

        {/* Payment Methods Card */}
        <div className="detail-card payment-section">
          <div className="section-title">Formas de pagamento</div>
          <div className="payment-methods">
            <div className="payment-item">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_payment)">
                  <path d="M0.5 9.5V15.5M0.5 14.5H11.5C11.5 13.9696 11.2893 13.4609 10.9142 13.0858C10.5391 12.7107 10.0304 12.5 9.5 12.5H7M7 12.5C7 11.9696 6.78929 11.4609 6.41421 11.0858C6.03914 10.7107 5.53043 10.5 5 10.5H0.5M7 12.5H4.5M12.0667 2.98667H10.62C10.4983 2.98311 10.3771 3.00358 10.2633 3.0469C10.1495 3.09021 10.0454 3.15553 9.95683 3.23911C9.86829 3.32269 9.7971 3.4229 9.74731 3.53401C9.69752 3.64513 9.67012 3.76496 9.66667 3.88667C9.66977 4.07018 9.72891 4.24835 9.83616 4.3973C9.9434 4.54625 10.0936 4.65885 10.2667 4.72L11.7333 5.28C11.9064 5.34115 12.0566 5.45375 12.1638 5.6027C12.2711 5.75165 12.3302 5.92982 12.3333 6.11333C12.3299 6.23504 12.3025 6.35487 12.2527 6.46599C12.2029 6.5771 12.1317 6.67731 12.0432 6.76089C11.9546 6.84447 11.8505 6.90979 11.7367 6.9531C11.6229 6.99642 11.5017 7.01689 11.38 7.01333H9.93333M11 2.98667V2.16667M11 7.83333V7.01333M15.5 5C15.5 7.48528 13.4853 9.5 11 9.5C8.51472 9.5 6.5 7.48528 6.5 5C6.5 2.51472 8.51472 0.5 11 0.5C13.4853 0.5 15.5 2.51472 15.5 5Z" stroke="#636B7E" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
                <defs>
                  <clipPath id="clip0_payment">
                    <rect width="16" height="16" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
              <span>Pix, Pix Fretebras</span>
            </div>
            <div className="payment-item">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2L2 14M15 12.5C15 13.8806 13.8809 14.9998 12.5004 15C11.1198 15.0002 10.0004 13.8813 10 12.5007C9.99959 11.1202 11.1183 10.0006 12.4989 10C13.1621 9.99971 13.7983 10.263 14.2674 10.7318C14.7365 11.2007 15 11.8368 15 12.5ZM6 3.5C6 2.11943 4.88094 1.0002 3.50037 1C2.1198 0.999796 1.00041 2.11869 1 3.49926C0.999591 4.87983 2.11832 5.99939 3.49889 6C4.87978 6 5.99939 4.88089 6 3.5Z" stroke="#636B7E" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Adiantamento 70%, Saldo 30%</span>
            </div>
          </div>
        </div>

        {/* Problems Section Card */}
        <div className="detail-card problems-section">
          <div className="section-title">Problemas com o frete?</div>
          <button className="support-button">
            <span>Atendimento</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_headset)">
                <path d="M16 9.54412C15.9996 8.9299 15.8189 8.32993 15.4813 7.82188C15.1436 7.31383 14.6646 6.9211 14.1061 6.69452C14.075 6.68226 14.0483 6.66078 14.0293 6.63283C14.0102 6.60489 13.9998 6.57176 13.9994 6.53772V6.1355C13.9994 4.50827 13.3671 2.94768 12.2415 1.79705C11.116 0.646417 9.58943 0 7.99766 0C6.4059 0 4.87933 0.646417 3.75378 1.79705C2.62824 2.94768 1.99591 4.50827 1.99591 6.1355V6.53772C1.99548 6.57176 1.98508 6.60489 1.96607 6.63283C1.94705 6.66078 1.92028 6.68226 1.88921 6.69452C1.32262 6.92552 0.838346 7.32756 0.500923 7.84705C0.1635 8.36654 -0.0110473 8.97882 0.000541878 9.6023C0.0121311 10.2258 0.209306 10.8308 0.565791 11.3368C0.922277 11.8429 1.42114 12.2258 1.99591 12.4346C2.14656 12.4891 2.30778 12.5058 2.46607 12.4835C2.62436 12.4612 2.77512 12.4004 2.90572 12.3063C3.03631 12.2122 3.14295 12.0874 3.21671 11.9425C3.29046 11.7976 3.32919 11.6367 3.32963 11.4734V6.1355C3.32963 4.86988 3.82144 3.65608 4.69687 2.76115C5.57229 1.86621 6.75963 1.36345 7.99766 1.36345C9.2357 1.36345 10.423 1.86621 11.2985 2.76115C12.1739 3.65608 12.6657 4.86988 12.6657 6.1355V11.4734C12.6717 11.7299 12.7745 11.9742 12.9524 12.1551C12.9813 12.1894 12.9977 12.2327 12.9991 12.2778V12.5914C12.9991 13.5936 12.1389 13.9549 11.332 13.9549H10.2383C10.2108 13.9546 10.1838 13.9477 10.1595 13.9346C10.1351 13.9216 10.1141 13.9028 10.0983 13.8799C9.97732 13.6945 9.81378 13.5423 9.62196 13.4365C9.43015 13.3308 9.21589 13.2747 8.99796 13.2731C8.76712 13.2715 8.53983 13.3312 8.33831 13.4463C8.13679 13.5614 7.96794 13.728 7.84828 13.9298C7.72863 14.1316 7.66226 14.3617 7.65566 14.5976C7.64907 14.8335 7.70248 15.0671 7.81067 15.2756C7.91885 15.484 8.07812 15.6602 8.27288 15.7869C8.46764 15.9136 8.69123 15.9864 8.92178 15.9983C9.15233 16.0101 9.38194 15.9606 9.58816 15.8546C9.79439 15.7485 9.97015 15.5896 10.0983 15.3933C10.1141 15.3703 10.1351 15.3516 10.1595 15.3385C10.1838 15.3255 10.2108 15.3186 10.2383 15.3183H11.332C13.0992 15.3183 14.3328 14.1935 14.3328 12.5914V12.3664C14.3334 12.3359 14.3417 12.3061 14.3569 12.2798C14.3721 12.2535 14.3937 12.2317 14.4195 12.2165C14.8938 11.9576 15.291 11.5727 15.5691 11.1024C15.8473 10.6321 15.9962 10.0937 16 9.54412Z" fill="#636B7E"/>
              </g>
              <defs>
                <clipPath id="clip0_headset">
                  <rect width="16" height="16" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>

        {/* Return Guarantee Card */}
        <div className="detail-card return-section">
          <div className="return-header">
            <div className="return-title">Garanta sua volta</div>
            <div className="return-subtitle">De {freight.destination.split(',')[0]} e região para {freight.origin.split(',')[0]}, {freight.origin.split(',')[1]?.trim()}</div>
          </div>
          <div className="return-info">
            <div className="return-item">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5 6.5L8 4M8 4L5.5 6.5M8 4V11.5M8 15.5C12.1421 15.5 15.5 12.1421 15.5 8C15.5 3.85786 12.1421 0.5 8 0.5C3.85786 0.5 0.5 3.85786 0.5 8C0.5 12.1421 3.85786 15.5 8 15.5Z" stroke="#636B7E" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>25 fretes toda semana</span>
            </div>
            <div className="divider-gray"></div>
            <div className="return-item">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.5 3.5L8 0.5L15.5 3.5M0.5 3.5L8 6.5M0.5 3.5V12.5L8 15.5M8 6.5L15.5 3.5M8 6.5V15.5M15.5 3.5V12.5L8 15.5M12.1247 4.85L4.62467 1.85M13.75 11L12.5 11.5" stroke="#636B7E" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Pallets, soja e eletrônicos são as cargas mais comuns nessa região.</span>
            </div>
          </div>
          <button className="view-freights-button">Ver fretes</button>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bottom-bar">
        <div className="bottom-price">
          <div className="price-value">R$ {freight.price}</div>
          <div className="price-details">
            <span className="toll-info">Pedágio incluso</span>
            <div className="antt-badge">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M6 11.625C9.1066 11.625 11.625 9.1066 11.625 6C11.625 2.8934 9.1066 0.375 6 0.375C2.8934 0.375 0.375 2.8934 0.375 6C0.375 9.1066 2.8934 11.625 6 11.625ZM6.35355 2.64645L8.22855 4.52145C8.42382 4.71671 8.42382 5.03329 8.22855 5.22855C8.03329 5.42382 7.71671 5.42382 7.52145 5.22855L6.5 4.20711V9C6.5 9.27614 6.27614 9.5 6 9.5C5.72386 9.5 5.5 9.27614 5.5 9V4.20711L4.47855 5.22855C4.28329 5.42382 3.96671 5.42382 3.77145 5.22855C3.57618 5.03329 3.57618 4.71671 3.77145 4.52145L5.64645 2.64645C5.84171 2.45118 6.15829 2.45118 6.35355 2.64645Z" fill="#0AB15F"/>
              </svg>
              <span>ANTT</span>
            </div>
          </div>
        </div>
        <button className="chat-button">
          <span>Conversar</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.41699 17.1986V2.4165H17.5837V14.5832H5.03241L2.41699 17.1986Z" fill="white"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
