import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

export type NavigationDirection = 'forward' | 'backward' | 'none';

// Define route depth to determine navigation direction
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

export function useNavigationDirection(): NavigationDirection {
  const location = useLocation();
  const prevDepthRef = useRef<number>(getRouteDepth(location.pathname));
  const [direction, setDirection] = useState<NavigationDirection>('none');

  useEffect(() => {
    const currentDepth = getRouteDepth(location.pathname);
    const prevDepth = prevDepthRef.current;
    
    if (currentDepth > prevDepth) {
      setDirection('forward');
    } else if (currentDepth < prevDepth) {
      setDirection('backward');
    } else {
      setDirection('none');
    }

    prevDepthRef.current = currentDepth;
  }, [location.pathname]);

  return direction;
}
