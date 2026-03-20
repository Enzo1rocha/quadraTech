import styled from 'styled-components';

export const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
  text-align: center;
  animation: fadeIn 0.4s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .error-code {
    font-size: 120px;
    font-weight: 900;
    color: ${({ theme }) => theme.colors.primary}10; /* Bem sutil, apenas como marca d'água */
    margin-bottom: -30px;
    letter-spacing: -4px;
    user-select: none;
  }

  h1 {
    font-size: 28px;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 16px;
    z-index: 1;
  }

  p {
    font-size: 16px;
    color: #64748B;
    margin-bottom: 32px;
    max-width: 480px;
    line-height: 1.6;
  }

  button {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 10px;
    font-weight: 600;
    font-size: 15px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s;

    &:hover {
      background: ${({ theme }) => theme.colors.primaryHover || '#004A80'};
      transform: translateY(-2px);
      box-shadow: 0 4px 12px ${({ theme }) => theme.colors.primary}30;
    }
  }
`;