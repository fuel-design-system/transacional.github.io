import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import FreightDetail from './pages/FreightDetail';
import ChatPage from './pages/ChatPage';
import DocumentsPage from './pages/DocumentsPage';
import PaymentFeePage from './pages/PaymentFeePage';
import PendingPaymentPage from './pages/PendingPaymentPage';
import PaymentCheckoutPage from './pages/PaymentCheckoutPage';
import PaymentLoadingPage from './pages/PaymentLoadingPage';
import PaymentPixPage from './pages/PaymentPixPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import ContestServiceFeePage from './pages/ContestServiceFeePage';
import MandatoryVideoPage from './pages/MandatoryVideoPage';
import PageTransition from './components/PageTransition';

function AppRoutes() {
  const location = useLocation();

  return (
    <PageTransition>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/mandatory-video" element={<MandatoryVideoPage />} />
        <Route path="/pending-payment" element={<PendingPaymentPage />} />
        <Route path="/payment/checkout" element={<PaymentCheckoutPage />} />
        <Route path="/payment/loading" element={<PaymentLoadingPage />} />
        <Route path="/payment/pix" element={<PaymentPixPage />} />
        <Route path="/payment/success" element={<PaymentSuccessPage />} />
        <Route path="/contest-service-fee" element={<ContestServiceFeePage />} />
        <Route path="/freight/:id" element={<FreightDetail />} />
        <Route path="/freight/:freightId/chat/:contactId" element={<ChatPage />} />
        <Route path="/freight/:freightId/chat/:contactId/documents" element={<DocumentsPage />} />
        <Route path="/freight/:freightId/chat/:contactId/payment-fee" element={<PaymentFeePage />} />
      </Routes>
    </PageTransition>
  );
}

export default function App() {
  return (
    <BrowserRouter basename="/sem-vip.github.io">
      <AppRoutes />
    </BrowserRouter>
  );
}
