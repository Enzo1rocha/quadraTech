import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

export const SplitLayout = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  background-color: #FFFFFF;
  overflow-x: hidden;
  overflow-y: auto;
`;

/* --- LADO ESQUERDO: FORMULÁRIO --- */
export const LeftPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
  position: relative;
  max-width: 50%;

  @media (max-width: 1080px) {
    max-width: 100%;
    padding: 24px;
  }
`;

export const LoginBox = styled.div`
  width: 100%;
  max-width: 420px;
  animation: ${fadeIn} 0.6s ease-out;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const LogoArea = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 800;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 16px;

  div {
    width: 36px;
    height: 36px;
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.primaryHover || '#004A80'});
    border-radius: 10px;
  }
`;

export const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  h1 { font-size: 32px; font-weight: 800; color: ${({ theme }) => theme.colors.text}; letter-spacing: -0.5px; }
  p { font-size: 15px; color: #64748B; }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label { font-size: 13px; font-weight: 600; color: #475569; }
  
  .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;

    svg {
      position: absolute;
      left: 16px;
      color: #94A3B8;
      width: 20px;
      height: 20px;
    }

    input {
      width: 100%;
      padding: 14px 16px 14px 44px;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      font-size: 15px;
      outline: none;
      transition: all 0.2s;
      background: #F8FAFC;

      &:focus {
        border-color: ${({ theme }) => theme.colors.primary};
        background: #FFFFFF;
        box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}15;
      }
    }
  }
`;

export const OptionsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -4px;

  label {
    display: flex; align-items: center; gap: 8px; font-size: 13px; color: #64748B; cursor: pointer;
    input { cursor: pointer; accent-color: ${({ theme }) => theme.colors.primary}; }
  }

  a { font-size: 13px; font-weight: 600; color: ${({ theme }) => theme.colors.primary}; text-decoration: none; &:hover { text-decoration: underline; } }
`;

export const SubmitButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 16px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 8px;
  box-shadow: 0 4px 15px ${({ theme }) => theme.colors.primary}40;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px ${({ theme }) => theme.colors.primary}60;
  }
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  color: #94A3B8;
  font-size: 12px;
  font-weight: 500;
  margin: 8px 0;

  &::before, &::after { content: ''; flex: 1; border-bottom: 1px solid #E2E8F0; }
  &::before { margin-right: 16px; }
  &::after { margin-left: 16px; }
`;

export const SocialLogin = styled.div`
  display: flex;
  gap: 16px;

  button {
    flex: 1; display: flex; align-items: center; justify-content: center; gap: 10px;
    padding: 12px; border: 1px solid #E2E8F0; border-radius: 12px; background: #FFFFFF;
    font-size: 14px; font-weight: 600; color: #475569; cursor: pointer; transition: all 0.2s;

    &:hover { background: #F8FAFC; border-color: #CBD5E1; }
    svg { width: 20px; height: 20px; }
  }
`;

export const FooterText = styled.p`
  text-align: center;
  font-size: 14px;
  color: #64748B;
  margin-top: 16px;

  a { color: ${({ theme }) => theme.colors.primary}; font-weight: 600; text-decoration: none; &:hover { text-decoration: underline; } }
`;

/* --- LADO DIREITO: CONTAINER PRINCIPAL --- */
export const RightPanel = styled.div`
  flex: 1;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, #003666);
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;

  @media (max-width: 1080px) {
    display: none;
  }

  &::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0;
    background-image: linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
    background-size: 40px 40px;
    opacity: 0.5;
  }
`;

export const GraphicContainer = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 700px;
  animation: fadeIn 0.8s ease-out;

  .hero-text {
    margin-bottom: 40px;
    text-align: center;
    h2 { font-size: 32px; font-weight: 800; color: #FFFFFF; line-height: 1.2; margin-bottom: 12px; }
    p { font-size: 16px; color: rgba(255, 255, 255, 0.8); line-height: 1.5; max-width: 500px; margin: 0 auto; }
  }
`;

/* --- MOCKUP DO DASHBOARD REAL (A MÁGICA ACONTECE AQUI) --- */
export const DashboardMockup = styled.div`
  background: #F8FAFC; /* Fundo clarinho igual ao seu print */
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.2);
  transform: scale(0.95);
  animation: ${float} 6s ease-in-out infinite;
  pointer-events: none; /* Impede que o usuário tente clicar no mockup */
`;

export const MockupHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  h3 { font-size: 20px; font-weight: 700; color: #0F172A; }
  p { font-size: 13px; color: #64748B; }
`;

export const MockupCardsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
`;

export const MockupCard = styled.div`
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  span { font-size: 12px; color: #64748B; font-weight: 500; }
  strong { 
    font-size: 24px; color: #0F172A; font-weight: 700; 
    span { font-size: 14px; font-weight: 500; display: inline; margin-left: 4px; }
  }

  &.alert strong { color: #EF4444; } /* Para os materiais pendentes */
`;

export const MockupContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 16px;
`;

export const MockupPanel = styled.div`
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  padding: 16px;

  .panel-header {
    display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;
    h4 { font-size: 14px; font-weight: 700; color: #0F172A; }
  }
`;

export const AgendaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #F1F5F9;
  margin-bottom: 12px;
  position: relative;
  overflow: hidden;

  /* Barrinha lateral colorida */
  &::before {
    content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 4px;
    background: ${({ theme }) => theme.colors.primary};
  }

  &.active::before { background: #10B981; }

  .time { 
    display: flex; flex-direction: column; font-size: 12px; color: #0F172A; font-weight: 600; min-width: 45px;
    span { color: #64748B; font-weight: 400; font-size: 11px; }
  }

  .details {
    flex: 1; display: flex; flex-direction: column; gap: 2px;
    h5 { font-size: 13px; font-weight: 600; color: #0F172A; }
    p { font-size: 12px; color: #64748B; }
  }

  .badge {
    font-size: 11px; padding: 4px 10px; border-radius: 12px; font-weight: 500;
    background: #F1F5F9; color: #475569;
  }
  .badge.active { background: #DCFCE7; color: #166534; }
`;

export const AvisoItem = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  
  .icon-box {
    width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    &.yellow { background: #FEF3C7; color: #D97706; }
    &.blue { background: #E0F2FE; color: #0284C7; }
    &.green { background: #DCFCE7; color: #166534; }
    svg { width: 16px; height: 16px; }
  }

  .info {
    display: flex; flex-direction: column; gap: 2px;
    h5 { font-size: 12px; font-weight: 600; color: #0F172A; line-height: 1.3; }
    p { font-size: 11px; color: #94A3B8; }
  }
`;