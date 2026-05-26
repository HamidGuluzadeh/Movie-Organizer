import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import MainPage from './MainPage';
import ListPage from './ListPage';
import './style.css';

export default function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/list" element={<ListPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}