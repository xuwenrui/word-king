# API 接口文档

## 基础信息

- **Base URL**: `http://localhost:8080`
- **Content-Type**: `application/json`
- **字符编码**: `UTF-8`

## 统一响应格式

所有接口返回统一的 JSON 格式：

```json
{
  "code": 200,
  "message": "success",
  "data": {}
}
```

- **code**: 状态码，200 表示成功，其他表示失败
- **message**: 响应消息
- **data**: 响应数据，具体结构根据接口而定

---

## 1. 词汇管理接口

### 1.1 获取词汇列表

**接口地址**: `GET /api/words`

**请求参数** (Query Parameters):

| 参数名 | 类型 | 必填 | 说明 | 默认值 |
|--------|------|------|------|--------|
| page | Integer | 否 | 页码 | 1 |
| size | Integer | 否 | 每页数量 | 10 |
| keyword | String | 否 | 关键词搜索 | - |
| difficulty | Integer | 否 | 难度等级 | - |
| categoryId | Long | 否 | 分类ID | - |

**响应示例**:

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "records": [
      {
        "id": 1,
        "word": "apple",
        "phonetic": "/ˈæpl/",
        "meaning": "苹果",
        "partOfSpeech": "noun",
        "example": "I eat an apple every day.",
        "difficulty": 1,
        "categoryId": 1,
        "createdTime": "2024-01-01T10:00:00",
        "updatedTime": "2024-01-01T10:00:00"
      }
    ],
    "total": 100,
    "size": 10,
    "current": 1,
    "pages": 10
  }
}
```

---

### 1.2 创建词汇

**接口地址**: `POST /api/words`

**请求体** (Request Body):

```json
{
  "word": "banana",
  "phonetic": "/bəˈnɑːnə/",
  "meaning": "香蕉",
  "partOfSpeech": "noun",
  "example": "I like to eat bananas.",
  "difficulty": 1,
  "categoryId": 1
}
```

**字段说明**:

| 字段名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| word | String | 是 | 词汇 |
| phonetic | String | 否 | 音标 |
| meaning | String | 否 | 含义 |
| partOfSpeech | String | 否 | 词性 |
| example | String | 否 | 例句 |
| difficulty | Integer | 否 | 难度等级 |
| categoryId | Long | 否 | 分类ID |

**响应示例**:

```json
{
  "code": 200,
  "message": "创建成功",
  "data": null
}
```

---

### 1.3 更新词汇

**接口地址**: `PUT /api/words/{id}`

**路径参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| id | Long | 是 | 词汇ID |

**请求体** (Request Body):

```json
{
  "word": "apple",
  "phonetic": "/ˈæpl/",
  "meaning": "苹果",
  "partOfSpeech": "noun",
  "example": "I eat an apple every day.",
  "difficulty": 2,
  "categoryId": 1
}
```

**响应示例**:

```json
{
  "code": 200,
  "message": "更新成功",
  "data": null
}
```

---

### 1.4 删除词汇

**接口地址**: `DELETE /api/words/{id}`

**路径参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| id | Long | 是 | 词汇ID |

**响应示例**:

```json
{
  "code": 200,
  "message": "删除成功",
  "data": null
}
```

---

### 1.5 获取练习用词汇

**接口地址**: `GET /api/words/practice`

**请求参数** (Query Parameters):

| 参数名 | 类型 | 必填 | 说明 | 默认值 |
|--------|------|------|------|--------|
| count | Integer | 否 | 词汇数量 | 10 |
| difficulty | Integer | 否 | 难度等级 | - |
| categoryId | Long | 否 | 分类ID | - |

**响应示例**:

```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "id": 1,
      "word": "apple",
      "phonetic": "/ˈæpl/",
      "meaning": "苹果",
      "partOfSpeech": "noun",
      "example": "I eat an apple every day.",
      "difficulty": 1,
      "categoryId": 1,
      "createdTime": "2024-01-01T10:00:00",
      "updatedTime": "2024-01-01T10:00:00"
    }
  ]
}
```

---

### 1.6 获取词汇发音

**接口地址**: `GET /api/words/{id}/pronunciation`

**路径参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| id | Long | 是 | 词汇ID |

**响应示例**:

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "wordId": 1,
    "audioUrl": "/api/words/1/audio",
    "phonetic": "/ˈæpl/"
  }
}
```

