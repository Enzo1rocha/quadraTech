import type { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  colors: {
    primary: '#005691', // Azul SENAI
    primaryHover: '#004373', // Um tom um pouco mais escuro para o hover dos botões
    background: '#F4F6F8', // Cinza bem clarinho para o fundo do app
    surface: '#FFFFFF', // Branco para o fundo do formulário de login
    text: '#333333', // Cinza escuro para textos principais
    textSecondary: '#666666', // Cinza médio para textos secundários
    success: '#28A745', // Verde para sucesso/livre
    danger: '#DC3545', // Vermelho para erro/ocupado
    border: '#E0E0E0',
  },
  breakpoints: {
    tablet: '768px',
    desktop: '1024px',
  },
  borderRadius: '8px', // Bordas levemente arredondadas para um visual moderno
};