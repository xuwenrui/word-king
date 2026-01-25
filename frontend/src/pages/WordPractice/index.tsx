import React, { useState } from 'react';
import { ElCard, ElButton, ElRadio, ElRadioGroup, ElProgress, ElRow, ElCol } from 'element-plus';

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
      <div className="wk-container">
        <ElCard className="result-card">
          <h2>练习完成！</h2>
          <p>您的得分: {score}/{words.length}</p>
          <p>正确率: {Math.round((score / words.length) * 100)}%</p>
          <ElButton type="primary" onClick={restartPractice} style={{ marginTop: '20px' }}>
            再次练习
          </ElButton>
        </ElCard>
      </div>
    );
  }

  return (
    <div className="wk-container">
      <ElRow gutter={20}>
        <ElCol span={24}>
          <h2>词汇练习</h2>
        </ElCol>
      </ElRow>
      
      <ElRow gutter={20} style={{ marginTop: '20px' }}>
        <ElCol span={24}>
          <ElProgress 
            percentage={Math.round(((currentQuestion + 1) / words.length) * 100)} 
            text-inside 
            stroke-width={20} 
          />
        </ElCol>
      </ElRow>
      
      <ElRow gutter={20} style={{ marginTop: '20px' }}>
        <ElCol span={24}>
          <ElCard className="practice-card">
            <h3>第 {currentQuestion + 1} 题</h3>
            <h4>单词: {words[currentQuestion].word}</h4>
            <p>请选择该单词的正确含义:</p>
            
            <ElRadioGroup 
              value={selectedAnswer} 
              onChange={handleAnswerSelect}
              style={{ display: 'block', marginTop: '15px' }}
            >
              {words[currentQuestion].options.map((option, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                  <ElRadio label={option} style={{ display: 'block' }}>
                    {option}
                  </ElRadio>
                </div>
              ))}
            </ElRadioGroup>
            
            <ElButton 
              type="primary" 
              disabled={!selectedAnswer}
              onClick={handleNextQuestion}
              style={{ marginTop: '20px' }}
            >
              {currentQuestion + 1 === words.length ? '完成练习' : '下一题'}
            </ElButton>
          </ElCard>
        </ElCol>
      </ElRow>
    </div>
  );
};

export default WordPractice;