import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/ConfirmRouteValuePage.scss';
import freightsData from '../data/freights.json';

export default function ConfirmRouteValuePage() {
  const navigate = useNavigate();
  const { freightId, contactId } = useParams();
  const [freightValue, setFreightValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [notAgreedYet, setNotAgreedYet] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Get freight data
  const freight = freightsData.find(f => f.id === Number(freightId));

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleContinue = () => {
    // Se o checkbox estiver marcado, permite continuar sem valor
    if (notAgreedYet) {
      navigate(`/freight/${freightId}/chat/${contactId}/payment-fee`);
      return;
    }

    // Se não tem valor preenchido, mostra erro
    if (!hasValue) {
      setHasError(true);
      return;
    }

    // Se tem valor, navega para a página de formas de cobrança da taxa
    navigate(`/freight/${freightId}/chat/${contactId}/payment-fee`);
  };

  // Currency mask function
  const formatCurrency = (value: string): string => {
    // Remove all non-numeric characters
    const numericValue = value.replace(/\D/g, '');

    if (!numericValue) return '';

    // Convert to cents (divide by 100 for decimal places)
    const numberValue = parseInt(numericValue) / 100;

    // Format as Brazilian Real currency
    return numberValue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const formattedValue = formatCurrency(inputValue);
    setFreightValue(formattedValue);
    // Limpa o erro quando o usuário começa a digitar
    if (hasError) {
      setHasError(false);
    }
  };

  const hasValue = freightValue.trim() !== '';

  return (
    <div className="confirm-route-value-page">
      {/* Top Bar */}
      <div className="top-bar">
        <button className="close-button" onClick={handleBackClick}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.95185 17.6537L4.29785 11.9999L9.95185 6.34619L11.0056 7.43069L7.18635 11.2499H19.7019V12.7499H7.18635L11.0056 16.5692L9.95185 17.6537Z" fill="#111111"/>
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="page-content">
        <h1 className="page-title">Confirme a rota e o valor combinado</h1>

        <div className="content-container">
          {/* Route Card */}
          <div className="route-card">
            <div className="route-section">
              <div className="route-header">
                <span className="route-label">Rota</span>
              </div>
              
              <div className="route-info">
                <div className="route-icon">
                  <svg width="7" height="52" viewBox="0 0 7 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="3.5" cy="8.5" r="3" stroke="#BABEC9"/>
                    <rect x="3" y="16" width="1" height="20" fill="#BABEC9"/>
                    <path d="M6.19141 40.5L3.5 45.8818L0.808594 40.5H6.19141Z" stroke="#BABEC9"/>
                  </svg>
                </div>
                <div className="route-cities">
                  <div className="city-origin">{freight?.origin || 'Origem não informada'}</div>
                  <div className="city-destination">{freight?.destination || 'Destino não informado'}</div>
                </div>
              </div>
            </div>

            <div className="divider"></div>

            {/* Value Input */}
            <div className="value-section">
              <div className={`input-wrapper ${isFocused || hasValue ? 'focused' : ''} ${hasError ? 'error' : ''} ${notAgreedYet ? 'disabled' : ''}`}>
                <input
                  type="text"
                  inputMode="numeric"
                  value={freightValue}
                  onChange={handleValueChange}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder={isFocused || hasValue ? 'R$ 0,00' : ''}
                  className="value-input"
                  disabled={notAgreedYet}
                />
                <label className="floating-label">
                  Qual o valor do frete combinado?
                </label>
              </div>
              {hasError && (
                <span className="error-message">
                  Informe o valor do frete ou marque a opção abaixo caso ainda não tenha combinado
                </span>
              )}
            </div>

            {/* Checkbox */}
            <div className="checkbox-section">
              <button
                className={`checkbox ${notAgreedYet ? 'checked' : ''}`}
                onClick={() => {
                  setNotAgreedYet(!notAgreedYet);
                  // Limpa o erro quando marca/desmarca o checkbox
                  if (hasError) {
                    setHasError(false);
                  }
                }}
              >
                <div className="checkbox-box">
                  {notAgreedYet && (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.6667 3.5L5.25 9.91667L2.33333 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
              </button>
              <span className="checkbox-label">Não combinei o valor do frete ainda</span>
            </div>
          </div>

          {/* Info Message */}
          <div className="info-message">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.45866 13.792H10.542V9.00033H9.45866V13.792ZM9.99595 7.74074C10.1618 7.74074 10.3023 7.68463 10.4174 7.57241C10.5325 7.46019 10.5901 7.32116 10.5901 7.15533C10.5901 6.98949 10.534 6.84901 10.4218 6.73387C10.3096 6.61887 10.1705 6.56137 10.0047 6.56137C9.83887 6.56137 9.69838 6.61741 9.58324 6.72949C9.4681 6.84171 9.41053 6.98074 9.41053 7.14658C9.41053 7.31241 9.46664 7.4529 9.57887 7.56803C9.69109 7.68317 9.83012 7.74074 9.99595 7.74074ZM10.0074 17.5837C8.96421 17.5837 7.98171 17.3863 7.05991 16.9916C6.1381 16.5969 5.3313 16.0537 4.63949 15.3622C3.94769 14.6707 3.40428 13.8645 3.00928 12.9437C2.61442 12.023 2.41699 11.0391 2.41699 9.9922C2.41699 8.94526 2.61435 7.96435 3.00908 7.04949C3.4038 6.13463 3.94692 5.3313 4.63845 4.63949C5.32998 3.94769 6.13616 3.40428 7.05699 3.00928C7.97769 2.61442 8.96151 2.41699 10.0085 2.41699C11.0554 2.41699 12.0363 2.61435 12.9512 3.00908C13.866 3.4038 14.6694 3.94692 15.3612 4.63845C16.053 5.32998 16.5964 6.13449 16.9914 7.05199C17.3862 7.96963 17.5837 8.95005 17.5837 9.99324C17.5837 11.0364 17.3863 12.0189 16.9916 12.9407C16.5969 13.8625 16.0537 14.6694 15.3622 15.3612C14.6707 16.053 13.8662 16.5964 12.9487 16.9914C12.031 17.3862 11.0506 17.5837 10.0074 17.5837ZM10.0003 16.5003C11.8059 16.5003 13.3406 15.8684 14.6045 14.6045C15.8684 13.3406 16.5003 11.8059 16.5003 10.0003C16.5003 8.19477 15.8684 6.66005 14.6045 5.39616C13.3406 4.13227 11.8059 3.50033 10.0003 3.50033C8.19477 3.50033 6.66005 4.13227 5.39616 5.39616C4.13227 6.66005 3.50033 8.19477 3.50033 10.0003C3.50033 11.8059 4.13227 13.3406 5.39616 14.6045C6.66005 15.8684 8.19477 16.5003 10.0003 16.5003Z" fill="#636B7E"/>
            </svg>
            <p className="info-text">
              Usamos essas informações caso você tenha algum problema com a empresa.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="bottom-button-container">
        <button className="continue-button" onClick={handleContinue}>
          Continuar
        </button>
      </div>
    </div>
  );
}
