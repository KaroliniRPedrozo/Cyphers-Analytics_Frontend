export default function Dashboard() {
  const gameName = localStorage.getItem('gameName');
  return (
    <div style={{ background:'#0f1923', minHeight:'100vh',
      color:'#fff', padding:'2rem' }}>
      <h1>Bem-vinda, {gameName}! 🎮</h1>
      <p>Dashboard em construção...</p>
    </div>
  );
}