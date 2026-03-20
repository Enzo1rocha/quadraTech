import styled from 'styled-components';

export const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.background};
`;

/* O MainWrapper agrupa o Cabeçalho Mobile e o Conteúdo, ficando ao lado da Sidebar no Desktop */
export const MainWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

/* O Cabeçalho Mobile só aparece em telas menores que 768px */
export const MobileHeader = styled.header`
  display: none;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  z-index: 10;

  @media (max-width: 768px) {
    display: flex;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 800;
    font-size: 20px;
    color: ${({ theme }) => theme.colors.primary};
    
    div {
      width: 28px;
      height: 28px;
      background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.primaryHover});
      border-radius: 8px;
    }
  }
`;

export const MenuButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
`;

export const ContentArea = styled.main`
  flex: 1;
  padding: 40px;
  overflow-y: auto;

  /* No celular, diminuímos o padding para ganhar espaço de tela */
  @media (max-width: 768px) {
    padding: 20px;
  }
`;