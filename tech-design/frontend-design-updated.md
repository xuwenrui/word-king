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

## 4. 命名空间与代码组织

### 4.1 项目命名空间
前端项目采用 `hotpot-wordking` 作为命名空间前缀，用于组件、CSS 类名、工具函数等的命名规范。

### 4.2 组件命名规范
- 页面组件：以 `HotpotWordking` 为前缀，如 `HotpotWordkingWordPractice`
- 通用组件：以 `Hotpot` 为前缀，如 `HotpotDataTable`
- 业务组件：以具体业务为前缀，如 `WordPracticeCard`

## 5. 状态管理设计

### 5.1 全局状态
- 用户信息
- 权限信息
- 应用配置

### 5.2 业务状态
- 词汇练习状态 (当前题目、进度、答案等)
- 词汇管理状态 (当前编辑项、筛选条件等)
- 文章管理状态

### 5.3 Zustand Store 结构
状态管理使用 Zustand 实现，包含用户信息、词汇练习状态、词汇管理状态、文章管理状态等模块。

## 6. API 接口设计

### 6.1 接口规范
- 使用 RESTful API 风格
- 统一的响应格式
- 统一的错误处理

### 6.2 API 接口示例
- 词汇相关接口：获取词汇列表、创建、更新、删除词汇、获取练习用词汇
- 文章相关接口：获取文章列表、创建、更新、删除文章、获取文章详情
- 练习相关接口：开始练习会话、提交答案、获取练习结果

## 7. 路由设计

定义主要路由包括首页、词汇练习、词汇管理、文章管理、文章阅读等页面，配置路由元信息如页面标题、权限要求等。

## 8. 样式规范

### 8.1 CSS 命名规范
- 使用 BEM 命名方法
- 统一前缀: `hwk-` (Hotpot Word King 的缩写)

### 8.2 主题色
- 主色: #409EFF (蓝色)
- 辅助色: #67C23A (绿色), #E6A23C (橙色), #F56C6C (红色)

## 9. 性能优化

### 9.1 组件优化
- 使用 React.memo 避免不必要的重渲染
- 使用 useMemo 和 useCallback 优化计算和函数创建
- 实现虚拟滚动处理大量数据

### 9.2 资源优化
- 图片懒加载
- 组件代码分割
- 资源压缩

## 10. 安全性

### 10.1 XSS 防护
- 对用户输入进行转义
- 使用安全的 HTML 渲染方式

### 10.2 认证授权
- JWT Token 认证
- 路由权限控制