import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const ImageSection = styled.div`
  flex: 1; /* Ocupa todo o espaço restante */
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.primaryHover} 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 40px;
  text-align: center;

  /* Esconde essa parte em telas de celular para focar só no login */
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

export const WelcomeText = styled.h1`
  font-size: 48px;
  font-weight: 800;
  margin-bottom: 16px;
`;

export const Subtitle = styled.p`
  font-size: 18px;
  max-width: 400px;
  line-height: 1.5;
  opacity: 0.9;
`;

// A parte direita onde fica o formulário
export const FormSection = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.surface};
  padding: 40px;
  box-shadow: -4px 0 15px rgba(0,0,0,0.05); /* Sombra suave dividindo os lados */
`;

export const LoginWrapper = styled.div`
  width: 100%;
  max-width: 360px;
`;

export const LogoArea = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 8px;
  font-size: 28px;
`;

export const FormSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 32px;
  font-size: 14px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  font-weight: 600;
`;

export const Input = styled.input`
  padding: 14px 16px;
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: 16px;
  outline: none;
  transition: all 0.2s;
  background-color: #FAFAFA;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: #FFFFFF;
    box-shadow: 0 0 0 3px rgba(0, 86, 145, 0.1); /* Efeito de "brilho" por fora usando o azul do senai */
  }
`;

export const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: #FFFFFF;
  padding: 16px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: 16px;
  font-weight: 600;
  margin-top: 10px;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
    transform: translateY(-1px); /* Efeito sutil de levantar o botão */
    box-shadow: 0 4px 12px rgba(0, 86, 145, 0.2);
  }
`;

export const ForgotPassword = styled.a`
  text-align: right;
  display: block;
  font-size: 14px;
  font-weight: 500;
  margin-top: -10px;
  margin-bottom: 10px;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const PasswordWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

export const PasswordInput = styled(Input)`
  width: 100%;
  padding-right: 48px; /* Espaço extra na direita para o texto não ficar embaixo do ícone */
`;

export const IconButton = styled.button`
  position: absolute;
  right: 12px;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  padding: 4px;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;