---

## 2. 文章管理接口

### 2.1 获取文章列表

**接口地址**: `GET /api/articles`

**请求参数** (Query Parameters):

| 参数名 | 类型 | 必填 | 说明 | 默认值 |
|--------|------|------|------|--------|
| page | Integer | 否 | 页码 | 1 |
| size | Integer | 否 | 每页数量 | 10 |
| keyword | String | 否 | 关键词搜索 | - |
| categoryId | Long | 否 | 分类ID | - |
| author | String | 否 | 作者 | - |
| status | Integer | 否 | 状态 | - |

**响应示例**:

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "records": [
      {
        "id": 1,
        "title": "My First Article",
        "content": "This is my first article.",
        "summary": "Article summary",
        "categoryId": 1,
        "author": "John Doe",
        "status": 1,
        "wordCount": 100,
        "newWordsCount": 5,
        "createdTime": "2024-01-01T10:00:00",
        "updatedTime": "2024-01-01T10:00:00"
      }
    ],
    "total": 50,
    "size": 10,
    "current": 1,
    "pages": 5
  }
}
```

---

### 2.2 创建文章

**接口地址**: `POST /api/articles`

**请求体** (Request Body):

```json
{
  "title": "My Article",
  "content": "This is the article content.",
  "summary": "Article summary",
  "categoryId": 1,
  "author": "John Doe",
  "status": 1
}
```

**字段说明**:

| 字段名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| title | String | 是 | 标题 |
| content | String | 否 | 内容 |
| summary | String | 否 | 摘要 |
| categoryId | Long | 否 | 分类ID |
| author | String | 否 | 作者 |
| status | Integer | 否 | 状态 |

**响应示例**:

```json
{
  "code": 200,
  "message": "创建成功",
  "data": null
}
```

---

### 2.3 更新文章

**接口地址**: `PUT /api/articles/{id}`

**路径参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| id | Long | 是 | 文章ID |

**请求体** (Request Body):

```json
{
  "title": "Updated Article",
  "content": "Updated content.",
  "summary": "Updated summary",
  "categoryId": 1,
  "author": "John Doe",
  "status": 1
}
```

**响应示例**:

```json
{
  "code": 200,
  "message": "更新成功",
  "data": null
}
```

---

### 2.4 删除文章

**接口地址**: `DELETE /api/articles/{id}`

**路径参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| id | Long | 是 | 文章ID |

**响应示例**:

```json
{
  "code": 200,
  "message": "删除成功",
  "data": null
}
```

---

### 2.5 获取文章详情

**接口地址**: `GET /api/articles/{id}`

**路径参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| id | Long | 是 | 文章ID |

**响应示例**:

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": 1,
    "title": "My First Article",
    "content": "This is my first article.",
    "summary": "Article summary",
    "categoryId": 1,
    "author": "John Doe",
    "status": 1,
    "wordCount": 100,
    "newWordsCount": 5,
    "createdTime": "2024-01-01T10:00:00",
    "updatedTime": "2024-01-01T10:00:00"
  }
}
```

---

## 3. 练习管理接口

### 3.1 创建练习会话

**接口地址**: `POST /api/practice/sessions`

**请求体** (Request Body):

```json
{
  "userId": 1,
  "wordIds": [1, 2, 3, 4, 5],
  "practiceMode": "spelling",
  "totalQuestions": 5,
  "correctAnswers": 0,
  "score": 0,
  "startTime": "2024-01-01T10:00:00",
  "endTime": null,
  "status": 1
}
```

**字段说明**:

| 字段名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| userId | Long | 是 | 用户ID |
| wordIds | List<Long> | 否 | 词汇ID列表 |
| practiceMode | String | 否 | 练习模式（spelling/meaning） |
| totalQuestions | Integer | 否 | 总题目数 |
| correctAnswers | Integer | 否 | 正确答案数 |
| score | BigDecimal | 否 | 分数 |
| startTime | LocalDateTime | 否 | 开始时间 |
| endTime | LocalDateTime | 否 | 结束时间 |
| status | Integer | 否 | 状态 |

