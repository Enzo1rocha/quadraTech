import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, ImageSection, WelcomeText, Subtitle, FormSection, 
  LoginWrapper, LogoArea, Title, FormSubtitle, Form, 
  InputGroup, Label, Input, Button, ForgotPassword,
  PasswordWrapper, PasswordInput, IconButton // <-- Nossos novos estilos importados
} from './styles';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Novo estado para controlar o olhinho da senha
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  // Função para alternar entre mostrar/esconder
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container>
      <ImageSection>
        <WelcomeText>Seja bem-vindo(a)</WelcomeText>
        <Subtitle>
          O sistema oficial de gestão e agendamento de quadras esportivas da sua instituição.
        </Subtitle>
      </ImageSection>

      <FormSection>
        <LoginWrapper>
          <LogoArea>
            <div style={{ width: 32, height: 32, backgroundColor: '#005691', borderRadius: 8 }}></div>
            Instituição
          </LogoArea>

          <Title>Acesse sua conta</Title>
          <FormSubtitle>Bem-vindo de volta! Por favor, insira seus dados.</FormSubtitle>
          
          <Form onSubmit={handleLogin}>
            <InputGroup>
              <Label htmlFor="email">E-mail</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="coordenacao@escola.com.br" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </InputGroup>

            <InputGroup>
              <Label htmlFor="password">Senha</Label>
              <PasswordWrapper>
                {/* Aqui mudamos para PasswordInput e a lógica do type */}
                <PasswordInput 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                
                {/* O botão com o ícone SVG */}
                <IconButton type="button" onClick={togglePasswordVisibility}>
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  )}
                </IconButton>
              </PasswordWrapper>
            </InputGroup>

            <ForgotPassword href="#">Esqueceu a senha?</ForgotPassword>

            <Button type="submit">Entrar no sistema</Button>
          </Form>
        </LoginWrapper>
      </FormSection>
    </Container>
  );
}

export default Login;