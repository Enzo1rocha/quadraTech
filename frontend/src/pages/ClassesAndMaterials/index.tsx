import React, { useState } from 'react';
import {
  PageContainer, PageHeader, TabsContainer, TabButton,
  Toolbar, ContentGrid, ClassCard, MaterialCard,
  ModalOverlay, ModalContent // <-- Nossos novos estilos do modal
} from './styles';

export function ClassesAndMaterials() {
  const [activeTab, setActiveTab] = useState<'turmas' | 'materiais'>('turmas');
  const [searchTerm, setSearchTerm] = useState('');

  // Estados dos Modais
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [isMaterialModalOpen, setIsMaterialModalOpen] = useState(false);

  // 1. Transformamos os Mocks em Estados (useState)
  const [classesList, setClassesList] = useState([
    { id: '1', name: 'TDS - 1º Ano', course: 'Téc. em Desenv. de Sistemas', schedule: 'Seg a Sex • 13:00 às 17:00', students: 35, shift: 'Tarde' },
    { id: '2', name: 'Logística - 3º Ano', course: 'Técnico em Logística', schedule: 'Seg a Sex • 07:30 às 11:30', students: 28, shift: 'Manhã' },
  ]);

  const [materialsList, setMaterialsList] = useState([
    { id: 'm1', name: 'Bolas de Futsal', icon: '⚽', available: 15, total: 20 },
    { id: 'm2', name: 'Bolas de Vôlei', icon: '🏐', available: 5, total: 12 },
  ]);

  // Filtros
  const filteredClasses = classesList.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredMaterials = materialsList.filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()));

  // 2. Funções para salvar os novos dados
  const handleAddClass = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newClass = {
      id: Math.random().toString(), // Gera um ID aleatório temporário
      name: formData.get('name') as string,
      course: formData.get('course') as string,
      schedule: formData.get('schedule') as string,
      students: Number(formData.get('students')),
      shift: formData.get('shift') as string,
    };

    setClassesList([...classesList, newClass]); // Adiciona na lista
    setIsClassModalOpen(false); // Fecha o modal
  };

  const handleAddMaterial = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const qty = Number(formData.get('quantity'));
    const newMaterial = {
      id: Math.random().toString(),
      name: formData.get('name') as string,
      icon: formData.get('icon') as string,
      available: qty,
      total: qty,
    };

    setMaterialsList([...materialsList, newMaterial]); // Adiciona na lista
    setIsMaterialModalOpen(false); // Fecha o modal
  };

  return (
    <PageContainer>
      <PageHeader>
        <h1>Gestão Institucional</h1>
        <TabsContainer>
          <TabButton $isActive={activeTab === 'turmas'} onClick={() => setActiveTab('turmas')}>
            Turmas
          </TabButton>
          <TabButton $isActive={activeTab === 'materiais'} onClick={() => setActiveTab('materiais')}>
            Materiais
          </TabButton>
        </TabsContainer>
      </PageHeader>

      <Toolbar>
        <div className="search-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input 
            type="text" 
            placeholder={activeTab === 'turmas' ? "Buscar por turma..." : "Buscar por material..."} 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/* O botão abre o modal correto dependendo da aba ativa! */}
        <button className="action-btn" onClick={() => activeTab === 'turmas' ? setIsClassModalOpen(true) : setIsMaterialModalOpen(true)}>
          + {activeTab === 'turmas' ? 'Nova Turma' : 'Novo Material'}
        </button>
      </Toolbar>

      <ContentGrid>
        {/* ABA DE TURMAS */}
        {activeTab === 'turmas' && filteredClasses.map(turma => (
          <ClassCard key={turma.id}>
            <div className="header">
              <div>
                <h3>{turma.name}</h3>
                <span className="course">{turma.course}</span>
              </div>
              <span className={`shift-badge ${turma.shift.toLowerCase()}`}>{turma.shift}</span>
            </div>
            <div className="info-row">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              {turma.schedule}
            </div>
            <div className="footer">
              <span className="students">{turma.students} Alunos</span>
            </div>
          </ClassCard>
        ))}

        {/* ABA DE MATERIAIS (Agora simplificada) */}
        {activeTab === 'materiais' && filteredMaterials.map(material => (
          <MaterialCard key={material.id}>
            <div className="icon-wrapper">{material.icon}</div>
            <div className="details">
              <h3>{material.name}</h3>
              <span>{material.available} de {material.total} disponíveis</span>
            </div>
          </MaterialCard>
        ))}
      </ContentGrid>

      {/* --- MODAL DE NOVA TURMA --- */}
      {isClassModalOpen && (
        <ModalOverlay onClick={() => setIsClassModalOpen(false)}>
          {/* o e.stopPropagation evita que clicar dentro do modal feche ele */}
          <ModalContent onClick={e => e.stopPropagation()}> 
            <h2>Cadastrar Nova Turma</h2>
            <form onSubmit={handleAddClass}>
              <div className="input-group">
                <label>Sigla e Ano (Ex: TDS - 2º Ano)</label>
                <input name="name" required />
              </div>
              <div className="input-group">
                <label>Nome do Curso Mestre</label>
                <input name="course" required placeholder="Ex: Técnico em Administração" />
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div className="input-group" style={{ flex: 1 }}>
                  <label>Turno</label>
                  <select name="shift">
                    <option value="Manhã">Manhã</option>
                    <option value="Tarde">Tarde</option>
                    <option value="Noite">Noite</option>
                  </select>
                </div>
                <div className="input-group" style={{ flex: 1 }}>
                  <label>Qtd. Alunos</label>
                  <input name="students" type="number" required />
                </div>
              </div>
              <div className="input-group">
                <label>Horário (Ex: Seg a Sex • 13:00 às 17:00)</label>
                <input name="schedule" required />
              </div>
              
              <div className="modal-actions">
                <button type="button" className="cancel" onClick={() => setIsClassModalOpen(false)}>Cancelar</button>
                <button type="submit" className="save">Salvar Turma</button>
              </div>
            </form>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* --- MODAL DE NOVO MATERIAL --- */}
      {isMaterialModalOpen && (
        <ModalOverlay onClick={() => setIsMaterialModalOpen(false)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <h2>Cadastrar Material</h2>
            <form onSubmit={handleAddMaterial}>
              <div className="input-group">
                <label>Nome do Equipamento</label>
                <input name="name" required placeholder="Ex: Cones de Agilidade" />
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div className="input-group" style={{ flex: 1 }}>
                  <label>Ícone (Emoji)</label>
                  <input name="icon" required placeholder="Ex: 🚧" />
                </div>
                <div className="input-group" style={{ flex: 1 }}>
                  <label>Quantidade Total</label>
                  <input name="quantity" type="number" required min="1" />
                </div>
              </div>
              
              <div className="modal-actions">
                <button type="button" className="cancel" onClick={() => setIsMaterialModalOpen(false)}>Cancelar</button>
                <button type="submit" className="save">Salvar Material</button>
              </div>
            </form>
          </ModalContent>
        </ModalOverlay>
      )}

    </PageContainer>
  );
}

export default ClassesAndMaterials;