import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/DocumentsPage.scss';

export default function DocumentsPage() {
  const navigate = useNavigate();
  const { freightId, contactId } = useParams();
  const [isMopChecked, setIsMopChecked] = useState(false);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleContinue = () => {
    navigate(`/freight/${freightId}/chat/${contactId}/confirm`);
  };

  return (
    <div className="documents-page">
      {/* Top Bar */}
      <div className="top-bar">
        <button className="close-button" onClick={handleBackClick}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.40043 18.6537L5.34668 17.5999L10.9467 11.9999L5.34668 6.39994L6.40043 5.34619L12.0004 10.9462L17.6004 5.34619L18.6542 6.39994L13.0542 11.9999L18.6542 17.5999L17.6004 18.6537L12.0004 13.0537L6.40043 18.6537Z" fill="#111111"/>
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="documents-content">
        <h1 className="page-title">Documentos que serão liberados para a empresa:</h1>

        <div className="documents-list">
          {/* Obrigatórios Card */}
          <div className="document-card">
            {/* Motorista */}
            <div className="document-item">
              <div className="item-row">
                <div className="avatar-letter">R</div>
                <div className="item-info">
                  <div className="item-title">Motorista</div>
                  <div className="item-description">Nome, CPF, CNH, +2</div>
                  <button className="link-button">Alterar</button>
                </div>
                <div className="required-badge">Obrigatório</div>
              </div>
            </div>

            <div className="divider"></div>

            {/* Veículo */}
            <div className="document-item">
              <div className="item-row">
                <div className="avatar-image">
                  <img src="https://cdn.builder.io/api/v1/image/assets%2F7de6902bb7ea42d4be5082a42dd00e60%2Fd2326185d8c14e199fd0ea93d543d691?format=webp&width=800" alt="Veículo" />
                </div>
                <div className="item-info">
                  <div className="item-title">Veículo</div>
                  <div className="item-description">CRLV, ANTT</div>
                  <button className="link-button">Alterar</button>
                </div>
                <div className="required-badge">Obrigatório</div>
              </div>
            </div>

            <div className="divider"></div>

            {/* Seu Pix */}
            <div className="document-item">
              <div className="item-row">
                <div className="icon-container">
                  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.2267 13.9709C12.4417 13.7559 12.8161 13.7552 13.0312 13.9709L16.0951 17.0336C16.6618 17.6 17.4154 17.9125 18.2167 17.9125H18.5854L14.695 21.8041L14.4582 22.0165C13.3207 22.944 11.6795 22.9441 10.5421 22.0165L10.3065 21.8041L6.42593 17.9235H7.03018C7.73122 17.9234 8.39605 17.6851 8.93081 17.246L9.15176 17.0458L12.2267 13.9709ZM5.55679 7.94548C5.60625 7.96411 5.65941 7.97722 5.71548 7.97722H7.03018C7.58279 7.9773 8.12406 8.20159 8.51455 8.59245L11.5895 11.6674C11.8761 11.9536 12.253 12.0971 12.6295 12.0971C13.0057 12.0969 13.3818 11.9527 13.6684 11.6662L16.7323 8.60344C17.0742 8.26138 17.5311 8.04737 18.0104 7.99919L18.2167 7.9882H19.286C19.3449 7.98813 19.4005 7.97463 19.4521 7.95402L21.8043 10.3063C23.0155 11.518 23.0154 13.4818 21.8043 14.6935L19.4521 17.0458C19.4005 17.0252 19.3449 17.0117 19.286 17.0116H18.2167C17.664 17.0116 17.1229 16.7872 16.7323 16.3964L13.6684 13.3337C13.1132 12.778 12.1452 12.7785 11.5895 13.3337L8.51455 16.4074C8.12406 16.7982 7.58279 17.0225 7.03018 17.0226H5.71548C5.65941 17.0226 5.60635 17.0357 5.55679 17.0544L3.19717 14.6935C2.06118 13.5575 1.98968 11.7607 2.98355 10.5419L3.19717 10.3063L5.55679 7.94548ZM10.3065 3.19694C11.5183 1.98513 13.4831 1.98513 14.695 3.19694L18.5854 7.08732H18.2167C17.4154 7.08732 16.6618 7.39984 16.0951 7.96623L13.0312 11.0302C12.8093 11.2524 12.4481 11.2513 12.2267 11.0302L9.15176 7.95524C8.58517 7.38893 7.83137 7.07643 7.03018 7.07634H6.42593L10.3065 3.19694Z" fill="#636B7E"/>
                  </svg>
                </div>
                <div className="item-info">
                  <div className="item-title">Seu Pix</div>
                  <div className="item-description">(11) 9 9999-8888</div>
                  <button className="link-button">Alterar</button>
                </div>
                <div className="required-badge">Obrigatório</div>
              </div>
            </div>
          </div>

          {/* Outros Card */}
          <div className="document-card">
            <div className="section-header">Outros</div>
            
            <div className="document-item">
              <div className="item-row">
                <div className="avatar-image document-thumb">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="40" rx="10" fill="#F4F4F5"/>
                    <path d="M13 10H22L27 15V30H13V10Z" fill="#DFE1E6"/>
                    <path d="M22 10V15H27" stroke="#BABEC9" strokeWidth="1.5"/>
                  </svg>
                </div>
                <div className="item-info">
                  <div className="item-title-small">Certificado MOP</div>
                </div>
                <div className="checkbox-container">
                  <button 
                    className={`checkbox ${isMopChecked ? 'checked' : ''}`}
                    onClick={() => setIsMopChecked(!isMopChecked)}
                  >
                    {isMopChecked && (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.2426 3.03039L4.79289 8.48012L1.75736 5.44459L2.51472 4.68723L4.79289 6.96541L9.48528 2.27303L10.2426 3.03039Z" fill="white"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="divider-small"></div>

            <div className="document-item clickable">
              <div className="item-row">
                <div className="icon-container">
                  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.8226 17.2397H13.1768V13.1772H17.2393V11.8231H13.1768V7.76058H11.8226V11.8231H7.76009V13.1772H11.8226V17.2397ZM12.5085 21.9793C11.2045 21.9793 9.97641 21.7326 8.82415 21.2392C7.6719 20.7458 6.66339 20.0669 5.79863 19.2025C4.93388 18.3381 4.25462 17.3304 3.76087 16.1793C3.2673 15.0285 3.02051 13.7987 3.02051 12.49C3.02051 11.1813 3.26721 9.9552 3.76061 8.81162C4.25401 7.66804 4.93292 6.66388 5.79733 5.79912C6.66174 4.93436 7.66947 4.25511 8.82051 3.76136C9.97138 3.26778 11.2012 3.021 12.5098 3.021C13.8185 3.021 15.0446 3.2677 16.1882 3.7611C17.3318 4.2545 18.336 4.93341 19.2007 5.79782C20.0655 6.66223 20.7447 7.66787 21.2385 8.81475C21.7321 9.96179 21.9788 11.1873 21.9788 12.4913C21.9788 13.7953 21.7321 15.0234 21.2387 16.1757C20.7453 17.3279 20.0664 18.3364 19.202 19.2012C18.3376 20.066 17.332 20.7452 16.1851 21.239C15.038 21.7325 13.8125 21.9793 12.5085 21.9793Z" fill="#636B7E"/>
                  </svg>
                </div>
                <div className="item-info">
                  <div className="item-title-small">Novo documento</div>
                </div>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 4L9.91964 7.81156C9.97109 7.86151 10 7.9293 10 8C10 8.0707 9.97109 8.13849 9.91964 8.18844L6 12" stroke="#636B7E" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Pendentes Card */}
          <div className="document-card">
            <div className="section-header">Pendentes (1)</div>
            
            <div className="document-item clickable">
              <div className="item-row">
                <div className="icon-container">
                  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.77051 17.4799V16.3661C1.77051 15.7425 2.089 15.234 2.72598 14.8406C3.36313 14.4474 4.21122 14.2508 5.27025 14.2508C5.4798 14.2508 5.68205 14.2611 5.87702 14.2818C6.07198 14.3024 6.26834 14.3301 6.46608 14.3648C6.29785 14.6374 6.16895 14.9319 6.07936 15.2482C5.98995 15.5647 5.94525 15.8786 5.94525 16.1898V17.4799H1.77051ZM7.39551 17.4799V16.2299C7.39551 15.8117 7.50636 15.4398 7.72806 15.1141C7.94976 14.7882 8.2923 14.5011 8.75567 14.2529C9.21903 14.0044 9.76296 13.8225 10.3874 13.707C11.0117 13.5914 11.7188 13.5336 12.5085 13.5336C13.2972 13.5336 13.9994 13.5914 14.615 13.707C15.2307 13.8225 15.7702 14.0044 16.2335 14.2529C16.6971 14.4838 17.0413 14.7681 17.2663 15.1057C17.4913 15.4434 17.6038 15.8181 17.6038 16.2299V17.4799H7.39551ZM19.0541 17.4799V16.193C19.0541 15.8706 19.0077 15.5577 18.915 15.2544C18.8222 14.9513 18.6916 14.6548 18.5234 14.3648C18.693 14.3301 18.8709 14.3024 19.0572 14.2818C19.2435 14.2611 19.4709 14.2508 19.7393 14.2508C20.7983 14.2508 21.6446 14.4491 22.2783 14.8458C22.912 15.2424 23.2288 15.7491 23.2288 16.3661V17.4799H19.0541ZM5.26738 13.0307C4.82849 13.0307 4.45679 12.8779 4.15228 12.5721C3.84777 12.2664 3.69551 11.8944 3.69551 11.4563C3.69551 11.029 3.84846 10.6615 4.15436 10.3536C4.46009 10.0458 4.83205 9.89193 5.27025 9.89193C5.6975 9.89193 6.06669 10.0458 6.3778 10.3536C6.68908 10.6615 6.84473 11.03 6.84473 11.4594C6.84473 11.8913 6.69091 12.2612 6.38327 12.569C6.0758 12.8768 5.70384 13.0307 5.26738 13.0307ZM19.7393 13.0307C19.3052 13.0307 18.9343 12.8768 18.6265 12.569C18.3187 12.2612 18.1648 11.8913 18.1648 11.4594C18.1648 11.03 18.3187 10.6615 18.6265 10.3536C18.9343 10.0458 19.3058 9.89193 19.7411 9.89193C20.1739 9.89193 20.5442 10.0458 20.852 10.3536C21.1598 10.6615 21.3137 11.029 21.3137 11.4563C21.3137 11.8944 21.1603 12.2664 20.8533 12.5721C20.5464 12.8779 20.175 13.0307 19.7393 13.0307ZM12.5033 12.2836C11.8398 12.2836 11.2747 12.0509 10.808 11.5854C10.3413 11.12 10.108 10.5549 10.108 9.8901C10.108 9.22917 10.3406 8.66562 10.8059 8.19948C11.2714 7.73316 11.8366 7.5 12.5015 7.5C13.1623 7.5 13.7258 7.73325 14.1921 8.19974C14.6583 8.66606 14.8913 9.22891 14.8913 9.88828C14.8913 10.5516 14.6582 11.1168 14.1919 11.5836C13.7254 12.0503 13.1625 12.2836 12.5033 12.2836Z" fill="#636B7E"/>
                  </svg>
                </div>
                <div className="item-info">
                  <div className="item-title-small">Referências profissionais</div>
                </div>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 4L9.91964 7.81156C9.97109 7.86151 10 7.9293 10 8C10 8.0707 9.97109 8.13849 9.91964 8.18844L6 12" stroke="#636B7E" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
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
