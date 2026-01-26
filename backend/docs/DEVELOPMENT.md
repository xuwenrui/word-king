# Backend 开发文档

## 目录
- [配置说明](#配置说明)
- [常见问题](#常见问题)
- [开发规范](#开发规范)
- [API接口说明](#api接口说明)

## 配置说明

### 1. 数据库配置
项目支持多种数据库配置：

#### H2 数据库（开发环境）
```yaml
spring:
  datasource:
    url: jdbc:h2:mem:testdb
    username: sa
    password: 
    driver-class-name: org.h2.Driver
  h2:
    console:
      enabled: true
```

#### DB2 数据库（生产环境）
```yaml
spring:
  datasource:
    url: jdbc:db2://localhost:50000/WORDKING
    username: dbuser
    password: dbpass
    driver-class-name: com.ibm.db2.jcc.DB2Driver
```

### 2. MyBatis-Plus 配置
```yaml
mybatis-plus:
  type-aliases-package: com.wordking.entity
  configuration:
    map-underscore-to-camel-case: true
    cache-enabled: true
  global-config:
    db-config:
      id-type: auto
      table-prefix: t_
```

### 3. 日志配置
项目使用 Logback 进行日志管理，配置文件位于 `src/main/resources/logback-spring.xml`

## 常见问题

### 1. 启动失败

#### 问题：找不到 DataSource bean
**错误信息**：`Parameter 0 of method sqlSessionFactory required a bean of type 'javax.sql.DataSource' that could not be found`

**解决方案**：
1. 检查 `MyBatisPlusConfig.java` 中是否正确配置了 `DataSource` bean
2. 确保使用 `javax.sql.DataSource`（Spring Boot 3 中 DataSource 仍使用 javax 包）

#### 问题：依赖版本不兼容
**错误信息**：`Unsupported class file major version 65`

**解决方案**：
1. 确保使用 Java 17 编译和运行项目
2. 检查 `pom.xml` 中的 Java 版本配置

#### 问题：MyBatis-Plus 配置错误
**错误信息**：`Invalid value type for attribute 'factoryBeanObjectType'`

**解决方案**：
1. 使用 `mybatis-plus-spring-boot3-starter` 而非 `mybatis-plus-boot-starter`
2. 确保所有 `javax.*` 包名改为 `jakarta.*`（除 DataSource 外）

### 2. 编译错误

#### 问题：jakarta.validation 包不存在
**错误信息**：`程序包jakarta.validation不存在`

**解决方案**：
1. 确保添加了 `spring-boot-starter-validation` 依赖
2. 检查实体类和 Controller 中的 `@Valid` 和 `@NotBlank` 注解导入

### 3. 运行时错误

#### 问题：数据库连接失败
**错误信息**：`Connection refused` 或 `Access denied`

**解决方案**：
1. 检查数据库服务是否启动
2. 验证数据库连接信息（URL、用户名、密码）
3. 确保数据库驱动依赖已正确添加

## 开发规范

### 1. 代码风格
- 使用 Lombok 简化代码，减少样板代码
- 使用 Builder 模式创建对象
- 使用 `@Valid` 注解进行参数验证
- 使用统一的 `Result` 响应格式

### 2. 命名规范
- 类名：大驼峰命名（PascalCase），如 `WordService`
- 方法名：小驼峰命名（camelCase），如 `getWords`
- 变量名：小驼峰命名（camelCase），如 `wordList`
- 常量名：全大写下划线分隔，如 `MAX_PAGE_SIZE`

### 3. 注释规范
- 所有 public 方法必须添加 JavaDoc 注释
- 复杂逻辑必须添加行内注释
- 使用 `@TODO` 标记待完成的功能

### 4. 异常处理
- 使用 `@Transactional` 注解管理事务
- 使用 `GlobalExceptionHandler` 统一处理异常
- 自定义异常继承 `RuntimeException`

## API接口说明

### 1. 统一响应格式
所有 API 接口使用统一的响应格式：

```json
{
  "code": 200,
  "message": "success",
  "data": {}
}
```

### 2. RESTful API 设计
- GET：获取资源
- POST：创建资源
- PUT：更新资源
- DELETE：删除资源

### 3. API 文档
启动项目后，访问以下地址查看 API 文档：
- Swagger UI: http://localhost:8080/swagger-ui.html
- OpenAPI JSON: http://localhost:8080/v3/api-docs

### 4. 主要接口

#### 词汇管理
- `GET /api/words` - 获取词汇列表
- `POST /api/words` - 创建词汇
- `PUT /api/words/{id}` - 更新词汇
- `DELETE /api/words/{id}` - 删除词汇
- `GET /api/words/practice` - 获取练习用词汇

#### 文章管理
- `GET /api/articles` - 获取文章列表
- `POST /api/articles` - 创建文章
- `PUT /api/articles/{id}` - 更新文章
- `DELETE /api/articles/{id}` - 删除文章

#### 练习管理
- `POST /api/practice/session` - 创建练习会话
- `POST /api/practice/submit` - 提交练习答案
- `GET /api/practice/result/{sessionId}` - 获取练习结果

#### 用户管理
- `POST /api/users/register` - 用户注册
- `POST /api/users/login` - 用户登录
- `GET /api/users/{id}` - 获取用户信息
- `PUT /api/users/{id}` - 更新用户信息

## 数据库设计

### 1. 表前缀
所有数据库表使用 `t_` 前缀，在 `application.yml` 中配置：
```yaml
mybatis-plus:
  global-config:
    db-config:
      table-prefix: t_
```

### 2. 主要表结构
- `t_user` - 用户表
- `t_word` - 词汇表
- `t_article` - 文章表
- `t_practice_session` - 练习会话表
- `t_practice_record` - 练习记录表

## 性能优化

### 1. 数据库优化
- 合理设计数据库索引
- 使用连接池优化数据库连接
- SQL 优化，避免 N+1 查询问题

### 2. 缓存优化
- 使用 MyBatis-Plus 的二级缓存
- 对热点数据使用 Redis 缓存
- 合理设置缓存过期时间

### 3. 代码优化
- 使用 Lambda 表达式简化代码
- 避免在循环中进行数据库查询
- 使用批量操作减少数据库访问次数

## 安全性

### 1. Spring Security 配置
- 使用 JWT 进行身份认证
- 配置 CORS 允许跨域请求
- 对敏感接口进行权限控制

### 2. 数据安全
- 密码使用 BCrypt 加密
- SQL 注入防护（MyBatis-Plus 自动防护）
- XSS 攻击防护
