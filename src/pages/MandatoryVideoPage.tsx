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
          },
          onStateChange: (event: any) => {
            // Track progress
            const interval = setInterval(() => {
              if (playerRef.current && playerRef.current.getDuration) {
                const currentTime = playerRef.current.getCurrentTime();
                const duration = playerRef.current.getDuration();
                if (duration > 0) {
                  const progressPercentage = (currentTime / duration) * 100;
                  setProgress(progressPercentage);
                }
              }
            }, 100);

            // Clear interval when video ends
            if (event.data === window.YT.PlayerState.ENDED) {
              clearInterval(interval);
              setProgress(100);
            }

            return () => clearInterval(interval);
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

  const handleVideoClick = () => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.unMute();
        setIsMuted(false);
      } else {
        playerRef.current.mute();
        setIsMuted(true);
      }
    }
  };

  const handleBackClick = () => {
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

      <div className="video-container" onClick={handleVideoClick}>
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
            cursor: "pointer",
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
        </div>

        <div className="audio-hint">
          {isMuted 
            ? 'Clique no vídeo para ativar o som.' 
            : 'Clique no vídeo para desativar o som.'
          }
        </div>
      </div>
    </div>
  );
}
