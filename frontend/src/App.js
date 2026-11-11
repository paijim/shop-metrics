import React, { useEffect, useState } from 'react';

function App() {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    fetch('/api/metrics')
      .then(res => res.json())
      .then(data => setMetrics(data.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <h1>ShopMetrics Dashboard</h1>
      {metrics ? (
        <ul>
          <li>Utilisateurs actifs : {metrics.activeUsers}</li>
          <li>Ventes du jour : {metrics.salesToday}</li>
          <li>Charge serveur : {metrics.serverLoad}</li>
        </ul>
      ) : (
        <p>Chargement des métriques...</p>
      )}
    </div>
  );
}

export default App;