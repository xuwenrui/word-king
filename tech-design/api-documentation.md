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
  "wordIds": "1,2,3,4,5",
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
| wordIds | String | 否 | 词汇ID列表（逗号分隔） |
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
  "data": null
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
  "wordIds": "1,2,3,4,5",
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
    "wordIds": "1,2,3,4,5",
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

## 4. 用户管理接口

### 4.1 获取用户信息

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
    "password": "encrypted_password",
    "email": "admin@example.com",
    "nickname": "管理员",
    "status": 1,
    "createdTime": "2024-01-01T10:00:00",
    "updatedTime": "2024-01-01T10:00:00"
  }
}
```

---

### 4.2 创建用户

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

### 4.3 更新用户

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

### 4.4 删除用户

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

## 错误码说明

| 错误码 | 说明 |
|--------|------|
| 200 | 成功 |
| 400 | 请求参数错误 |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |

## 注意事项

1. 所有日期时间字段使用 ISO 8601 格式：`yyyy-MM-ddTHH:mm:ss`
2. 分页查询返回的数据包含 `records`（数据列表）、`total`（总数）、`size`（每页数量）、`current`（当前页）、`pages`（总页数）
3. 创建和更新接口会自动填充 `createdTime` 和 `updatedTime` 字段
4. 删除操作为逻辑删除，数据不会从数据库中物理删除
5. 所有接口都需要正确的 Content-Type: application/json 请求头
