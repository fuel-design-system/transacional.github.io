import { ReactNode, useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './PageTransition.scss';

interface PageTransitionProps {
  children: ReactNode;
}

function getRouteDepth(pathname: string): number {
  if (pathname === '/' || pathname === '') return 0;
  if (/^\/freight\/[^/]+$/.test(pathname)) return 1;
  if (/^\/freight\/[^/]+\/chat\/[^/]+$/.test(pathname)) return 2;
  if (/^\/freight\/[^/]+\/chat\/[^/]+\/(documents|confirm)$/.test(pathname)) return 3;
  return 0;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionClass, setTransitionClass] = useState('');
  const prevDepthRef = useRef(getRouteDepth(location.pathname));
  const isTransitioningRef = useRef(false);

  useEffect(() => {
    if (location.pathname === displayLocation.pathname) return;
    if (isTransitioningRef.current) return;

    const currentDepth = getRouteDepth(location.pathname);
    const prevDepth = prevDepthRef.current;
    
    isTransitioningRef.current = true;

    // Determine direction
    let direction: 'forward' | 'backward' = 'forward';
    if (currentDepth < prevDepth) {
      direction = 'backward';
    }

    // Apply exit animation
    setTransitionClass(direction === 'forward' ? 'exit-forward' : 'exit-backward');

    // After exit animation, update content and apply enter animation
    const timer = setTimeout(() => {
      setDisplayLocation(location);
      setTransitionClass(direction === 'forward' ? 'enter-forward' : 'enter-backward');
      prevDepthRef.current = currentDepth;

      // Clear animation class after enter animation
      const clearTimer = setTimeout(() => {
        setTransitionClass('');
        isTransitioningRef.current = false;
      }, 300);

      return () => clearTimeout(clearTimer);
    }, 300);

    return () => clearTimeout(timer);
  }, [location, displayLocation]);

  return (
    <div className={`page-transition ${transitionClass}`}>
      {children}
    </div>
  );
}