**响应示例**:

```json
{
  "code": 200,
  "message": "练习会话创建成功",
  "data": {
    "sessionId": 1,
    "userId": 1,
    "wordIds": [1, 2, 3, 4, 5],
    "practiceMode": "spelling",
    "totalQuestions": 5,
    "correctAnswers": 0,
    "score": 0,
    "startTime": "2024-01-01T10:00:00",
    "endTime": null,
    "status": 1
  }
}
```

---

### 3.2 更新练习会话

**接口地址**: `PUT /api/practice/sessions/{id}`

**路径参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| id | Long | 是 | 练习会话ID |

**请求体** (Request Body):

```json
{
  "userId": 1,
  "wordIds": [1, 2, 3, 4, 5],
  "practiceMode": "spelling",
  "totalQuestions": 5,
  "correctAnswers": 4,
  "score": 80,
  "startTime": "2024-01-01T10:00:00",
  "endTime": "2024-01-01T10:10:00",
  "status": 2
}
```

**响应示例**:

```json
{
  "code": 200,
  "message": "练习会话更新成功",
  "data": null
}
```

---

### 3.3 获取练习会话详情

**接口地址**: `GET /api/practice/sessions/{id}`

**路径参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| id | Long | 是 | 练习会话ID |

**响应示例**:

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": 1,
    "userId": 1,
    "wordIds": [1, 2, 3, 4, 5],
    "practiceMode": "spelling",
    "totalQuestions": 5,
    "correctAnswers": 4,
    "score": 80,
    "startTime": "2024-01-01T10:00:00",
    "endTime": "2024-01-01T10:10:00",
    "status": 2,
    "createdTime": "2024-01-01T10:00:00",
    "updatedTime": "2024-01-01T10:10:00"
  }
}
```

---

### 3.4 获取练习会话列表

**接口地址**: `GET /api/practice/sessions`

**请求参数** (Query Parameters):

| 参数名 | 类型 | 必填 | 说明 | 默认值 |
|--------|------|------|------|--------|
| page | Integer | 否 | 页码 | 1 |
| size | Integer | 否 | 每页数量 | 10 |
| userId | Long | 否 | 用户ID | - |
| practiceMode | String | 否 | 练习模式 | - |
| status | Integer | 否 | 状态 | - |

**响应示例**:

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "records": [
      {
        "id": 1,
        "userId": 1,
        "wordIds": [1, 2, 3, 4, 5],
        "practiceMode": "spelling",
        "totalQuestions": 5,
        "correctAnswers": 4,
        "score": 80,
        "startTime": "2024-01-01T10:00:00",
        "endTime": "2024-01-01T10:10:00",
        "status": 2,
        "createdTime": "2024-01-01T10:00:00",
        "updatedTime": "2024-01-01T10:10:00"
      }
    ],
    "total": 20,
    "size": 10,
    "current": 1,
    "pages": 2
  }
}
```

---

### 3.5 记录练习答案

**接口地址**: `POST /api/practice/answers`

**请求体** (Request Body):

```json
{
  "sessionId": 1,
  "userId": 1,
  "wordId": 1,
  "userAnswer": "apple",
  "isCorrect": true,
  "answerTime": 5.2,
  "practiceMode": "spelling"
}
```

**字段说明**:

| 字段名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| sessionId | Long | 是 | 练习会话ID |
| userId | Long | 是 | 用户ID |
| wordId | Long | 是 | 词汇ID |
| userAnswer | String | 是 | 用户答案 |
| isCorrect | Boolean | 是 | 是否正确 |
| answerTime | Double | 否 | 答题时间（秒） |
| practiceMode | String | 否 | 练习模式 |

**响应示例**:

```json
{
  "code": 200,
  "message": "答案记录成功",
  "data": {
    "answerId": 1,
    "sessionId": 1,
    "userId": 1,
    "wordId": 1,
    "userAnswer": "apple",
    "isCorrect": true,
    "answerTime": 5.2,
    "practiceMode": "spelling"
  }
}
```

