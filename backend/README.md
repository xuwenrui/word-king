# Word King Backend

## 项目概述
Word King 后端项目，使用 Spring Boot 3 + MyBatis-Plus + Java 17 开发。

## 技术栈
- Spring Boot 3.0.0
- MyBatis-Plus 3.5.15 (Spring Boot 3兼容版本)
- Java 17
- H2 Database (开发环境)
- Maven
- Lombok
- Spring Security
- Springdoc OpenAPI (Swagger)

## 环境要求
- Java 17
- Maven 3.8+
- Node.js (可选，用于构建相关工具)

## 初始化项目

### 1. 克隆项目
```bash
git clone <repository-url>
cd word-king/backend
```

### 2. 安装依赖
```bash
mvn clean install
```

## 编译项目

### 编译命令
```bash
mvn clean compile
```

### 打包命令
```bash
mvn clean package -DskipTests
```

## 启动项目

### 开发模式启动
```bash
mvn spring-boot:run
```

### JAR包启动
```bash
java -jar target/word-king-backend-1.0.0.jar
```

## 配置说明

### 数据库配置
项目默认使用 H2 内存数据库，配置在 `application.yml` 中：
```yaml
spring:
  datasource:
    url: jdbc:h2:mem:testdb
    username: sa
    password: 
    driver-class-name: org.h2.Driver
```

### 应用配置
- 服务端口：8080 (可在 `application.yml` 中修改)
- API文档：启动后访问 http://localhost:8080/swagger-ui.html
- H2控制台：启动后访问 http://localhost:8080/h2-console

## 项目结构

```
backend/
├── src/
│   └── main/
│       ├── java/
│       │   └── com/
│       │       └── wordking/
│       │           ├── WordKingApplication.java
│       │           ├── config/              # 配置类
│       │           │   ├── MyBatisPlusConfig.java
│       │           │   └── BeanConfig.java
│       │           ├── controller/          # 控制层
│       │           │   ├── WordController.java
│       │           │   ├── ArticleController.java
│       │           │   ├── PracticeController.java
│       │           │   └── UserController.java
│       │           ├── service/             # 业务逻辑层
│       │           │   ├── WordService.java
│       │           │   ├── ArticleService.java
│       │           │   ├── PracticeService.java
│       │           │   └── UserService.java
│       │           ├── mapper/              # 数据访问层
│       │           │   ├── WordMapper.java
│       │           │   ├── ArticleMapper.java
│       │           │   ├── PracticeRecordMapper.java
│       │           │   ├── PracticeSessionMapper.java
│       │           │   └── UserMapper.java
│       │           ├── entity/              # 实体类
│       │           │   ├── Word.java
│       │           │   ├── Article.java
│       │           │   ├── PracticeRecord.java
│       │           │   ├── PracticeSession.java
│       │           │   └── User.java
│       │           ├── dto/                 # 数据传输对象
│       │           │   ├── request/
│       │           │   │   ├── WordQuery.java
│       │           │   │   └── ArticleQuery.java
│       │           │   └── response/
│       │           │       └── Result.java
│       │           └── exception/           # 异常处理
│       │               └── GlobalExceptionHandler.java
│       └── resources/
│           ├── application.yml             # 配置文件
│           ├── application.properties
│           └── logback-spring.xml          # 日志配置
├── pom.xml
└── README.md
```

## 常见问题

### 启动失败
如果遇到启动失败，请检查：
- Java版本是否为17
- Maven依赖是否正确安装
- 配置文件是否正确
- 确保使用mybatis-plus-spring-boot3-starter依赖

### 数据库连接
开发环境中使用H2内存数据库，无需额外配置。生产环境请修改 `application.yml` 中的数据库连接信息。

### 依赖问题
- Spring Boot 3.x需要使用mybatis-plus-spring-boot3-starter
- 确保所有jakarta.validation包名正确（Spring Boot 3使用jakarta而非javax）

## API文档
启动项目后，访问以下地址查看API文档：
- Swagger UI: http://localhost:8080/swagger-ui.html
- OpenAPI JSON: http://localhost:8080/v3/api-docs

## 开发说明

### 代码规范
- 使用Lombok简化代码
- 使用MyBatis-Plus的LambdaQueryWrapper构建查询条件
- 使用统一的Result响应格式
- 使用@Valid注解进行参数验证

### 数据库表前缀
所有数据库表使用 `t_` 前缀，在application.yml中配置：
```yaml
mybatis-plus:
  global-config:
    db-config:
      table-prefix: t_
```
