import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 800px;
  margin: 0 auto;
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
  align-items: center;
  gap: 16px;

  button.back-btn {
    background: #F8FAFC;
    border: 1px solid rgba(0,0,0,0.05);
    width: 40px;
    height: 40px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #64748B;
    transition: all 0.2s;
    flex-shrink: 0;

    &:hover {
      background: #E2E8F0;
      color: ${({ theme }) => theme.colors.text};
    }
  }

  h1 {
    font-size: 24px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};

    @media (max-width: 768px) {
      font-size: 20px;
    }
  }
`;

export const FormCard = styled.form`
  background-color: #FFFFFF;
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0,0,0,0.02);
  display: flex;
  flex-direction: column;
  gap: 32px;

  /* No celular, reduzimos o padding e o espaço interno para aproveitar melhor a tela */
  @media (max-width: 768px) {
    padding: 20px;
    gap: 24px;
  }
`;

export const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #F1F5F9;
`;

export const FormRow = styled.div<{ $columns?: number }>`
  display: grid;
  grid-template-columns: ${({ $columns }) => ($columns ? `repeat(${$columns}, 1fr)` : '1fr')};
  gap: 20px;

  /* AQUI ACONTECE A MÁGICA: Quebra as colunas para 1 só em telas pequenas */
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-size: 14px;
    font-weight: 500;
    color: #475569;
  }

  input, select {
    padding: 12px 16px;
    border-radius: 12px;
    border: 1px solid #E2E8F0;
    background-color: #F8FAFC;
    font-size: 15px;
    color: ${({ theme }) => theme.colors.text};
    transition: all 0.2s;
    outline: none;
    font-family: inherit;
    width: 100%;

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
      background-color: #FFFFFF;
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
    }
  }

  select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    /* Adicionando um ícone de seta customizado via SVG no background */
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2364748B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 16px center;
    padding-right: 40px;
  }
`;

export const MaterialsGrid = styled.div`
  display: grid;
  /* Reduzi o minmax de 180px para 140px para caber 2 checkboxes lado a lado no celular */
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 12px;
`;

export const CheckboxCard = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  user-select: none; /* Evita selecionar o texto ao clicar rápido */

  &:hover {
    background-color: #F8FAFC;
  }

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    accent-color: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
    flex-shrink: 0;
  }

  span {
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.2;
  }
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 16px;
  padding-top: 24px;
  border-top: 1px solid #F1F5F9;

  button {
    padding: 12px 24px;
    border-radius: 12px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button.cancel {
    background: transparent;
    border: 1px solid #E2E8F0;
    color: #64748B;

    &:hover {
      background: #F1F5F9;
      color: ${({ theme }) => theme.colors.text};
    }
  }

  button.submit {
    background: ${({ theme }) => theme.colors.primary};
    border: none;
    color: white;
    box-shadow: 0 4px 15px ${({ theme }) => theme.colors.primary}40;

    &:hover {
      background: ${({ theme }) => theme.colors.primaryHover || '#004A80'};
      transform: translateY(-1px);
    }
  }

  /* No Mobile: Botões ficam empilhados e com 100% da largura */
  @media (max-width: 768px) {
    flex-direction: column-reverse; /* Inverte a ordem: Confirmar fica em cima, Cancelar embaixo */
    gap: 12px;

    button {
      width: 100%;
    }
  }
`;