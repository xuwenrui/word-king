# Lombok 和 Logback 配置说明

## 1. Lombok 配置

### 1.1 Maven 依赖
```xml
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.18.30</version>
    <scope>provided</scope>
</dependency>
```

### 1.2 常用注解说明

#### 1.2.1 @Data
- 自动为所有字段生成 getter/setter 方法
- 生成 toString() 方法
- 生成 equals() 和 hashCode() 方法
- 生成默认构造函数

```java
@Data
public class Word {
    private Long id;
    private String word;
    private String meaning;
}
```

#### 1.2.2 @Builder
- 生成 Builder 模式代码
- 提供流畅的构建对象方式

```java
@Data
@Builder
public class Word {
    private Long id;
    private String word;
    private String meaning;
}

// 使用方式
Word word = Word.builder()
    .word("hello")
    .meaning("你好")
    .build();
```

#### 1.2.3 @NoArgsConstructor 和 @AllArgsConstructor
- `@NoArgsConstructor` 生成无参构造函数
- `@AllArgsConstructor` 生成全参构造函数

```java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Word {
    private Long id;
    private String word;
    private String meaning;
}
```

#### 1.2.4 @Slf4j
- 自动生成日志记录器字段
- 变量名为 log

```java
@Slf4j
@RestController
public class WordController {
    
    public void someMethod() {
        log.info("This is a log message");
    }
}
```

### 1.3 IDE 配置
- **IntelliJ IDEA**: 安装 Lombok 插件并启用注解处理
- **Eclipse**: 下载 lombok.jar 并运行安装到 Eclipse

## 2. Logback 配置

### 2.1 依赖配置
```xml
<!-- Spring Boot 默认已包含 Logback -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-logging</artifactId>
</dependency>
```

### 2.2 logback-spring.xml 配置文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <!-- 引入 Spring Boot 默认配置 -->
    <include resource="org/springframework/boot/logging/logback/defaults.xml"/>
    
    <!-- 控制台输出配置 -->
    <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>${CONSOLE_LOG_PATTERN}</pattern>
            <charset>utf8</charset>
        </encoder>
    </appender>
    
    <!-- 文件输出配置 -->
    <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>logs/word-king.log</file>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <!-- 每天滚动一次文件 -->
            <fileNamePattern>logs/word-king.%d{yyyy-MM-dd}.%i.log</fileNamePattern>
            <!-- 最大保存30天的文件 -->
            <maxHistory>30</maxHistory>
            <!-- 单个文件最大100MB -->
            <timeBasedFileNamingAndTriggeringPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP">
                <maxFileSize>100MB</maxFileSize>
            </timeBasedFileNamingAndTriggeringPolicy>
        </rollingPolicy>
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
            <charset>utf8</charset>
        </encoder>
    </appender>
    
    <!-- 错误日志单独输出 -->
    <appender name="ERROR_FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>logs/word-king-error.log</file>
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <level>ERROR</level>
            <onMatch>ACCEPT</onMatch>
            <onMismatch>DENY</onMismatch>
        </filter>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <fileNamePattern>logs/word-king-error.%d{yyyy-MM-dd}.%i.log</fileNamePattern>
            <maxHistory>60</maxHistory>
            <timeBasedFileNamingAndTriggeringPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP">
                <maxFileSize>50MB</maxFileSize>
            </timeBasedFileNamingAndTriggeringPolicy>
        </rollingPolicy>
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
            <charset>utf8</charset>
        </encoder>
    </appender>
    
    <!-- SQL 日志输出（MyBatis） -->
    <appender name="SQL_FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>logs/sql.log</file>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <fileNamePattern>logs/sql.%d{yyyy-MM-dd}.%i.log</fileNamePattern>
            <maxHistory>15</maxHistory>
            <timeBasedFileNamingAndTriggeringPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP">
                <maxFileSize>100MB</maxFileSize>
            </timeBasedFileNamingAndTriggeringPolicy>
        </rollingPolicy>
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} - %msg%n</pattern>
            <charset>utf8</charset>
        </encoder>
    </appender>
    
    <!-- 开发环境配置 -->
    <springProfile name="dev">
        <root level="INFO">
            <appender-ref ref="CONSOLE"/>
            <appender-ref ref="FILE"/>
            <appender-ref ref="ERROR_FILE"/>
        </root>
        
        <!-- MyBatis SQL 日志 -->
        <logger name="com.wordking.mapper" level="DEBUG" additivity="false">
            <appender-ref ref="SQL_FILE"/>
            <appender-ref ref="CONSOLE"/>
        </logger>
    </springProfile>
    
    <!-- 生产环境配置 -->
    <springProfile name="prod">
        <root level="INFO">
            <appender-ref ref="FILE"/>
            <appender-ref ref="ERROR_FILE"/>
        </root>
        
        <!-- 只在生产环境记录 SQL 日志 -->
        <logger name="com.wordking.mapper" level="INFO" additivity="false">
            <appender-ref ref="SQL_FILE"/>
        </logger>
    </springProfile>
    
    <!-- 测试环境配置 -->
    <springProfile name="test">
        <root level="DEBUG">
            <appender-ref ref="CONSOLE"/>
        </root>
    </springProfile>
