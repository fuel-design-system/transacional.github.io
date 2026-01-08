import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/PaymentFeePage.scss';
import Toast from '../components/Toast';
import PixInfoSheet from '../components/PixInfoSheet';
import VIPWarningSheet from '../components/VIPWarningSheet';

export default function PaymentFeePage() {
  const navigate = useNavigate();
  const { freightId, contactId } = useParams();
  const [pixKey] = useState('(11) 9 9999-8888');
  const [showToast, setShowToast] = useState(false);
  const [isPixInfoSheetOpen, setIsPixInfoSheetOpen] = useState(false);
  const [isVIPWarningSheetOpen, setIsVIPWarningSheetOpen] = useState(false);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixKey);
    setShowToast(true);
  };

  const handleLearnMore = () => {
    setIsPixInfoSheetOpen(true);
  };

  const handleSubscribeVIP = () => {
    // TODO: Navegar para página de assinatura VIP
    console.log('Assinar VIP');
  };

  const handleContinue = () => {
    // Abre o bottom sheet de aviso VIP
    setIsVIPWarningSheetOpen(true);
  };

  const handleVIPWarningConfirm = () => {
    // Fecha o sheet e navega para o chat com indicação de documentos enviados
    setIsVIPWarningSheetOpen(false);
    navigate(`/freight/${freightId}/chat/${contactId}`, { state: { documentsSubmitted: true } });
  };

  return (
    <div className="payment-fee-page">
      {/* Top Bar */}
      <div className="top-bar">
        <button className="back-button" onClick={handleBackClick}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.95185 17.6537L4.29785 11.9999L9.95185 6.34619L11.0056 7.43069L7.18635 11.2499H19.7019V12.7499H7.18635L11.0056 16.5692L9.95185 17.6537Z" fill="#111111"/>
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="page-content">
        <h1 className="page-title">Caso feche o frete, será cobrada a taxa de serviço de R$ 49,90</h1>

        <div className="content-container">
          {/* Payment Methods Card */}
          <div className="payment-card">
            <div className="card-header">
              <span className="header-title">Formas de cobrança da taxa:</span>
            </div>

            {/* Pix Option */}
            <div className="payment-option">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.7319 13.4361C11.9419 13.2261 12.3089 13.2254 12.519 13.4361L15.5112 16.4283C16.0646 16.9815 16.8007 17.2867 17.5834 17.2867H17.9438L14.143 21.0875L14.0297 21.1949C12.8784 22.2349 11.1214 22.2349 9.97013 21.1949L9.85685 21.0875L6.06681 17.2974H6.65665C7.43922 17.2974 8.17545 16.993 8.72892 16.44L11.7319 13.4361ZM5.21818 7.55128C5.26644 7.56946 5.31777 7.5825 5.37247 7.58253H6.65665C7.19652 7.58253 7.72537 7.80128 8.10685 8.18312L11.1098 11.1861C11.3897 11.4658 11.7575 11.606 12.1254 11.606C12.493 11.606 12.861 11.4661 13.141 11.1861L16.1332 8.19386C16.467 7.85986 16.9133 7.6502 17.3813 7.60304L17.5834 7.59327H18.6274C18.6852 7.59327 18.7399 7.58031 18.7905 7.56007L21.0873 9.85695C22.2707 11.0406 22.2708 12.9595 21.0873 14.1431L18.7905 16.44C18.7399 16.4197 18.6852 16.4068 18.6274 16.4068H17.5834C17.0436 16.4068 16.5147 16.1879 16.1332 15.8062L13.141 12.814C12.5987 12.2712 11.6526 12.2716 11.1098 12.814L8.10685 15.8169C7.72537 16.1987 7.19652 16.4175 6.65665 16.4175H5.37247C5.31777 16.4175 5.26653 16.4306 5.21818 16.4488L2.91251 14.1431C1.76592 12.9965 1.73026 11.16 2.80509 9.97023L2.91251 9.85695L5.21818 7.55128ZM9.85685 2.91259C11.0404 1.72902 12.9593 1.72899 14.143 2.91259L17.9438 6.71339H17.5834C16.8009 6.71339 16.0646 7.01785 15.5112 7.57081L12.518 10.564C12.3011 10.7811 11.948 10.7803 11.7319 10.564L8.72892 7.56007C8.17545 7.00693 7.43927 6.70265 6.65665 6.70264H6.06681L9.85685 2.91259Z" fill="#0769DA"/>
              </svg>
              <div className="option-content">
                <div className="option-description">
                  <span className="description-normal">Desconto automático quando receber o adiantamento usando </span>
                  <span className="description-bold">seu Pix da Carteira Fretebras:</span>
                </div>
                <div className="pix-key-container">
                  <svg className="pix-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.82508 8.94134C7.96269 8.80376 8.20226 8.80333 8.33992 8.94134L10.3009 10.9015C10.6635 11.264 11.1458 11.464 11.6587 11.464H11.8946L9.40476 13.9546L9.2532 14.0906C8.52521 14.6842 7.47487 14.6842 6.74695 14.0906L6.59617 13.9546L4.11258 11.471H4.4993C4.94796 11.471 5.37345 11.3184 5.7157 11.0374L5.85711 10.9093L7.82508 8.94134ZM3.55633 5.08509C3.58798 5.09701 3.622 5.1054 3.65789 5.1054H4.4993C4.85297 5.10545 5.19938 5.249 5.4493 5.49915L7.41726 7.46712C7.60066 7.65028 7.84189 7.74212 8.08289 7.74212C8.32362 7.74202 8.56435 7.64972 8.74773 7.46634L10.7087 5.50618C10.9274 5.28726 11.2199 5.1503 11.5266 5.11946L11.6587 5.11243H12.343C12.3807 5.11238 12.4163 5.10375 12.4493 5.09055L13.9548 6.59602C14.7299 7.3715 14.7299 8.62834 13.9548 9.40384L12.4493 10.9093C12.4163 10.8961 12.3807 10.8875 12.343 10.8874H11.6587C11.3049 10.8874 10.9586 10.7438 10.7087 10.4937L8.74773 8.53352C8.39242 8.17793 7.77294 8.17822 7.41726 8.53352L5.4493 10.5007C5.19938 10.7508 4.85297 10.8944 4.4993 10.8945H3.65789C3.622 10.8945 3.58804 10.9029 3.55633 10.9148L2.04617 9.40384C1.31914 8.67679 1.27338 7.52681 1.90945 6.7468L2.04617 6.59602L3.55633 5.08509ZM6.59617 2.04602C7.37167 1.27047 8.62915 1.27047 9.40476 2.04602L11.8946 4.53587H11.6587C11.1458 4.53587 10.6635 4.73588 10.3009 5.09837L8.33992 7.0593C8.19791 7.20151 7.96675 7.20079 7.82508 7.0593L5.85711 5.09134C5.49449 4.72889 5.01206 4.52889 4.4993 4.52884H4.11258L6.59617 2.04602Z" fill="#636B7E"/>
                  </svg>
                  <div className="pix-key-content">
                    <div className="pix-key-text">{pixKey}</div>
                    <button className="copy-button" onClick={handleCopyPix}>
                      <span className="copy-text">Copiar</span>
                      <svg className="copy-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.69824 5.26733V16.0935H13.5244V17.156H3.63574V5.26733H4.69824ZM16.3643 2.42749V14.573H6.21875V2.42749H16.3643ZM7.28125 13.5105H15.3018V3.48999H7.28125V13.5105Z" fill="#0769DA" stroke="#0769DA" strokeWidth="0.0208333"/>
                      </svg>
                    </button>
                  </div>
                </div>
                <button className="learn-more-link" onClick={handleLearnMore}>Saiba mais</button>
              </div>
            </div>

            {/* Divider with "ou" */}
            <div className="divider-container">
              <div className="divider-line"></div>
              <span className="divider-text">ou</span>
              <div className="divider-line"></div>
            </div>

            {/* VIP Option */}
            <div className="payment-option">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.11365 8.40375L11.7059 3.25H12.2944L14.8866 8.40375H9.11365ZM11.4039 19.8885L2.82715 9.59625H11.4039V19.8885ZM12.5964 19.8885V9.59625H21.1731L12.5964 19.8885ZM16.2001 8.40375L13.6386 3.25H18.8464L21.4231 8.40375H16.2001ZM2.57715 8.40375L5.1539 3.25H10.3616L7.80015 8.40375H2.57715Z" fill="#0769DA"/>
              </svg>
              <div className="option-content">
                <div className="option-description">
                  <span className="description-normal">Assine o </span>
                  <span className="description-bold">Motorista VIP e fique isento da taxa de serviço </span>
                  <span className="description-normal">em todos os fretes.</span>
                </div>
                <button className="learn-more-link" onClick={handleSubscribeVIP}>Assine o VIP</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bottom-section">
        <button className="continue-button" onClick={handleContinue}>
          Concluir e enviar documentos
        </button>
        <div className="terms-text">
          <span className="terms-normal">Ao continuar vocês estará concordando com os </span>
          <span className="terms-link">Termos e condições da taxa de serviço.</span>
        </div>
      </div>

      {/* Toast */}
      <Toast
        message="Chave Pix copiada com sucesso."
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />

      {/* Pix Info Sheet */}
      <PixInfoSheet
        isOpen={isPixInfoSheetOpen}
        onClose={() => setIsPixInfoSheetOpen(false)}
        pixKey={pixKey}
      />

      {/* VIP Warning Sheet */}
      <VIPWarningSheet
        isOpen={isVIPWarningSheetOpen}
        onClose={() => setIsVIPWarningSheetOpen(false)}
        onConfirm={handleVIPWarningConfirm}
        pixKey={pixKey}
      />
    </div>
  );
}
