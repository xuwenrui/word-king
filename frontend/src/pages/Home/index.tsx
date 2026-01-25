import React from 'react';
import { ElCard, ElRow, ElCol, ElButton } from 'element-plus';

const Home: React.FC = () => {
  return (
    <div className="wk-container">
      <ElRow gutter={20}>
        <ElCol span={24}>
          <h1>Word King - 英语学习平台</h1>
        </ElCol>
      </ElRow>
      
      <ElRow gutter={20} style={{ marginTop: '20px' }}>
        <ElCol span={6}>
          <ElCard className="dashboard-card">
            <div className="card-content">
              <h3>词汇练习</h3>
              <p>提升词汇量，巩固记忆</p>
              <ElButton type="primary" style={{ marginTop: '10px' }}>
                开始练习
              </ElButton>
            </div>
          </ElCard>
        </ElCol>
        
        <ElCol span={6}>
          <ElCard className="dashboard-card">
            <div className="card-content">
              <h3>词汇管理</h3>
              <p>添加、编辑、删除词汇</p>
              <ElButton type="success" style={{ marginTop: '10px' }}>
                管理词汇
              </ElButton>
            </div>
          </ElCard>
        </ElCol>
        
        <ElCol span={6}>
          <ElCard className="dashboard-card">
            <div className="card-content">
              <h3>文章管理</h3>
              <p>管理学习文章内容</p>
              <ElButton type="warning" style={{ marginTop: '10px' }}>
                管理文章
              </ElButton>
            </div>
          </ElCard>
        </ElCol>
        
        <ElCol span={6}>
          <ElCard className="dashboard-card">
            <div className="card-content">
              <h3>文章阅读</h3>
              <p>阅读文章，学习新词汇</p>
              <ElButton type="info" style={{ marginTop: '10px' }}>
                开始阅读
              </ElButton>
            </div>
          </ElCard>
        </ElCol>
      </ElRow>
      
      <ElRow gutter={20} style={{ marginTop: '20px' }}>
        <ElCol span={24}>
          <ElCard>
            <h3>学习统计</h3>
            <div className="stats-container">
              <div className="stat-item">
                <h4>已学习词汇</h4>
                <p className="stat-number">128</p>
              </div>
              <div className="stat-item">
                <h4>练习次数</h4>
                <p className="stat-number">24</p>
              </div>
              <div className="stat-item">
                <h4>文章阅读数</h4>
                <p className="stat-number">15</p>
              </div>
              <div className="stat-item">
                <h4>正确率</h4>
                <p className="stat-number">86%</p>
              </div>
            </div>
          </ElCard>
        </ElCol>
      </ElRow>
    </div>
  );
};

export default Home;