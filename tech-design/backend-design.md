# Word King 后端技术设计文档

## 1. 技术栈

- **编程语言**: Java 17
- **框架**: Spring Boot 3.0.0
- **持久层框架**: MyBatis-Plus 3.5.15 (Spring Boot 3兼容版本)
- **数据库**: H2 Database (开发环境) / IBM DB2 (生产环境)
- **构建工具**: Maven
- **注解库**: Lombok
- **日志框架**: Logback
- **API 文档**: Springdoc OpenAPI 2.3.0
- **安全框架**: Spring Security

## 2. 项目结构

```
backend/
├── pom.xml
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
│       │           ├── service/impl/        # 业务逻辑实现层
│       │           │   ├── WordServiceImpl.java
│       │           │   ├── ArticleServiceImpl.java
│       │           │   ├── PracticeServiceImpl.java
│       │           │   └── UserServiceImpl.java
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
├── README.md
└── target/                          # 编译输出目录
```

## 3. 数据库设计

### 3.1 数据库表结构

#### 3.1.1 用户表 (T_USER)
```sql
CREATE TABLE T_USER (
    ID BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY,
    USERNAME VARCHAR(50) NOT NULL,
    PASSWORD VARCHAR(100) NOT NULL,
    EMAIL VARCHAR(100),
    NICKNAME VARCHAR(50),
    STATUS TINYINT DEFAULT 1,
    CREATED_TIME TIMESTAMP DEFAULT CURRENT TIMESTAMP,
    UPDATED_TIME TIMESTAMP DEFAULT CURRENT TIMESTAMP,
    PRIMARY KEY (ID),
    UNIQUE (USERNAME)
);
```

#### 3.1.2 词汇表 (T_WORD)
```sql
CREATE TABLE T_WORD (
    ID BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY,
    WORD VARCHAR(100) NOT NULL,
    PHONETIC VARCHAR(200),
    MEANING CLOB,
    PART_OF_SPEECH VARCHAR(20),
    EXAMPLE CLOB,
    DIFFICULTY TINYINT DEFAULT 1,
    CATEGORY_ID BIGINT,
    CREATED_TIME TIMESTAMP DEFAULT CURRENT TIMESTAMP,
    UPDATED_TIME TIMESTAMP DEFAULT CURRENT TIMESTAMP,
    PRIMARY KEY (ID)
);
```

#### 3.1.3 文章表 (T_ARTICLE)
```sql
CREATE TABLE T_ARTICLE (
    ID BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY,
    TITLE VARCHAR(200) NOT NULL,
    CONTENT CLOB,
    SUMMARY VARCHAR(500),
    CATEGORY_ID BIGINT,
    AUTHOR VARCHAR(50),
    STATUS TINYINT DEFAULT 1,
    CREATED_TIME TIMESTAMP DEFAULT CURRENT TIMESTAMP,
    UPDATED_TIME TIMESTAMP DEFAULT CURRENT TIMESTAMP,
    PRIMARY KEY (ID)
);
```

#### 3.1.4 练习会话表 (T_PRACTICE_SESSION)
```sql
CREATE TABLE T_PRACTICE_SESSION (
    ID BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY,
    USER_ID BIGINT NOT NULL,
    WORD_IDS CLOB,
    TOTAL_QUESTIONS INT DEFAULT 0,
    CORRECT_ANSWERS INT DEFAULT 0,
    SCORE DECIMAL(5,2),
    START_TIME TIMESTAMP DEFAULT CURRENT TIMESTAMP,
    END_TIME TIMESTAMP,
    STATUS TINYINT DEFAULT 1,
    PRIMARY KEY (ID)
);
```

#### 3.1.5 练习记录表 (T_PRACTICE_RECORD)
```sql
CREATE TABLE T_PRACTICE_RECORD (
    ID BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY,
    SESSION_ID BIGINT NOT NULL,
    WORD_ID BIGINT NOT NULL,
    USER_ANSWER VARCHAR(500),
    IS_CORRECT TINYINT DEFAULT 0,
    ANSWER_TIME INT,
    CREATED_TIME TIMESTAMP DEFAULT CURRENT TIMESTAMP,
    PRIMARY KEY (ID)
);
```

## 4. 实体类设计 (Entity)

### 4.1 Word 实体
```java
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@TableName("T_WORD")
public class Word {
    @TableId(type = IdType.AUTO)
    private Long id;
    
    @NotBlank(message = "词汇不能为空")
    @TableField("WORD")
    private String word;
    
    @TableField("PHONETIC")
    private String phonetic;
    
    @TableField("MEANING")
    private String meaning;
    
    @TableField("PART_OF_SPEECH")
    private String partOfSpeech;
    
    @TableField("EXAMPLE")
    private String example;
    
    @TableField("DIFFICULTY")
    private Integer difficulty;
    
    @TableField("CATEGORY_ID")
    private Long categoryId;
    
    @TableField(value = "CREATED_TIME", fill = FieldFill.INSERT)
    private LocalDateTime createdTime;
    
    @TableField(value = "UPDATED_TIME", fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updatedTime;
}
```

