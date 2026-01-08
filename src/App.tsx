import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import FreightDetail from './pages/FreightDetail';
import ChatPage from './pages/ChatPage';
import DocumentsPage from './pages/DocumentsPage';
import ConfirmRouteValuePage from './pages/ConfirmRouteValuePage';
import PaymentFeePage from './pages/PaymentFeePage';
import PendingPaymentPage from './pages/PendingPaymentPage';
import PageTransition from './components/PageTransition';

function AppRoutes() {
  const location = useLocation();

  return (
    <PageTransition>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/pending-payment" element={<PendingPaymentPage />} />
        <Route path="/freight/:id" element={<FreightDetail />} />
        <Route path="/freight/:freightId/chat/:contactId" element={<ChatPage />} />
        <Route path="/freight/:freightId/chat/:contactId/documents" element={<DocumentsPage />} />
        <Route path="/freight/:freightId/chat/:contactId/confirm" element={<ConfirmRouteValuePage />} />
        <Route path="/freight/:freightId/chat/:contactId/payment-fee" element={<PaymentFeePage />} />
      </Routes>
    </PageTransition>
  );
}

export default function App() {
  return (
    <BrowserRouter basename="/transacional.github.io">
      <AppRoutes />
    </BrowserRouter>
  );
}
