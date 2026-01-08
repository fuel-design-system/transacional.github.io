import { ReactNode, useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './PageTransition.scss';

interface PageTransitionProps {
  children: ReactNode;
}

function getRouteDepth(pathname: string): number {
  // Root
  if (pathname === '/' || pathname === '') return 0;

  // Pending Payment
  if (pathname === '/pending-payment') return 1;

  // Payment Checkout
  if (pathname === '/payment/checkout') return 2;

  // Payment Loading
  if (pathname === '/payment/loading') return 3;

  // Payment Pix
  if (pathname === '/payment/pix') return 4;

  // Payment Success
  if (pathname === '/payment/success') return 5;

  // Contest Service Fee
  if (pathname === '/contest-service-fee') return 2;

  // Freight detail
  if (/^\/freight\/[^/]+$/.test(pathname)) return 1;

  // Chat
  if (/^\/freight\/[^/]+\/chat\/[^/]+$/.test(pathname)) return 2;

  // Documents
  if (/^\/freight\/[^/]+\/chat\/[^/]+\/documents$/.test(pathname)) return 3;

  // Confirm Route Value
  if (/^\/freight\/[^/]+\/chat\/[^/]+\/confirm$/.test(pathname)) return 4;

  // Payment Fee
  if (/^\/freight\/[^/]+\/chat\/[^/]+\/payment-fee$/.test(pathname)) return 5;

  return 0;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const prevDepthRef = useRef(getRouteDepth(location.pathname));
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    const currentDepth = getRouteDepth(location.pathname);
    const prevDepth = prevDepthRef.current;

    // Check if we should skip the transition
    const shouldSkipTransition = location.state && (location.state as { skipTransition?: boolean }).skipTransition;

    // Determine direction and set animation
    if (!shouldSkipTransition) {
      if (currentDepth > prevDepth) {
        setAnimationClass('slide-in-forward');
      } else if (currentDepth < prevDepth) {
        setAnimationClass('slide-in-backward');
      }
    }

    prevDepthRef.current = currentDepth;

    // Remove animation class after animation completes
    const timer = setTimeout(() => {
      setAnimationClass('');
    }, 350);

    return () => clearTimeout(timer);
  }, [location.pathname, location.state]);

  return (
    <div className={`page-transition ${animationClass}`} key={location.pathname}>
      {children}
    </div>
  );
}
