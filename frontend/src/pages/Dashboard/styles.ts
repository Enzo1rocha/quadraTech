import styled from 'styled-components';

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  animation: fadeIn 0.4s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

export const WelcomeTitle = styled.h1`
  font-size: 28px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: -0.5px;
  margin-bottom: 4px;
`;

export const DateSubtitle = styled.p`
  color: #64748B;
  font-size: 15px;
  font-weight: 500;
`;

export const ActionButton = styled.button`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.primaryHover || '#004A80'});
  color: white;
  border: none;
  padding: 14px 24px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  box-shadow: 0 4px 15px ${({ theme }) => theme.colors.primary}40;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px ${({ theme }) => theme.colors.primary}60;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;

export const StatCard = styled.div`
  background-color: #FFFFFF;
  padding: 24px;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  gap: 12px;
  border: 1px solid rgba(0,0,0,0.02);
`;

export const StatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #64748B;
  font-weight: 500;
  font-size: 14px;

  /* O ícone ganha um fundo redondinho e suave da cor do tema */
  div {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.colors.primary}15;
    color: ${({ theme }) => theme.colors.primary};
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

export const StatValue = styled.span`
  font-size: 32px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
`;

export const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr; /* 2/3 da tela para reservas, 1/3 para avisos/histórico */
  gap: 24px;
`;

export const Card = styled.div`
  background-color: #FFFFFF;
  border-radius: 20px;
  padding: 28px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0,0,0,0.02);
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const CardTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    background: transparent;
    border: none;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
  }
`;

export const ReservationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ReservationItem = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  border-radius: 16px;
  background-color: #F8FAFC; /* Fundo super clarinho */
  border-left: 4px solid ${({ theme }) => theme.colors.primary};
  gap: 16px;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateX(4px); /* Desliza pra direita ao passar o mouse */
  }
`;

export const TimeBlock = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 80px;
  
  strong { color: ${({ theme }) => theme.colors.text}; font-size: 15px; }
  span { color: #64748B; font-size: 12px; }
`;

