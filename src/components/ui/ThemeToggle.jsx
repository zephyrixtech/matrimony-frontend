import React from 'react';
import Button from './Button';
import Icon from '../AppIcon';

const ThemeToggle = () => {
  const [mode, setMode] = React.useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  React.useEffect(() => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', mode);
  }, [mode]);

  const toggle = () => setMode(prev => (prev === 'light' ? 'dark' : 'light'));

  return (
    <Button variant="ghost" size="sm" onClick={toggle} aria-label="Toggle theme">
      <Icon name={mode === 'light' ? 'Moon' : 'Sun'} size={18} />
    </Button>
  );
};

export default ThemeToggle;


