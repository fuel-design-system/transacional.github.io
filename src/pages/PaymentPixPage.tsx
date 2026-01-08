import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PaymentPixPage.scss';

export default function PaymentPixPage() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    // Simulate copying the code
    navigator.clipboard.writeText('00020126580014BR.GOV.BCB.PIX0136...');
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      // Navigate to success after 1 second
      navigate('/payment/success?method=pix');
    }, 1000);
  };

  return (
    <div className="payment-pix-page">
      <div className="pix-header">
        <button className="back-button" onClick={() => navigate('/payment/checkout')}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.3399 10L1.66992 10M1.66992 10L6.66992 5M1.66992 10L6.66992 15" stroke="#636B7E" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1 className="pix-title">Pagar com Pix</h1>
      </div>

      <div className="pix-content">
        {/* Card Branco com QR Code */}
        <div className="pix-card">
          <p className="pix-instruction">Escaneie o QR code ou copie o código:</p>

          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/60df4f5d13895f926fb848a7a7860d8dbef836d9?width=400"
            alt="QR Code Pix"
            className="qr-code"
          />

          <button className="copy-button" onClick={handleCopyCode}>
            <span>Copiar código</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M1.33325 2.37053C1.33325 1.79779 1.86388 1.3335 2.51844 1.3335H10.8147C11.4693 1.3335 11.9999 1.79779 11.9999 2.37053V3.14831C11.9999 3.43468 11.7346 3.66683 11.4073 3.66683C11.08 3.66683 10.8147 3.43468 10.8147 3.14831V2.37053H2.51844V10.9631H3.40733C3.7346 10.9631 3.99992 11.1953 3.99992 11.4816C3.99992 11.768 3.7346 12.0002 3.40733 12.0002H2.51844C1.86388 12.0002 1.33325 11.5359 1.33325 10.9631V2.37053Z" fill="white"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M6.37029 4.00016C5.79755 4.00016 5.33325 4.53079 5.33325 5.18535V13.4816C5.33325 14.1362 5.79755 14.6668 6.37029 14.6668H13.6295C14.2023 14.6668 14.6666 14.1362 14.6666 13.4816V5.18535C14.6666 4.53079 14.2023 4.00016 13.6295 4.00016H6.37029Z" fill="white"/>
            </svg>
          </button>
        </div>

        {/* Instruções - Fora do Card */}
        <div className="instructions-section">
          <p className="instructions-title">Como pagar usando o código "copia e cola"?</p>

          <div className="instruction-steps">
            <div className="step">
              <span className="step-number">1.</span>
              <p className="step-text">Copie o Código Pix clicando no botão acima.</p>
            </div>

            <div className="step">
              <span className="step-number">2.</span>
              <p className="step-text">Acesse o seu banco.</p>
            </div>

            <div className="step">
              <span className="step-number">3.</span>
              <p className="step-text">Vá até a área de Pix e selecione pagar com código (copia e cola).</p>
            </div>

            <div className="step">
              <span className="step-number">4.</span>
              <p className="step-text">Cole o código na área de pagamento.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="pix-footer">
        <div className="footer-content">
          <div className="total-row">
            <span className="total-label">Você pagará:</span>
            <span className="total-amount">R$ 49,90</span>
          </div>
        </div>
      </div>
    </div>
  );
}
