import { Route, BrowserRouter, Routes } from 'react-router-dom';
import './App.scss';

import HomePage from './pages/Homepage';
import FormTablePage from './pages/FormTablePage';

function App() {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/form-table" element={<FormTablePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
