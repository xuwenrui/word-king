import React from 'react';
import { ElCard, ElButton, ElRow, ElCol } from 'element-plus';

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
    <div className="wk-container">
      <ElCard>
        <h1>{article.title}</h1>
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
          <ElButton type="primary">收藏文章</ElButton>
          <ElButton type="success" style={{ marginLeft: '10px' }}>练习相关词汇</ElButton>
          <ElButton type="info" style={{ marginLeft: '10px' }}>分享文章</ElButton>
        </div>
      </ElCard>
      
      <ElCard style={{ marginTop: '20px' }}>
        <h3>文章相关词汇</h3>
        <ElRow gutter={10}>
          <ElCol span={4}>
            <div className="word-highlight">revolutionized</div>
          </ElCol>
          <ElCol span={4}>
            <div className="word-highlight">integration</div>
          </ElCol>
          <ElCol span={4}>
            <div className="word-highlight">personalized</div>
          </ElCol>
          <ElCol span={4}>
            <div className="word-highlight">accessibility</div>
          </ElCol>
          <ElCol span={4}>
            <div className="word-highlight">challenges</div>
          </ElCol>
          <ElCol span={4}>
            <div className="word-highlight">integration</div>
          </ElCol>
        </ElRow>
      </ElCard>
    </div>
  );
};

export default ArticleReading;