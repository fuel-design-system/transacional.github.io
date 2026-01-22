import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MandatoryVideoPage.scss';

export default function MandatoryVideoPage() {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Autoplay video
    const playVideo = async () => {
      try {
        await video.play();
      } catch (error) {
        console.error('Error autoplaying video:', error);
      }
    };

    playVideo();

    // Update progress bar as video plays
    const handleTimeUpdate = () => {
      if (video.duration) {
        const progressPercentage = (video.currentTime / video.duration) * 100;
        setProgress(progressPercentage);
      }
    };

    // Handle video end
    const handleVideoEnd = () => {
      setProgress(100);
      // Navigate back or to next page when video ends
      // navigate('/'); // Uncomment to navigate after video ends
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleVideoEnd);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleVideoEnd);
    };
  }, [navigate]);

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
          <iframe
            src="https://www.youtube.com/embed/V71F2cNhtYQ?playsinline=1&autoplay=1&mute=1"
            title="Vídeo instrutivo"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              border: 0,
            }}
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>

        <div className="audio-hint">
          Se o áudio não iniciar, clique no vídeo para ativar o som.
        </div>
      </div>
    </div>
  );
}
