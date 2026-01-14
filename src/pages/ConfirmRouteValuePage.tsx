import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/ConfirmRouteValuePage.scss';
import freightsData from '../data/freights.json';

export default function ConfirmRouteValuePage() {
  const navigate = useNavigate();
  const { freightId, contactId } = useParams();
  const [freightValue, setFreightValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Get freight data
  const freight = freightsData.find(f => f.id === Number(freightId));

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSubmitDocuments = () => {
    // Navega para o chat com o estado de documentos enviados
    navigate(`/freight/${freightId}/chat/${contactId}`, {
      state: { documentsSubmitted: true }
    });
  };

  const handleSkipValue = () => {
    // Navega para o chat sem enviar documentos
    navigate(`/freight/${freightId}/chat/${contactId}`);
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
              <div className={`input-wrapper ${isFocused || hasValue ? 'focused' : ''}`}>
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
