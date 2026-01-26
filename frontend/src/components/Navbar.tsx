import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  isDarkTheme: boolean;
  onToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDarkTheme, onToggle }) => {
  const location = useLocation();

  return (
    <nav className="bg-primary" style={{ 
      backgroundColor: 'rgba(255, 255, 255, 0.8)', 
      backdropFilter: 'blur(20px)', 
      WebkitBackdropFilter: 'blur(20px)', 
      borderBottom: '1px solid var(--border-light)', 
      position: 'sticky', 
      top: 0, 
      zIndex: 100 
    }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src="/assets/logo.svg" alt="Word King Logo" style={{ width: '40px', height: '40px' }} />
            <Link to="/" style={{ fontSize: '24px', fontWeight: 700, color: 'var(--primary-color)', textDecoration: 'none' }}>Word King</Link>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div className="nav">
              <Link 
                to="/word-management" 
                className={`nav-link ${location.pathname === '/word-management' ? 'active' : ''}`}
              >
                单词管理
              </Link>
              <Link 
                to="/article-management" 
                className={`nav-link ${location.pathname === '/article-management' ? 'active' : ''}`}
              >
                文章管理
              </Link>
              <Link 
                to="/word-practice" 
                className={`nav-link ${location.pathname === '/word-practice' ? 'active' : ''}`}
              >
                单词练习
              </Link>
              <Link 
                to="/article-reading" 
                className={`nav-link ${location.pathname === '/article-reading' || location.pathname.startsWith('/article-reading/') ? 'active' : ''}`}
              >
                文章阅读
              </Link>
            </div>
            <ThemeToggle isDarkTheme={isDarkTheme} onToggle={onToggle} />
          </div>
        </div>
      </div>
    </nav>
  );
};

interface ThemeToggleProps {
  isDarkTheme: boolean;
  onToggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDarkTheme, onToggle }) => {
  return (
    <button className="theme-toggle" onClick={onToggle}>
      <svg width="20" height="20">
        {isDarkTheme ? (
          <use href="/assets/icons.svg#icon-sun" />
        ) : (
          <use href="/assets/icons.svg#icon-moon" />
        )}
      </svg>
    </button>
  );
};

export default Navbar;
