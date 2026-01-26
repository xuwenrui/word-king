import React, { useState, useEffect } from 'react';

interface Word {
  word: string;
  phonetic: string;
  meaning: string;
}

interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface WordPracticeProps {
  isDarkTheme: boolean;
}

const WordPractice: React.FC<WordPracticeProps> = ({ isDarkTheme }) => {
  const [currentMode, setCurrentMode] = useState<'spelling' | 'meaning'>('spelling');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [mistakes, setMistakes] = useState<Array<{ word: string; userInput: string; index: number }>>([]);
  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentInput, setCurrentInput] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'success' | 'error'>('success');
  const [feedbackText, setFeedbackText] = useState('');
  const [letterStates, setLetterStates] = useState<Array<'correct' | 'incorrect' | 'active' | ''>>([]);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [showStats, setShowStats] = useState(false);

  const wordList: Word[] = [
    { word: 'serendipity', phonetic: '/ˌserənˈdɪpəti/', meaning: 'n. 意外发现珍奇事物的本领' },
    { word: 'epiphany', phonetic: '/ɪˈpɪfəni/', meaning: 'n. 顿悟；突然的领悟' },
    { word: 'ubiquitous', phonetic: '/juːˈbɪkwɪtəs/', meaning: 'adj. 无所不在的' },
    { word: 'ephemeral', phonetic: '/ɪˈfemərəl/', meaning: 'adj. 短暂的，转瞬即逝的' },
    { word: 'serene', phonetic: '/səˈriːn/', meaning: 'adj. 宁静的，安详的' },
    { word: 'resilient', phonetic: '/rɪˈzɪliənt/', meaning: 'adj. 有弹性的，能恢复的' },
    { word: 'eloquent', phonetic: '/ˈeləkwənt/', meaning: 'adj. 雄辩的，有说服力的' },
    { word: 'meticulous', phonetic: '/məˈtɪkjələs/', meaning: 'adj. 一丝不苟的，细致的' },
    { word: 'pragmatic', phonetic: '/præɡˈmætɪk/', meaning: 'adj. 务实的，实用的' },
    { word: 'ambiguous', phonetic: '/æmˈbɪɡjuəs/', meaning: 'adj. 模糊不清的，模棱两可的' }
  ];

  const currentWord = wordList[currentWordIndex];

  const cardBgColor = isDarkTheme ? '#1a1a1a' : '#fff';
  const textColor = isDarkTheme ? '#e0e0e0' : '#303133';
  const secondaryTextColor = isDarkTheme ? '#909399' : '#909399';
  const tertiaryTextColor = isDarkTheme ? '#b0b0b0' : '#606266';
  const statsCardBgColor = isDarkTheme ? '#2c2c2c' : '#f5f7fa';
  const pausedOverlayBgColor = isDarkTheme ? 'rgba(0, 0, 0, 0.8)' : 'rgba(242, 237, 237, 0.8)';
  const pausedTextColor = isDarkTheme ? '#e0e0e0' : '#303133';
  const borderColor = isDarkTheme ? '#333' : '#ebeef5';
  const optionBgColor = isDarkTheme ? '#2c2c2c' : '#f5f7fa';
  const successBgColor = isDarkTheme ? '#1e3a2f' : '#D1FAE5';
  const errorBgColor = isDarkTheme ? '#3f1f1f' : '#FEE2E2';
  const successTextColor = isDarkTheme ? '#a7f3d0' : '#065F46';
  const errorTextColor = isDarkTheme ? '#fecaca' : '#991B1B';
  const optionSelectedBorderColor = isDarkTheme ? '#409eff' : '#409eff';
  const optionSelectedBgColor = isDarkTheme ? '#2c3e50' : '#EFF6FF';

  const startPractice = () => {
    setIsStarted(true);
    setIsPaused(false);
    setShowStats(false);
    setCurrentWordIndex(0);
    setScore(0);
    setCorrectCount(0);
    setWrongCount(0);
    setMistakes([]);
    setCurrentInput('');
    setShowFeedback(false);
    if (currentMode === 'spelling') {
      loadWord();
    }
  };

  const loadWord = () => {
    setCurrentInput('');
    setShowFeedback(false);
    const newLetterStates = new Array(currentWord.word.length).fill('');
    newLetterStates[0] = 'active';
    setLetterStates(newLetterStates);
    playWordSound();
  };

  const playWordSound = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentWord.word);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const handleLetterInput = (key: string) => {
    const currentIndex = currentInput.length;
    if (currentIndex < currentWord.word.length) {
      const newInput = currentInput + key;
      setCurrentInput(newInput);

      const newLetterStates = [...letterStates];
      const targetChar = currentWord.word[currentIndex].toLowerCase();
      
      if (key === targetChar) {
        newLetterStates[currentIndex] = 'correct';
      } else {
        newLetterStates[currentIndex] = 'incorrect';
      }

      const state = newLetterStates[currentIndex];
      // state is already 'correct' or 'incorrect', simply assign it
      newLetterStates[currentIndex] = state;
      if (currentIndex + 1 < currentWord.word.length) {
        newLetterStates[currentIndex + 1] = 'active';
      }

      setLetterStates(newLetterStates);

      if (newInput.length === currentWord.word.length) {
        checkAnswer(newInput);
      }
    }
  };

  const handleBackspace = () => {
    if (currentInput.length > 0) {
      const newInput = currentInput.slice(0, -1);
      setCurrentInput(newInput);

      const newLetterStates = [...letterStates];
      const currentIndex = newInput.length;
      newLetterStates[currentIndex] = 'active';
      if (currentIndex + 1 < currentWord.word.length) {
        newLetterStates[currentIndex + 1] = '';
      }

      setLetterStates(newLetterStates);
    }
  };

  const checkAnswer = (input: string) => {
    if (input.toLowerCase() === currentWord.word.toLowerCase()) {
      setShowFeedback(true);
      setFeedbackType('success');
      setFeedbackText('✓ 回答正确！');
      setScore(score + 10);
      setCorrectCount(correctCount + 1);

      const newLetterStates = letterStates.map(() => 'correct');
      setLetterStates(newLetterStates as Array<'' | 'correct' | 'incorrect' | 'active'>);

      setTimeout(() => {
        nextWord();
      }, 1000);
    } else {
      setShowFeedback(true);
      setFeedbackType('error');
      setFeedbackText('✗ 拼写错误，请重试');

      setMistakes([...mistakes, {
        word: currentWord.word,
        userInput: input,
        index: currentWordIndex
      }]);

      setTimeout(() => {
        setCurrentInput('');
        const newLetterStates = new Array(currentWord.word.length).fill('');
        newLetterStates[0] = 'active';
        setLetterStates(newLetterStates);
        setShowFeedback(false);
      }, 500);
    }
  };

  const nextWord = () => {
    if (currentWordIndex + 1 >= wordList.length) {
      setShowStats(true);
    } else {
      setCurrentWordIndex(currentWordIndex + 1);
    }
  };

  const generateOptions = (): Option[] => {
    const correctOption: Option = {
      id: 'correct',
      text: currentWord.meaning,
      isCorrect: true
    };

    const wrongMeanings = [
      'n. 一种宗教仪式',
      'adj. 持续的痛苦',
      'n. 美好的回忆',
      'v. 快速移动',
      'n. 日常用品',
      'adj. 困难的',
      'v. 思考',
      'n. 天气现象'
    ];

    const shuffledWrong = wrongMeanings.sort(() => Math.random() - 0.5).slice(0, 3);
    const wrongOptions: Option[] = shuffledWrong.map((meaning, index) => ({
      id: `wrong-${index}`,
      text: meaning,
      isCorrect: false
    }));

    const allOptions = [correctOption, ...wrongOptions];
    return allOptions.sort(() => Math.random() - 0.5);
  };

  const handleOptionSelect = (option: Option) => {
    setSelectedOption(option);
  };

  const handleCheckMeaning = () => {
    if (selectedOption) {
      if (selectedOption.isCorrect) {
        setShowFeedback(true);
        setFeedbackType('success');
        setFeedbackText('回答正确！');
        setScore(score + 10);
        setCorrectCount(correctCount + 1);

        setTimeout(() => {
          nextWord();
        }, 1000);
      } else {
        setShowFeedback(true);
        setFeedbackType('error');
        setFeedbackText('回答错误');
        setWrongCount(wrongCount + 1);

        setMistakes([...mistakes, {
          word: currentWord.word,
          userInput: selectedOption.text,
          index: currentWordIndex
        }]);

        setTimeout(() => {
          nextWord();
        }, 1000);
      }
    }
  };

  const handleRestart = () => {
    setCurrentWordIndex(0);
    setScore(0);
    setCorrectCount(0);
    setWrongCount(0);
    setMistakes([]);
    setIsStarted(false);
    setIsPaused(false);
    setCurrentInput('');
    setShowFeedback(false);
    setShowStats(false);
    setSelectedOption(null);
    startPractice();
  };

  const handleReviewMistakes = () => {
    if (mistakes.length === 0) {
      alert('没有错题，太棒了！');
      return;
    }

    let mistakesText = '错题列表：\n\n';
    mistakes.forEach((mistake, index) => {
      mistakesText += `${index + 1}. ${mistake.word} (你的回答: ${mistake.userInput})\n`;
    });
    alert(mistakesText);
  };

  const progress = ((currentWordIndex + 1) / wordList.length) * 100;
  const correctRate = wordList.length > 0 ? Math.round((correctCount / wordList.length) * 100) : 0;

  useEffect(() => {
    startPractice();
  }, []);

  useEffect(() => {
    if (isStarted && currentMode === 'spelling') {
      loadWord();
    }
  }, [currentWordIndex, isStarted, currentMode]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isStarted && !isPaused) {
        setIsPaused(true);
      }
    };

    const handleBlur = () => {
      if (isStarted && !isPaused) {
        setIsPaused(true);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
    };
  }, [isStarted, isPaused]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isPaused) {
        setIsPaused(false);
        e.preventDefault();
        return;
      }

      if (isStarted && currentMode === 'spelling' && !isPaused) {
        if (e.key.length === 1 && e.key.match(/[a-zA-Z]/)) {
          e.preventDefault();
          handleLetterInput(e.key.toLowerCase());
        } else if (e.key === 'Backspace') {
          e.preventDefault();
          handleBackspace();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isStarted, currentMode, isPaused, currentInput, currentWordIndex]);

  if (showStats) {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <div style={{ backgroundColor: cardBgColor, borderRadius: '8px', boxShadow: '0 2px 12px 0 rgba(0, 0, 0, 0.1)', padding: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '24px', textAlign: 'center', color: textColor }}>练习完成！</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '24px' }}>
            <div style={{ textAlign: 'center', padding: '20px', backgroundColor: statsCardBgColor, borderRadius: '8px' }}>
              <div style={{ fontSize: '36px', fontWeight: 700, color: '#409eff', marginBottom: '8px' }}>{correctCount}</div>
              <div style={{ fontSize: '14px', color: secondaryTextColor }}>正确</div>
            </div>
            <div style={{ textAlign: 'center', padding: '20px', backgroundColor: statsCardBgColor, borderRadius: '8px' }}>
              <div style={{ fontSize: '36px', fontWeight: 700, color: '#f56c6c', marginBottom: '8px' }}>{wrongCount}</div>
              <div style={{ fontSize: '14px', color: secondaryTextColor }}>错误</div>
            </div>
            <div style={{ textAlign: 'center', padding: '20px', backgroundColor: statsCardBgColor, borderRadius: '8px' }}>
              <div style={{ fontSize: '36px', fontWeight: 700, color: '#e6a23c', marginBottom: '8px' }}>{correctRate}%</div>
              <div style={{ fontSize: '14px', color: secondaryTextColor }}>正确率</div>
            </div>
            <div style={{ textAlign: 'center', padding: '20px', backgroundColor: statsCardBgColor, borderRadius: '8px' }}>
              <div style={{ fontSize: '36px', fontWeight: 700, color: '#67c23a', marginBottom: '8px' }}>{score}</div>
              <div style={{ fontSize: '14px', color: secondaryTextColor }}>总得分</div>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '32px', display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button className="btn btn-outline" onClick={handleReviewMistakes}>查看错题</button>
            <button className="btn btn-primary" onClick={handleRestart}>再次练习</button>
          </div>
        </div>
      </div>
    );
  }

  if (isPaused) {
    return (
      <div style={{ 
        position: 'fixed', 
        top: '70px', 
        left: '0', 
        width: '100%', 
        height: 'calc(100% - 70px)', 
        backgroundColor: pausedOverlayBgColor, 
        backdropFilter: 'blur(12px)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        zIndex: 1000
      }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '18px', color: pausedTextColor }}>按任意键继续练习</p>
        </div>
      </div>
    );
  }

  if (currentMode === 'spelling') {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <div style={{ backgroundColor: cardBgColor, borderRadius: '8px', boxShadow: '0 2px 12px 0 rgba(0, 0, 0, 0.1)', padding: '40px 20px', minHeight: 'calc(100vh - 70px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '20px', left: '20px', right: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '20px', borderBottom: `1px solid ${borderColor}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontSize: '16px', color: secondaryTextColor }}>进度: {currentWordIndex + 1}/{wordList.length}</span>
              <div style={{ width: '200px', height: '8px', backgroundColor: optionBgColor, borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ height: '100%', backgroundColor: '#409eff', transition: 'width 0.3s ease', width: `${progress}%` }}></div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '18px', fontWeight: 600, color: '#67c23a' }}>
              <svg width="18" height="18"><use href="/assets/icons.svg#icon-star"></use></svg>
              <span style={{ color: textColor }}>得分: {score}</span>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ fontSize: '14px', color: secondaryTextColor, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>拼写单词</div>
            <div 
              style={{ 
                fontSize: '36px', 
                fontWeight: 700, 
                color: textColor, 
                marginBottom: '8px', 
                display: 'flex', 
                gap: '0', 
                justifyContent: 'center', 
                flexWrap: 'wrap',
                cursor: 'pointer'
              }}
              onClick={playWordSound}
            >
              {currentWord.word.split('').map((letter, index) => (
                <span 
                  key={index}
                  style={{
                    display: 'inline-block',
                    padding: '0',
                    transition: 'all 0.2s ease',
                    color: letterStates[index] === 'correct' ? '#67c23a' : 
                           letterStates[index] === 'incorrect' ? '#f56c6c' :
                           letterStates[index] === 'active' ? '#409eff' : textColor,
                    backgroundColor: letterStates[index] === 'correct' ? 'rgba(103, 194, 58, 0.1)' :
                                     letterStates[index] === 'incorrect' ? 'rgba(245, 108, 108, 0.1)' : 'transparent',
                    animation: letterStates[index] === 'incorrect' ? 'shake 0.3s ease' : 'none'
                  }}
                >
                  {letter}
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '8px' }}>
              <button 
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer', 
                  padding: '4px', 
                  borderRadius: '4px', 
                  transition: 'all 0.2s ease',
                  color: '#409eff'
                }}
                onClick={playWordSound}
              >
                <svg width="20" height="20"><use href="/assets/icons.svg#icon-speaker"></use></svg>
              </button>
              <span style={{ fontSize: '18px', color: secondaryTextColor }}>{currentWord.phonetic}</span>
            </div>
            <div style={{ fontSize: '18px', color: tertiaryTextColor, marginTop: '12px', fontWeight: 500 }}>
              {currentWord.meaning}
            </div>
          </div>

          {showFeedback && (
            <div style={{ 
              textAlign: 'center', 
              padding: '20px', 
              borderRadius: '8px', 
              marginBottom: '24px',
              backgroundColor: feedbackType === 'success' ? successBgColor : errorBgColor,
              color: feedbackType === 'success' ? successTextColor : errorTextColor
            }}>
              <div style={{ fontSize: '18px', fontWeight: 600 }}>{feedbackText}</div>
            </div>
          )}

          <style>{`
            @keyframes shake {
              0%, 100% { transform: translateX(0); }
              25% { transform: translateX(-4px); }
              75% { transform: translateX(4px); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  const options = generateOptions();

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <div style={{ backgroundColor: cardBgColor, borderRadius: '8px', boxShadow: '0 2px 12px 0 rgba(0, 0, 0, 0.1)', padding: '40px 20px', minHeight: 'calc(100vh - 70px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '20px', left: '20px', right: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '20px', borderBottom: `1px solid ${borderColor}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '16px', color: secondaryTextColor }}>进度: {currentWordIndex + 1}/{wordList.length}</span>
            <div style={{ width: '200px', height: '8px', backgroundColor: optionBgColor, borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ height: '100%', backgroundColor: '#409eff', transition: 'width 0.3s ease', width: `${progress}%` }}></div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '18px', fontWeight: 600, color: '#67c23a' }}>
            <svg width="18" height="18"><use href="/assets/icons.svg#icon-star"></use></svg>
            <span style={{ color: textColor }}>得分: {score}</span>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '14px', color: secondaryTextColor, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>选择正确的释义</div>
          <div style={{ fontSize: '36px', fontWeight: 700, color: textColor, marginBottom: '8px' }}>
            {currentWord.word}
          </div>
          <div style={{ fontSize: '18px', color: secondaryTextColor }}>{currentWord.phonetic}</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '24px', width: '100%' }}>
          {options.map((option) => (
            <button
              key={option.id}
              style={{
                padding: '16px 24px',
                fontSize: '16px',
                backgroundColor: optionBgColor,
                border: '2px solid transparent',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textAlign: 'left',
                color: textColor,
                ...(selectedOption?.id === option.id ? {
                  borderColor: optionSelectedBorderColor,
                  backgroundColor: optionSelectedBgColor
                } : {}),
                ...(showFeedback && option.isCorrect ? {
                  borderColor: '#67c23a',
                  backgroundColor: successBgColor
                } : {}),
                ...(showFeedback && selectedOption?.id === option.id && !option.isCorrect ? {
                  borderColor: '#f56c6c',
                  backgroundColor: errorBgColor
                } : {})
              }}
              onClick={() => handleOptionSelect(option)}
            >
              {option.text}
            </button>
          ))}
        </div>

        {showFeedback && (
          <div style={{ 
            textAlign: 'center', 
            padding: '20px', 
            borderRadius: '8px', 
            marginBottom: '24px',
            backgroundColor: feedbackType === 'success' ? successBgColor : errorBgColor,
            color: feedbackType === 'success' ? successTextColor : errorTextColor
          }}>
            <div style={{ fontSize: '18px', fontWeight: 600 }}>{feedbackText}</div>
          </div>
        )}

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <button 
            className="btn btn-outline"
            onClick={() => nextWord()}
          >
            跳过
          </button>
          <button 
            className="btn btn-primary"
            onClick={handleCheckMeaning}
            disabled={!selectedOption}
            style={{ opacity: !selectedOption ? 0.5 : 1, cursor: !selectedOption ? 'not-allowed' : 'pointer' }}
          >
            确认选择
          </button>
        </div>
      </div>
    </div>
  );
};

export default WordPractice;
