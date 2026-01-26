import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MandatoryVideoPage.scss';

// Declare YouTube API types
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function MandatoryVideoPage() {
  const navigate = useNavigate();
  const playerRef = useRef<any>(null);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [showVipCard, setShowVipCard] = useState(false);

  useEffect(() => {
    // Load YouTube IFrame API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // Initialize player when API is ready
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('youtube-player', {
        videoId: 'V71F2cNhtYQ',
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0, // Hide controls
          disablekb: 1, // Disable keyboard controls
          modestbranding: 1, // Minimal YouTube branding
          playsinline: 1,
          rel: 0, // Don't show related videos
          fs: 0, // Hide fullscreen button
          iv_load_policy: 3, // Hide annotations
        },
        events: {
          onReady: (event: any) => {
            event.target.playVideo();

            // Track progress continuously
            setInterval(() => {
              if (playerRef.current && playerRef.current.getDuration) {
                const currentTime = playerRef.current.getCurrentTime();
                const duration = playerRef.current.getDuration();
                if (duration > 0) {
                  const progressPercentage = (currentTime / duration) * 100;
                  setProgress(progressPercentage);
                }
              }
            }, 100);
          },
          onStateChange: (event: any) => {
            // Auto-resume if paused (prevent user from pausing)
            if (event.data === window.YT.PlayerState.PAUSED) {
              event.target.playVideo();
            }

            // Handle video end
            if (event.data === window.YT.PlayerState.ENDED) {
              setProgress(100);
              setShowVipCard(true);
            }
          },
        },
      });
    };

    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
    };
  }, []);

  const handleVideoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (playerRef.current) {
      // Ensure video is playing
      const playerState = playerRef.current.getPlayerState();
      if (playerState !== window.YT.PlayerState.PLAYING) {
        playerRef.current.playVideo();
      }

      // Toggle mute
      if (isMuted) {
        playerRef.current.unMute();
        setIsMuted(false);
      } else {
        playerRef.current.mute();
        setIsMuted(true);
      }
    }
  };

  const handleSkipVip = () => {
    navigate(-1);
  };

  return (
    <div className="mandatory-video-page">
      <div className="progress-section">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="progress-text">
          Vídeo obrigatório: não pode ser pulado
        </div>
      </div>

      <div className="video-container">
        <div
          className="video-wrapper"
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "400px",
            paddingTop: "177.78%", // 9:16 (Portrait)
            borderRadius: 16,
            overflow: "hidden",
            background: "#000",
          }}
        >
          <div
            id="youtube-player"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
            }}
          />
          {/* Transparent overlay to capture clicks */}
          <div
            onClick={handleVideoClick}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              cursor: "pointer",
              zIndex: 10,
            }}
          >
            {/* Unmute button - shows when video is muted */}
            {isMuted && (
              <div className="unmute-button">
                <span>Ativar som do vídeo</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 12V8.17391C1 4.21187 4.13401 1 8 1C11.866 1 15 4.21187 15 8.17391V12M4 15H5C5.55228 15 6 14.5523 6 14V10C6 9.44772 5.55228 9 5 9H4C3.44772 9 3 9.44772 3 10V14C3 14.5523 3.44772 15 4 15ZM11 15H12C12.5523 15 13 14.5523 13 14V10C13 9.44772 12.5523 9 12 9H11C10.4477 9 10 9.44772 10 10V14C10 14.5523 10.4477 15 11 15Z"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>

        <div className="audio-hint">
          {isMuted
            ? 'Clique no vídeo para ativar o som.'
            : 'Clique no vídeo para desativar o som.'
          }
        </div>
      </div>

      {/* VIP Card - shows when video ends */}
      {showVipCard && (
        <div className="vip-card-overlay">
          <div className="vip-card">
            <div className="vip-card-content">
              <svg
                className="vip-icon"
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24.7704 26.009L31.2831 12.8656H32.0524L39.1651 26.009H24.7704ZM30.8111 53.635L8.33978 28.389H30.8111V53.635ZM33.1911 53.635V28.389H55.6624L33.1911 53.635ZM41.8678 26.009L34.2371 11.8656H50.7911L56.3958 26.009H41.8678ZM7.60645 26.009L13.2111 11.8656H29.1651L22.0678 26.009H7.60645Z"
                  fill="#0769DA"
                />
              </svg>

              <h2 className="vip-title">
                Assine o VIP agora e fique isento das taxas de serviço.
              </h2>

              <div className="vip-divider" />

              <div className="vip-price-row">
                <span className="vip-price-label">Mensalidade:</span>
                <span className="vip-price-value">R$ 49,90</span>
              </div>

              <div className="vip-divider" />

              <div className="vip-benefits">
                <div className="vip-benefit-item">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.85694 0.857117C5.67025 0.857117 4.51021 1.20901 3.52351 1.8683C2.53682 2.52759 1.76778 3.46466 1.31366 4.56102C0.859533 5.65737 0.740713 6.86377 0.972225 8.02766C1.20374 9.19154 1.77518 10.2606 2.6143 11.0998C3.45341 11.9389 4.52251 12.5103 5.68639 12.7418C6.85028 12.9733 8.05668 12.8545 9.15304 12.4004C10.2494 11.9463 11.1865 11.1772 11.8458 10.1905C12.505 9.20384 12.8569 8.0438 12.8569 6.85712C12.8569 5.26582 12.2248 3.73969 11.0996 2.61448C9.97436 1.48926 8.44823 0.857117 6.85694 0.857117V0.857117ZM7.58694 10.1521C7.5582 10.1568 7.53199 10.1713 7.51282 10.1932C7.49365 10.2151 7.48273 10.243 7.48194 10.2721V10.6571C7.48194 10.8229 7.41609 10.9818 7.29888 11.0991C7.18167 11.2163 7.0227 11.2821 6.85694 11.2821C6.69117 11.2821 6.5322 11.2163 6.41499 11.0991C6.29778 10.9818 6.23194 10.8229 6.23194 10.6571V10.3021C6.23194 10.269 6.21877 10.2372 6.19532 10.2137C6.17188 10.1903 6.14009 10.1771 6.10694 10.1771H5.53194C5.36618 10.1771 5.2072 10.1113 5.08999 9.99406C4.97278 9.87685 4.90694 9.71788 4.90694 9.55211C4.90694 9.38635 4.97278 9.22738 5.08999 9.11017C5.2072 8.99296 5.36618 8.92711 5.53194 8.92711H7.32693C7.45314 8.9225 7.57408 8.87536 7.67012 8.79334C7.76616 8.71133 7.83166 8.59927 7.85598 8.47534C7.8803 8.35141 7.86202 8.2229 7.8041 8.11067C7.74619 7.99845 7.65203 7.90909 7.53693 7.85712L5.71694 7.12212C5.34569 6.97715 5.03304 6.71308 4.82804 6.3713C4.62303 6.02952 4.53725 5.62937 4.58415 5.23359C4.63105 4.83781 4.80797 4.46879 5.08718 4.18439C5.36639 3.89999 5.73209 3.7163 6.12694 3.66212C6.15651 3.65732 6.18339 3.64207 6.20266 3.61912C6.22193 3.59618 6.23232 3.56708 6.23194 3.53712V3.15712C6.23194 2.99136 6.29778 2.83238 6.41499 2.71517C6.5322 2.59796 6.69117 2.53212 6.85694 2.53212C7.0227 2.53212 7.18167 2.59796 7.29888 2.71517C7.41609 2.83238 7.48194 2.99136 7.48194 3.15712V3.50712C7.48194 3.54027 7.4951 3.57206 7.51855 3.5955C7.54199 3.61895 7.57378 3.63212 7.60694 3.63212H8.18193C8.34769 3.63212 8.50667 3.69796 8.62388 3.81517C8.74109 3.93238 8.80693 4.09136 8.80693 4.25712C8.80693 4.42288 8.74109 4.58185 8.62388 4.69906C8.50667 4.81627 8.34769 4.88212 8.18193 4.88212H6.38694C6.25659 4.88161 6.13016 4.92659 6.02942 5.0093C5.92868 5.09201 5.85994 5.20728 5.83507 5.33522C5.81019 5.46317 5.83072 5.59579 5.89313 5.71023C5.95553 5.82466 6.0559 5.91374 6.17694 5.96212L7.99693 6.69212C8.36818 6.83708 8.68083 7.10115 8.88583 7.44293C9.09084 7.78471 9.17662 8.18486 9.12972 8.58064C9.08282 8.97642 8.9059 9.34544 8.62669 9.62984C8.34748 9.91424 7.98178 10.0979 7.58694 10.1521Z"
                      fill="#0769DA"
                    />
                  </svg>
                  <div className="vip-benefit-text">
                    <div className="vip-benefit-title">100% isento de taxa de serviço</div>
                    <div className="vip-benefit-description">Você só paga a mensalidade do plano.</div>
                  </div>
                </div>

                <div className="vip-benefit-item">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_803_23373)">
                      <path
                        d="M13.196 5.51999C13.1446 5.45142 10.401 2.28571 6.85714 2.28571C4.5708 2.28571 2.28445 3.55428 0.518253 5.51999C0.184877 5.88444 0 6.36042 0 6.85428C0 7.34814 0.184877 7.82412 0.518253 8.18856C3.06753 11 5.59394 11.4286 6.85714 11.4286C8.12035 11.4286 10.6696 10.9771 13.196 8.18856C13.5294 7.82412 13.7143 7.34814 13.7143 6.85428C13.7143 6.36042 13.5294 5.88444 13.196 5.51999ZM12.3501 7.42856C12.2929 7.49713 9.83511 10.36 6.85714 10.2857C4.03922 10.2171 1.98723 8.11428 1.35849 7.42856C1.21549 7.27259 1.13617 7.06871 1.13617 6.85713C1.13617 6.64556 1.21549 6.44168 1.35849 6.28571C2.71314 4.79999 4.75942 3.38285 6.85714 3.42856C9.38927 3.37142 11.6699 5.54285 12.3501 6.28571C12.4943 6.44106 12.5745 6.64518 12.5745 6.85713C12.5745 7.06909 12.4943 7.27321 12.3501 7.42856Z"
                        fill="#0769DA"
                      />
                      <path
                        d="M6.85714 4.57142H6.63429C6.60999 4.57387 6.58672 4.58252 6.56671 4.59652C6.54671 4.61053 6.53062 4.62943 6.52 4.65142C6.50746 4.67314 6.50086 4.69777 6.50086 4.72285C6.50086 4.74793 6.50746 4.77256 6.52 4.79428C6.63473 4.96623 6.70067 5.16608 6.7108 5.37255C6.72093 5.57901 6.67488 5.78436 6.57754 5.96672C6.4802 6.14908 6.33523 6.30162 6.15805 6.40811C5.98088 6.5146 5.77814 6.57104 5.57143 6.57142C5.31099 6.5696 5.05898 6.47888 4.85714 6.31428C4.83629 6.30224 4.81265 6.2959 4.78857 6.2959C4.7645 6.2959 4.74085 6.30224 4.72 6.31428C4.69674 6.3213 4.67589 6.33463 4.65975 6.35278C4.64361 6.37094 4.63282 6.39321 4.62857 6.41713C4.59367 6.5613 4.57451 6.70883 4.57143 6.85713C4.57143 7.30921 4.70548 7.75112 4.95664 8.12701C5.2078 8.50289 5.56478 8.79586 5.98244 8.96886C6.4001 9.14186 6.85968 9.18712 7.30306 9.09893C7.74645 9.01074 8.15372 8.79304 8.47339 8.47338C8.79305 8.15372 9.01074 7.74644 9.09894 7.30305C9.18713 6.85967 9.14187 6.40009 8.96887 5.98243C8.79587 5.56477 8.5029 5.20779 8.12702 4.95663C7.75113 4.70547 7.30921 4.57142 6.85714 4.57142Z"
                        fill="#0769DA"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_803_23373">
                        <rect width="13.7143" height="13.7143" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="vip-benefit-text">
                    <div className="vip-benefit-title">Seu perfil destacado</div>
                    <div className="vip-benefit-description">Seja visto pelas melhores empresas</div>
                  </div>
                </div>
              </div>

              <div className="vip-card-actions">
                <button className="vip-button-primary">
                  <span>Assinar VIP</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.3335 8.00006H14.6668M14.6668 8.00006L10.6668 12M14.6668 8.00006L10.6668 4"
                      stroke="white"
                      strokeWidth="0.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  className="vip-button-secondary"
                  onClick={handleSkipVip}
                >
                  Não quero assinar o VIP
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
