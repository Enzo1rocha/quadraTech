import styled from 'styled-components';

export const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

export const ContentArea = styled.main`
  flex: 1; /* Ocupa todo o resto da tela livre ao lado do menu */
  background-color: ${({ theme }) => theme.colors.background};
  padding: 40px;
  overflow-y: auto; /* Adiciona scroll apenas no conteúdo, o menu fica fixo */
`;