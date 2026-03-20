import React, { useState } from 'react';
import {
  PageContainer, PageHeader, FormCard, SectionTitle, 
  FormRow, InputGroup, MaterialsGrid, CheckboxCard, FormActions
} from './styles';
import { useNavigate } from 'react-router-dom';

export function NewReservation() {
  const navigate = useNavigate();

  // Estados do formulário
  const [formData, setFormData] = useState({
    title: '',
    teacher: '',
    space: '',
    date: '',
    startTime: '',
    endTime: '',
  });

  // Controle dos materiais selecionados (Array de IDs)
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);

  // Mock de dados para os selects
  const spaces = [
    { id: 'q1', name: 'Ginásio Coberto' },
    { id: 'q2', name: 'Campo de Grama Sintética' },
    { id: 'q3', name: 'Quadra Poliesportiva Principal' },
    { id: 'q4', name: 'Piscina Olímpica' },
  ];

  const materials = [
    { id: 'm1', name: 'Bolas de Futsal' },
    { id: 'm2', name: 'Bolas de Vôlei' },
    { id: 'm3', name: 'Bolas de Basquete' },
    { id: 'm4', name: 'Coletes (Cores Variadas)' },
    { id: 'm5', name: 'Cones de Treinamento' },
    { id: 'm6', name: 'Rede de Vôlei' },
  ];

  // Função para lidar com mudanças nos inputs normais
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Função para lidar com os checkboxes de materiais
  const handleMaterialToggle = (materialId: string) => {
    setSelectedMaterials(prev => 
      prev.includes(materialId)
        ? prev.filter(id => id !== materialId) // Remove se já tiver
        : [...prev, materialId] // Adiciona se não tiver
    );
  };

  // Envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.endTime <= formData.startTime) {
      alert('Erro: O horário de término deve ser depois do horário de início.');
      return; // Trava o envio
    }

    console.log('Dados da Reserva:', formData);
    console.log('Materiais:', selectedMaterials);
    alert('Reserva criada com sucesso!');
    // Aqui no futuro você faria a chamada para a sua API (ex: axios.post)
    navigate(-1); // Volta para a tela anterior após o sucesso
  };

  return (
    <PageContainer>
      <PageHeader>
        <button className="back-btn" onClick={() => navigate(-1)} title="Voltar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        </button>
        <h1>Nova Reserva</h1>
      </PageHeader>

      <FormCard onSubmit={handleSubmit}>
        
        {/* BLOCO 1: INFORMAÇÕES BÁSICAS */}
        <div>
          <SectionTitle>1. Detalhes da Atividade</SectionTitle>
          <FormRow $columns={2}>
            <InputGroup>
              <label htmlFor="title">Título da Aula/Turma</label>
              <input 
                type="text" 
                id="title" 
                name="title" 
                placeholder="Ex: Futsal 3º Ano Médio" 
                value={formData.title} 
                onChange={handleChange}
                required 
              />
            </InputGroup>
            <InputGroup>
              <label htmlFor="teacher">Professor Responsável</label>
              <input 
                type="text" 
                id="teacher" 
                name="teacher" 
                placeholder="Nome do professor" 
                value={formData.teacher} 
                onChange={handleChange}
                required 
              />
            </InputGroup>
          </FormRow>
        </div>

        {/* BLOCO 2: ONDE E QUANDO */}
        <div>
          <SectionTitle>2. Local e Horário</SectionTitle>
          <FormRow $columns={1} style={{ marginBottom: '20px' }}>
            <InputGroup>
              <label htmlFor="space">Espaço / Quadra</label>
              <select id="space" name="space" value={formData.space} onChange={handleChange} required>
                <option value="" disabled>Selecione um espaço...</option>
                {spaces.map(space => (
                  <option key={space.id} value={space.id}>{space.name}</option>
                ))}
              </select>
            </InputGroup>
          </FormRow>

          <FormRow $columns={3}>
            <InputGroup>
              <label htmlFor="date">Data</label>
              <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required />
            </InputGroup>
            <InputGroup>
              <label htmlFor="startTime">Horário de Início</label>
              <input type="time" id="startTime" name="startTime" value={formData.startTime} onChange={handleChange} required />
            </InputGroup>
            <InputGroup>
              <label htmlFor="endTime">Horário de Término</label>
              <input type="time" id="endTime" name="endTime" value={formData.endTime} onChange={handleChange} required />
            </InputGroup>
          </FormRow>
        </div>

        {/* BLOCO 3: MATERIAIS */}
        <div>
          <SectionTitle>3. Materiais Necessários (Opcional)</SectionTitle>
          <MaterialsGrid>
            {materials.map(mat => (
              <CheckboxCard key={mat.id} htmlFor={`mat-${mat.id}`}>
                <input 
                  id={`mat-${mat.id}`}              
                  type="checkbox" 
                  checked={selectedMaterials.includes(mat.id)}
                  onChange={() => handleMaterialToggle(mat.id)}
                />
                <span>{mat.name}</span>
              </CheckboxCard>
            ))}
          </MaterialsGrid>
        </div>

        {/* AÇÕES DO FORMULÁRIO */}
        <FormActions>
          <button type="button" className="cancel" onClick={() => navigate(-1)}>
            Cancelar
          </button>
          <button type="submit" className="submit">
            Confirmar Reserva
          </button>
        </FormActions>

      </FormCard>
    </PageContainer>
  );
}

export default NewReservation;