import './Navbar.scss';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-item navbar-item-active">
          <svg className="navbar-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 20.4997V9.24972L12 3.60547L19.5 9.24972V20.4997H13.9038V13.8075H10.0963V20.4997H4.5Z" fill="#0769DA"/>
          </svg>
          <span className="navbar-label navbar-label-active">Início</span>
        </div>

        <div className="navbar-item">
          <div className="navbar-icon-wrapper">
            <svg className="navbar-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.5 21.0385V2.5H21.5V17.5H6.0385L2.5 21.0385ZM5.4 16H20V4H4V17.3848L5.4 16Z" fill="#636B7E"/>
            </svg>
            <div className="notification-badge">
              <span>2</span>
            </div>
          </div>
          <span className="navbar-label">Chat</span>
        </div>

        <div className="navbar-item">
          <svg className="navbar-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.0151 20.1738L10.3766 13.6045L3.80734 10.947L3.78809 9.93152L20.2111 3.77002L14.0303 20.1738H13.0151ZM13.4918 17.3393L17.6573 6.32377L6.62259 10.47L11.5226 12.4393L13.4918 17.3393Z" fill="#636B7E"/>
          </svg>
          <span className="navbar-label">Viagens</span>
        </div>

        <div className="navbar-item">
          <svg className="navbar-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 18V19V5V18ZM20.5 8.029H19V5H5V19H19V15.971H20.5V20.5H3.5V3.5H20.5V8.029ZM11.5 16.5V7.5H21.5V16.5H11.5ZM16 13.5C16.4167 13.5 16.7708 13.3542 17.0625 13.0625C17.3542 12.7708 17.5 12.4167 17.5 12C17.5 11.5833 17.3542 11.2292 17.0625 10.9375C16.7708 10.6458 16.4167 10.5 16 10.5C15.5833 10.5 15.2292 10.6458 14.9375 10.9375C14.6458 11.2292 14.5 11.5833 14.5 12C14.5 12.4167 14.6458 12.7708 14.9375 13.0625C15.2292 13.3542 15.5833 13.5 16 13.5ZM20 15V9H13V15H20Z" fill="#636B7E"/>
          </svg>
          <span className="navbar-label">Carteira</span>
        </div>
      </div>
    </nav>
  );
}
