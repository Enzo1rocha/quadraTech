import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  SplitLayout, LeftPanel, RightPanel, LoginBox, LogoArea, HeaderText, Form, 
  InputGroup, OptionsRow, SubmitButton, Divider, SocialLogin, FooterText,
  GraphicContainer, DashboardMockup, MockupHeader, MockupCardsRow, MockupCard, 
  MockupContentGrid, MockupPanel, AgendaItem, AvisoItem
} from './styles';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui entra a lógica real de autenticação
    navigate('/dashboard');
  };

  return (
    <SplitLayout>
      {/* LADO ESQUERDO: Formulário */}
      <LeftPanel>
        <LoginBox>
          <LogoArea>
            <div />
            <span>QuadraTech</span>
          </LogoArea>

          <HeaderText>
            <h1>Bem-vindo de volta</h1>
            <p>Insira seus dados para acessar o painel de controle.</p>
          </HeaderText>

          <Form onSubmit={handleLogin}>
            <InputGroup>
              <label>E-mail</label>
              <div className="input-wrapper">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <input 
                  type="email" 
                  placeholder="admin@empresa.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
            </InputGroup>

            <InputGroup>
              <label>Senha</label>
              <div className="input-wrapper">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
            </InputGroup>

            <OptionsRow>
              <label>
                <input type="checkbox" /> Lembrar de mim
              </label>
              <a href="#forgot">Esqueceu a senha?</a>
            </OptionsRow>

            <SubmitButton type="submit">Entrar na Plataforma</SubmitButton>
          </Form>

          <Divider>Ou continue com</Divider>

          <SocialLogin>
            <button>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.78.78-.04 1.94-.85 3.33-.74 1.14.05 2.53.48 3.42 1.63-2.9 1.68-2.4 5.65.62 6.88-1.03 2.51-2.47 4.39-2.45 4.42zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              Apple
            </button>
          </SocialLogin>

          <FooterText>
            Não tem uma conta? <a href="#register">Solicite acesso.</a>
          </FooterText>
        </LoginBox>
      </LeftPanel>

      {/* LADO DIREITO: DASHBOARD VISUAL (Escondido no Mobile) */}
      {/* LADO DIREITO: DASHBOARD ILUSTRATIVO */}
      <RightPanel>
        <GraphicContainer>
          <div className="hero-text">
            <h2>Gestão inteligente para<br/>seus espaços esportivos.</h2>
            <p>O sistema oficial de gestão e agendamento de quadras, turmas e materiais da sua instituição.</p>
          </div>

          <DashboardMockup>
            {/* Cabeçalho do Mockup */}
            <MockupHeader>
              <h3>Olá, Professor!</h3>
              <p>Terça-feira, 24 de Outubro</p>
            </MockupHeader>

            {/* Cards de Resumo */}
            <MockupCardsRow>
              <MockupCard>
                <span>Reservas de Hoje</span>
                <strong>08</strong>
              </MockupCard>
              <MockupCard>
                <span>Turmas Ativas</span>
                <strong>12</strong>
              </MockupCard>
              <MockupCard>
                <span>Quadras Livres</span>
                <strong>02 <span>de 04</span></strong>
              </MockupCard>
              <MockupCard className="alert">
                <span>Materiais Pendentes</span>
                <strong>03</strong>
              </MockupCard>
            </MockupCardsRow>

            {/* Grade de Conteúdo: Agenda e Avisos */}
            <MockupContentGrid>
              
              {/* Painel de Agenda */}
              <MockupPanel>
                <div className="panel-header">
                  <h4>Agenda de Aulas</h4>
                </div>
                
                <AgendaItem>
                  <div className="time">08:00 <span>09:30</span></div>
                  <div className="details">
                    <h5>Futsal - 3º Ano Médio</h5>
                    <p>Quadra Poliesportiva • Prof. Carlos</p>
                  </div>
                  <div className="badge">Finalizado</div>
                </AgendaItem>

                <AgendaItem className="active">
                  <div className="time">10:00 <span>11:30</span></div>
                  <div className="details">
                    <h5>Voleibol - 1º Ano Médio</h5>
                    <p>Ginásio Coberto • Prof. Fernando (Você)</p>
                  </div>
                  <div className="badge active">Em andamento</div>
                </AgendaItem>

                <AgendaItem>
                  <div className="time">14:00 <span>15:30</span></div>
                  <div className="details">
                    <h5>Treino Time da Escola</h5>
                    <p>Campo de Grama • Prof. Marcos</p>
                  </div>
                  <div className="badge">Agendado</div>
                </AgendaItem>
              </MockupPanel>

              {/* Painel de Avisos */}
              <MockupPanel>
                <div className="panel-header">
                  <h4>Avisos Recentes</h4>
                </div>
                
                <AvisoItem>
                  <div className="icon-box yellow">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  </div>
                  <div className="info">
                    <h5>Rede da Quadra 2 rompida</h5>
                    <p>Reportado por Prof. Carlos • Há 2h</p>
                  </div>
                </AvisoItem>

                <AvisoItem>
                  <div className="icon-box blue">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  </div>
                  <div className="info">
                    <h5>Novas bolas de basquete</h5>
                    <p>Diretoria • Hoje às 07:30</p>
                  </div>
                </AvisoItem>

                <AvisoItem>
                  <div className="icon-box green">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  </div>
                  <div className="info">
                    <h5>Reserva cancelada</h5>
                    <p>Sistema • Ontem</p>
                  </div>
                </AvisoItem>

              </MockupPanel>
            </MockupContentGrid>

          </DashboardMockup>
        </GraphicContainer>
      </RightPanel>
    </SplitLayout>
  );
}

export default Login;