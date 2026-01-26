# Word King 技术设计文档汇总

## 1. 项目概述

Word King 是一个词汇学习管理平台，包括词汇练习、词汇管理、文章管理、文章阅读等功能模块。项目采用前后端分离架构，前端使用 React + Element Plus，后端使用 Java 21 + Spring Boot + MyBatis Plus + DB2。

根据最新需求变更，项目进行了以下调整：
- 文章阅读页面移除了头部标题、阅读进度显示和分享功能
- 单词管理页面增加了智能单词/短语识别功能，将原有的分类和难度字段合并为统一的标签系统

## 2. 技术栈

### 2.1 前端技术栈
- **框架**: React 18+
- **UI 组件库**: Element Plus
- **构建工具**: Vite
- **语言**: TypeScript
- **样式**: CSS Modules / SCSS
- **状态管理**: React Hooks / Zustand
- **路由**: React Router v6

### 2.2 后端技术栈
- **编程语言**: Java 21
- **框架**: Spring Boot 3.x
- **持久层框架**: MyBatis-Plus 3.x
- **数据库**: IBM DB2
- **构建工具**: Maven
- **注解库**: Lombok
- **日志框架**: Logback
- **API 文档**: Swagger/OpenAPI
- **安全框架**: Spring Security

## 3. 包名与命名规范

### 3.1 后端包名
- **根包名**: `com.hotpot.wordking`
- **子包结构**:
  - `com.hotpot.wordking.config` - 配置类
  - `com.hotpot.wordking.controller` - 控制层
  - `com.hotpot.wordking.service` - 业务逻辑层
  - `com.hotpot.wordking.mapper` - 数据访问层
  - `com.hotpot.wordking.entity` - 实体类
  - `com.hotpot.wordking.dto` - 数据传输对象
  - `com.hotpot.wordking.vo` - 视图对象
  - `com.hotpot.wordking.exception` - 异常处理

### 3.2 前端命名空间
- **项目命名空间**: `hotpot-wordking`
- **组件命名前缀**: `HotpotWordking`
- **CSS 类名前缀**: `hwk-`

## 4. 项目结构

### 4.1 后端项目结构
```
src/
└── main/
    ├── java/
    │   └── com/
    │       └── hotpot/
    │           └── wordking/
    │               ├── WordKingApplication.java
    │               ├── config/
    │               ├── controller/
    │               ├── service/
    │               ├── mapper/
    │               ├── entity/
    │               ├── dto/
    │               ├── vo/
    │               └── exception/
    └── resources/
        ├── application.yml
        ├── mapper/
        └── logback-spring.xml
```

### 4.2 前端项目结构
```
src/
├── components/         # 通用组件
├── pages/              # 页面组件
├── api/                # API 接口封装
├── hooks/              # 自定义 Hooks
├── utils/              # 工具函数
├── store/              # 状态管理 (Zustand)
├── types/              # TypeScript 类型定义
├── assets/             # 静态资源
└── styles/             # 全局样式
```

## 5. 主要功能模块

### 5.1 词汇练习模块
- 提供多种练习模式（选择题、填空题等）
- 练习进度跟踪和结果统计
- 个性化难度设置

### 5.2 词汇管理模块
- **新增**: 智能单词/短语识别功能（根据输入内容自动判断是否包含空格）
- **更新**: 统一标签系统（替代原有的分类和难度字段）
- 词汇的增删改查
- 批量导入/导出

### 5.3 文章管理模块
- 文章的创建和编辑
- 富文本编辑功能
- 分类和标签管理

### 5.4 文章阅读模块
- 文章内容展示
- 词汇高亮和释义
- **移除**: 阅读进度显示和分享功能

## 6. 数据库设计

### 6.1 核心表结构
- **用户表 (T_USER)**: 存储用户信息
- **词汇表 (T_WORD)**: 存储词汇信息，包含标签字段（替代原有的分类和难度字段）
- **文章表 (T_ARTICLE)**: 存储文章信息
- **练习会话表 (T_PRACTICE_SESSION)**: 记录练习会话
- **练习记录表 (T_PRACTICE_RECORD)**: 记录练习详情

