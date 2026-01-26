import React from 'react';

interface ArticleReadingProps {
  isDarkTheme: boolean;
}

const ArticleReading: React.FC<ArticleReadingProps> = ({ isDarkTheme }) => {
  // 示例文章数据
  const article = {
    id: 1,
    title: 'The Impact of Technology on Modern Education',
    author: 'John Doe',
    content: `Technology has revolutionized the way we approach education. In the past, learning was confined to physical classrooms with limited resources. Today, students have access to vast digital libraries, interactive learning tools, and global communication platforms that enhance their educational experience.

The integration of technology in education has enabled personalized learning paths. Students can now learn at their own pace, with adaptive software that adjusts difficulty levels based on their performance. This individualized approach helps address different learning styles and capabilities, ensuring that each student receives the support they need to succeed.

Furthermore, technology has made education more accessible. Online courses and virtual classrooms have removed geographical barriers, allowing students from remote areas to access quality education. This has been particularly significant during the pandemic, where remote learning became the norm and highlighted the importance of digital infrastructure in education.

However, with these advancements come challenges. The digital divide remains a significant issue, with not all students having equal access to technology. Additionally, educators need to be trained to effectively use technology in their teaching methods to maximize its potential benefits.

Looking forward, the future of education will likely see an even greater integration of technology, with artificial intelligence, virtual reality, and other emerging technologies playing a more prominent role in how we teach and learn.`,
    createdTime: '2023-01-10 15:30:00'
  };

  // 根据主题设置颜色
  const cardBgColor = isDarkTheme ? '#1a1a1a' : '#fff';
  const textColor = isDarkTheme ? '#e0e0e0' : '#303133';
  const secondaryTextColor = isDarkTheme ? '#909399' : '#909399';
  const wordHighlightBgColor = isDarkTheme ? '#2c2c2c' : '#f5f7fa';
  const wordHighlightTextColor = isDarkTheme ? '#e0e0e0' : '#303133';

  return (
    <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', color: textColor }}>
      <div className="card" style={{ backgroundColor: cardBgColor, borderRadius: '8px', boxShadow: '0 2px 12px 0 rgba(0, 0, 0, 0.1)', padding: '24px', marginBottom: '20px', color: textColor }}>
        <h1 style={{ fontSize: '28px', marginBottom: '16px', color: textColor }}>{article.title}</h1>
        <div style={{ color: secondaryTextColor, marginBottom: '20px' }}>
          作者: {article.author} | 发布时间: {article.createdTime}
        </div>
        
        <div className="article-content">
          {article.content.split('\n\n').map((paragraph, index) => (
            <p key={index} style={{ marginBottom: '15px', lineHeight: '1.8', color: textColor }}>
              {paragraph}
            </p>
          ))}
        </div>
        
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <button className="btn btn-primary" style={{ marginRight: '10px' }}>收藏文章</button>
          <button className="btn btn-success" style={{ marginRight: '10px' }}>练习相关词汇</button>
          <button className="btn btn-info">分享文章</button>
        </div>
      </div>
    </div>
  );
};

export default ArticleReading;