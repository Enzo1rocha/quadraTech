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
  flex-direction: column;
  gap: 8px;

  h1 { font-size: 28px; font-weight: 800; color: ${({ theme }) => theme.colors.text}; }
  p { font-size: 15px; color: #64748B; }
`;

/* --- CATEGORIAS --- */
export const CategoriesContainer = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 8px;
`;

export const CategoryChip = styled.button<{ $active?: boolean }>`
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
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

/* --- LISTA DE PERGUNTAS (FAQ) --- */
export const FaqContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const FaqItem = styled.div<{ $isOpen: boolean }>`
  background: #FFFFFF;
  border: 1px solid ${({ $isOpen, theme }) => $isOpen ? theme.colors.primary + '40' : 'rgba(0,0,0,0.06)'};
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  box-shadow: ${({ $isOpen }) => $isOpen ? '0 4px 15px rgba(0,0,0,0.03)' : 'none'};

  .question {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    cursor: pointer;
    background: ${({ $isOpen, theme }) => $isOpen ? theme.colors.primary + '05' : 'transparent'};

    h3 {
      font-size: 15px;
      font-weight: 600;
      color: ${({ $isOpen, theme }) => $isOpen ? theme.colors.primary : theme.colors.text};
      margin: 0;
    }

    svg {
      width: 20px;
      height: 20px;
      color: ${({ $isOpen, theme }) => $isOpen ? theme.colors.primary : '#94A3B8'};
      transform: ${({ $isOpen }) => $isOpen ? 'rotate(180deg)' : 'rotate(0)'};
      transition: transform 0.3s ease;
    }
  }

  .answer {
    padding: ${({ $isOpen }) => $isOpen ? '0 20px 20px 20px' : '0 20px'};
    max-height: ${({ $isOpen }) => $isOpen ? '500px' : '0'};
    opacity: ${({ $isOpen }) => $isOpen ? '1' : '0'};
    visibility: ${({ $isOpen }) => $isOpen ? 'visible' : 'hidden'};
    transition: all 0.3s ease-in-out;
    
    p {
      margin: 0;
      padding-top: 12px;
      font-size: 14px;
      line-height: 1.6;
      color: #475569;
      border-top: 1px solid #F1F5F9;
    }
  }
`;

/* --- CARD DE SUPORTE --- */
export const SupportCard = styled.div`
  margin-top: 24px;
  background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%);
  border: 1px solid #E2E8F0;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;

  .support-info {
    h3 { font-size: 18px; color: ${({ theme }) => theme.colors.text}; margin-bottom: 4px; }
    p { font-size: 14px; color: #64748B; }
  }

  button {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 10px;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    
    &:hover { background: ${({ theme }) => theme.colors.primaryHover || '#004A80'}; }
  }
`;