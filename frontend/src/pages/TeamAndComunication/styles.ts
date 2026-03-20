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
  flex-wrap: wrap;
  gap: 16px;

  h1 { font-size: 28px; font-weight: 700; color: ${({ theme }) => theme.colors.text}; }

  @media (max-width: 768px) {
    h1 { font-size: 24px; }
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const TabsContainer = styled.div`
  display: flex; 
  background-color: #F1F5F9; 
  padding: 4px; 
  border-radius: 12px; 
  width: fit-content;

  @media (max-width: 768px) {
    width: 100%; /* Ocupa tudo no mobile */
  }
`;

export const TabButton = styled.button<{ $isActive: boolean }>`
  padding: 10px 24px; border: none; border-radius: 8px; font-size: 14px; font-weight: 600;
  display: flex; align-items: center; gap: 8px; cursor: pointer; transition: all 0.2s;
  background-color: ${({ $isActive }) => ($isActive ? '#FFFFFF' : 'transparent')};
  color: ${({ $isActive, theme }) => ($isActive ? theme.colors.primary : '#64748B')};
  box-shadow: ${({ $isActive }) => ($isActive ? '0 2px 8px rgba(0,0,0,0.05)' : 'none')};
  
  svg { width: 18px; height: 18px; }

  @media (max-width: 768px) {
    flex: 1; /* Divide o espaço igualmente entre as duas abas */
    justify-content: center;
    padding: 10px 16px;
    font-size: 13px;
  }
`;

export const Toolbar = styled.div`
  display: flex; justify-content: space-between; align-items: center; gap: 16px;
  background-color: #FFFFFF; padding: 16px 24px; border-radius: 16px; border: 1px solid rgba(0,0,0,0.02);
  
  .search-box {
    display: flex; align-items: center; background-color: #F8FAFC; border: 1px solid #E2E8F0;
    border-radius: 10px; padding: 0 16px; width: 320px; transition: all 0.2s;
    &:focus-within { border-color: ${({ theme }) => theme.colors.primary}; }
    svg { color: #94A3B8; width: 18px; height: 18px; flex-shrink: 0; }
    input { border: none; background: transparent; padding: 12px; width: 100%; outline: none; font-size: 14px; }
  }

  button.action-btn {
    background: ${({ theme }) => theme.colors.primary}; color: white; border: none;
    padding: 12px 20px; border-radius: 10px; font-weight: 600; font-size: 14px; cursor: pointer; transition: all 0.2s;
    white-space: nowrap;
    &:hover { background: ${({ theme }) => theme.colors.primaryHover || '#004A80'}; }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 16px;

    .search-box { width: 100%; }
    button.action-btn { width: 100%; }
  }
`;

/* --- GRIDS E LISTAS --- */
export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const NoticeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

/* --- CARD DE MEMBRO DA EQUIPE --- */
export const TeamCard = styled.div`
  background: #FFFFFF;
  border-radius: 16px;
  padding: 20px;
  border: 1px solid rgba(0,0,0,0.04);
  display: flex;
  align-items: center;
  gap: 16px;
  transition: transform 0.2s;

  &:hover { transform: translateY(-2px); box-shadow: 0 4px 15px rgba(0,0,0,0.03); }

  .avatar {
    width: 56px; height: 56px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary}15;
    color: ${({ theme }) => theme.colors.primary};
    display: flex; align-items: center; justify-content: center;
    font-size: 20px; font-weight: 700;
    flex-shrink: 0;
  }

  .info {
    flex: 1;
    display: flex; flex-direction: column; gap: 4px; min-width: 0;
    
    h3 { 
      font-size: 16px; color: ${({ theme }) => theme.colors.text}; margin: 0; 
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    span.role { font-size: 13px; color: #64748B; }
    span.contact { 
      font-size: 12px; color: #94A3B8; display: flex; align-items: center; gap: 4px; margin-top: 4px;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      svg { flex-shrink: 0; }
    }
  }
`;

/* --- CARD DE AVISO (COM VALIDADE) --- */
export const NoticeCard = styled.div<{ $type: 'info' | 'alert' | 'success' }>`
  background: #FFFFFF;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid rgba(0,0,0,0.04);
  border-left: 4px solid ${({ $type, theme }) => {
    if ($type === 'alert') return '#EF4444';
    if ($type === 'success') return '#10B981';
    return theme.colors.primary;
  }};
  display: flex;
  flex-direction: column;
  gap: 12px;

  .notice-header {
    display: flex; justify-content: space-between; align-items: flex-start; gap: 12px;
    h3 { font-size: 16px; color: ${({ theme }) => theme.colors.text}; margin: 0; line-height: 1.4; }
    
    .expires-badge {
      font-size: 12px; font-weight: 600; padding: 4px 10px; border-radius: 20px;
      background: #FEE2E2; color: #991B1B;
      display: flex; align-items: center; gap: 4px; white-space: nowrap; flex-shrink: 0;
      svg { width: 14px; height: 14px; }
    }
  }

  p.message { font-size: 14px; color: #475569; line-height: 1.5; margin: 0; }

  .notice-footer {
    display: flex; justify-content: space-between; align-items: center;
    margin-top: 8px; padding-top: 12px; border-top: 1px solid #F1F5F9;
    span.author { font-size: 12px; color: #64748B; font-weight: 500; }
    span.date { font-size: 12px; color: #94A3B8; }
  }

  @media (max-width: 768px) {
    padding: 16px;
    
    .notice-header {
      flex-direction: column; /* Empilha o título e a badge em celulares */
      align-items: flex-start;
      gap: 8px;
    }
  }
`;

/* --- MODAIS COMPARTILHADOS --- */
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
  }

  .input-group {
    display: flex; flex-direction: column; gap: 6px;
    label { font-size: 13px; font-weight: 600; color: #475569; }
    input, select, textarea { 
      padding: 10px 14px; border: 1px solid #E2E8F0; border-radius: 10px; 
      font-size: 14px; outline: none; font-family: inherit; width: 100%;
      background: #F8FAFC; transition: all 0.2s;
      &:focus { border-color: ${({ theme }) => theme.colors.primary}; background: #FFFFFF; }
    }
    textarea { resize: vertical; min-height: 80px; }
  }

  .modal-actions {
    display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px;
    button { padding: 10px 20px; border-radius: 10px; font-weight: 600; cursor: pointer; border: none; transition: all 0.2s;}
    button.cancel { background: transparent; border: 1px solid #E2E8F0; color: #64748B; &:hover{ background: #F8FAFC; } }
    button.save { background: ${({ theme }) => theme.colors.primary}; color: white; &:hover{ filter: brightness(0.9); } }
  }

  @media (max-width: 768px) {
    padding: 20px;

    .form-row { flex-direction: column; gap: 16px; }

    .modal-actions {
      flex-direction: column-reverse;
      button { width: 100%; padding: 14px; }
    }
  }
`;