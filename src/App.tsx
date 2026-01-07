import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FreightDetail from './pages/FreightDetail';

export default function App() {
  return (
    <BrowserRouter basename="/transacional.github.io">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/freight/:id" element={<FreightDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
