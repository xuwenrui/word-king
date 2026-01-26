import React, { useState } from 'react';

interface Word {
  id: string;
  english: string;
  phonetic?: string;
  chinese: string;
  example?: string;
  tags: string[];
  type: 'word' | 'phrase';
  createdAt: string;
}

const WordManagement: React.FC = () => {
  const [words, setWords] = useState<Word[]>([
    {
      id: '1',
      english: 'serendipity',
      phonetic: '/ˌserənˈdɪpəti/',
      chinese: 'n. 意外发现珍奇事物的本领；机缘凑巧',
      example: 'The discovery of penicillin was a happy case of serendipity.',
      tags: ['学术词汇', '高级'],
      type: 'word',
      createdAt: '2026-01-20'
    },
    {
      id: '2',
      english: 'break a leg',
      chinese: '祝你好运（尤指演出前）',
      example: 'Break a leg! I know you\'ll do great tonight.',
      tags: ['日常用语', '中级'],
      type: 'phrase',
      createdAt: '2026-01-22'
    },
    {
      id: '3',
      english: 'epiphany',
      phonetic: '/ɪˈpɪfəni/',
      chinese: 'n. 顿悟；突然的领悟',
      example: 'She had an epiphany about her career path.',
      tags: ['学术词汇', '高级'],
      type: 'word',
      createdAt: '2026-01-23'
    },
    {
      id: '4',
      english: 'piece of cake',
      chinese: '小菜一碟；非常容易的事',
      example: 'That test was a piece of cake!',
      tags: ['日常用语', '初级'],
      type: 'phrase',
      createdAt: '2026-01-24'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [tagFilter, setTagFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentWord, setCurrentWord] = useState<Partial<Word>>({
    type: 'word',
    tags: []
  });

  const openModal = () => {
    setCurrentWord({
      type: 'word',
      tags: []
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const updateWordType = (value: string) => {
    if (value.includes(' ')) {
      setCurrentWord(prev => ({ ...prev, type: 'phrase' }));
    } else {
      setCurrentWord(prev => ({ ...prev, type: 'word' }));
    }
  };

  const saveWord = () => {
    if (!currentWord.english || !currentWord.chinese) {
      alert('请填写必填字段：单词/短语和中文释义');
      return;
    }

    const newWord: Word = {
      id: Date.now().toString(),
      english: currentWord.english!,
      phonetic: currentWord.phonetic,
      chinese: currentWord.chinese!,
      example: currentWord.example,
      tags: currentWord.tags || [],
      type: currentWord.type || 'word',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setWords(prev => [newWord, ...prev]);
    closeModal();
  };

  const handleTagsChange = (value: string) => {
    const tags = value.split(',').map(tag => tag.trim()).filter(tag => tag);
    setCurrentWord(prev => ({ ...prev, tags }));
  };

  const filteredWords = words.filter(word => {
    const matchesSearch = word.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
      word.chinese.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || word.type === typeFilter;
    const matchesTag = tagFilter === 'all' || word.tags.includes(tagFilter);
    return matchesSearch && matchesType && matchesTag;
  });

  return (
    <div className="word-management">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">单词管理</h1>
          <p className="page-subtitle">轻松管理您的英语单词和短语</p>
        </div>
      </div>

      <main className="main-content">
        <div className="container">
          {/* 工具栏 */}
          <div className="toolbar">
            <div className="search-box">
              <svg className="search-icon" width="18" height="18">
                <use href="/assets/icons.svg#icon-search"></use>
              </svg>
              <input 
                type="text" 
                className="search-input" 
                placeholder="搜索单词或短语..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select 
              className="filter-select"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">全部</option>
              <option value="word">单词</option>
              <option value="phrase">短语</option>
            </select>
            <select 
              className="filter-select"
              value={tagFilter}
              onChange={(e) => setTagFilter(e.target.value)}
            >
              <option value="all">全部标签</option>
              <option value="日常用语">日常用语</option>
              <option value="商务英语">商务英语</option>
              <option value="学术词汇">学术词汇</option>
              <option value="初级">初级</option>
              <option value="中级">中级</option>
              <option value="高级">高级</option>
            </select>
            <button className="btn btn-primary" onClick={openModal}>
              <svg width="18" height="18">
                <use href="/assets/icons.svg#icon-add"></use>
              </svg>
              添加单词
            </button>
          </div>

          {/* 单词列表 */}
          <div className="word-list">
            {filteredWords.map(word => (
              <div key={word.id} className="word-item">
                <div className="word-header">
                  <div>
                    <span className="word-english">{word.english}</span>
                    {word.type === 'phrase' ? (
                      <span className="phrase-badge">短语</span>
                    ) : word.phonetic ? (
                      <span className="word-phonetic">{word.phonetic}</span>
                    ) : null}
                  </div>
                  <div className="word-actions">
                    <button className="btn btn-sm btn-outline">编辑</button>
                    <button className="btn btn-sm btn-danger">删除</button>
                  </div>
                </div>
                <div className="word-chinese">{word.chinese}</div>
                {word.example && (
                  <div className="word-example">{word.example}</div>
                )}
                <div className="word-footer">
                  <div className="word-tags">
                    {word.tags.map((tag, index) => (
                      <span key={index} className="tag">{tag}</span>
                    ))}
                  </div>
                  <div className="word-meta">创建于 {word.createdAt}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* 添加/编辑单词模态框 */}
      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">添加新单词</h3>
              <button className="modal-close" onClick={closeModal}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">单词/短语 *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="请输入单词或短语" 
                  value={currentWord.english || ''}
                  onChange={(e) => {
                    setCurrentWord(prev => ({ ...prev, english: e.target.value }));
                    updateWordType(e.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <label className="form-label">类型 (自动识别)</label>
                <select 
                  className="form-select" 
                  value={currentWord.type || 'word'}
                  disabled
                >
                  <option value="word">单词</option>
                  <option value="phrase">短语</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">音标</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="例如：/ˈhæpi/" 
                  value={currentWord.phonetic || ''}
                  onChange={(e) => setCurrentWord(prev => ({ ...prev, phonetic: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label className="form-label">中文释义 *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="请输入中文释义" 
                  value={currentWord.chinese || ''}
                  onChange={(e) => setCurrentWord(prev => ({ ...prev, chinese: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label className="form-label">例句</label>
                <textarea 
                  className="form-textarea" 
                  placeholder="请输入例句" 
                  value={currentWord.example || ''}
                  onChange={(e) => setCurrentWord(prev => ({ ...prev, example: e.target.value }))}
                ></textarea>
              </div>
              <div className="form-group">
                <label className="form-label">标签 (用逗号分隔)</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="例如：日常用语,初级" 
                  value={currentWord.tags?.join(', ') || ''}
                  onChange={(e) => handleTagsChange(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={closeModal}>取消</button>
              <button className="btn btn-primary" onClick={saveWord}>保存</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WordManagement;