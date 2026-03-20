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

  /* Reduz o respiro no celular */
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

/* --- BARRA DE FILTROS AVANÇADOS --- */
export const FilterBar = styled.div`
  display: flex;
  gap: 16px;
  background-color: #FFFFFF;
  padding: 16px 24px;
  border-radius: 16px;
  border: 1px solid rgba(0,0,0,0.02);
  box-shadow: 0 2px 10px rgba(0,0,0,0.02);
  flex-wrap: wrap;

  .search-box {
    flex: 2;
    min-width: 250px;
    display: flex;
    align-items: center;
    background-color: #F8FAFC;
    border: 1px solid #E2E8F0;
    border-radius: 10px;
    padding: 0 16px;

    &:focus-within { border-color: ${({ theme }) => theme.colors.primary}; }
    svg { color: #94A3B8; width: 18px; height: 18px; flex-shrink: 0; }
    input { border: none; background: transparent; padding: 12px; width: 100%; outline: none; font-size: 14px; }
  }

  .filter-select {
    flex: 1;
    min-width: 150px;
    padding: 12px 16px;
    background-color: #F8FAFC;
    border: 1px solid #E2E8F0;
    border-radius: 10px;
    font-size: 14px;
    color: #475569;
    outline: none;
    cursor: pointer;
    &:focus { border-color: ${({ theme }) => theme.colors.primary}; }
  }

  /* Empilha os filtros no mobile */
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 16px;
    gap: 12px;

    .search-box, .filter-select {
      width: 100%;
      min-width: 100%;
      flex: none;
    }
  }
`;

/* --- LISTA DE HISTÓRICO (TIMELINE) --- */
export const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: #FFFFFF;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid rgba(0,0,0,0.04);
  box-shadow: 0 4px 15px rgba(0,0,0,0.02);

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const HistoryItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-radius: 12px;
  background: #F8FAFC;
  transition: all 0.2s;

  &:hover {
    background: #F1F5F9;
    transform: translateX(4px);
  }

  .icon-wrapper {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    flex-shrink: 0;

    /* Cores dinâmicas baseadas no tipo de evento */
    &.reserva { background: #DBEAFE; color: #1D4ED8; }
    &.material { background: #FFEDD5; color: #C2410C; }
    &.aviso { background: #F3E8FF; color: #7E22CE; }
    &.sistema { background: #E2E8F0; color: #475569; }
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;

    .description {
      font-size: 14px;
      color: ${({ theme }) => theme.colors.text};
      
      strong { font-weight: 600; color: ${({ theme }) => theme.colors.primary}; }
    }

    .details {
      font-size: 13px;
      color: #64748B;
    }
  }

  .meta {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 6px;
    flex-shrink: 0;

    .time {
      font-size: 13px;
      font-weight: 500;
      color: #475569;
    }

    .badge {
      font-size: 11px;
      font-weight: 700;
      padding: 4px 8px;
      border-radius: 6px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      color: #64748B;
    }
  }

  /* No celular, os metadados (hora e badge) descem para criar um rodapé no card */
  @media (max-width: 768px) {
    flex-wrap: wrap; /* Permite que os itens quebrem linha */
    align-items: flex-start;

    .content {
      /* Garante que o texto ocupe o máximo do espaço ao lado do ícone antes de quebrar */
      min-width: 200px; 
    }

    .meta {
      width: 100%;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding-top: 12px;
      margin-top: 4px;
      border-top: 1px solid #E2E8F0; /* Linha sutil separando a ação da data */
    }
  }
`;