---

### 3.6 获取练习答案列表

**接口地址**: `GET /api/practice/answers`

**请求参数** (Query Parameters):

| 参数名 | 类型 | 必填 | 说明 | 默认值 |
|--------|------|------|------|--------|
| page | Integer | 否 | 页码 | 1 |
| size | Integer | 否 | 每页数量 | 10 |
| sessionId | Long | 否 | 练习会话ID | - |
| userId | Long | 否 | 用户ID | - |
| isCorrect | Boolean | 否 | 是否正确 | - |

**响应示例**:

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "records": [
      {
        "id": 1,
        "sessionId": 1,
        "userId": 1,
        "wordId": 1,
        "userAnswer": "apple",
        "isCorrect": true,
        "answerTime": 5.2,
        "practiceMode": "spelling",
        "createdTime": "2024-01-01T10:00:00"
      }
    ],
    "total": 5,
    "size": 10,
    "current": 1,
    "pages": 1
  }
}
```

---

### 3.7 获取错题列表

**接口地址**: `GET /api/practice/mistakes`

**请求参数** (Query Parameters):

| 参数名 | 类型 | 必填 | 说明 | 默认值 |
|--------|------|------|------|--------|
| page | Integer | 否 | 页码 | 1 |
| size | Integer | 否 | 每页数量 | 10 |
| userId | Long | 否 | 用户ID | - |
| wordId | Long | 否 | 词汇ID | - |

**响应示例**:

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "records": [
      {
        "id": 1,
        "userId": 1,
        "wordId": 2,
        "word": "banana",
        "correctAnswer": "banana",
        "userAnswer": "bananna",
        "mistakeCount": 3,
        "lastMistakeTime": "2024-01-01T10:00:00",
        "createdTime": "2024-01-01T10:00:00"
      }
    ],
    "total": 10,
    "size": 10,
    "current": 1,
    "pages": 1
  }
}
```

---

### 3.8 获取练习统计信息

**接口地址**: `GET /api/practice/statistics`

**请求参数** (Query Parameters):

| 参数名 | 类型 | 必填 | 说明 | 默认值 |
|--------|------|------|------|--------|
| userId | Long | 是 | 用户ID | - |
| startDate | String | 否 | 开始日期 | - |
| endDate | String | 否 | 结束日期 | - |

**响应示例**:

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "totalSessions": 50,
    "totalQuestions": 500,
    "totalCorrect": 420,
    "totalWrong": 80,
    "correctRate": 84.0,
    "averageScore": 84.5,
    "averageTimePerQuestion": 8.2,
    "mistakeCount": 80,
    "masteredWords": 150,
    "learningWords": 80,
    "newWords": 20
  }
}
```

---

## 4. 用户管理接口

### 4.1 用户登录

**接口地址**: `POST /api/users/login`

**请求体** (Request Body):

```json
{
  "username": "admin",
  "password": "password123"
}
```

**字段说明**:

| 字段名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| username | String | 是 | 用户名 |
| password | String | 是 | 密码 |

**响应示例**:

```json
{
  "code": 200,
  "message": "登录成功",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "userId": 1,
    "username": "admin",
    "nickname": "管理员",
    "email": "admin@example.com"
  }
}
```

---

### 4.2 获取用户信息

**接口地址**: `GET /api/users/{id}`

**路径参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| id | Long | 是 | 用户ID |

**响应示例**:

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": 1,
    "username": "admin",
    "email": "admin@example.com",
    "nickname": "管理员",
    "status": 1,
    "createdTime": "2024-01-01T10:00:00",
    "updatedTime": "2024-01-01T10:00:00"
  }
}
```

---

### 4.3 创建用户

**接口地址**: `POST /api/users`

**请求体** (Request Body):

```json
{
  "username": "newuser",
  "password": "password123",
  "email": "user@example.com",
  "nickname": "新用户",
  "status": 1
}
```

**字段说明**:

