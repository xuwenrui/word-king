# Word King Backend

## 项目概述
Word King 后端项目，使用 Spring Boot + MyBatis-Plus + Java 17 开发。

## 技术栈
- Spring Boot 3.2.0
- MyBatis-Plus 3.5.6
- Java 17
- H2 Database (开发环境)
- Maven

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

## 常见问题

### 启动失败
如果遇到 `factoryBeanObjectType` 相关错误，请检查：
- Java版本是否为17
- Maven依赖是否正确安装
- 配置文件是否正确

### 数据库连接
开发环境中使用H2内存数据库，无需额外配置。生产环境请修改 `application.yml` 中的数据库连接信息。