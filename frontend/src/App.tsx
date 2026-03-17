import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/globalStyles';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NewReservation from './pages/NewReservation';
import { DefaultLayout } from './layouts/DefaultLayout';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<DefaultLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/nova-reserva" element={<NewReservation />} />
          <Route path="/turmas-materiais" element={<h1>Turmas e Materiais</h1>} />
          <Route path="/historico" element={<h1>Histórico</h1>} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;