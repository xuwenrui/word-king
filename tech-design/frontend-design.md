# Word King 前端技术设计文档

## 1. 技术栈

- **框架**: React 18+
- **UI 组件库**: Element Plus
- **构建工具**: Vite
- **语言**: TypeScript
- **样式**: CSS Modules / SCSS
- **状态管理**: React Hooks / Zustand
- **路由**: React Router v6

## 2. 项目结构

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/         # 通用组件
│   │   ├── common/         # 通用基础组件
│   │   └── business/       # 业务组件
│   ├── pages/              # 页面组件
│   │   ├── Home/
│   │   ├── WordPractice/
│   │   ├── WordManagement/
│   │   ├── ArticleManagement/
│   │   └── ArticleReading/
│   ├── api/                # API 接口封装
│   ├── hooks/              # 自定义 Hooks
│   ├── utils/              # 工具函数
│   ├── store/              # 状态管理 (Zustand)
│   ├── types/              # TypeScript 类型定义
│   ├── assets/             # 静态资源
│   ├── styles/             # 全局样式
│   └── App.tsx
├── package.json
└── vite.config.ts
```

## 3. UI 组件设计

### 3.1 主要页面组件

#### 3.1.1 首页 (Home)
- 导航栏 (使用 ElMenu)
- 统计卡片 (使用 ElCard)
- 快捷入口 (使用 ElButton / ElRow / ElCol)

#### 3.1.2 词汇练习页面 (WordPractice)
- 词汇卡片 (使用 ElCard)
- 选择题组件 (使用 ElRadio / ElRadioGroup)
- 填空题组件 (使用 ElInput)
- 进度条 (使用 ElProgress)
- 计时器 (自定义组件)
- 结果展示 (使用 ElResult)

#### 3.1.3 词汇管理页面 (WordManagement)
- 数据表格 (使用 ElTable)
- 搜索栏 (使用 ElInput + ElButton)
- 分页组件 (使用 ElPagination)
- 表单弹窗 (使用 ElDialog + ElForm)
- 批量操作 (使用 ElButton + ElCheckbox)

#### 3.1.4 文章管理页面 (ArticleManagement)
- 数据表格 (使用 ElTable)
- 富文本编辑器 (使用第三方库如 TinyMCE 或自定义组件)
- 文件上传 (使用 ElUpload)
- 分类选择 (使用 ElSelect)

#### 3.1.5 文章阅读页面 (ArticleReading)
- 文章内容展示 (使用 ElCard)
- 词汇高亮显示
- 词汇释义弹窗
- 阅读进度条

### 3.2 通用组件

#### 3.2.1 表单组件
- Input、Select、Radio、Checkbox、DatePicker 等 Element Plus 基础组件
- 封装的复合表单组件

#### 3.2.2 数据展示组件
- Table、Card、Tag、Badge 等

#### 3.2.3 反馈组件
- Message、MessageBox、Notification 等

## 4. 状态管理设计

### 4.1 全局状态
- 用户信息
- 权限信息
- 应用配置

### 4.2 业务状态
- 词汇练习状态 (当前题目、进度、答案等)
- 词汇管理状态 (当前编辑项、筛选条件等)
- 文章管理状态

### 4.3 Zustand Store 结构
```typescript
interface Store {
  // 用户相关
  user: User | null
  login: (user: User) => void
  logout: () => void
  
  // 词汇练习相关
  wordPractice: WordPracticeState
  startPractice: (words: Word[]) => void
  submitAnswer: (answer: Answer) => void
  nextQuestion: () => void
  
  // 词汇管理相关
  wordManagement: WordManagementState
  fetchWords: () => Promise<Word[]>
  updateWord: (word: Word) => Promise<void>
  
  // 文章相关
  articleManagement: ArticleManagementState
  fetchArticles: () => Promise<Article[]>
  updateArticle: (article: Article) => Promise<void>
}
```

## 5. API 接口设计

### 5.1 接口规范
- 使用 RESTful API 风格
- 统一的响应格式
- 统一的错误处理

### 5.2 API 接口示例
```typescript
// 词汇相关
GET /api/words                    // 获取词汇列表
POST /api/words                   // 创建词汇
PUT /api/words/:id                // 更新词汇
DELETE /api/words/:id             // 删除词汇
GET /api/words/practice           // 获取练习用词汇

// 文章相关
GET /api/articles                 // 获取文章列表
POST /api/articles                // 创建文章
PUT /api/articles/:id             // 更新文章
DELETE /api/articles/:id          // 删除文章
GET /api/articles/:id             // 获取文章详情

// 练习相关
POST /api/practice/sessions       // 开始练习会话
POST /api/practice/answers        // 提交答案
GET /api/practice/results/:id     // 获取练习结果
```

## 6. 路由设计

```typescript
interface Route {
  path: string
  component: React.Component
  name: string
  meta: {
    title: string
    requiresAuth: boolean
  }
}

// 主要路由
[
  { path: '/', component: Home, name: 'Home', meta: { title: '首页' } },
  { path: '/word-practice', component: WordPractice, name: 'WordPractice', meta: { title: '词汇练习' } },
  { path: '/word-management', component: WordManagement, name: 'WordManagement', meta: { title: '词汇管理' } },
  { path: '/article-management', component: ArticleManagement, name: 'ArticleManagement', meta: { title: '文章管理' } },
  { path: '/article-reading/:id', component: ArticleReading, name: 'ArticleReading', meta: { title: '文章阅读' } }
]
```

## 7. 样式规范

### 7.1 CSS 命名规范
- 使用 BEM 命名方法
- 统一前缀: `wk-`

### 7.2 主题色
- 主色: #409EFF (蓝色)
- 辅助色: #67C23A (绿色), #E6A23C (橙色), #F56C6C (红色)

## 8. 性能优化

### 8.1 组件优化
- 使用 React.memo 避免不必要的重渲染
- 使用 useMemo 和 useCallback 优化计算和函数创建
- 实现虚拟滚动处理大量数据

### 8.2 资源优化
- 图片懒加载
- 组件代码分割
- 资源压缩

## 9. 安全性

### 9.1 XSS 防护
- 对用户输入进行转义
- 使用安全的 HTML 渲染方式

### 9.2 认证授权
- JWT Token 认证
- 路由权限控制