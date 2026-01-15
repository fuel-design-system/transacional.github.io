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

  // Get freight data
  const freight = freightsData.find(f => f.id === Number(freightId));

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSubmitDocuments = () => {
    // Check if the value is empty
    if (!freightValue || freightValue.trim() === '') {
      setHasError(true);
      return;
    }

    // Clear error and navigate to chat with documents submitted state
    setHasError(false);
    navigate(`/freight/${freightId}/chat/${contactId}`, {
      replace: true,
      state: { documentsSubmitted: true }
    });
  };

  const handleSkipValue = () => {
    // Navega para o chat sem enviar documentos
    navigate(`/freight/${freightId}/chat/${contactId}`, {
      replace: true
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
    // Clear error when user starts typing
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
        <h1 className="page-title">Confirme o valor do frete combinado:</h1>

        <div className="content-container">
          {/* Route Card */}
          <div className="route-card">
            {/* Value Input */}
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
                <div className="error-hint">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_574_18563)">
                      <path fillRule="evenodd" clipRule="evenodd" d="M6 0.5C5.78299 0.5 5.57019 0.559888 5.38504 0.673068C5.19989 0.786249 5.04956 0.948331 4.95062 1.14147L4.95059 1.14146L4.94887 1.1449L0.626131 9.79039L0.625814 9.79102C0.535583 9.97032 0.492631 10.1697 0.501033 10.3703C0.509445 10.5712 0.569052 10.7665 0.674194 10.9378C0.779335 11.1091 0.926521 11.2506 1.10177 11.3491C1.27702 11.4475 1.47452 11.4994 1.67551 11.5001H1.6767H10.3233H10.3244C10.5254 11.4994 10.723 11.4475 10.8982 11.3491C11.0735 11.2506 11.2206 11.1091 11.3258 10.9378C11.431 10.7665 11.4906 10.5712 11.499 10.3703C11.5074 10.1697 11.4644 9.97024 11.3741 9.79094L11.3738 9.79039L7.05112 1.1449L7.05113 1.1449L7.04938 1.14147C6.95043 0.948331 6.8001 0.786249 6.61495 0.673068C6.4298 0.559888 6.217 0.5 6 0.5ZM5.99997 3.93515C6.2713 3.93515 6.49126 4.1551 6.49126 4.42643V6.78459C6.49126 7.05591 6.2713 7.27587 5.99997 7.27587C5.72864 7.27587 5.50869 7.05591 5.50869 6.78459V4.42643C5.50869 4.1551 5.72864 3.93515 5.99997 3.93515ZM5.99997 9.92882C6.43409 9.92882 6.78603 9.5769 6.78603 9.14277C6.78603 8.70863 6.43409 8.35671 5.99997 8.35671C5.56585 8.35671 5.21392 8.70863 5.21392 9.14277C5.21392 9.5769 5.56585 9.92882 5.99997 9.92882Z" fill="#D92641"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_574_18563">
                        <rect width="12" height="12" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                  <span className="error-text">Digite o valor do frete</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="bottom-button-container">
        <button className="primary-button" onClick={handleSubmitDocuments}>
          Concluir e enviar documentos
        </button>
        <button className="secondary-button" onClick={handleSkipValue}>
          Não combinei o valor do frete ainda
        </button>
      </div>
    </div>
  );
}
