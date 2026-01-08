import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigationDirection } from '../hooks/useNavigationDirection';
import './PageTransition.scss';

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const direction = useNavigationDirection();

  const getTransitionClass = (): string => {
    const baseClass = 'page-transition';
    
    if (direction === 'backward') {
      return `${baseClass} slide-backward`;
    } else if (direction === 'forward') {
      return `${baseClass} slide-forward`;
    }
    
    return baseClass;
  };

  return (
    <div 
      className={getTransitionClass()}
      key={location.pathname}
    >
      {children}
    </div>
  );
}
