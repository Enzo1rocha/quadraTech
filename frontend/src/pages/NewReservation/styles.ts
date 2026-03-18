import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 800px; /* Limita a largura para o formulário não ficar esticado demais */
  margin: 0 auto; /* Centraliza na tela */
  animation: fadeIn 0.4s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
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

    &:hover {
      background: #E2E8F0;
      color: ${({ theme }) => theme.colors.text};
    }
  }

  h1 {
    font-size: 24px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
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
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const MaterialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
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

  &:hover {
    background-color: #F8FAFC;
  }

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    accent-color: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
  }

  span {
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text};
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
`;