import { useState, useEffect } from 'react';

const VisitorCount = () => {
  const [count, setCount] = useState(null);

  // 1. CHOOSE YOUR UNIQUE NAMES:
  // Change 'my-awesome-portfolio-2026' to your actual name or project name.
  const namespace = "Devid_Deshmukh";
  const key = "homepage-visitors";

  useEffect(() => {
    const hasVisited = localStorage.getItem(`hasVisited_${namespace}`);

    // Logic: If user hasn't visited, 'up' (increment) the counter.
    // If they have visited, just 'get' the current number.
    const action = hasVisited ? 'get' : 'up';

    fetch(`https://api.counterapi.dev/v1/${namespace}/${key}/${action}`)
      .then((res) => res.json())
      .then((data) => {
        setCount(data.count);
        // Tag the browser so they aren't counted next time they refresh
        if (!hasVisited) {
          localStorage.setItem(`hasVisited_${namespace}`, 'true');
        }
      })
      .catch((err) => console.error("Counter Error:", err));
  }, []);

  return (
    <div style={{
      marginTop: '20px',
      padding: '8px 15px',
      background: '#f4f4f4',
      border: '1px solid #ddd',
      borderRadius: '8px',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      fontFamily: 'sans-serif',
      fontSize: '14px'
    }}>
      <span style={{ fontSize: '18px' }}>👤</span>
      <span><strong>{count !== null ? count : "..."}</strong> Unique Visitors</span>
    </div>
  );
};

export default VisitorCount;