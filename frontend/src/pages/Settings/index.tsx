import React, { useState } from 'react';
import {
  PageContainer, PageHeader, TabsContainer, TabButton,
  ContentCard, SectionTitle, FormGrid, FormGroup, AvatarSection,
  PreferenceItem, ToggleSwitch, SaveButton
} from './styles';

export function Settings() {
  const [activeTab, setActiveTab] = useState<'perfil' | 'preferencias'>('perfil');

  // Estados dos inputs de Perfil
  const [profile, setProfile] = useState({
    name: 'Fernando Silva',
    email: 'fernando.silva@escola.com',
    phone: '(11) 98765-4321',
    role: 'Professor de Ed. Física'
  });

  // Estados das Preferências (Toggles)
  const [preferences, setPreferences] = useState({
    emailNotif: true,
    systemNotif: true,
    darkMode: false,
    compactView: false,
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const togglePreference = (key: keyof typeof preferences) => {
    setPreferences({ ...preferences, [key]: !preferences[key] });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <PageContainer>
      <PageHeader>
        <h1>Configurações</h1>
        <TabsContainer>
          <TabButton $isActive={activeTab === 'perfil'} onClick={() => setActiveTab('perfil')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            Meu Perfil
          </TabButton>
          <TabButton $isActive={activeTab === 'preferencias'} onClick={() => setActiveTab('preferencias')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            Preferências
          </TabButton>
        </TabsContainer>
      </PageHeader>

      <ContentCard>
        {activeTab === 'perfil' && (
          <>
            <SectionTitle>Informações Pessoais</SectionTitle>
            
            <AvatarSection>
              <div className="avatar">{getInitials(profile.name)}</div>
              <div className="avatar-actions">
                <button className="change">Alterar Foto</button>
                <button className="remove">Remover Foto</button>
              </div>
            </AvatarSection>

            <FormGrid>
              <FormGroup>
                <label>Nome Completo</label>
                <input name="name" value={profile.name} onChange={handleProfileChange} />
              </FormGroup>
              <FormGroup>
                <label>Cargo / Função (Somente Leitura)</label>
                <input name="role" value={profile.role} readOnly disabled style={{ opacity: 0.6 }} />
              </FormGroup>
              <FormGroup>
                <label>E-mail</label>
                <input type="email" name="email" value={profile.email} onChange={handleProfileChange} />
              </FormGroup>
              <FormGroup>
                <label>Telefone / WhatsApp</label>
                <input name="phone" value={profile.phone} onChange={handleProfileChange} />
              </FormGroup>
            </FormGrid>

            <SectionTitle style={{ marginTop: '40px' }}>Segurança</SectionTitle>
            <FormGrid>
              <FormGroup>
                <label>Nova Senha</label>
                <input type="password" placeholder="Digite a nova senha" />
              </FormGroup>
              <FormGroup>
                <label>Confirmar Nova Senha</label>
                <input type="password" placeholder="Repita a nova senha" />
              </FormGroup>
            </FormGrid>

            <SaveButton>Salvar Alterações</SaveButton>
          </>
        )}

        {activeTab === 'preferencias' && (
          <>
            <SectionTitle>Notificações</SectionTitle>
            <PreferenceItem>
              <div className="info">
                <h3>Notificações por E-mail</h3>
                <p>Receber avisos quando uma reserva sua for cancelada ou alterada.</p>
              </div>
              <ToggleSwitch>
                <input type="checkbox" checked={preferences.emailNotif} onChange={() => togglePreference('emailNotif')} />
                <span className="slider"></span>
              </ToggleSwitch>
            </PreferenceItem>

            <PreferenceItem>
              <div className="info">
                <h3>Avisos no Sistema</h3>
                <p>Mostrar um ponto vermelho no sininho quando houver novos avisos.</p>
              </div>
              <ToggleSwitch>
                <input type="checkbox" checked={preferences.systemNotif} onChange={() => togglePreference('systemNotif')} />
                <span className="slider"></span>
              </ToggleSwitch>
            </PreferenceItem>

            <SectionTitle style={{ marginTop: '40px' }}>Aparência</SectionTitle>
            <PreferenceItem>
              <div className="info">
                <h3>Modo Escuro (Dark Mode)</h3>
                <p>Alterar as cores do sistema para tons mais escuros.</p>
              </div>
              <ToggleSwitch>
                <input type="checkbox" checked={preferences.darkMode} onChange={() => togglePreference('darkMode')} />
                <span className="slider"></span>
              </ToggleSwitch>
            </PreferenceItem>

            <PreferenceItem>
              <div className="info">
                <h3>Visualização Compacta</h3>
                <p>Reduzir os espaços em branco para caber mais informação na tela.</p>
              </div>
              <ToggleSwitch>
                <input type="checkbox" checked={preferences.compactView} onChange={() => togglePreference('compactView')} />
                <span className="slider"></span>
              </ToggleSwitch>
            </PreferenceItem>

          </>
        )}
      </ContentCard>

    </PageContainer>
  );
}

export default Settings;