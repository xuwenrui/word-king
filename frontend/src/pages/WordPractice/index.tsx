import React, { useState } from 'react';

interface Word {
  id: number;
  word: string;
  meaning: string;
  options: string[];
}

const WordPractice: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  
  // 示例词汇数据
  const words: Word[] = [
    {
      id: 1,
      word: 'ubiquitous',
      meaning: '随处可见的，普遍存在的',
      options: ['罕见的', '昂贵的', '随处可见的', '复杂的']
    },
    {
      id: 2,
      word: 'eloquent',
      meaning: '雄辩的，有口才的',
      options: ['沉默的', '雄辩的', '笨拙的', '谦虚的']
    },
    {
      id: 3,
      word: 'pragmatic',
      meaning: '务实的，实际的',
      options: ['理想主义的', '务实的', '情绪化的', '抽象的']
    }
  ];

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswer(value);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer) {
      // 检查答案是否正确（这里简化为固定正确答案）
      const correctAnswer = words[currentQuestion].meaning.split('，')[0].split(' ')[0];
      if (selectedAnswer === correctAnswer) {
        setScore(score + 1);
      }
      
      if (currentQuestion + 1 < words.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }
  };

  const restartPractice = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <div style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 12px 0 rgba(0, 0, 0, 0.1)', padding: '24px', textAlign: 'center' }}>
          <h2>练习完成！</h2>
          <p>您的得分: {score}/{words.length}</p>
          <p>正确率: {Math.round((score / words.length) * 100)}%</p>
          <button className="btn btn-primary" onClick={restartPractice} style={{ marginTop: '20px' }}>
            再次练习
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h2>词汇练习</h2>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <div style={{ 
          height: '20px', 
          backgroundColor: '#f0f2f5', 
          borderRadius: '10px', 
          overflow: 'hidden',
          position: 'relative'
        }}>
          <div style={{ 
            height: '100%', 
            backgroundColor: '#409eff', 
            borderRadius: '10px',
            width: `${Math.round(((currentQuestion + 1) / words.length) * 100)}%`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff',
            fontSize: '12px',
            fontWeight: 'bold'
          }}>
            {Math.round(((currentQuestion + 1) / words.length) * 100)}%
          </div>
        </div>
      </div>
      
      <div style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 12px 0 rgba(0, 0, 0, 0.1)', padding: '24px' }}>
        <h3>第 {currentQuestion + 1} 题</h3>
        <h4>单词: {words[currentQuestion].word}</h4>
        <p>请选择该单词的正确含义:</p>
        
        <div style={{ display: 'block', marginTop: '15px' }}>
          {words[currentQuestion].options.map((option, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input 
                  type="radio" 
                  name="answer" 
                  value={option} 
                  checked={selectedAnswer === option}
                  onChange={() => handleAnswerSelect(option)}
                  style={{ marginRight: '8px' }}
                />
                <span>{option}</span>
              </label>
            </div>
          ))}
        </div>
        
        <button 
          className="btn btn-primary" 
          disabled={!selectedAnswer}
          onClick={handleNextQuestion}
          style={{ 
            marginTop: '20px',
            opacity: !selectedAnswer ? 0.5 : 1,
            cursor: !selectedAnswer ? 'not-allowed' : 'pointer'
          }}
        >
          {currentQuestion + 1 === words.length ? '完成练习' : '下一题'}
        </button>
      </div>
    </div>
  );
};

export default WordPractice;