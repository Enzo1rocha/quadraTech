import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const SidebarContainer = styled.aside`
  width: 280px;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.surface};
  /* Trocamos a borda sólida por uma sombra/linha super suave */
  box-shadow: 1px 0 10px rgba(0, 0, 0, 0.02);
  border-right: 1px solid rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  padding: 32px 20px 24px; /* Mais respiro no topo */
`;

export const LogoArea = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 24px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 48px; /* Mais espaço antes de começar o menu */
  padding: 0 12px;
  letter-spacing: -0.5px; /* Deixa o texto da logo mais sofisticado */

  div {
    width: 34px;
    height: 34px;
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.primaryHover});
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 86, 145, 0.2); /* Sombra colorida na logo */
  }
`;

export const NavSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px; 
`;

export const TopNav = styled(NavSection)`
  flex: 1; 
`;

export const BottomNav = styled(NavSection)`
  margin-bottom: 16px;
`;

/* O Divider agora é um gradiente que some nas pontas, super elegante */
export const Divider = styled.div`
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(0,0,0,0.06), transparent);
  margin: 20px 0;
`;

/* Aqui está a maior mágica da fluidez */
export const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  border-radius: 12px; /* Mais redondinho */
  color: #64748B; /* Um cinza-azulado (Slate) que não agride os olhos */
  font-weight: 500;
  font-size: 15px;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); /* Transição de movimento suave */
  position: relative;

  svg {
    width: 20px;
    height: 20px;
    stroke-width: 1.8px;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* O hover agora é limpo, foca na cor e no movimento do ícone */
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background-color: transparent;
  }

  /* Estado ativo muito mais leve */
  &.active {
    background-color: ${({ theme }) => theme.colors.primary}0D; /* Apenas 5% de opacidade na cor principal */
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;

    /* Uma barrinha charmosa na esquerda para marcar onde estamos */
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 20%;
      height: 60%;
      width: 4px;
      background-color: ${({ theme }) => theme.colors.primary};
      border-radius: 0 4px 4px 0;
    }
  }
`;

export const NavButton = styled.button`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  border-radius: 12px;
  background: transparent;
  border: none;
  color: #64748B;
  font-weight: 500;
  font-size: 15px;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  svg {
    width: 20px;
    height: 20px;
    stroke-width: 1.8px;
    transition: transform 0.3s ease;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.danger || '#EF4444'}; /* Fica vermelhinho no hover para indicar saída */
    
    svg {
      transform: translateX(3px); /* O ícone de sair desliza de leve pra direita */
    }
  }
`;

/* Removemos a borda dura do topo e transformamos o perfil em um botão clicável sutil */
export const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  border-radius: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.03); /* Efeito tátil bem de leve */
  }
`;

export const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 12px; /* Em vez de bolinha, um quadrado com cantos arredondados (squircle) */
  background-color: ${({ theme }) => theme.colors.primary}1A; /* Fundo transparente */
  color: ${({ theme }) => theme.colors.primary}; /* Letra na cor principal */
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 15px;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  gap: 2px;
`;

export const UserName = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const UserEmail = styled.span`
  color: #94A3B8; /* Cinza bem clarinho e moderno */
  font-size: 12px;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;