### 6.2 字段变更
- **T_WORD 表**: 新增 `TYPE` 字段标识单词/短语类型，`TAGS` 字段存储逗号分隔的标签列表

### 6.3 索引设计
- 为常用查询字段创建索引
- 考虑查询性能和写入性能的平衡

## 7. API 接口变更

### 7.1 词汇管理接口
- **更新**: `/api/words` 接口支持标签筛选
- **新增**: 词汇类型（单词/短语）自动识别逻辑

### 7.2 文章阅读接口
- **移除**: 与阅读进度和分享相关的接口

## 8. API 接口设计

### 8.1 词汇管理接口
| 方法 | 路径 | 模块/文件 | 类型 | 功能描述 | 请求体 (JSON) | 成功响应 (200 OK) |
|------|------|-----------|------|----------|---------------|-------------------|
| GET | /api/words | WordController | 查询 | 获取词汇列表（支持分页、搜索、标签筛选） | N/A | `{"code": 200, "data": {"records": [{"id": 1, "english": "apple", "type": "word", "phonetic": "/ˈæpl/", "chinese": "苹果", "example": "I eat an apple every day.", "tags": ["noun", "basic"], "createdAt": "2024-01-01T00:00:00"}], "total": 100, "size": 10, "current": 1}}` |
| POST | /api/words | WordController | 新增 | 添加新词汇（自动识别单词/短语类型） | `{"english": "apple", "phonetic": "/ˈæpl/", "chinese": "苹果", "example": "I eat an apple every day.", "tags": ["noun", "basic"]}` | `{"code": 200, "data": {"id": 1, "english": "apple", "type": "word", "phonetic": "/ˈæpl/", "chinese": "苹果", "example": "I eat an apple every day.", "tags": ["noun", "basic"], "createdAt": "2024-01-01T00:00:00"}}` |
| PUT | /api/words/{id} | WordController | 更新 | 更新词汇信息 | `{"english": "apple", "phonetic": "/ˈæpl/", "chinese": "苹果", "example": "I eat an apple every day.", "tags": ["noun", "basic"]}` | `{"code": 200, "data": {"id": 1, "english": "apple", "type": "word", "phonetic": "/ˈæpl/", "chinese": "苹果", "example": "I eat an apple every day.", "tags": ["noun", "basic"], "createdAt": "2024-01-01T00:00:00"}}` |
| DELETE | /api/words/{id} | WordController | 删除 | 删除词汇 | N/A | `{"code": 200, "data": null}` |
| GET | /api/words/tags | WordController | 查询 | 获取所有可用标签 | N/A | `{"code": 200, "data": ["noun", "verb", "adjective", "adverb", "phrase", "basic", "intermediate", "advanced"]}` |

### 8.2 文章管理接口
| 方法 | 路径 | 模块/文件 | 类型 | 功能描述 | 请求体 (JSON) | 成功响应 (200 OK) |
|------|------|-----------|------|----------|---------------|-------------------|
| GET | /api/articles | ArticleController | 查询 | 获取文章列表（支持分页、搜索） | N/A | `{"code": 200, "data": {"records": [{"id": 1, "title": "My First Article", "content": "This is my first article.", "tags": ["beginner", "daily"], "createdAt": "2024-01-01T00:00:00"}], "total": 50, "size": 10, "current": 1}}` |
| GET | /api/articles/{id} | ArticleController | 查询 | 获取文章详情 | N/A | `{"code": 200, "data": {"id": 1, "title": "My First Article", "content": "This is my first article.", "tags": ["beginner", "daily"], "createdAt": "2024-01-01T00:00:00"}}` |
| POST | /api/articles | ArticleController | 新增 | 添加新文章 | `{"title": "My First Article", "content": "This is my first article.", "tags": ["beginner", "daily"]}` | `{"code": 200, "data": {"id": 1, "title": "My First Article", "content": "This is my first article.", "tags": ["beginner", "daily"], "createdAt": "2024-01-01T00:00:00"}}` |
| PUT | /api/articles/{id} | ArticleController | 更新 | 更新文章信息 | `{"title": "My Updated Article", "content": "This is my updated article.", "tags": ["beginner", "daily"]}` | `{"code": 200, "data": {"id": 1, "title": "My Updated Article", "content": "This is my updated article.", "tags": ["beginner", "daily"], "createdAt": "2024-01-01T00:00:00"}}` |
| DELETE | /api/articles/{id} | ArticleController | 删除 | 删除文章 | N/A | `{"code": 200, "data": null}` |

