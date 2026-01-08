import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ContestServiceFeePage.scss';

export default function ContestServiceFeePage() {
  const navigate = useNavigate();
  const [selectedReason, setSelectedReason] = useState('trip-not-completed');

  const reasons = [
    { id: 'trip-not-completed', label: 'A viagem não foi concluída' },
    { id: 'cargo-cancelled', label: 'A carga foi cancelada pela transportadora' },
    { id: 'not-my-trip', label: 'Não foi eu realizei essa viagem' },
    { id: 'wrong-value', label: 'Houve erro no valor final do frete' },
  ];

  const handleContinue = () => {
    // Aqui você pode implementar a lógica para avançar com a contestação
    console.log('Motivo selecionado:', selectedReason);
  };

  return (
    <div className="contest-service-fee-page">
      {/* Header */}
      <div className="contest-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.95185 17.6537L4.29785 11.9999L9.95185 6.34619L11.0056 7.43069L7.18635 11.2499H19.7019V12.7499H7.18635L11.0056 16.5692L9.95185 17.6537Z" fill="#111111"/>
          </svg>
        </button>
        <h1 className="contest-title">Contestar taxa de serviço</h1>
      </div>

      {/* Content */}
      <div className="contest-content">
        <div className="explanation-section">
          <p className="explanation-text">
            A taxa inclui custos operacionais, suporte e investimentos em segurança e inovação da plataforma. Se você acredita que o valor foi cobrado incorretamente por algum motivo, fale com a gente.
          </p>
        </div>

        <div className="reason-section">
          <h2 className="reason-title">Selecione o motivo:</h2>
          <div className="reason-list">
            {reasons.map((reason, index) => (
              <div
                key={reason.id}
                className={`reason-item ${index < reasons.length - 1 ? 'with-border' : ''}`}
                onClick={() => setSelectedReason(reason.id)}
              >
                <div className="reason-text">
                  <span className="reason-label">{reason.label}</span>
                </div>
                <div className="radio-button">
                  {selectedReason === reason.id ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12ZM12 14.5C13.3807 14.5 14.5 13.3807 14.5 12C14.5 10.6193 13.3807 9.5 12 9.5C10.6193 9.5 9.5 10.6193 9.5 12C9.5 13.3807 10.6193 14.5 12 14.5Z" fill="#0769DA"/>
                    </svg>
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5Z" fill="#BABEC9"/>
                    </svg>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="contest-footer">
        <button className="continue-button" onClick={handleContinue}>
          Avançar
        </button>
      </div>
    </div>
  );
}
