import React, { useState } from 'react';
import {
  PageContainer, PageHeader, CategoriesContainer, CategoryChip,
  FaqContainer, FaqItem, SupportCard
} from './styles';

export function Help() {
  const [activeCategory, setActiveCategory] = useState('Geral');
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  // ==========================================================
  // 📝 ÁREA PARA VOCÊ EDITAR: ADICIONE SUAS PERGUNTAS AQUI!
  // ==========================================================
  const categories = ['Geral', 'Reservas', 'Materiais', 'Conta'];

  const faqData = [
    {
      id: '1',
      category: 'Geral',
      question: 'Para que serve este aplicativo?',
      answer: 'Este sistema foi criado para facilitar a gestão e reserva de quadras, espaços esportivos e materiais da instituição, evitando conflitos de horários entre as turmas.'
    },
    {
      id: '2',
      category: 'Reservas',
      question: 'Com quanta antecedência posso reservar uma quadra?',
      answer: 'Você pode realizar reservas com até 15 dias de antecedência. Reservas recorrentes (para o semestre todo) devem ser solicitadas diretamente à coordenação.'
    },
    {
      id: '3',
      category: 'Reservas',
      question: 'Como faço para cancelar uma reserva?',
      answer: 'Basta ir na aba "Minhas Reservas", encontrar o dia desejado e clicar no botão de cancelar. Por favor, cancele com antecedência para liberar o espaço para outro professor.'
    },
    {
      id: '4',
      category: 'Materiais',
      question: 'O que faço se um material quebrar durante minha aula?',
      answer: 'Recolha o material danificado, devolva-o à coordenação ou almoxarifado e reporte o problema para que possamos dar baixa no sistema e providenciar a reposição.'
    },
  ];
  // ==========================================================

  // Filtra as perguntas baseado na categoria clicada
  const filteredFaqs = faqData.filter(faq => faq.category === activeCategory);

  // Função para abrir/fechar as sanfonas
  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id); // Se clicar no que já tá aberto, ele fecha
  };

  return (
    <PageContainer>
      <PageHeader>
        <h1>Central de Ajuda</h1>
        <p>Tire suas dúvidas sobre o uso do sistema e regras da instituição.</p>
      </PageHeader>

      <CategoriesContainer>
        {categories.map(category => (
          <CategoryChip 
            key={category}
            $active={activeCategory === category}
            onClick={() => {
              setActiveCategory(category);
              setOpenFaqId(null); // Fecha qualquer resposta aberta ao trocar de categoria
            }}
          >
            {category}
          </CategoryChip>
        ))}
      </CategoriesContainer>

      <FaqContainer>
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => (
            <FaqItem key={faq.id} $isOpen={openFaqId === faq.id}>
              <div className="question" onClick={() => toggleFaq(faq.id)}>
                <h3>{faq.question}</h3>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              <div className="answer">
                <p>{faq.answer}</p>
              </div>
            </FaqItem>
          ))
        ) : (
          <div style={{ padding: '20px', color: '#64748B', textAlign: 'center' }}>
            Nenhuma dúvida cadastrada nesta categoria ainda.
          </div>
        )}
      </FaqContainer>

      <SupportCard>
        <div className="support-info">
          <h3>Ainda precisa de ajuda?</h3>
          <p>Se a sua dúvida não está listada acima, entre em contato com a coordenação.</p>
        </div>
        <button>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          Falar com Suporte
        </button>
      </SupportCard>

    </PageContainer>
  );
}

export default Help;