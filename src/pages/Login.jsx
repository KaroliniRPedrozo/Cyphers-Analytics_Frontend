import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import bgAgents from '../assets/bg-agents.jpg';
import logoValorant from '../assets/logo-valorant.png';

export default function Login() {
  const navigate = useNavigate();
  const [aba, setAba]           = useState('login');
  const [email, setEmail]       = useState('');
  const [senha, setSenha]       = useState('');
  const [gameName, setGameName] = useState('');
  const [tagLine, setTagLine]   = useState('');
  const [erro, setErro]         = useState('');
  const [sucesso, setSucesso]   = useState('');
  const [loading, setLoading]   = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setErro('');
    try {
      const { data } = await api.post('/Auth/login', { email, senha });
      localStorage.setItem('token', data.token);
      localStorage.setItem('gameName', data.gameName);
      localStorage.setItem('tagLine', data.tagLine);
      navigate('/dashboard');
    } catch {
      setErro('Email ou senha invalidos.');
    } finally {
      setLoading(false);
    }
  }

  async function handleRegistro(e) {
    e.preventDefault();
    setLoading(true);
    setErro('');
    setSucesso('');
    try {
      await api.post('/Auth/registrar', { email, senha, gameName, tagLine });
      setSucesso('Conta criada! Faca o login.');
      setAba('login');
      setEmail(''); setSenha('');
    } catch {
      setErro('Erro ao criar conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={s.page}>

      {/* Fundo */}
      <div style={{ ...s.bg, backgroundImage: `url(${bgAgents})` }} />
      <div style={s.bgOverlay} />

      {/* Linhas laterais */}
      <div style={s.lineLeft}>
        {'VALORANT'.split('').map((l, i) => (
          <span key={i} style={s.lineChar}>{l}</span>
        ))}
      </div>
      <div style={s.lineRight}>
        {'VALORANT'.split('').map((l, i) => (
          <span key={i} style={s.lineChar}>{l}</span>
        ))}
      </div>

      {/* Card centralizado */}
      <div style={s.card}>

        {/* Logo */}
        <div style={s.logoArea}>
          <img src={logoValorant} alt="Logo" style={s.logoImg} />
          <div style={s.logoTexto}>
            <span style={s.logoLinha1}>CYPHER'S</span>
            <span style={s.logoLinha2}>ANALYTICS</span>
          </div>
        </div>

        {/* Login */}
        {aba === 'login' && (
          <form onSubmit={handleLogin} style={s.form}>

            <label style={s.label}>Email</label>
            <input style={s.input} type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)} required />

            <label style={s.label}>Senha</label>
            <input style={s.input} type="password"
              placeholder="••••••••"
              value={senha}
              onChange={e => setSenha(e.target.value)} required />

            {erro    && <div style={s.alerta}>⚠️ {erro}</div>}
            {sucesso && <div style={s.sucessoMsg}>✅ {sucesso}</div>}

            <button style={loading ? s.botaoDisabled : s.botao}
              type="submit" disabled={loading}>
              {loading ? 'ENTRANDO...' : 'ENTRAR'}
            </button>

            <p style={s.linkSecundario}
              onClick={() => { setAba('registro'); setErro(''); setSucesso(''); }}>
              Nao tem conta? <span style={s.linkDestaque}>Criar conta</span>
            </p>
            <p style={s.esqueceu}>Esqueceu sua senha?</p>
          </form>
        )}

        {/* Registro */}
        {aba === 'registro' && (
          <form onSubmit={handleRegistro} style={s.form}>

            <p style={s.instrucao}>
              Crie sua conta usando seu email e informe seu nick do Valorant para buscarmos seus dados automaticamente.
            </p>

            <label style={s.label}>Email</label>
            <input style={s.input} type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)} required />

            <label style={s.label}>Senha</label>
            <input style={s.input} type="password"
              placeholder="••••••••"
              value={senha}
              onChange={e => setSenha(e.target.value)} required />

            <label style={s.label}>Riot ID</label>
            <input style={s.input} type="text"
              placeholder="Ex: Player"
              value={gameName}
              onChange={e => setGameName(e.target.value)} required />

            <label style={s.label}>Tag</label>
            <input style={s.input} type="text"
              placeholder="Ex: 9053"
              value={tagLine}
              onChange={e => setTagLine(e.target.value)} required />

            <div style={s.dica}>
              💡 Seu nome e tag do Valorant ficam no canto inferior esquerdo do jogo, no formato <strong>Nome#Tag</strong>
            </div>

            {erro    && <div style={s.alerta}>⚠️ {erro}</div>}
            {sucesso && <div style={s.sucessoMsg}>✅ {sucesso}</div>}

            <button style={loading ? s.botaoDisabled : s.botao}
              type="submit" disabled={loading}>
              {loading ? 'CRIANDO...' : 'CRIAR CONTA'}
            </button>

            <p style={s.linkSecundario}
              onClick={() => { setAba('login'); setErro(''); setSucesso(''); }}>
              Ja tem conta? <span style={s.linkDestaque}>Entrar</span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

const s = {
  page: {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width: '100vw',
  position: 'relative',
  overflow: 'hidden',
  fontFamily: "'Segoe UI', sans-serif",
},
  bg: {
    position: 'fixed',
    top: 0, left: 0,
    width: '100vw', height: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    filter: 'brightness(0.4) saturate(0.5) hue-rotate(180deg)',
    zIndex: 0,
  },
  bgOverlay: {
    position: 'fixed',
    top: 0, left: 0,
    width: '100vw', height: '100vh',
    background: 'linear-gradient(135deg, rgba(5,8,12,0.75) 0%, rgba(15,5,10,0.6) 100%)',
    zIndex: 1,
  },
  lineLeft: {
    position: 'fixed', left: '28px', top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex', flexDirection: 'column',
    gap: '4px', zIndex: 2,
  },
  lineRight: {
    position: 'fixed', right: '28px', top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex', flexDirection: 'column',
    gap: '4px', zIndex: 2,
  },
  lineChar: {
    color: 'rgba(255,70,85,0.5)',
    fontSize: '0.7rem', fontWeight: 900,
    letterSpacing: '2px', writingMode: 'vertical-rl',
  },
  card: {
  position: 'relative', zIndex: 3,
  background: 'rgba(8,12,18,0.92)',
  border: '1px solid rgba(255,70,85,0.2)',
  borderRadius: '4px',
  padding: '1.75rem 2rem',
  width: '100%', maxWidth: '360px',
  margin: '0 auto',
  backdropFilter: 'blur(16px)',
  boxShadow: '0 0 80px rgba(255,70,85,0.08), 0 25px 60px rgba(0,0,0,0.8)',
  maxHeight: '100vh',
  overflowY: 'auto',
  scrollbarWidth: 'none',      // ← esconde scrollbar no Firefox
  msOverflowStyle: 'none',     // ← esconde scrollbar no IE
},
  logoArea: {
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', gap: '0.75rem',
    marginBottom: '2rem',
  },
  logoImg: {
    width: '64px', height: 'auto',
    filter: 'drop-shadow(0 0 14px rgba(255,70,85,0.7))',
  },
  logoTexto: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
  },
  logoLinha1: {
    color: '#ffffff', fontSize: '1.3rem',
    fontWeight: 900, letterSpacing: '6px', lineHeight: 1,
  },
  logoLinha2: {
    color: '#ffffff', fontSize: '1.3rem',
    fontWeight: 900, letterSpacing: '4px', lineHeight: 1.3,
  },
  form: {
    display: 'flex', flexDirection: 'column', gap: '0.4rem',
  },
  instrucao: {
    color: '#8b949e', fontSize: '0.8rem',
    textAlign: 'center', lineHeight: 1.5,
    marginBottom: '0.5rem',
  },
  label: {
    color: '#8b949e', fontSize: '0.75rem', fontWeight: 700,
    letterSpacing: '1px', textTransform: 'uppercase',
    marginTop: '0.5rem',
  },
  input: {
    padding: '0.75rem 1rem', borderRadius: '2px',
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(255,255,255,0.05)',
    color: '#ffffff', fontSize: '0.95rem', outline: 'none',
  },
  dica: {
    background: 'rgba(255,70,85,0.06)',
    border: '1px solid rgba(255,70,85,0.15)',
    color: '#8b949e', fontSize: '0.75rem',
    padding: '0.6rem 0.75rem', borderRadius: '2px',
    lineHeight: 1.5, marginTop: '0.25rem',
  },
  botao: {
    marginTop: '1.25rem', padding: '0.85rem',
    background: '#ff4655', color: '#fff',
    border: 'none', borderRadius: '2px',
    fontSize: '0.95rem', cursor: 'pointer',
    fontWeight: 900, letterSpacing: '2px',
    boxShadow: '0 4px 20px rgba(255,70,85,0.4)',
  },
  botaoDisabled: {
    marginTop: '1.25rem', padding: '0.85rem',
    background: '#333', color: '#666',
    border: 'none', borderRadius: '2px',
    fontSize: '0.95rem', cursor: 'not-allowed',
    fontWeight: 900, letterSpacing: '2px',
  },
  alerta: {
    background: 'rgba(255,70,85,0.1)',
    border: '1px solid rgba(255,70,85,0.3)',
    color: '#ff4655', padding: '0.6rem 0.75rem',
    borderRadius: '2px', fontSize: '0.8rem', marginTop: '0.5rem',
  },
  sucessoMsg: {
    background: 'rgba(63,185,80,0.1)',
    border: '1px solid rgba(63,185,80,0.3)',
    color: '#3fb950', padding: '0.6rem 0.75rem',
    borderRadius: '2px', fontSize: '0.8rem', marginTop: '0.5rem',
  },
  linkSecundario: {
    color: '#8b949e', fontSize: '0.8rem',
    textAlign: 'center', marginTop: '1rem', cursor: 'default',
  },
  linkDestaque: {
    color: '#ff4655', fontWeight: 700, cursor: 'pointer',
  },
  esqueceu: {
    color: '#8b949e', fontSize: '0.75rem',
    textAlign: 'center', marginTop: '0.25rem', cursor: 'pointer',
  },
};