export const InfoBlock = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  strong { color: ${({ theme }) => theme.colors.text}; font-size: 15px; margin-bottom: 2px;}
  span { color: #64748B; font-size: 13px; }
`;

/* Badges bonitinhos para o Status */
export const StatusBadge = styled.span<{ status: 'active' | 'pending' | 'finished' }>`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;

  ${({ status, theme }) => {
    if (status === 'active') return `background-color: #DCFCE7; color: #166534;`; // Verde
    if (status === 'pending') return `background-color: ${theme.colors.primary}1A; color: ${theme.colors.primary};`; // Azul
    return `background-color: #F1F5F9; color: #475569;`; // Cinza
  }}
`;

export const NoticeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const NoticeItem = styled.div<{ type?: 'warning' }>`
  display: flex;
  gap: 12px;
  padding-bottom: 16px;
  border-bottom: 1px solid #F1F5F9;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  div.icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ type }) => type === 'warning' ? '#FEF08A' : '#E0F2FE'};
    color: ${({ type }) => type === 'warning' ? '#854D0E' : '#0284C7'};

    svg { width: 16px; height: 16px; }
  }

  div.text {
    display: flex;
    flex-direction: column;
    p { color: ${({ theme }) => theme.colors.text}; font-size: 14px; font-weight: 500; margin-bottom: 4px; line-height: 1.4; }
    span { color: #94A3B8; font-size: 12px; }
  }
`;

export const DateNavigator = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: #F8FAFC;
  padding: 6px;
  border-radius: 12px;
  border: 1px solid rgba(0,0,0,0.03);
`;

export const NavArrow = styled.button`
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: 8px;
  color: #64748B;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #E2E8F0;
    color: ${({ theme }) => theme.colors.text};
  }

  svg { width: 18px; height: 18px; }
`;

export const CurrentDateLabel = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  min-width: 100px;
  text-align: center;
`;

/* --- ESTADO VAZIO (EMPTY STATE) --- */
export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 20px;
  text-align: center;
  color: #94A3B8;
  gap: 16px;

  svg {
    width: 64px;
    height: 64px;
    stroke-width: 1px;
    color: #CBD5E1;
  }

  p {
    font-size: 16px;
    font-weight: 500;
    color: #64748B;
  }

  span {
    font-size: 14px;
  }
`;

/* --- DRAWER (GAVETA LATERAL) --- */
export const DrawerOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(2px);
  z-index: 999;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transition: all 0.3s ease-in-out;
`;

export const DrawerContainer = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 400px;
  height: 100vh;
  background-color: #FFFFFF;
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transform: translateX(${({ $isOpen }) => ($isOpen ? '0' : '100%')});
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
`;

export const DrawerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid #F1F5F9;

  h3 {
    font-size: 18px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
  }

  button {
    background: #F1F5F9;
    border: none;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #64748B;
    transition: all 0.2s;

    &:hover {
      background: #E2E8F0;
      color: ${({ theme }) => theme.colors.danger || '#EF4444'};
    }
  }
`;

export const DrawerContent = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  overflow-y: auto;

  /* Exemplo de estilo para as informações dentro da gaveta */
  .info-group {
    display: flex;
    flex-direction: column;
    gap: 8px;

    label { font-size: 13px; color: #94A3B8; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
    p { font-size: 16px; color: ${({ theme }) => theme.colors.text}; font-weight: 500; }
  }
`;

/* (Modifique o seu ReservationItem atual para adicionar o cursor: pointer) */
export const ClickableReservationItem = styled(ReservationItem)`
  cursor: pointer;
  /* O hover que já existe vai dar a sensação de clique */
`;


/* --- LAYOUT DA COLUNA ESQUERDA --- */
export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

/* --- STATUS EM TEMPO REAL (ESPAÇOS) --- */
export const RealTimeGrid = styled.div`
  display: grid;
  /* A MÁGICA DO 1 a N ESTÁ AQUI: */
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
  margin-top: 8px;
`;

export const SpaceCard = styled.div<{ $status: 'livre' | 'ocupado' | 'manutencao' }>`
  background-color: #FFFFFF;
  border-radius: 16px;
  padding: 20px;
  border: 1px solid rgba(0,0,0,0.04);
  box-shadow: 0 2px 10px rgba(0,0,0,0.02);
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
  overflow: hidden;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }

  /* Barrinha lateral colorida para identificação rápida */
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background-color: ${({ $status, theme }) => {
      if ($status === 'livre') return '#10B981'; // Verde
      if ($status === 'ocupado') return theme.colors.primary || '#0284C7'; // Azul
      return '#F59E0B'; // Amarelo/Laranja para manutenção
    }};
  }
`;

export const SpaceHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  div.icon-box {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background-color: #F8FAFC;
    color: #64748B;
    display: flex;
    align-items: center;
    justify-content: center;

    svg { width: 20px; height: 20px; }
  }

  strong {
    font-size: 15px;
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.2;
  }
`;

export const SpaceStatus = styled.div<{ $status: 'livre' | 'ocupado' | 'manutencao' }>`
  display: flex;
  flex-direction: column;
  gap: 4px;

  span.badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    font-weight: 600;
    color: ${({ $status, theme }) => {
      if ($status === 'livre') return '#10B981';
      if ($status === 'ocupado') return theme.colors.primary;
      return '#F59E0B';
    }};

    /* Bolinha pulsante para dar ideia de "Ao vivo" */
    &::before {
      content: '';
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: currentColor;
      box-shadow: 0 0 0 2px currentColor;
      opacity: 0.8;
      animation: ${({ $status }) => $status === 'ocupado' ? 'pulse 2s infinite' : 'none'};
    }
  }

  span.detail {
    font-size: 12px;
    color: #94A3B8;
  }

  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(2, 132, 199, 0.4); }
    70% { box-shadow: 0 0 0 6px rgba(2, 132, 199, 0); }
    100% { box-shadow: 0 0 0 0 rgba(2, 132, 199, 0); }
  }
`;