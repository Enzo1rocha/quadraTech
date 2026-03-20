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

  @media (max-width: 768px) {
    gap: 16px;
  }
`;

export const PageHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    font-size: 28px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
    letter-spacing: -0.5px;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 24px;
    }
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
    transition: all 0.2s;

    &:focus-within {
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
    }

    svg { color: #94A3B8; width: 18px; height: 18px; flex-shrink: 0; }
    
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
    white-space: nowrap;

    &:hover { background: ${({ theme }) => theme.colors.primaryHover || '#004A80'}; }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 16px;

    .search-box {
      width: 100%;
    }

    button.action-btn {
      width: 100%;
    }
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

  @media (max-width: 768px) {
    padding: 6px 14px;
    font-size: 12px;
  }
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); /* Reduzido o minmax para mobile */
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

/* --- CARD DE ESPAÇO ESPORTIVO --- */
export const SpaceCard = styled.div`
  background: #FFFFFF;
  border-radius: 12px;
  padding: 16px;
  border: 1px solid rgba(0,0,0,0.06);
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    border-color: rgba(0,0,0,0.1);
  }

  .icon-wrapper {
    font-size: 24px;
    background: #F8FAFC;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    color: #64748B;
    flex-shrink: 0;
  }

  .details {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0; /* Previne que texto longo quebre o layout do flex */

    h3 { 
      font-size: 15px;
      font-weight: 700;
      color: ${({ theme }) => theme.colors.text}; 
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    span.type { 
      font-size: 13px; 
      color: #64748B; 
      margin-top: 2px;
    }
  }

  .status-badge {
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    white-space: nowrap;

    &.operacional { background: #DCFCE7; color: #166534; }
    &.manutencao { background: #FEE2E2; color: #991B1B; }
  }

  @media (max-width: 768px) {
    flex-wrap: wrap; /* Permite que o badge caia para a próxima linha se apertar muito */
  }
`;

/* --- MODAL --- */
export const ModalOverlay = styled.div`
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(4px);
  display: flex; align-items: center; justify-content: center; z-index: 999;
  padding: 16px;
`;

export const ModalContent = styled.div`
  background: #FFFFFF; width: 100%; max-width: 480px; border-radius: 20px; padding: 24px;
  max-height: 90vh; overflow-y: auto;
  
  h2 { font-size: 20px; margin-bottom: 20px; color: ${({ theme }) => theme.colors.text}; }
  form { display: flex; flex-direction: column; gap: 16px; }
  
  .form-row {
    display: flex;
    gap: 16px;
    
    .select-group { flex: 1; }
    .icon-group { width: 100px; }
  }

  .input-group {
    display: flex; flex-direction: column; gap: 6px;
    label { font-size: 13px; font-weight: 600; color: #475569; }
    input, select { 
      padding: 10px 14px; border: 1px solid #E2E8F0; border-radius: 10px; 
      font-size: 14px; outline: none; width: 100%; background: #F8FAFC;
      &:focus { border-color: ${({ theme }) => theme.colors.primary}; background: #FFFFFF; }
    }
  }

  .modal-actions {
    display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px;
    button { padding: 10px 20px; border-radius: 10px; font-weight: 600; cursor: pointer; transition: all 0.2s;}
    button.cancel { background: transparent; border: 1px solid #E2E8F0; color: #64748B; &:hover{ background: #F8FAFC; } }
    button.save { background: ${({ theme }) => theme.colors.primary}; border: none; color: white; &:hover{ filter: brightness(0.9); } }
  }

  @media (max-width: 768px) {
    padding: 20px;

    .form-row {
      flex-direction: column;
      
      .icon-group { width: 100%; }
    }

    .modal-actions {
      flex-direction: column-reverse;
      button { width: 100%; padding: 14px; }
    }
  }
`;