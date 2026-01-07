import { useNavigate } from 'react-router-dom';
import './FreightCard.scss';

interface FreightCardProps {
  id: number;
  price: string;
  isNew?: boolean;
  isVip?: boolean;
  priceType: string;
  chargeType: string;
  loadType: string;
  weight: string;
  distance: string;
  product: string;
  origin: string;
  destination: string;
  company: string;
  companyAvatar?: string | null;
}

export default function FreightCard({
  id,
  price,
  isNew,
  isVip,
  priceType,
  chargeType,
  loadType,
  weight,
  distance,
  product,
  origin,
  destination,
  company,
}: FreightCardProps) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/freight/${id}`);
  };

  return (
    <div className="freight-card" onClick={handleCardClick}>
      <div className="freight-info">
        {/* Preço e informações */}
        <div className="freight-content">
          <div className="price-section">
            <div className="price">R$ {price}</div>
            
            <div className="freight-details">
              <span className="detail-item">{priceType}</span>
              <span className="detail-separator">•</span>
              <span className="detail-item">{chargeType}</span>
              <span className="detail-separator">•</span>
              <span className="detail-item">{loadType}</span>
            </div>

            <div className="freight-details">
              <span className="detail-item">{weight}</span>
              <span className="detail-separator">•</span>
              <span className="detail-item">{distance}</span>
              <span className="detail-separator">•</span>
              <span className="detail-item">{product}</span>
            </div>
          </div>

          {/* Rota */}
          <div className="route-section">
            <svg className="route-icon" width="7" height="46" viewBox="0 0 7 46" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="3.5" cy="8.5" r="3" stroke="#DFE1E6"/>
              <rect x="3" y="16" width="1" height="14" fill="#DFE1E6"/>
              <path d="M6.19141 34.5L3.5 39.8818L0.808594 34.5H6.19141Z" stroke="#DFE1E6"/>
            </svg>
            <div className="route-text">
              <div className="route-origin">{origin}</div>
              <div className="route-destination">{destination}</div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="divider"></div>

        {/* Empresa */}
        <div className="company-section">
          <div className="company-avatar">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="12" fill="#DFE1E6"/>
            </svg>
          </div>
          <div className="company-text">
            <span className="company-label">Publicado por</span>
            <span className="company-name">{company}</span>
          </div>
        </div>
      </div>

      {/* Tags */}
      {(isNew || isVip) && (
        <div className="tags">
          {isNew && (
            <div className="tag tag-new">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_spark)">
                  <path d="M2.75 7L3.25912 8.74088L5 9.25L3.25912 9.75912L2.75 11.5L2.24088 9.75912L0.5 9.25L2.24088 8.74088L2.75 7Z" fill="white"/>
                  <path d="M6.5 0.5L7.66673 4.33327L11.5 5.5L7.66673 6.66673L6.5 10.5L5.33327 6.66673L1.5 5.5L5.33327 4.33327L6.5 0.5Z" fill="white"/>
                </g>
                <defs>
                  <clipPath id="clip0_spark">
                    <rect width="12" height="12" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
              <span>novo</span>
            </div>
          )}
          {isVip && (
            <div className="tag tag-vip">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M5.75423 1H2.9536C2.75782 1 2.56469 1.04561 2.38951 1.13326C2.37218 1.14193 2.35507 1.15099 2.3382 1.16043L3.43486 3.90854H3.81073L5.70792 1.05604C5.72152 1.03559 5.73707 1.01685 5.75423 1ZM3.99273 4.6106C3.99613 4.61065 3.99953 4.61065 4.00293 4.6106H7.99569C7.99908 4.61065 8.00248 4.61065 8.00588 4.6106H8.28371L5.99936 10.3349L3.71502 4.6106H3.99273ZM8.18788 3.90854H8.56387L9.66095 1.15938C9.64468 1.15032 9.6282 1.14161 9.61151 1.13326C9.43633 1.04561 9.2432 1 9.04742 1H6.24438C6.26154 1.01685 6.27709 1.03559 6.29069 1.05604L8.18788 3.90854ZM7.3461 3.90854H4.65251L5.99931 1.88358L7.3461 3.90854ZM1.79884 1.6992L2.6805 3.90854H0.157645C0.184975 3.85961 0.215647 3.81233 0.249547 3.76707L1.79884 1.6992ZM2.96066 4.6106H0C0.0179073 4.87578 0.118923 5.12898 0.289203 5.33381L0.289954 5.33471L5.03062 11.0753L5.03272 11.0778C5.15124 11.2194 5.29928 11.3332 5.46639 11.4113C5.54971 11.4502 5.63678 11.4798 5.72599 11.4997C5.70845 11.4777 5.69332 11.4533 5.68115 11.4267C5.67872 11.4214 5.67642 11.416 5.67426 11.4106L5.67396 11.4098L2.96066 4.6106ZM6.32469 11.41L9.03807 4.6106H12C11.9821 4.87577 11.8811 5.12896 11.7108 5.33379L11.71 5.33471L6.96729 11.0778C6.84877 11.2194 6.70072 11.3332 6.53361 11.4113C6.4498 11.4504 6.36221 11.4801 6.27246 11.5C6.29183 11.4758 6.30828 11.4487 6.32105 11.4188L6.32452 11.4105L6.32469 11.41ZM11.7505 3.76707C11.7843 3.81233 11.815 3.8596 11.8423 3.90854H9.31823L10.2007 1.69729L11.7505 3.76707Z" fill="white"/>
              </svg>
              <span>vip</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
