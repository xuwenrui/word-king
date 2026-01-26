import React from 'react';
import { Link } from 'react-router-dom';

interface HomeProps {
  isDarkTheme: boolean;
}

const Home: React.FC<HomeProps> = ({ isDarkTheme }) => {
  // 根据主题设置颜色
  const heroBgColor = isDarkTheme ? '#000000' : '#f5f7fa';
  const heroTextColor = isDarkTheme ? '#e0e0e0' : '#303133';
  const heroSubTextColor = isDarkTheme ? '#b0b0b0' : '#606266';
  const ctaBgColor = isDarkTheme ? '#1a1a1a' : '#409eff';
  const ctaTextColor = isDarkTheme ? '#e0e0e0' : '#fff';
  const ctaSubTextColor = isDarkTheme ? '#b0b0b0' : '#e0e0e0';

  return (
    <div className="home" style={{ backgroundColor: isDarkTheme ? '#121212' : '#fff' }}>
      {/* 英雄区域 */}
      <section className="hero" style={{ backgroundColor: isDarkTheme ? '#000000' : '#f5f7fa', color: heroTextColor }}>
        <div className="container">
          <h1 style={{ color: heroTextColor }}>掌握英语，从单词开始</h1>
          <p style={{ color: heroSubTextColor }}>Word King 是一款专业的英语单词学习助手，帮助您高效管理单词、练习拼写、通过阅读提升英语水平。</p>
          <div className="hero-buttons">
            <Link to="/word-management" className="btn btn-primary">开始学习</Link>
            <Link to="/article-reading" className="btn btn-outline">阅读文章</Link>
          </div>
        </div>
      </section>

      {/* 行动号召 */}
      <section className="cta" style={{ backgroundColor: ctaBgColor, color: ctaTextColor }}>
        <div className="container">
          <h2 className="cta-title" style={{ color: ctaTextColor }}>准备好提升您的英语了吗？</h2>
          <p className="cta-desc" style={{ color: ctaSubTextColor }}>立即开始使用 Word King，体验高效的单词学习方式，让英语学习变得更加轻松有趣。</p>
          <Link to="/word-management" className="btn btn-primary btn-lg">立即开始</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;