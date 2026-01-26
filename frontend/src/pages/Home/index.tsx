import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="home">
      {/* 英雄区域 */}
      <section className="hero">
        <div className="container">
          <h1>掌握英语，从单词开始</h1>
          <p>Word King 是一款专业的英语单词学习助手，帮助您高效管理单词、练习拼写、通过阅读提升英语水平。</p>
          <div className="hero-buttons">
            <Link to="/word-management" className="btn btn-primary">开始学习</Link>
            <Link to="/article-reading" className="btn btn-outline">阅读文章</Link>
          </div>
        </div>
      </section>

      {/* 功能特性 */}
      <section className="features">
        <div className="container">
          <h2 className="features-title">核心功能</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📝</div>
              <h3 className="feature-title">单词管理</h3>
              <p className="feature-desc">轻松添加、编辑和管理您的单词和短语，支持分类标签和搜索功能。</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3 className="feature-title">文章管理</h3>
              <p className="feature-desc">创建和管理学习文章，支持难度分类，与单词关联，系统化学习。</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3 className="feature-title">单词练习</h3>
              <p className="feature-desc">多种练习模式，包括拼写、释义测试，帮助您巩固记忆，提升学习效果。</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📖</div>
              <h3 className="feature-title">文章阅读</h3>
              <p className="feature-desc">在阅读中学习，点击单词查看释义，收藏单词，记录阅读进度。</p>
            </div>
          </div>
        </div>
      </section>

      {/* 行动号召 */}
      <section className="cta">
        <div className="container">
          <h2 className="cta-title">准备好提升您的英语了吗？</h2>
          <p className="cta-desc">立即开始使用 Word King，体验高效的单词学习方式，让英语学习变得更加轻松有趣。</p>
          <Link to="/word-management" className="btn btn-primary btn-lg">立即开始</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;