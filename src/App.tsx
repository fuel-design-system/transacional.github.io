import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FreightDetail from './pages/FreightDetail';
import ChatPage from './pages/ChatPage';
import DocumentsPage from './pages/DocumentsPage';
import ConfirmRouteValuePage from './pages/ConfirmRouteValuePage';

export default function App() {
  return (
    <BrowserRouter basename="/transacional.github.io">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/freight/:id" element={<FreightDetail />} />
        <Route path="/freight/:freightId/chat/:contactId" element={<ChatPage />} />
        <Route path="/freight/:freightId/chat/:contactId/documents" element={<DocumentsPage />} />
        <Route path="/freight/:freightId/chat/:contactId/confirm" element={<ConfirmRouteValuePage />} />
      </Routes>
    </BrowserRouter>
  );
}
