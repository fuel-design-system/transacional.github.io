import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FreightDetail from './pages/FreightDetail';
import ChatPage from './pages/ChatPage';

export default function App() {
  return (
    <BrowserRouter basename="/transacional.github.io">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/freight/:id" element={<FreightDetail />} />
        <Route path="/freight/:freightId/chat/:contactId" element={<ChatPage />} />
      </Routes>
    </BrowserRouter>
  );
}
