import React, { useState } from 'react';
import {
  PageContainer, PageHeader, Toolbar, FiltersContainer, FilterChip,
  ContentGrid, SpaceCard, ModalOverlay, ModalContent
} from './styles';

export function CourtsAndSpaces() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filtros disponíveis para esportes
  const filters = ['Todos', 'Poliesportiva', 'Grama Sintética', 'Areia', 'Piscina'];

  // Mock inicial de Quadras e Espaços
  const [spaces, setSpaces] = useState([
    { id: '1', name: 'Ginásio Principal', type: 'Poliesportiva', icon: '🏟️', status: 'operacional' },
    { id: '2', name: 'Quadra Externa 01', type: 'Poliesportiva', icon: '🏀', status: 'operacional' },
    { id: '3', name: 'Campo Society', type: 'Grama Sintética', icon: '⚽', status: 'manutencao' },
    { id: '4', name: 'Quadra de Areia', type: 'Areia', icon: '🏐', status: 'operacional' },
  ]);

  // Lógica de Filtro Duplo (Busca + Chips de Categoria)
  const filteredSpaces = spaces.filter(space => {
    const matchesSearch = space.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'Todos' || space.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  // Salvar novo espaço
  const handleAddSpace = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newSpace = {
      id: Math.random().toString(),
      name: formData.get('name') as string,
      type: formData.get('type') as string,
      icon: formData.get('icon') as string,
      status: formData.get('status') as string,
    };

    setSpaces([...spaces, newSpace]);
    setIsModalOpen(false);
  };

  return (
    <PageContainer>
      <PageHeader>
        <h1>Quadras e Espaços</h1>
      </PageHeader>

      <Toolbar>
        <div className="search-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input 
            type="text" 
            placeholder="Buscar espaço..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="action-btn" onClick={() => setIsModalOpen(true)}>
          + Novo Espaço
        </button>
      </Toolbar>

      {/* Chips de Filtro */}
      <FiltersContainer>
        {filters.map(filter => (
          <FilterChip 
            key={filter} 
            $active={activeFilter === filter}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </FilterChip>
        ))}
      </FiltersContainer>

      {/* Grid de Quadras */}
      <ContentGrid>
        {filteredSpaces.map(space => (
          <SpaceCard key={space.id}>
            <div className="icon-wrapper">
              {space.icon}
            </div>
            <div className="details">
              <h3>{space.name}</h3>
              <span className="type">{space.type}</span>
            </div>
            <span className={`status-badge ${space.status}`}>
              {space.status === 'operacional' ? 'Liberada' : 'Bloqueada'}
            </span>
          </SpaceCard>
        ))}
      </ContentGrid>

      {/* MODAL DE NOVO ESPAÇO */}
      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <h2>Cadastrar Novo Espaço</h2>
            <form onSubmit={handleAddSpace}>
              <div className="input-group">
                <label>Nome do Espaço</label>
                <input name="name" required placeholder="Ex: Quadra Externa 02" />
              </div>
              
              {/* Ajuste: Substituição de estilos inline pela classe form-row */}
              <div className="form-row">
                <div className="input-group select-group">
                  <label>Tipo de Piso/Espaço</label>
                  <select name="type">
                    <option value="Poliesportiva">Poliesportiva</option>
                    <option value="Grama Sintética">Grama Sintética</option>
                    <option value="Areia">Areia</option>
                    <option value="Piscina">Piscina</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>
                <div className="input-group icon-group">
                  <label>Ícone</label>
                  <input name="icon" required placeholder="Ex: 🏀" defaultValue="🏟️" />
                </div>
              </div>

              <div className="input-group">
                <label>Status Inicial</label>
                <select name="status">
                  <option value="operacional">Operacional (Liberada)</option>
                  <option value="manutencao">Em Manutenção (Bloqueada)</option>
                </select>
              </div>
              
              <div className="modal-actions">
                <button type="button" className="cancel" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                <button type="submit" className="save">Salvar Espaço</button>
              </div>
            </form>
          </ModalContent>
        </ModalOverlay>
      )}
    </PageContainer>
  );
}

export default CourtsAndSpaces;