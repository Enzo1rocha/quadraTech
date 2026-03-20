import React, { useState } from 'react';
import {
  PageContainer, PageHeader, TabsContainer, TabButton, Toolbar,
  ContentGrid, NoticeList, TeamCard, NoticeCard, ModalOverlay, ModalContent
} from './styles';

export function TeamAndCommunication() {
  const [activeTab, setActiveTab] = useState<'equipe' | 'avisos'>('equipe');
  const [searchTerm, setSearchTerm] = useState('');

  // Controle dos Modais
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);

  // Mocks e Estados Iniciais
  const [teamMembers, setTeamMembers] = useState([
    { id: '1', name: 'Fernando Silva', role: 'Professor de Ed. Física', email: 'fernando@escola.com', initials: 'FS' },
    { id: '2', name: 'Carlos Mendes', role: 'Professor de Ed. Física', email: 'carlos@escola.com', initials: 'CM' },
    { id: '3', name: 'Julia Costa', role: 'Coordenadora Pedagógica', email: 'julia@escola.com', initials: 'JC' },
  ]);

  type NoticeType = {
    id: string;
    title: string;
    message: string;
    type: 'info' | 'alert' | 'success';
    author: string;
    date: string;
    expires: string;
  };

  const [notices, setNotices] = useState<NoticeType[]>([
    { id: 'n1', title: 'Manutenção na Quadra Principal', message: 'A quadra estará fechada para pintura do piso nesta sexta-feira o dia todo. Realoquem suas turmas.', type: 'alert', author: 'Direção', date: 'Hoje, 08:30', expires: '24h' },
    { id: 'n2', title: 'Chegaram as novas bolas de Futsal', message: 'Foram adicionadas 10 novas bolas de futsal no almoxarifado. Já estão liberadas para uso.', type: 'info', author: 'Julia Costa', date: 'Ontem, 14:00', expires: '7 dias' },
  ]);

  // Filtros de busca
  const filteredTeam = teamMembers.filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredNotices = notices.filter(n => n.title.toLowerCase().includes(searchTerm.toLowerCase()));

  // Função para pegar as iniciais do nome
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  // Handlers para adicionar itens
  const handleAddMember = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    
    setTeamMembers([...teamMembers, {
      id: Math.random().toString(),
      name,
      role: formData.get('role') as string,
      email: formData.get('email') as string,
      initials: getInitials(name),
    }]);
    setIsTeamModalOpen(false);
  };

  const handleAddNotice = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    setNotices([{
      id: Math.random().toString(),
      title: formData.get('title') as string,
      message: formData.get('message') as string,
      type: formData.get('type') as 'info' | 'alert' | 'success',
      author: 'Você', // Em um sistema real, viria do usuário logado
      date: 'Agora mesmo',
      expires: formData.get('expires') as string,
    }, ...notices]); // Coloca no topo da lista
    
    setIsNoticeModalOpen(false);
  };

  return (
    <PageContainer>
      <PageHeader>
        <h1>Equipe & Comunicação</h1>
        <TabsContainer>
          <TabButton $isActive={activeTab === 'equipe'} onClick={() => setActiveTab('equipe')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            Equipe
          </TabButton>
          <TabButton $isActive={activeTab === 'avisos'} onClick={() => setActiveTab('avisos')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            Mural de Avisos
          </TabButton>
        </TabsContainer>
      </PageHeader>

      <Toolbar>
        <div className="search-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input 
            type="text" 
            placeholder={activeTab === 'equipe' ? "Buscar colaborador..." : "Buscar nos avisos..."} 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="action-btn" onClick={() => activeTab === 'equipe' ? setIsTeamModalOpen(true) : setIsNoticeModalOpen(true)}>
          + {activeTab === 'equipe' ? 'Novo Colaborador' : 'Criar Aviso'}
        </button>
      </Toolbar>

      {/* ABA: EQUIPE */}
      {activeTab === 'equipe' && (
        <ContentGrid>
          {filteredTeam.map(member => (
            <TeamCard key={member.id}>
              <div className="avatar">{member.initials}</div>
              <div className="info">
                <h3>{member.name}</h3>
                <span className="role">{member.role}</span>
                <span className="contact">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  {member.email}
                </span>
              </div>
            </TeamCard>
          ))}
        </ContentGrid>
      )}

      {/* ABA: AVISOS */}
      {activeTab === 'avisos' && (
        <NoticeList>
          {filteredNotices.map(notice => (
            <NoticeCard key={notice.id} $type={notice.type}>
              <div className="notice-header">
                <h3>{notice.title}</h3>
                <div className="expires-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  Expira em {notice.expires}
                </div>
              </div>
              <p className="message">{notice.message}</p>
              <div className="notice-footer">
                <span className="author">Por: {notice.author}</span>
                <span className="date">{notice.date}</span>
              </div>
            </NoticeCard>
          ))}
        </NoticeList>
      )}

      {/* MODAL: NOVO MEMBRO DA EQUIPE */}
      {isTeamModalOpen && (
        <ModalOverlay onClick={() => setIsTeamModalOpen(false)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <h2>Cadastrar Colaborador</h2>
            <form onSubmit={handleAddMember}>
              <div className="input-group">
                <label>Nome Completo</label>
                <input name="name" required placeholder="Ex: Carlos Mendes" />
              </div>
              <div className="input-group">
                <label>Cargo / Função</label>
                <input name="role" required defaultValue="Professor de Ed. Física" />
              </div>
              <div className="input-group">
                <label>E-mail Corporativo</label>
                <input type="email" name="email" required placeholder="email@escola.com" />
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel" onClick={() => setIsTeamModalOpen(false)}>Cancelar</button>
                <button type="submit" className="save">Salvar Membro</button>
              </div>
            </form>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* MODAL: NOVO AVISO COM VALIDADE */}
      {isNoticeModalOpen && (
        <ModalOverlay onClick={() => setIsNoticeModalOpen(false)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <h2>Criar Novo Aviso</h2>
            <form onSubmit={handleAddNotice}>
              <div className="input-group">
                <label>Título do Aviso</label>
                <input name="title" required placeholder="Ex: Quadra Interditada" />
              </div>
              <div className="input-group">
                <label>Mensagem</label>
                <textarea name="message" required placeholder="Escreva os detalhes aqui..." />
              </div>
              
              {/* Ajuste para responsividade com a classe form-row */}
              <div className="form-row">
                <div className="input-group select-group">
                  <label>Tipo (Cor do card)</label>
                  <select name="type">
                    <option value="info">Informação (Azul)</option>
                    <option value="alert">Alerta Urgente (Vermelho)</option>
                    <option value="success">Boa Notícia (Verde)</option>
                  </select>
                </div>
                <div className="input-group select-group">
                  <label>Expira em</label>
                  <select name="expires">
                    <option value="24h">24 Horas</option>
                    <option value="3 dias">3 Dias</option>
                    <option value="7 dias">7 Dias</option>
                    <option value="15 dias">15 Dias</option>
                  </select>
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="cancel" onClick={() => setIsNoticeModalOpen(false)}>Cancelar</button>
                <button type="submit" className="save">Publicar Aviso</button>
              </div>
            </form>
          </ModalContent>
        </ModalOverlay>
      )}

    </PageContainer>
  );
}

export default TeamAndCommunication;