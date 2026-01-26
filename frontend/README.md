# Word King Frontend

## 项目概述
Word King 前端项目，使用 React + TypeScript + Vite 开发。

## 技术栈
- React 18.2.0
- TypeScript
- Vite 4.5.14
- Element Plus (UI组件库)
- Axios (HTTP客户端)

## 环境要求
- Node.js 16+ 
- npm 或 yarn

## 初始化项目

### 1. 克隆项目
```bash
git clone <repository-url>
cd word-king/frontend
```

### 2. 安装依赖
```bash
npm install
```

或者使用 yarn:
```bash
yarn install
```

## 编译项目

### 开发模式编译
```bash
npm run dev
```

### 生产模式编译
```bash
npm run build
```

### 预览生产构建
```bash
npm run serve
```

## 启动项目

### 开发服务器启动
```bash
npm run dev
```

服务器将在以下地址可用：
- 本地访问：http://localhost:3000
- 网络访问：http://[your-ip]:3000

### 环境变量
项目配置了API代理，将 `/api` 请求代理到后端服务（默认为 http://localhost:8080）。

## 项目结构
```
src/
├── api/          # API请求定义
├── assets/       # 静态资源
├── components/   # 组件
│   ├── business/ # 业务组件
│   └── common/   # 通用组件
├── hooks/        # 自定义React Hooks
├── pages/        # 页面组件
├── store/        # 状态管理 (Zustand)
├── styles/       # 样式文件
├── types/        # TypeScript类型定义
└── utils/        # 工具函数
```

## 常见问题

### 端口被占用
如果3000端口被占用，Vite会自动尝试使用下一个可用端口（3001, 3002等）。

### 依赖安装失败
如果遇到依赖安装问题，可尝试：
```bash
npm install --registry https://registry.npmmirror.com
```

### API请求问题
确保后端服务在 http://localhost:8080 运行，或者修改 `vite.config.ts` 中的代理配置。