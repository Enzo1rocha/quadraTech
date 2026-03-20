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

  h1 { font-size: 28px; font-weight: 800; color: ${({ theme }) => theme.colors.text}; }

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
    width: 100%;
    overflow-x: auto; /* Permite scroll horizontal se houver muitas abas */
    
    /* Esconde a barra de rolagem mas mantém o scroll funcionando */
    &::-webkit-scrollbar { display: none; }
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

export const TabButton = styled.button<{ $isActive: boolean }>`
  padding: 10px 24px; border: none; border-radius: 8px; font-size: 14px; font-weight: 600;
  display: flex; align-items: center; gap: 8px; cursor: pointer; transition: all 0.2s;
  background-color: ${({ $isActive }) => ($isActive ? '#FFFFFF' : 'transparent')};
  color: ${({ $isActive, theme }) => ($isActive ? theme.colors.primary : '#64748B')};
  box-shadow: ${({ $isActive }) => ($isActive ? '0 2px 8px rgba(0,0,0,0.05)' : 'none')};
  white-space: nowrap; /* Evita que o texto quebre no mobile */

  svg { width: 18px; height: 18px; flex-shrink: 0; }

  @media (max-width: 768px) {
    flex: 1;
    justify-content: center;
    padding: 10px 16px;
  }
`;

export const ContentCard = styled.div`
  background: #FFFFFF;
  border-radius: 16px;
  padding: 32px;
  border: 1px solid rgba(0,0,0,0.04);
  max-width: 800px;
  width: 100%;

  @media (max-width: 768px) {
    padding: 20px; /* Reduz o respiro interno em telas menores */
  }
`;

/* --- FORMULÁRIOS E INPUTS --- */
export const SectionTitle = styled.h2`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 12px;
  border-bottom: 1px solid #F1F5F9;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  /* Mudado de 600px para 768px para padronizar */
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label { font-size: 13px; font-weight: 600; color: #475569; }
  input {
    padding: 12px 16px;
    border: 1px solid #E2E8F0;
    border-radius: 10px;
    font-size: 14px;
    outline: none;
    transition: all 0.2s;
    background: #F8FAFC;
    width: 100%;

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
      background: #FFFFFF;
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}15;
    }
  }
`;

export const AvatarSection = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 32px;

  .avatar {
    width: 80px; height: 80px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary}15;
    color: ${({ theme }) => theme.colors.primary};
    display: flex; align-items: center; justify-content: center;
    font-size: 28px; font-weight: 700;
    flex-shrink: 0;
  }

  .avatar-actions {
    display: flex; flex-direction: column; gap: 8px;
    button {
      padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; border: none; transition: all 0.2s;
      &.change { background: ${({ theme }) => theme.colors.primary}; color: white; &:hover{ filter: brightness(0.9); } }
      &.remove { background: transparent; color: #EF4444; border: 1px solid #FEE2E2; &:hover{ background: #FEF2F2; } }
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;

    .avatar-actions {
      flex-direction: row; /* Coloca os botões lado a lado no celular */
      width: 100%;
      button { flex: 1; text-align: center; } /* Botões ocupam 50% cada */
    }
  }
`;

/* --- TOGGLE (CHAVINHAS) --- */
export const PreferenceItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #F1F5F9;
  gap: 16px; /* Garante que o texto não cole no botão switch */

  .info {
    flex: 1; /* Faz o texto empurrar o switch para o canto */
    h3 { font-size: 15px; color: ${({ theme }) => theme.colors.text}; margin: 0 0 4px 0; }
    p { font-size: 13px; color: #64748B; margin: 0; line-height: 1.4; }
  }
`;

export const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
  flex-shrink: 0; /* Impede que o toggle seja espremido */

  input { opacity: 0; width: 0; height: 0; }

  .slider {
    position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0;
    background-color: #CBD5E1; transition: .3s; border-radius: 34px;

    &:before {
      position: absolute; content: ""; height: 18px; width: 18px;
      left: 3px; bottom: 3px; background-color: white; transition: .3s; border-radius: 50%;
    }
  }

  input:checked + .slider { background-color: ${({ theme }) => theme.colors.primary}; }
  input:checked + .slider:before { transform: translateX(20px); }
`;

export const SaveButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  margin-top: 32px;
  transition: all 0.2s;

  &:hover { background: ${({ theme }) => theme.colors.primaryHover || '#004A80'}; }

  @media (max-width: 768px) {
    width: 100%; /* Botão grandão no celular para facilitar o clique */
    padding: 16px;
    font-size: 15px;
  }
`;