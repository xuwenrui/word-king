import React from 'react';
import { ElCard, ElButton, ElTable, ElTableColumn, ElInput, ElPagination, ElTag } from 'element-plus';

interface Article {
  id: number;
  title: string;
  summary: string;
  author: string;
  status: number;
  categoryId: number;
  createdTime: string;
  updatedTime: string;
}

const ArticleManagement: React.FC = () => {
  // 示例文章数据
  const articles: Article[] = [
    {
      id: 1,
      title: 'The Impact of Technology on Modern Education',
      summary: 'This article explores how technology has transformed the educational landscape...',
      author: 'John Doe',
      status: 1,
      categoryId: 1,
      createdTime: '2023-01-10 15:30:00',
      updatedTime: '2023-01-10 15:30:00'
    },
    {
      id: 2,
      title: 'Sustainable Living: Small Changes, Big Impact',
      summary: 'Discover how small lifestyle changes can lead to a more sustainable future...',
      author: 'Jane Smith',
      status: 1,
      categoryId: 2,
      createdTime: '2023-01-12 11:20:00',
      updatedTime: '2023-01-12 11:20:00'
    },
    {
      id: 3,
      title: 'The Psychology of Learning a New Language',
      summary: 'Understanding the mental processes involved in language acquisition...',
      author: 'Robert Johnson',
      status: 1,
      categoryId: 3,
      createdTime: '2023-01-14 09:45:00',
      updatedTime: '2023-01-14 09:45:00'
    }
  ];

  return (
    <div className="wk-container">
      <ElCard>
        <div slot="header" className="clearfix">
          <h2 style={{ display: 'inline' }}>文章管理</h2>
          <ElButton type="primary" style={{ float: 'right' }}>添加文章</ElButton>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <ElInput 
            placeholder="搜索文章..." 
            style={{ width: '300px', marginRight: '10px' }} 
          />
          <ElButton type="primary">搜索</ElButton>
        </div>
        
        <ElTable data={articles} style={{ width: '100%' }}>
          <ElTableColumn prop="id" label="ID" width="80" />
          <ElTableColumn prop="title" label="标题" width="200" />
          <ElTableColumn prop="summary" label="摘要" width="300" />
          <ElTableColumn prop="author" label="作者" width="120" />
          <ElTableColumn prop="status" label="状态" width="100">
            <template #default="{ row }">
              <ElTag type={row.status === 1 ? 'success' : 'info'}>
                {row.status === 1 ? '已发布' : '草稿'}
              </ElTag>
            </template>
          </ElTableColumn>
          <ElTableColumn prop="createdTime" label="创建时间" width="150" />
          <ElTableColumn label="操作" width="150">
            <template>
              <ElButton size="small" type="primary">编辑</ElButton>
              <ElButton size="small" type="danger">删除</ElButton>
            </template>
          </ElTableColumn>
        </ElTable>
        
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <ElPagination
            layout="prev, pager, next"
            total={articles.length}
          />
        </div>
      </ElCard>
    </div>
  );
};

export default ArticleManagement;