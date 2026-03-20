import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NotFoundContainer } from './styles';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <NotFoundContainer>
      <div className="error-code">404</div>
      <h1>Página não encontrada</h1>
      <p>
        O endereço que você tentou acessar não existe, foi movido ou você não tem 
        permissão para visualizá-lo. Verifique o link digitado ou retorne ao início.
      </p>
      
      <button onClick={() => navigate('/')}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Voltar para o Início
      </button>
    </NotFoundContainer>
  );
}

export default NotFound;