import React from 'react';
import { ElCard, ElButton, ElTable, ElTableColumn, ElInput, ElPagination } from 'element-plus';

interface Word {
  id: number;
  word: string;
  phonetic: string;
  meaning: string;
  partOfSpeech: string;
  example: string;
  difficulty: number;
  categoryId: number;
  createdTime: string;
  updatedTime: string;
}

const WordManagement: React.FC = () => {
  // 示例词汇数据
  const words: Word[] = [
    {
      id: 1,
      word: 'ubiquitous',
      phonetic: '/juːˈbɪkwɪtəs/',
      meaning: '随处可见的，普遍存在的',
      partOfSpeech: 'adj.',
      example: 'Mobile phones are now ubiquitous in modern society.',
      difficulty: 3,
      categoryId: 1,
      createdTime: '2023-01-15 10:30:00',
      updatedTime: '2023-01-15 10:30:00'
    },
    {
      id: 2,
      word: 'eloquent',
      phonetic: '/ˈeləkwənt/',
      meaning: '雄辩的，有口才的',
      partOfSpeech: 'adj.',
      example: 'She gave an eloquent speech about environmental protection.',
      difficulty: 2,
      categoryId: 1,
      createdTime: '2023-01-16 14:20:00',
      updatedTime: '2023-01-16 14:20:00'
    },
    {
      id: 3,
      word: 'pragmatic',
      phonetic: '/præɡˈmætɪk/',
      meaning: '务实的，实际的',
      partOfSpeech: 'adj.',
      example: 'We need a pragmatic approach to solve this problem.',
      difficulty: 3,
      categoryId: 2,
      createdTime: '2023-01-17 09:15:00',
      updatedTime: '2023-01-17 09:15:00'
    }
  ];

  return (
    <div className="wk-container">
      <ElCard>
        <div slot="header" className="clearfix">
          <h2 style={{ display: 'inline' }}>词汇管理</h2>
          <ElButton type="primary" style={{ float: 'right' }}>添加词汇</ElButton>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <ElInput 
            placeholder="搜索词汇..." 
            style={{ width: '300px', marginRight: '10px' }} 
          />
          <ElButton type="primary">搜索</ElButton>
        </div>
        
        <ElTable data={words} style={{ width: '100%' }}>
          <ElTableColumn prop="id" label="ID" width="80" />
          <ElTableColumn prop="word" label="词汇" width="120" />
          <ElTableColumn prop="phonetic" label="音标" width="150" />
          <ElTableColumn prop="meaning" label="含义" width="200" />
          <ElTableColumn prop="partOfSpeech" label="词性" width="100" />
          <ElTableColumn prop="difficulty" label="难度" width="80" />
          <ElTableColumn prop="example" label="例句" width="300" />
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
            total={words.length}
          />
        </div>
      </ElCard>
    </div>
  );
};

export default WordManagement;