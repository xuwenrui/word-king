package com.wordking.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.wordking.entity.Article;
import com.wordking.dto.request.ArticleQuery;

public interface ArticleService {
    /**
     * 获取文章列表
     */
    IPage<Article> getArticles(ArticleQuery query);
    
    /**
     * 创建文章
     */
    boolean createArticle(Article article);
    
    /**
     * 更新文章
     */
    boolean updateArticle(Article article);
    
    /**
     * 删除文章
     */
    boolean deleteArticle(Long id);
    
    /**
     * 根据ID获取文章
     */
    Article getById(Long id);
}