import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  animation: fadeIn 0.4s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const PageHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    font-size: 28px;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.text};
    letter-spacing: -0.5px;
  }
`;

export const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  background-color: #FFFFFF;
  padding: 16px 24px;
  border-radius: 16px;
  border: 1px solid rgba(0,0,0,0.02);
  box-shadow: 0 2px 10px rgba(0,0,0,0.02);

  .search-box {
    display: flex;
    align-items: center;
    background-color: #F8FAFC;
    border: 1px solid #E2E8F0;
    border-radius: 10px;
    padding: 0 16px;
    width: 320px;

    &:focus-within {
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
    }

    svg { color: #94A3B8; width: 18px; height: 18px; }
    
    input {
      border: none;
      background: transparent;
      padding: 12px;
      width: 100%;
      outline: none;
      color: ${({ theme }) => theme.colors.text};
      font-size: 14px;
    }
  }

  button.action-btn {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 10px;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover { background: ${({ theme }) => theme.colors.primaryHover || '#004A80'}; }
  }
`;

/* --- FILTROS RÁPIDOS (CHIPS) --- */
export const FiltersContainer = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

export const FilterChip = styled.button<{ $active?: boolean }>`
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid ${({ $active, theme }) => $active ? theme.colors.primary : '#E2E8F0'};
  background: ${({ $active, theme }) => $active ? theme.colors.primary : '#FFFFFF'};
  color: ${({ $active }) => $active ? '#FFFFFF' : '#64748B'};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ $active, theme }) => $active ? '#FFFFFF' : theme.colors.primary};
  }
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
`;

/* --- CARD DE ESPAÇO ESPORTIVO --- */
/* --- CARD DE ESPAÇO ESPORTIVO (SIMPLIFICADO) --- */
export const SpaceCard = styled.div`
  background: #FFFFFF;
  border-radius: 12px;
  padding: 16px; /* Reduzido */
  border: 1px solid rgba(0,0,0,0.06); /* Borda sutil */
  display: flex;
  flex-direction: row; /* Mudado para linha */
  align-items: center; /* Centraliza verticalmente */
  gap: 16px;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    border-color: rgba(0,0,0,0.1);
  }

  .icon-wrapper {
    font-size: 24px; /* Ícone menor */
    background: #F8FAFC;
    width: 48px; /* Quadrado menor */
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    color: #64748B;
  }

  .details {
    flex: 1; /* Ocupa o espaço restante */
    display: flex;
    flex-direction: column;

    h3 { 
      font-size: 15px; /* Fonte menor */
      font-weight: 700;
      color: ${({ theme }) => theme.colors.text}; 
      margin: 0;
    }
    
    span.type { 
      font-size: 13px; 
      color: #64748B; 
      margin-top: 2px;
    }
  }

  /* Badge compacta */
  .status-badge {
    padding: 6px 12px;
    border-radius: 20px; /* Redondinha */
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    white-space: nowrap; /* Não quebra linha */

    &.operacional { background: #DCFCE7; color: #166534; }
    &.manutencao { background: #FEE2E2; color: #991B1B; }
  }
`;

/* --- REAPROVEITANDO O MODAL DA TELA ANTERIOR --- */
export const ModalOverlay = styled.div`
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(4px);
  display: flex; align-items: center; justify-content: center; z-index: 999;
`;

export const ModalContent = styled.div`
  background: #FFFFFF; width: 100%; max-width: 480px; border-radius: 20px; padding: 24px;
  h2 { font-size: 20px; margin-bottom: 20px; color: ${({ theme }) => theme.colors.text}; }
  form { display: flex; flex-direction: column; gap: 16px; }
  .input-group {
    display: flex; flex-direction: column; gap: 6px;
    label { font-size: 13px; font-weight: 600; color: #475569; }
    input, select { padding: 10px 14px; border: 1px solid #E2E8F0; border-radius: 10px; font-size: 14px; outline: none; }
  }
  .modal-actions {
    display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px;
    button { padding: 10px 20px; border-radius: 10px; font-weight: 600; cursor: pointer; }
    button.cancel { background: transparent; border: 1px solid #E2E8F0; color: #64748B; }
    button.save { background: ${({ theme }) => theme.colors.primary}; border: none; color: white; }
  }
`;