</configuration>
```

### 2.3 日志级别说明

- **TRACE**: 最详细的信息，通常只在开发时启用
- **DEBUG**: 详细的调试信息，开发时使用
- **INFO**: 一般信息，生产环境通常使用此级别
- **WARN**: 警告信息，不影响程序正常运行
- **ERROR**: 错误信息，需要关注和处理
- **FATAL**: 致命错误，系统可能无法继续运行

### 2.4 日志配置最佳实践

#### 2.4.1 环境区分
- 使用 Spring Profile 区分不同环境的日志配置
- 开发环境输出到控制台便于调试
- 生产环境避免过多日志输出

#### 2.4.2 性能考虑
- 避免在循环中记录日志
- 使用参数化日志记录，避免字符串拼接
- 合理设置日志级别

```java
// 推荐的参数化日志记录方式
log.info("User {} performed action {} at {}", userId, action, time);

// 不推荐的字符串拼接方式
log.info("User " + userId + " performed action " + action + " at " + time);
```

#### 2.4.3 敏感信息保护
- 避免在日志中记录敏感信息（如密码、用户隐私数据）
- 对敏感字段进行脱敏处理

### 2.5 自定义日志组件

#### 2.5.1 操作日志记录
```java
@Component
@Slf4j
public class OperationLogger {
    
    public void logOperation(String userId, String operation, String details) {
        log.info("OPERATION_LOG - User: {}, Operation: {}, Details: {}", 
                 userId, operation, details);
    }
}
```

#### 2.5.2 异步日志记录
```java
<!-- 在 logback-spring.xml 中配置异步 appender -->
<appender name="ASYNC_FILE" class="ch.qos.logback.classic.AsyncAppender">
    <appender-ref ref="FILE"/>
    <queueSize>1024</queueSize>
    <discardingThreshold>0</discardingThreshold>
</appender>
```

## 3. 项目集成示例

### 3.1 Controller 中使用日志
```java
@RestController
@RequestMapping("/api/words")
@Slf4j
public class WordController {
    
    @Autowired
    private WordService wordService;
    
    @GetMapping
    public Result<IPage<Word>> getWords(WordQuery query) {
        log.info("获取词汇列表，查询参数: {}", query);
        
        try {
            IPage<Word> words = wordService.getWords(query);
            log.info("成功获取词汇列表，数量: {}", words.getTotal());
            return Result.success(words);
        } catch (Exception e) {
            log.error("获取词汇列表失败", e);
            return Result.error("获取词汇列表失败");
        }
    }
}
```

### 3.2 Service 中使用日志
```java
@Service
@Transactional
@Slf4j
public class WordService {
    
    @Autowired
    private WordMapper wordMapper;
    
    public boolean createWord(Word word) {
        log.debug("开始创建词汇: {}", word.getWord());
        
        try {
            int result = wordMapper.insert(word);
            boolean success = result > 0;
            
            if (success) {
                log.info("词汇创建成功，ID: {}", word.getId());
            } else {
                log.warn("词汇创建失败，词汇: {}", word.getWord());
            }
            
            return success;
        } catch (Exception e) {
            log.error("创建词汇时发生异常，词汇: {}", word.getWord(), e);
            throw e;
        }
    }
}
```