package com.wordking.controller;

import com.wordking.dto.request.ArticleQuery;
import com.wordking.dto.response.Result;
import com.wordking.entity.Article;
import com.wordking.service.ArticleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/articles")
@RequiredArgsConstructor
public class ArticleController {
    
    private final ArticleService articleService;
    
    /**
     * 获取文章列表
     */
    @GetMapping
    public Result<?> getArticles(ArticleQuery query) {
        var articles = articleService.getArticles(query);
        return Result.success(articles);
    }
    
    /**
     * 创建文章
     */
    @PostMapping
    public Result<String> createArticle(@Valid @RequestBody Article article) {
        boolean success = articleService.createArticle(article);
        if (success) {
            return Result.success("创建成功");
        } else {
            return Result.error("创建失败");
        }
    }
    
    /**
     * 更新文章
     */
    @PutMapping("/{id}")
    public Result<String> updateArticle(@PathVariable Long id, 
                                        @Valid @RequestBody Article article) {
        article.setId(id);
        boolean success = articleService.updateArticle(article);
        if (success) {
            return Result.success("更新成功");
        } else {
            return Result.error("更新失败");
        }
    }
    
    /**
     * 删除文章
     */
    @DeleteMapping("/{id}")
    public Result<String> deleteArticle(@PathVariable Long id) {
        boolean success = articleService.deleteArticle(id);
        if (success) {
            return Result.success("删除成功");
        } else {
            return Result.error("删除失败");
        }
    }
    
    /**
     * 获取文章详情
     */
    @GetMapping("/{id}")
    public Result<Article> getArticle(@PathVariable Long id) {
        Article article = articleService.getById(id);
        if (article != null) {
            return Result.success(article);
        } else {
            return Result.error("文章不存在");
        }
    }
}