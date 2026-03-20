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
import TeamAndCommunication from './pages/TeamAndComunication';
import History from './pages/History';
import Help from './pages/Help';
import NotFound from './pages/NotFound';
import Settings from './pages/Settings';
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
          <Route path="/equipe" element={<TeamAndCommunication />} />
          <Route path="/historico" element={<History />} />
          <Route path="/ajuda" element={<Help />} />
          <Route path="/configuracoes" element={<Settings />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;