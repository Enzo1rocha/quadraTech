import React, { useState } from 'react';
import { 
  DashboardContainer, Header, WelcomeTitle, DateSubtitle, ActionButton, 
  StatsGrid, StatCard, StatHeader, StatValue, 
  MainGrid, Card, CardTitle, ReservationList, ClickableReservationItem, 
  TimeBlock, InfoBlock, StatusBadge, NoticeList, NoticeItem,
  DateNavigator, NavArrow, CurrentDateLabel, EmptyState,
  DrawerOverlay, DrawerContainer, DrawerHeader, DrawerContent,
  LeftColumn, RealTimeGrid, SpaceCard, SpaceHeader, SpaceStatus
} from './styles';

// Tipagem básica para os dados falsos que vamos usar
interface Reservation {
  id: string;
  time: string;
  title: string;
  location: string;
  teacher: string;
  status: 'active' | 'pending' | 'finished';
  materials: string;
}

export function Dashboard() {
  // Estado 1: Controle de dias (0 = hoje, -1 = ontem, 1 = amanhã)
  const [dayOffset, setDayOffset] = useState(0);

  // Estado 2: Controle da Gaveta (Drawer)
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);

  // Array de reservas (só aparece se for "Hoje")
  const mockReservations: Reservation[] = [
    { id: '1', time: '08:00 - 09:30', title: 'Futsal - 3º Ano Médio', location: 'Quadra Poliesportiva Principal', teacher: 'Prof. Carlos', status: 'finished', materials: '10x Bolas de Futsal, 20x Coletes' },
    { id: '2', time: '10:00 - 11:30', title: 'Voleibol - 1º Ano Médio', location: 'Ginásio Coberto', teacher: 'Prof. Fernando (Você)', status: 'active', materials: '5x Bolas de Vôlei, 1x Rede, 1x Antena' },
    { id: '3', time: '14:00 - 15:30', title: 'Treino Time da Escola', location: 'Campo de Grama Sintética', teacher: 'Prof. Marcos', status: 'pending', materials: 'Nenhum material solicitado' },
  ];

  const mockSpaces = [
    { id: 'q1', name: 'Ginásio Coberto', icon: 'indoor', status: 'ocupado' as const, detail: 'Prof. Fernando • Futsal' },
    { id: 'q2', name: 'Campo Sintético', icon: 'outdoor', status: 'livre' as const, detail: 'Livre até às 14:00' },
    { id: 'q3', name: 'Quadra Poliesportiva', icon: 'court', status: 'manutencao' as const, detail: 'Troca de rede • Previsão: Amanhã' },
    // Se você adicionar ou remover itens daqui, o layout se adapta sozinho!
  ];

  // Lógica para definir se tem reservas no dia selecionado
  const currentReservations = dayOffset === 0 ? mockReservations : [];

  // Lógica para mostrar o texto do dia
  const getDateLabel = () => {
    if (dayOffset === 0) return 'Hoje';
    if (dayOffset === -1) return 'Ontem';
    if (dayOffset === 1) return 'Amanhã';
    return `${Math.abs(dayOffset)} dias ${dayOffset > 0 ? 'à frente' : 'atrás'}`;
  };

  return (
    <DashboardContainer>
      <Header>
        <div>
          <WelcomeTitle>Olá, Professor Fernando! 👋</WelcomeTitle>
          <DateSubtitle>Terça-feira, 24 de Outubro</DateSubtitle>
        </div>
        <ActionButton>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          Nova Reserva
        </ActionButton>
      </Header>

      <StatsGrid>
        {/* ... (os 4 StatCards continuam iguais ao código anterior) ... */}
        <StatCard><StatHeader>Reservas de Hoje <div></div></StatHeader><StatValue>08</StatValue></StatCard>
        <StatCard><StatHeader>Turmas Ativas <div></div></StatHeader><StatValue>12</StatValue></StatCard>
        <StatCard><StatHeader>Quadras Livres <div></div></StatHeader><StatValue>02 <span style={{fontSize: '14px', fontWeight: '500', color: '#64748B'}}>de 04</span></StatValue></StatCard>
        <StatCard><StatHeader>Materiais Pendentes <div></div></StatHeader><StatValue style={{color: '#EF4444'}}>03</StatValue></StatCard>
      </StatsGrid>

      <MainGrid>

        <LeftColumn>
            <Card>
                <CardTitle>
                    Agenda de Aulas
                    {/* NOVO: Navegador de Datas */}
                    <DateNavigator>
                    <NavArrow onClick={() => setDayOffset(prev => prev - 1)}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    </NavArrow>
                    <CurrentDateLabel>{getDateLabel()}</CurrentDateLabel>
                    <NavArrow onClick={() => setDayOffset(prev => prev + 1)}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </NavArrow>
                    </DateNavigator>
                </CardTitle>

                <ReservationList>
                    {/* NOVO: Renderização Condicional (Lista vs Empty State) */}
                    {currentReservations.length > 0 ? (
                    currentReservations.map(res => (
                        <ClickableReservationItem 
                        key={res.id} 
                        onClick={() => setSelectedReservation(res)}
                        style={res.status === 'active' ? { borderLeftColor: '#10B981', backgroundColor: '#FFFFFF', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' } : {}}
                        >
                        <TimeBlock>
                            <strong>{res.time.split(' - ')[0]}</strong>
                            <span>{res.time.split(' - ')[1]}</span>
                        </TimeBlock>
                        <InfoBlock>
                            <strong>{res.title}</strong>
                            <span>{res.location} • {res.teacher}</span>
                        </InfoBlock>
                        <StatusBadge status={res.status}>
                            {res.status === 'active' ? 'Em andamento' : res.status === 'finished' ? 'Finalizado' : 'Agendado'}
                        </StatusBadge>
                        </ClickableReservationItem>
                    ))
                    ) : (
                    <EmptyState>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        <div>
                        <p>Nenhuma reserva para {getDateLabel().toLowerCase()}</p>
                        <span>As quadras estão livres neste dia.</span>
                        </div>
                    </EmptyState>
                    )}
                </ReservationList>
            </Card>

            <Card>
                <CardTitle>Status dos Espaços (Ao Vivo)</CardTitle>
            <RealTimeGrid>
              {mockSpaces.map(space => (
                <SpaceCard key={space.id} $status={space.status}>
                  <SpaceHeader>
                    <div className="icon-box">
                      {/* Um ícone genérico de quadra */}
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
                    </div>
                    <strong>{space.name}</strong>
                  </SpaceHeader>
                  <SpaceStatus $status={space.status}>
                    <span className="badge">
                      {space.status === 'livre' ? 'Livre Agora' : space.status === 'ocupado' ? 'Em Uso' : 'Interditada'}
                    </span>
                    <span className="detail">{space.detail}</span>
                  </SpaceStatus>
                </SpaceCard>
              ))}
            </RealTimeGrid>
          </Card>

        </LeftColumn>

        {/* ... (O Card de Avisos continua igual, pode manter o código anterior aqui) ... */}
        <Card>
          <CardTitle>Avisos Recentes</CardTitle>
          <NoticeList>
            <NoticeItem type="warning">
              <div className="icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              </div>
              <div className="text">
                <p>Rede da Quadra 2 rompida</p>
                <span>Reportado por Prof. Carlos • Há 2h</span>
              </div>
            </NoticeItem>

            <NoticeItem>
              <div className="icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              </div>
              <div className="text">
                <p>Novas bolas de basquete recebidas na secretaria</p>
                <span>Diretoria • Hoje às 07:30</span>
              </div>
            </NoticeItem>

            <NoticeItem>
              <div className="icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              </div>
              <div className="text">
                <p>Reserva cancelada: Manutenção do gramado</p>
                <span>Sistema • Ontem</span>
              </div>
            </NoticeItem>
          </NoticeList>
        </Card>
      </MainGrid>

      {/* NOVO: Drawer (A Gaveta Lateral) */}
      <DrawerOverlay $isOpen={!!selectedReservation} onClick={() => setSelectedReservation(null)} />
      <DrawerContainer $isOpen={!!selectedReservation}>
        <DrawerHeader>
          <h3>Detalhes da Reserva</h3>
          <button onClick={() => setSelectedReservation(null)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </DrawerHeader>
        
        {/* Só renderiza o conteúdo se tiver uma reserva selecionada */}
        {selectedReservation && (
          <DrawerContent>
            <div className="info-group">
              <label>Atividade / Turma</label>
              <p>{selectedReservation.title}</p>
            </div>
            <div className="info-group">
              <label>Local</label>
              <p>{selectedReservation.location}</p>
            </div>
            <div className="info-group">
              <label>Horário</label>
              <p>{selectedReservation.time}</p>
            </div>
            <div className="info-group">
              <label>Professor Responsável</label>
              <p>{selectedReservation.teacher}</p>
            </div>
            <div className="info-group" style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #F1F5F9' }}>
              <label>Materiais Solicitados</label>
              <p style={{ color: '#0284C7' }}>{selectedReservation.materials}</p>
            </div>
          </DrawerContent>
        )}
      </DrawerContainer>

    </DashboardContainer>
  );
}

export default Dashboard;