| 字段名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| username | String | 是 | 用户名 |
| password | String | 否 | 密码 |
| email | String | 否 | 邮箱 |
| nickname | String | 否 | 昵称 |
| status | Integer | 否 | 状态 |

**响应示例**:

```json
{
  "code": 200,
  "message": "创建成功",
  "data": null
}
```

---

### 4.4 更新用户

**接口地址**: `PUT /api/users/{id}`

**路径参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| id | Long | 是 | 用户ID |

**请求体** (Request Body):

```json
{
  "username": "admin",
  "password": "new_password",
  "email": "admin@example.com",
  "nickname": "管理员",
  "status": 1
}
```

**响应示例**:

```json
{
  "code": 200,
  "message": "更新成功",
  "data": null
}
```

---

### 4.5 删除用户

**接口地址**: `DELETE /api/users/{id}`

**路径参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| id | Long | 是 | 用户ID |

**响应示例**:

```json
{
  "code": 200,
  "message": "删除成功",
  "data": null
}
```

---

### 4.6 获取用户学习进度

**接口地址**: `GET /api/users/{id}/progress`

**路径参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| id | Long | 是 | 用户ID |

**响应示例**:

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "userId": 1,
    "totalWords": 250,
    "masteredWords": 150,
    "learningWords": 80,
    "newWords": 20,
    "totalArticles": 30,
    "readArticles": 20,
    "totalPracticeSessions": 50,
    "averageScore": 84.5,
    "studyDays": 30,
    "lastStudyDate": "2024-01-01T10:00:00"
  }
}
```

---

## 5. 分类管理接口

### 5.1 获取词汇分类列表

**接口地址**: `GET /api/categories/word`

**请求参数** (Query Parameters):

| 参数名 | 类型 | 必填 | 说明 | 默认值 |
|--------|------|------|------|--------|
| page | Integer | 否 | 页码 | 1 |
| size | Integer | 否 | 每页数量 | 10 |

**响应示例**:

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "records": [
      {
        "id": 1,
        "name": "基础词汇",
        "description": "常用基础词汇",
        "type": "word",
        "wordCount": 100,
        "createdTime": "2024-01-01T10:00:00",
        "updatedTime": "2024-01-01T10:00:00"
      }
    ],
    "total": 10,
    "size": 10,
    "current": 1,
    "pages": 1
  }
}
```

---

### 5.2 创建词汇分类

**接口地址**: `POST /api/categories/word`

**请求体** (Request Body):

```json
{
  "name": "高级词汇",
  "description": "高级英语词汇"
}
```

**字段说明**:

| 字段名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| name | String | 是 | 分类名称 |
| description | String | 否 | 分类描述 |

**响应示例**:

```json
{
  "code": 200,
  "message": "创建成功",
  "data": null
}
```

---

### 5.3 更新词汇分类

**接口地址**: `PUT /api/categories/word/{id}`

**路径参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| id | Long | 是 | 分类ID |

**请求体** (Request Body):

```json
{
  "name": "高级词汇",
  "description": "高级英语词汇描述"
}
```

**响应示例**:

```json
{
  "code": 200,
  "message": "更新成功",
  "data": null
}
```

---

### 5.4 删除词汇分类

**接口地址**: `DELETE /api/categories/word/{id}`

**路径参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| id | Long | 是 | 分类ID |

**响应示例**:

```json
{
  "code": 200,
  "message": "删除成功",
  "data": null
}
```

---

### 5.5 获取文章分类列表

**接口地址**: `GET /api/categories/article`

**请求参数** (Query Parameters):

| 参数名 | 类型 | 必填 | 说明 | 默认值 |
|--------|------|------|------|--------|
| page | Integer | 否 | 页码 | 1 |
| size | Integer | 否 | 每页数量 | 10 |

