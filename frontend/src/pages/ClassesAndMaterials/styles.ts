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

  h1 {
    font-size: 28px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
    letter-spacing: -0.5px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    
    h1 {
      font-size: 24px;
    }
  }
`;

export const TabsContainer = styled.div`
  display: flex;
  background-color: #F1F5F9;
  padding: 4px;
  border-radius: 12px;
  width: fit-content;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const TabButton = styled.button<{ $isActive: boolean }>`
  padding: 10px 24px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  background-color: ${({ $isActive }) => ($isActive ? '#FFFFFF' : 'transparent')};
  color: ${({ $isActive, theme }) => ($isActive ? theme.colors.primary : '#64748B')};
  box-shadow: ${({ $isActive }) => ($isActive ? '0 2px 8px rgba(0,0,0,0.05)' : 'none')};

  &:hover {
    color: ${({ theme, $isActive }) => (!$isActive ? theme.colors.text : theme.colors.primary)};
  }

  @media (max-width: 768px) {
    flex: 1; /* Faz as abas dividirem o espaço 50/50 no mobile */
    padding: 10px 16px;
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
    width: 300px;
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
      &::placeholder { color: #94A3B8; }
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
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
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

export const ContentGrid = styled.div`
  display: grid;
  /* Diminui o minmax no celular para evitar quebra horizontal */
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    gap: 16px;
    grid-template-columns: 1fr; /* Força 1 coluna no celular */
  }
`;

/* --- CARD DE TURMA --- */
export const ClassCard = styled.div`
  background: #FFFFFF;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid rgba(0,0,0,0.04);
  box-shadow: 0 4px 15px rgba(0,0,0,0.02);
  display: flex;
  flex-direction: column;
  gap: 16px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;

    h3 { 
      font-size: 18px; 
      color: ${({ theme }) => theme.colors.text}; 
      margin-bottom: 4px; 
    }
    
    .course { 
      font-size: 13px; 
      color: #64748B; 
      display: flex; 
      align-items: center; 
      gap: 6px; 
      margin-top: 4px;
    }

    .shift-badge {
      font-size: 11px;
      font-weight: 700;
      padding: 4px 8px;
      border-radius: 6px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      flex-shrink: 0;

      &.manhã { background: #FFF7ED; color: #C2410C; }
      &.tarde { background: #EFF6FF; color: #1D4ED8; }
      &.noite { background: #F8FAFC; color: #334155; }
    }
  }

  .info-row {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 14px;
    color: #475569;
    background: #F8FAFC;
    padding: 12px;
    border-radius: 10px;

    svg { color: ${({ theme }) => theme.colors.primary}; width: 16px; height: 16px; flex-shrink: 0; }
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 16px;
    border-top: 1px solid #F1F5F9;

    .students {
      font-size: 13px;
      font-weight: 600;
      color: ${({ theme }) => theme.colors.primary};
      background: ${({ theme }) => theme.colors.primary}15;
      padding: 4px 10px;
      border-radius: 20px;
    }
  }

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

/* --- CARD DE MATERIAL --- */
export const MaterialCard = styled.div`
  background: #FFFFFF;
  border-radius: 12px;
  padding: 16px;
  border: 1px solid rgba(0,0,0,0.06);
  display: flex;
  align-items: center;
  gap: 16px;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  }

  .icon-wrapper {
    font-size: 24px;
    background: #F8FAFC;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    flex-shrink: 0;
  }

  .details {
    flex: 1;
    h3 { font-size: 15px; color: ${({ theme }) => theme.colors.text}; margin-bottom: 4px; }
    span { font-size: 13px; color: #64748B; }
  }
`;

/* --- ESTILOS DO MODAL --- */
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  animation: fadeIn 0.2s ease-out;
  padding: 16px; /* Adiciona respiro nas bordas do celular */
`;

export const ModalContent = styled.div`
  background: #FFFFFF;
  width: 100%;
  max-width: 480px;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  animation: slideUp 0.3s ease-out;
  max-height: 90vh; /* Impede de vazar a tela */
  overflow-y: auto; /* Permite scroll se for muito alto */

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  h2 {
    font-size: 20px;
    margin-bottom: 20px;
    color: ${({ theme }) => theme.colors.text};
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .form-row {
    display: flex;
    gap: 16px;

    .input-group {
      flex: 1;
    }
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 6px;

    label { font-size: 13px; font-weight: 600; color: #475569; }
    
    input, select {
      padding: 10px 14px;
      border: 1px solid #E2E8F0;
      border-radius: 10px;
      font-size: 14px;
      outline: none;
      width: 100%;
      background-color: #F8FAFC;
      &:focus { 
        border-color: ${({ theme }) => theme.colors.primary};
        background-color: #FFFFFF; 
      }
    }
  }

  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 24px;

    button {
      padding: 10px 20px;
      border-radius: 10px;
      font-weight: 600;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.2s;
    }

    button.cancel {
      background: transparent;
      border: 1px solid #E2E8F0;
      color: #64748B;
      &:hover { background: #F8FAFC; }
    }

    button.save {
      background: ${({ theme }) => theme.colors.primary};
      border: none;
      color: white;
      &:hover { filter: brightness(0.9); }
    }
  }

  /* Responsividade do Modal */
  @media (max-width: 768px) {
    padding: 20px;

    .form-row {
      flex-direction: column; /* Quebra os campos para ficarem um embaixo do outro */
      gap: 16px;
    }

    .modal-actions {
      flex-direction: column-reverse; /* Empilha os botões: Salvar em cima, Cancelar embaixo */
      
      button {
        width: 100%;
        padding: 14px; /* Aumenta a área de toque no celular */
      }
    }
  }
`;