### 4.2 Article 实体
```java
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@TableName("T_ARTICLE")
public class Article {
    @TableId(type = IdType.AUTO)
    private Long id;
    
    @NotBlank(message = "标题不能为空")
    @TableField("TITLE")
    private String title;
    
    @TableField("CONTENT")
    private String content;
    
    @TableField("SUMMARY")
    private String summary;
    
    @TableField("CATEGORY_ID")
    private Long categoryId;
    
    @TableField("AUTHOR")
    private String author;
    
    @TableField("STATUS")
    private Integer status;
    
    @TableField(value = "CREATED_TIME", fill = FieldFill.INSERT)
    private LocalDateTime createdTime;
    
    @TableField(value = "UPDATED_TIME", fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updatedTime;
}
```

## 5. 数据访问层 (Mapper)

### 5.1 WordMapper
```java
@Mapper
public interface WordMapper extends BaseMapper<Word> {
    /**
     * 根据难度和数量随机获取词汇
     */
    List<Word> selectRandomWords(@Param("difficulty") Integer difficulty, 
                                 @Param("limit") Integer limit);
    
    /**
     * 根据分类获取词汇
     */
    List<Word> selectByCategory(@Param("categoryId") Long categoryId);
    
    /**
     * 模糊搜索词汇
     */
    List<Word> selectByKeyword(@Param("keyword") String keyword);
}
```

### 5.2 MyBatis-Plus 配置
```java
@Configuration
@MapperScan("com.wordking.mapper")
public class MyBatisPlusConfig {
    
    @Bean
    public DataSource dataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("org.h2.Driver");
        dataSource.setUrl("jdbc:h2:mem:testdb");
        dataSource.setUsername("sa");
        dataSource.setPassword("");
        return dataSource;
    }
    
    @Bean
    public SqlSessionFactory sqlSessionFactory(DataSource dataSource) throws Exception {
        MybatisSqlSessionFactoryBean factoryBean = new MybatisSqlSessionFactoryBean();
        factoryBean.setDataSource(dataSource);
        return factoryBean.getObject();
    }
}
```

## 6. 业务逻辑层 (Service)

### 6.1 WordService
```java
@Service
@Transactional
public class WordService {
    
    @Autowired
    private WordMapper wordMapper;
    
    /**
     * 获取词汇列表
     */
    public IPage<Word> getWords(WordQuery query) {
        // 构建查询条件
        LambdaQueryWrapper<Word> wrapper = new LambdaQueryWrapper<>();
        if (StringUtils.isNotBlank(query.getKeyword())) {
            wrapper.like(Word::getWord, query.getKeyword())
                   .or()
                   .like(Word::getMeaning, query.getKeyword());
        }
        if (query.getDifficulty() != null) {
            wrapper.eq(Word::getDifficulty, query.getDifficulty());
        }
        if (query.getCategoryId() != null) {
            wrapper.eq(Word::getCategoryId, query.getCategoryId());
        }
        
        // 分页查询
        Page<Word> page = new Page<>(query.getPage(), query.getSize());
        return wordMapper.selectPage(page, wrapper);
    }
    
    /**
     * 创建词汇
     */
    public boolean createWord(Word word) {
        return wordMapper.insert(word) > 0;
    }
    
    /**
     * 更新词汇
     */
    public boolean updateWord(Word word) {
        return wordMapper.updateById(word) > 0;
    }
    
    /**
     * 删除词汇
     */
    public boolean deleteWord(Long id) {
        return wordMapper.deleteById(id) > 0;
    }
    
    /**
     * 获取练习用词汇
     */
    public List<Word> getPracticeWords(PracticeQuery query) {
        return wordMapper.selectRandomWords(query.getDifficulty(), query.getCount());
    }
}
```

## 7. 控制层 (Controller)

### 7.1 WordController
```java
@RestController
@RequestMapping("/api/words")
@Validated
public class WordController {
    
    @Autowired
    private WordService wordService;
    
    /**
     * 获取词汇列表
     */
    @GetMapping
    public Result<IPage<Word>> getWords(WordQuery query) {
        IPage<Word> words = wordService.getWords(query);
        return Result.success(words);
    }
    
    /**
     * 创建词汇
     */
    @PostMapping
    public Result<String> createWord(@Valid @RequestBody Word word) {
        boolean success = wordService.createWord(word);
        if (success) {
            return Result.success("创建成功");
        } else {
            return Result.error("创建失败");
        }
    }
    
    /**
     * 更新词汇
     */
    @PutMapping("/{id}")
    public Result<String> updateWord(@PathVariable Long id, 
                                     @Valid @RequestBody Word word) {
        word.setId(id);
        boolean success = wordService.updateWord(word);
        if (success) {
            return Result.success("更新成功");
        } else {
            return Result.error("更新失败");
        }
    }
    
    /**
     * 删除词汇
     */
    @DeleteMapping("/{id}")
    public Result<String> deleteWord(@PathVariable Long id) {
        boolean success = wordService.deleteWord(id);
        if (success) {
            return Result.success("删除成功");
        } else {
            return Result.error("删除失败");
        }
    }
    
    /**
     * 获取练习用词汇
     */
    @GetMapping("/practice")
    public Result<List<Word>> getPracticeWords(PracticeQuery query) {
        List<Word> words = wordService.getPracticeWords(query);
        return Result.success(words);
    }
}
```