**响应示例**:

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "records": [
      {
        "id": 1,
        "name": "科技文章",
        "description": "科技类文章",
        "type": "article",
        "articleCount": 20,
        "createdTime": "2024-01-01T10:00:00",
        "updatedTime": "2024-01-01T10:00:00"
      }
    ],
    "total": 5,
    "size": 10,
    "current": 1,
    "pages": 1
  }
}
```

---

### 5.6 创建文章分类

**接口地址**: `POST /api/categories/article`

**请求体** (Request Body):

```json
{
  "name": "教育文章",
  "description": "教育类文章"
}
```

**字段说明**:

| 字段名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| name | String | 是 | 分类名称 |
| description | String | 否 | 分类描述 |

**响应示例**:

```json
{
  "code": 200,
  "message": "创建成功",
  "data": null
}
```

---

### 5.7 更新文章分类

**接口地址**: `PUT /api/categories/article/{id}`

**路径参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| id | Long | 是 | 分类ID |

**请求体** (Request Body):

```json
{
  "name": "教育文章",
  "description": "教育类文章描述"
}
```

**响应示例**:

```json
{
  "code": 200,
  "message": "更新成功",
  "data": null
}
```

---

### 5.8 删除文章分类

**接口地址**: `DELETE /api/categories/article/{id}`

**路径参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| id | Long | 是 | 分类ID |

**响应示例**:

```json
{
  "code": 200,
  "message": "删除成功",
  "data": null
}
```

---

## 错误码说明

| 错误码 | 说明 |
|--------|------|
| 200 | 成功 |
| 400 | 请求参数错误 |
| 401 | 未授权 |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |

---

## 后端开发者注意事项

### 1. 数据类型规范

- **wordIds 字段**：练习会话接口中的 `wordIds` 字段应使用 `List<Long>` 类型，而不是逗号分隔的字符串。这是为了保持数据的一致性和可扩展性。

- **日期时间格式**：所有日期时间字段使用 ISO 8601 格式：`yyyy-MM-ddTHH:mm:ss`，确保前后端数据格式统一。

### 2. 必须实现的新增接口

以下接口为前端功能必需，请务必实现：

1. **词汇发音接口** (1.6)：`GET /api/words/{id}/pronunciation` - 用于获取词汇的发音信息
2. **练习会话列表接口** (3.4)：`GET /api/practice/sessions` - 用于获取用户的练习历史
3. **练习答案记录接口** (3.5)：`POST /api/practice/answers` - 用于记录每次练习的详细答案
4. **练习答案列表接口** (3.6)：`GET /api/practice/answers` - 用于查询练习答案记录
5. **错题列表接口** (3.7)：`GET /api/practice/mistakes` - 用于获取用户的错题列表
6. **练习统计接口** (3.8)：`GET /api/practice/statistics` - 用于获取用户的练习统计信息
7. **用户登录接口** (4.1)：`POST /api/users/login` - 用于用户登录认证
8. **用户学习进度接口** (4.6)：`GET /api/users/{id}/progress` - 用于获取用户的学习进度
9. **词汇分类管理接口** (5.1-5.4)：词汇分类的 CRUD 接口
10. **文章分类管理接口** (5.5-5.8)：文章分类的 CRUD 接口

### 3. 数据库表结构建议

请确保数据库包含以下表结构：

- **practice_answers** 表：记录每次练习的详细答案
  - id, session_id, user_id, word_id, user_answer, is_correct, answer_time, practice_mode, created_time

- **practice_mistakes** 表：记录用户的错题信息
  - id, user_id, word_id, correct_answer, user_answer, mistake_count, last_mistake_time, created_time

- **categories** 表：统一的分类表
  - id, name, description, type (word/article), created_time, updated_time

### 4. 练习模式支持

练习会话接口需要支持两种练习模式：
- **spelling**：拼写练习模式
- **meaning**：释义测试模式

请在 `practice_sessions` 表中添加 `practice_mode` 字段来区分不同的练习模式。

### 5. 文章统计字段

文章表需要添加以下统计字段：
- **word_count**：文章总词数
- **new_words_count**：生词数量

这些字段需要在创建或更新文章时自动计算和更新。

### 6. 分页返回格式

所有分页接口必须返回以下字段：
- `records`：数据列表
- `total`：总数
- `size`：每页数量
- `current`：当前页
- `pages`：总页数

### 7. 逻辑删除

所有删除操作应使用逻辑删除，即添加 `deleted` 字段标记删除状态，而不是物理删除数据。

### 8. 认证授权

用户登录接口应返回 JWT token，后续需要认证的接口应在请求头中携带：
```
Authorization: Bearer {token}
```

### 9. 性能优化建议

- 练习统计接口应使用数据库聚合函数进行计算，避免在应用层进行大量数据处理
- 错题列表接口应考虑添加索引以提高查询性能
- 词汇发音接口可以考虑使用缓存机制，减少重复计算

### 10. 接口测试建议

建议为所有新增接口编写单元测试和集成测试，确保接口的正确性和稳定性。

---

## 注意事项

1. 所有日期时间字段使用 ISO 8601 格式：`yyyy-MM-ddTHH:mm:ss`
2. 分页查询返回的数据包含 `records`（数据列表）、`total`（总数）、`size`（每页数量）、`current`（当前页）、`pages`（总页数）
3. 创建和更新接口会自动填充 `createdTime` 和 `updatedTime` 字段
4. 删除操作为逻辑删除，数据不会从数据库中物理删除
5. 所有接口都需要正确的 Content-Type: application/json 请求头
---

## 6. 接口实现状态

### 6.1 词汇管理接口

| 接口 | 方法 | 路径 | 状态 |
|------|------|------|------|
| 获取词汇列表 | GET | /api/words | ✅ 已实现 |
| 创建词汇 | POST | /api/words | ✅ 已实现 |
| 更新词汇 | PUT | /api/words/{id} | ✅ 已实现 |
| 删除词汇 | DELETE | /api/words/{id} | ✅ 已实现 |
| 获取练习用词汇 | GET | /api/words/practice | ✅ 已实现 |
| 获取词汇发音 | GET | /api/words/{id}/pronunciation | ✅ 已实现 |

### 6.2 文章管理接口

| 接口 | 方法 | 路径 | 状态 |
|------|------|------|------|
| 获取文章列表 | GET | /api/articles | ✅ 已实现 |
| 创建文章 | POST | /api/articles | ✅ 已实现 |
| 更新文章 | PUT | /api/articles/{id} | ✅ 已实现 |
| 删除文章 | DELETE | /api/articles/{id} | ✅ 已实现 |
| 获取文章详情 | GET | /api/articles/{id} | ✅ 已实现 |

### 6.3 练习管理接口

| 接口 | 方法 | 路径 | 状态 |
|------|------|------|------|
| 创建练习会话 | POST | /api/practice/sessions | ✅ 已实现 |
| 更新练习会话 | PUT | /api/practice/sessions/{id} | ✅ 已实现 |
| 获取练习会话详情 | GET | /api/practice/sessions/{id} | ✅ 已实现 |
| 获取练习会话列表 | GET | /api/practice/sessions | ✅ 已实现 |
| 记录练习答案 | POST | /api/practice/answers | ✅ 已实现 |
| 获取练习答案列表 | GET | /api/practice/answers | ✅ 已实现 |
| 获取错题列表 | GET | /api/practice/mistakes | ✅ 已实现 |
| 获取练习统计信息 | GET | /api/practice/statistics | ✅ 已实现 |

### 6.4 用户管理接口

| 接口 | 方法 | 路径 | 状态 |
|------|------|------|------|
| 用户登录 | POST | /api/users/login | ✅ 已实现 |
| 获取用户信息 | GET | /api/users/{id} | ✅ 已实现 |
| 创建用户 | POST | /api/users | ✅ 已实现 |
| 更新用户 | PUT | /api/users/{id} | ✅ 已实现 |
| 删除用户 | DELETE | /api/users/{id} | ✅ 已实现 |
| 获取用户学习进度 | GET | /api/users/{id}/progress | ✅ 已实现 |

### 6.5 分类管理接口

| 接口 | 方法 | 路径 | 状态 |
|------|------|------|------|
| 获取词汇分类列表 | GET | /api/categories/word | ✅ 已实现 |
| 创建词汇分类 | POST | /api/categories/word | ✅ 已实现 |
| 更新词汇分类 | PUT | /api/categories/word/{id} | ✅ 已实现 |
| 删除词汇分类 | DELETE | /api/categories/word/{id} | ✅ 已实现 |
| 获取文章分类列表 | GET | /api/categories/article | ✅ 已实现 |
| 创建文章分类 | POST | /api/categories/article | ✅ 已实现 |
| 更新文章分类 | PUT | /api/categories/article/{id} | ✅ 已实现 |
| 删除文章分类 | DELETE | /api/categories/article/{id} | ✅ 已实现 |

---

## 7. 实现说明

### 7.1 技术栈

- **后端框架**: Spring Boot 3.x
- **持久层框架**: MyBatis-Plus 3.x
- **数据库**: H2 (开发环境) / DB2 (生产环境)
- **Java 版本**: Java 17+
- **构建工具**: Maven

### 7.2 项目结构

```
backend/
├── src/main/java/com/wordking/
│   ├── controller/          # 控制层
│   │   ├── WordController.java
│   │   ├── ArticleController.java
│   │   ├── PracticeController.java
│   │   ├── UserController.java
│   │   └── CategoryController.java
│   ├── service/            # 业务逻辑层
│   │   ├── WordService.java
│   │   ├── ArticleService.java
│   │   ├── PracticeService.java
│   │   ├── UserService.java
│   │   └── CategoryService.java
│   ├── service/impl/       # 业务逻辑实现层
│   │   ├── WordServiceImpl.java
│   │   ├── ArticleServiceImpl.java
│   │   ├── PracticeServiceImpl.java
│   │   ├── UserServiceImpl.java
│   │   └── CategoryServiceImpl.java
│   ├── mapper/             # 数据访问层
│   │   ├── WordMapper.java
│   │   ├── ArticleMapper.java
│   │   ├── PracticeRecordMapper.java
│   │   ├── PracticeSessionMapper.java
│   │   ├── UserMapper.java
│   │   └── CategoryMapper.java
│   ├── entity/             # 实体类
│   │   ├── Word.java
│   │   ├── Article.java
│   │   ├── PracticeRecord.java
│   │   ├── PracticeSession.java
│   │   ├── User.java
│   │   └── Category.java
│   └── dto/               # 数据传输对象
│       ├── request/        # 请求 DTO
│       │   ├── WordQuery.java
│       │   ├── ArticleQuery.java
│       │   ├── PracticeSessionQuery.java
│       │   ├── PracticeAnswerRequest.java
│       │   ├── PracticeAnswerQuery.java
│       │   ├── LoginRequest.java
│       │   └── CategoryRequest.java
│       └── response/       # 响应 DTO
│           ├── Result.java
│           ├── PronunciationResponse.java
│           ├── MistakeResponse.java
│           ├── PracticeStatisticsResponse.java
│           ├── LoginResponse.java
│           └── UserProgressResponse.java
```

### 7.3 统一响应格式

所有接口返回统一的 JSON 格式：

```json
{
  "code": 200,
  "message": "success",
  "data": {}
}
```

- **code**: 状态码，200 表示成功，其他表示失败
- **message**: 响应消息
- **data**: 响应数据，具体结构根据接口而定

### 7.4 分页参数

所有列表接口支持分页查询：

| 参数名 | 类型 | 必填 | 说明 | 默认值 |
|--------|------|------|------|--------|
| page | Integer | 否 | 页码 | 1 |
| size | Integer | 否 | 每页数量 | 10 |

分页响应格式：

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "records": [],
    "total": 100,
    "size": 10,
    "current": 1,
    "pages": 10
  }
}
```

### 7.5 安全性说明

1. 需要认证的接口应在请求头中携带 JWT token
2. 密码应使用 BCrypt 加密存储
3. 敏感数据传输应使用 HTTPS
4. 输入参数应进行验证和过滤

### 7.6 注意事项

1. 所有时间字段使用 `LocalDateTime` 类型
2. 金额字段使用 `BigDecimal` 类型
3. 布尔字段在数据库中存储为 `Integer` 类型（0 或 1）
4. 创建和更新时间通过 MyBatis-Plus 自动填充
5. 所有接口都支持统一的异常处理

