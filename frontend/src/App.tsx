import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/globalStyles';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NewReservation from './pages/NewReservation';
import ClassesAndMaterials from './pages/ClassesAndMaterials';
import CourtsAndSpaces from './pages/CourtsAndSpaces';
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
          <Route path="/turmas-materiais" element={<ClassesAndMaterials />} />
          <Route path="/quadras" element={<CourtsAndSpaces />} />
          <Route path="/historico" element={<h1>Histórico</h1>} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;