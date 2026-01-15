import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/ConfirmRouteValuePage.scss';
import freightsData from '../data/freights.json';

export default function ConfirmRouteValuePage() {
  const navigate = useNavigate();
  const { freightId, contactId } = useParams();
  const [freightValue, setFreightValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Busca os dados do frete
  const freight = freightsData.find(f => f.id === Number(freightId));

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleContinue = () => {
    // Se não tem valor preenchido, mostra erro
    if (!hasValue) {
      setHasError(true);
      return;
    }

    // Se tem valor, volta para o chat e dispara a adição da mensagem de documento
    navigate(`/freight/${freightId}/chat/${contactId}`, {
      state: { documentsSubmitted: true }
    });
  };

  const handleNotAgreed = () => {
    // Permite continuar sem validação, volta para o chat e dispara a adição da mensagem de documento
    navigate(`/freight/${freightId}/chat/${contactId}`, {
      state: { documentsSubmitted: true }
    });
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
          {/* Value Input Card */}
          <div className="value-card">
            {/* Route Section */}
            <div className="route-section">
              <div className="route-label">Rota</div>
              <div className="route-display">
                <svg className="route-icon" width="7" height="52" viewBox="0 0 7 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="3.5" cy="8.5" r="3" stroke="#BABEC9"/>
                  <rect x="3" y="16" width="1" height="20" fill="#BABEC9"/>
                  <path d="M6.19141 40.5L3.5 45.8818L0.808594 40.5H6.19141Z" stroke="#BABEC9"/>
                </svg>
                <div className="route-cities">
                  <div className="city-name">{freight?.origin || 'Origem'}</div>
                  <div className="city-name">{freight?.destination || 'Destino'}</div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="card-divider"></div>

            {/* Value Section */}
            <div className="value-section">
              <div className={`input-wrapper ${isFocused || hasValue ? 'focused' : ''} ${hasError ? 'error' : ''}`}>
                <input
                  type="text"
                  inputMode="numeric"
                  value={freightValue}
                  onChange={handleValueChange}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder={isFocused || hasValue ? 'R$ 0,00' : ''}
                  className="value-input"
                />
                <label className="floating-label">
                  Qual o valor do frete combinado?
                </label>
              </div>
              {hasError && (
                <span className="error-message">
                  Informe o valor do frete para continuar
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="bottom-button-container">
        <button className="primary-button" onClick={handleContinue}>
          Concluir e enviar documentos
        </button>
        <button className="secondary-button" onClick={handleNotAgreed}>
          Não combinei o valor do frete ainda
        </button>
      </div>
    </div>
  );
}
