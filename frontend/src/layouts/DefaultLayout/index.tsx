import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../../components/Sidebar'; // Ajuste o caminho se necessário
import { 
  LayoutContainer, 
  MainWrapper, 
  MobileHeader, 
  MenuButton, 
  ContentArea 
} from './styles';

export function DefaultLayout() {
  // Estado que controla se o menu do celular está aberto
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <LayoutContainer>
      {/* Passamos o estado e a função de fechar para a Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      
      <MainWrapper>
        {/* Este header só é visível no Mobile */}
        <MobileHeader>
          <div className="logo">
            <div />
            <span>QuadraTech</span>
          </div>
          
          {/* Botão Hamburger para abrir o menu */}
          <MenuButton onClick={() => setIsSidebarOpen(true)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="26" height="26">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </MenuButton>
        </MobileHeader>

        {/* Aqui é onde as páginas (Dashboard, Configurações, etc) são renderizadas */}
        <ContentArea>
          <Outlet />
        </ContentArea>
      </MainWrapper>

    </LayoutContainer>
  );
}