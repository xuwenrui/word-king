import React, { useState } from 'react';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  tags: string[];
  wordCount: number;
  newWordsCount: number;
  createdAt: string;
}

const ArticleManagement: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([
    {
      id: '1',
      title: 'The Benefits of Reading',
      excerpt: 'Reading is one of most enriching activities a person can engage in. It opens up new worlds, introduces us to different perspectives, and enhances our understanding of world around us. Whether you\'re reading fiction, non-fiction, or poetry, each book has something unique to offer.',
      tags: ['散文', '中等'],
      wordCount: 245,
      newWordsCount: 12,
      createdAt: '2026-01-20'
    },
    {
      id: '2',
      title: 'A Journey Through Time',
      excerpt: 'Once upon a time, in a small village nestled between rolling hills and a sparkling river, there lived a young girl named Lily. She had a curious mind and a heart full of dreams. Every day, she would explore of world around her, discovering hidden treasures and meeting interesting characters.',
      tags: ['故事', '简单'],
      wordCount: 189,
      newWordsCount: 8,
      createdAt: '2026-01-22'
    },
    {
      id: '3',
      title: 'The Science of Sleep',
      excerpt: 'Sleep is a fundamental biological process that plays a crucial role in maintaining our physical and mental health. During sleep, our bodies repair tissues, synthesize hormones, and consolidate memories. Scientists have discovered that sleep consists of several distinct stages, each serving unique functions.',
      tags: ['科普', '困难'],
      wordCount: 312,
      newWordsCount: 18,
      createdAt: '2026-01-23'
    },
    {
      id: '4',
      title: 'Technology in Modern Life',
      excerpt: 'Technology has transformed nearly every aspect of our daily lives. From smartphones to smart homes, we are constantly surrounded by innovative solutions designed to make life easier and more efficient. However, this rapid technological advancement also brings new challenges and considerations.',
      tags: ['新闻', '中等'],
      wordCount: 278,
      newWordsCount: 15,
      createdAt: '2026-01-24'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [tagFilter, setTagFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState({
    title: '',
    content: '',
    tags: ''
  });

  const openModal = () => {
    setCurrentArticle({
      title: '',
      content: '',
      tags: ''
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const saveArticle = () => {
    if (!currentArticle.title || !currentArticle.content) {
      alert('请填写必填字段：文章标题和内容');
      return;
    }

    const tags = currentArticle.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    const wordCount = currentArticle.content.split(/\s+/).length;

    const newArticle: Article = {
      id: Date.now().toString(),
      title: currentArticle.title,
      excerpt: currentArticle.content.substring(0, 300) + '...',
      tags,
      wordCount,
      newWordsCount: Math.floor(Math.random() * 20),
      createdAt: new Date().toISOString().split('T')[0]
    };

    setArticles(prev => [newArticle, ...prev]);
    closeModal();
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = tagFilter === 'all' || article.tags.includes(tagFilter);
    return matchesSearch && matchesTag;
  });

  return (
    <div className="article-management">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">文章管理</h1>
          <p className="page-subtitle">创建和管理您的学习文章</p>
        </div>
      </div>

      <main className="main-content">
        <div className="container">
          <div className="toolbar">
            <div className="search-box">
              <svg className="search-icon" width="18" height="18">
                <use href="/assets/icons.svg#icon-search"></use>
              </svg>
              <input 
                type="text" 
                className="search-input" 
                placeholder="搜索文章..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select 
              className="filter-select"
              value={tagFilter}
              onChange={(e) => setTagFilter(e.target.value)}
            >
              <option value="all">全部标签</option>
              <option value="新闻">新闻</option>
              <option value="故事">故事</option>
              <option value="散文">散文</option>
              <option value="科普">科普</option>
              <option value="简单">简单</option>
              <option value="中等">中等</option>
              <option value="困难">困难</option>
            </select>
            <button className="btn btn-primary" onClick={openModal}>
              <svg width="18" height="18">
                <use href="/assets/icons.svg#icon-add"></use>
              </svg>
              创建文章
            </button>
          </div>

          <div className="article-list">
            {filteredArticles.map(article => (
              <div key={article.id} className="article-item">
                <div className="article-header">
                  <div>
                    <h3 className="article-title">{article.title}</h3>
                    <div className="article-tags">
                      {article.tags.map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="article-actions">
                    <button className="btn btn-sm btn-outline">编辑</button>
                    <button className="btn btn-sm btn-danger">删除</button>
                  </div>
                </div>
                <p className="article-excerpt">{article.excerpt}</p>
                <div className="article-footer">
                  <div className="article-meta">
                    <div className="article-meta-item">
                      <svg width="14" height="14">
                        <use href="/assets/icons.svg#icon-calendar"></use>
                      </svg>
                      <span>{article.createdAt}</span>
                    </div>
                    <div className="article-meta-item">
                      <svg width="14" height="14">
                        <use href="/assets/icons.svg#icon-word-count"></use>
                      </svg>
                      <span>{article.wordCount} 词</span>
                    </div>
                    <div className="article-meta-item">
                      <svg width="14" height="14">
                        <use href="/assets/icons.svg#icon-tag"></use>
                      </svg>
                      <span>{article.newWordsCount} 个生词</span>
                    </div>
                  </div>
                  <button className="btn btn-sm btn-primary">阅读文章</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" style={{ maxWidth: '800px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">创建新文章</h3>
              <button className="modal-close" onClick={closeModal}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">文章标题 *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="请输入文章标题"
                  value={currentArticle.title}
                  onChange={(e) => setCurrentArticle(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label className="form-label">文章内容 *</label>
                <textarea 
                  className="form-textarea" 
                  style={{ minHeight: '300px' }}
                  placeholder="请输入文章内容"
                  value={currentArticle.content}
                  onChange={(e) => setCurrentArticle(prev => ({ ...prev, content: e.target.value }))}
                ></textarea>
              </div>
              <div className="form-group">
                <label className="form-label">标签 (用逗号分隔)</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="例如：新闻,中等,科普"
                  value={currentArticle.tags}
                  onChange={(e) => setCurrentArticle(prev => ({ ...prev, tags: e.target.value }))}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={closeModal}>取消</button>
              <button className="btn btn-primary" onClick={saveArticle}>保存</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleManagement;