## 8. 配置文件

### 8.1 application.yml
```yaml
server:
  port: 8080

spring:
  application:
    name: word-king-backend
  datasource:
    url: jdbc:h2:mem:testdb
    username: sa
    password: 
    driver-class-name: org.h2.Driver
  jackson:
    time-zone: GMT+8
    date-format: yyyy-MM-dd HH:mm:ss
  h2:
    console:
      enabled: true

mybatis-plus:
  type-aliases-package: com.wordking.entity
  configuration:
    map-underscore-to-camel-case: true
    cache-enabled: true
  global-config:
    db-config:
      id-type: auto
      table-prefix: t_

logging:
  config: classpath:logback-spring.xml

# 自定义配置
word-king:
  upload:
    path: /uploads/
```

## 9. 统一响应格式

### 9.1 Result 类
```java
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Result<T> {
    private int code;
    private String message;
    private T data;
    
    public static <T> Result<T> success(T data) {
        return Result.<T>builder()
                .code(200)
                .message("success")
                .data(data)
                .build();
    }
    
    public static <T> Result<T> error(String message) {
        return Result.<T>builder()
                .code(500)
                .message(message)
                .build();
    }
    
    public static <T> Result<T> error(int code, String message) {
        return Result.<T>builder()
                .code(code)
                .message(message)
                .build();
    }
}
```

## 10. 异常处理

### 10.1 全局异常处理器
```java
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Result<String> handleValidationException(MethodArgumentNotValidException e) {
        log.error("参数验证失败", e);
        String message = e.getBindingResult().getFieldErrors().stream()
                .map(FieldError::getDefaultMessage)
                .collect(Collectors.joining(", "));
        return Result.error(400, message);
    }
    
    @ExceptionHandler(BindException.class)
    public Result<String> handleBindException(BindException e) {
        log.error("参数绑定失败", e);
        String message = e.getBindingResult().getFieldErrors().stream()
                .map(FieldError::getDefaultMessage)
                .collect(Collectors.joining(", "));
        return Result.error(400, message);
    }
    
    @ExceptionHandler(Exception.class)
    public Result<String> handleException(Exception e) {
        log.error("系统异常", e);
        return Result.error("系统异常，请稍后重试");
    }
}
```

## 11. 安全性设计

### 11.1 Spring Security 配置
```java
@Configuration
@EnableWebSecurity
public class WebSecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/public/**").permitAll()
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
        
        return http.build();
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
```

## 12. 性能优化

### 12.1 缓存配置
```java
@Configuration
@EnableCaching
public class CacheConfig {
    
    @Bean
    public CacheManager cacheManager() {
        RedisCacheManager.Builder builder = RedisCacheManager
            .RedisCacheManagerBuilder
            .fromConnectionFactory(redisConnectionFactory())
            .cacheDefaults(cacheConfiguration());
        return builder.build();
    }
    
    private CacheConfiguration cacheConfiguration() {
        return CacheConfiguration.defaultCacheConfig()
            .entryTtl(Duration.ofHours(1));
    }
}
```

### 12.2 数据库优化
- 合理设计数据库索引
- 使用连接池优化数据库连接
- SQL 优化，避免 N+1 查询问题

## 13. 重要说明

### 13.1 Spring Boot 3.x 兼容性
- 使用 `mybatis-plus-spring-boot3-starter` 而非 `mybatis-plus-boot-starter`
- 所有 `javax.*` 包名改为 `jakarta.*`（如 `javax.validation` → `jakarta.validation`）
- 确保DataSource配置正确，使用 `javax.sql.DataSource`

### 13.2 开发环境配置
- 开发环境使用 H2 内存数据库，无需额外配置
- H2 控制台可通过 `http://localhost:8080/h2-console` 访问
- 数据库连接信息：`jdbc:h2:mem:testdb`，用户名：`sa`，密码：空

### 13.3 API 文档
- 使用 Springdoc OpenAPI 生成 API 文档
- Swagger UI 访问地址：`http://localhost:8080/swagger-ui.html`
- OpenAPI JSON 访问地址：`http://localhost:8080/v3/api-docs`