### 8.3 练习管理接口
| 方法 | 路径 | 模块/文件 | 类型 | 功能描述 | 请求体 (JSON) | 成功响应 (200 OK) |
|------|------|-----------|------|----------|---------------|-------------------|
| POST | /api/practice/sessions | PracticeController | 新增 | 创建练习会话 | `{"wordCount": 10, "tags": ["basic"]}` | `{"code": 200, "data": {"id": 1, "wordCount": 10, "tags": ["basic"], "startedAt": "2024-01-01T00:00:00"}}` |
| GET | /api/practice/sessions | PracticeController | 查询 | 获取练习会话列表 | N/A | `{"code": 200, "data": {"records": [{"id": 1, "wordCount": 10, "correctCount": 8, "startedAt": "2024-01-01T00:00:00", "endedAt": "2024-01-01T00:10:00"}], "total": 20, "size": 10, "current": 1}}` |
| POST | /api/practice/records | PracticeController | 新增 | 添加练习记录 | `{"sessionId": 1, "wordId": 1, "isCorrect": true, "attempts": 1}` | `{"code": 200, "data": {"id": 1, "sessionId": 1, "wordId": 1, "isCorrect": true, "attempts": 1, "createdAt": "2024-01-01T00:00:00"}}` |
| GET | /api/practice/stats | PracticeController | 查询 | 获取练习统计数据 | N/A | `{"code": 200, "data": {"totalSessions": 20, "totalWords": 200, "correctRate": 0.8, "recentSessions": [...]}}` |

### 8.4 用户认证接口
| 方法 | 路径 | 模块/文件 | 类型 | 功能描述 | 请求体 (JSON) | 成功响应 (200 OK) |
|------|------|-----------|------|----------|---------------|-------------------|
| POST | /api/auth/login | AuthController | 新增 | 用户登录 | `{"username": "admin", "password": "password"}` | `{"code": 200, "data": {"token": "jwt-token", "user": {"id": 1, "username": "admin", "roles": ["admin"]}}}` |
| POST | /api/auth/register | AuthController | 新增 | 用户注册 | `{"username": "newuser", "password": "password", "email": "user@example.com"}` | `{"code": 200, "data": {"id": 2, "username": "newuser", "email": "user@example.com"}}` |
| GET | /api/users/me | UserController | 查询 | 获取当前用户信息 | N/A | `{"code": 200, "data": {"id": 1, "username": "admin", "email": "admin@example.com", "roles": ["admin"]}}` |

## 9. 安全性设计

### 9.1 身份认证
- 使用 JWT Token 进行身份认证
- 无状态会话管理

### 9.2 权限控制
- 基于角色的访问控制 (RBAC)
- 接口级别的权限验证

### 9.3 数据安全
- 参数验证和清理
- 防止 SQL 注入和 XSS 攻击

## 10. 性能优化

### 10.1 前端优化
- 组件懒加载和代码分割
- 图片懒加载
- 使用 React.memo 避免不必要的渲染

### 10.2 后端优化
- 数据库查询优化和索引设计
- 缓存策略（Redis）
- 分页查询避免大数据量加载

## 11. 日志管理

### 11.1 后端日志
- 使用 Logback 作为日志框架
- 按环境区分日志级别和输出方式
- 分离业务日志和错误日志

### 11.2 前端日志
- 统一日志记录接口
- 错误收集和上报机制

## 12. 部署配置

### 12.1 后端部署
- 使用 Spring Boot 的打包机制
- 支持 Docker 容器化部署
- 环境变量配置管理

### 12.2 前端部署
- Vite 构建优化
- 静态资源托管
- CDN 加速配置