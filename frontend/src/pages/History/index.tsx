import React, { useState } from 'react';
import {
  PageContainer, PageHeader, FilterBar,
  HistoryList, HistoryItem
} from './styles';

// Tipagem para os logs
type LogType = {
  id: string;
  user: string;
  action: string;
  target: string;
  details: string;
  category: 'reserva' | 'material' | 'aviso' | 'sistema';
  date: string;
  time: string;
  icon: string;
};

export function History() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('todas');
  const [filterDate, setFilterDate] = useState('todos');

  // Mocks do Histórico
  const [logs] = useState<LogType[]>([
    { id: '1', user: 'Fernando Silva', action: 'reservou', target: 'Quadra Externa 01', details: 'Para a turma TDS - 1º Ano', category: 'reserva', date: '2026-03-20', time: '10:45', icon: '🏟️' },
    { id: '2', user: 'Julia Costa', action: 'retirou', target: '5 Bolas de Futsal', details: 'Status de estoque atualizado: 10/15', category: 'material', date: '2026-03-20', time: '09:30', icon: '⚽' },
    { id: '3', user: 'Direção', action: 'publicou um aviso', target: 'Manutenção na Quadra Principal', details: 'Alerta urgente criado (Expira em 24h)', category: 'aviso', date: '2026-03-19', time: '16:00', icon: '📢' },
    { id: '4', user: 'Carlos Mendes', action: 'cancelou a reserva de', target: 'Campo Society', details: 'Motivo: Chuva forte', category: 'reserva', date: '2026-03-19', time: '14:15', icon: '❌' },
    { id: '5', user: 'Sistema', action: 'adicionou', target: 'Nova Turma: Logística - 3º Ano', details: '28 alunos matriculados', category: 'sistema', date: '2026-03-18', time: '08:00', icon: '⚙️' },
  ]);

  // Lógica de Filtros Combinados
  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) || 
      log.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCategory = filterCategory === 'todas' || log.category === filterCategory;
    
    // Simplificação para o filtro de data no mock
    let matchesDate = true;
    if (filterDate === 'hoje') matchesDate = log.date === '2026-03-20'; // Simulando 'hoje'
    if (filterDate === 'ontem') matchesDate = log.date === '2026-03-19';

    return matchesSearch && matchesCategory && matchesDate;
  });

  return (
    <PageContainer>
      <PageHeader>
        <h1>Histórico de Atividades</h1>
      </PageHeader>

      <FilterBar>
        <div className="search-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input 
            type="text" 
            placeholder="Buscar por professor, espaço ou ação..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <select 
          className="filter-select"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="todas">Todas as Categorias</option>
          <option value="reserva">Reservas</option>
          <option value="material">Materiais</option>
          <option value="aviso">Avisos</option>
          <option value="sistema">Sistema</option>
        </select>

        <select 
          className="filter-select"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        >
          <option value="todos">Qualquer Data</option>
          <option value="hoje">Hoje</option>
          <option value="ontem">Ontem</option>
        </select>
      </FilterBar>

      <HistoryList>
        {filteredLogs.length > 0 ? (
          filteredLogs.map(log => (
            <HistoryItem key={log.id}>
              <div className={`icon-wrapper ${log.category}`}>
                {log.icon}
              </div>
              
              <div className="content">
                <div className="description">
                  <strong>{log.user}</strong> {log.action} <strong>{log.target}</strong>
                </div>
                <div className="details">{log.details}</div>
              </div>

              <div className="meta">
                <span className="time">{log.date === '2026-03-20' ? `Hoje às ${log.time}` : `${log.date.split('-').reverse().join('/')} às ${log.time}`}</span>
                <span className="badge">{log.category}</span>
              </div>
            </HistoryItem>
          ))
        ) : (
          <div style={{ padding: '40px', textAlign: 'center', color: '#64748B' }}>
            Nenhum registro encontrado com esses filtros.
          </div>
        )}
      </HistoryList>

    </PageContainer>
  );
}

export default History;