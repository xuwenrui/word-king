import React from 'react';

const ArticleReading: React.FC = () => {
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

  return (
    <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <div className="card" style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 12px 0 rgba(0, 0, 0, 0.1)', padding: '24px', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '16px' }}>{article.title}</h1>
        <div style={{ color: '#909399', marginBottom: '20px' }}>
          作者: {article.author} | 发布时间: {article.createdTime}
        </div>
        
        <div className="article-content">
          {article.content.split('\n\n').map((paragraph, index) => (
            <p key={index} style={{ marginBottom: '15px', lineHeight: '1.8' }}>
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
      
      <div className="card" style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 12px 0 rgba(0, 0, 0, 0.1)', padding: '24px' }}>
        <h3 style={{ marginBottom: '16px' }}>文章相关词汇</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '10px' }}>
          <div className="word-highlight" style={{ padding: '8px 12px', backgroundColor: '#f5f7fa', borderRadius: '4px', textAlign: 'center' }}>revolutionized</div>
          <div className="word-highlight" style={{ padding: '8px 12px', backgroundColor: '#f5f7fa', borderRadius: '4px', textAlign: 'center' }}>integration</div>
          <div className="word-highlight" style={{ padding: '8px 12px', backgroundColor: '#f5f7fa', borderRadius: '4px', textAlign: 'center' }}>personalized</div>
          <div className="word-highlight" style={{ padding: '8px 12px', backgroundColor: '#f5f7fa', borderRadius: '4px', textAlign: 'center' }}>accessibility</div>
          <div className="word-highlight" style={{ padding: '8px 12px', backgroundColor: '#f5f7fa', borderRadius: '4px', textAlign: 'center' }}>challenges</div>
          <div className="word-highlight" style={{ padding: '8px 12px', backgroundColor: '#f5f7fa', borderRadius: '4px', textAlign: 'center' }}>integration</div>
        </div>
      </div>
    </div>
  );
};

export default ArticleReading;