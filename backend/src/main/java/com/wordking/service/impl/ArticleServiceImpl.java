package com.wordking.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.wordking.entity.Article;
import com.wordking.mapper.ArticleMapper;
import com.wordking.service.ArticleService;
import com.wordking.dto.request.ArticleQuery;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ArticleServiceImpl extends ServiceImpl<ArticleMapper, Article> implements ArticleService {
    
    private final ArticleMapper articleMapper;
    
    @Override
    public IPage<Article> getArticles(ArticleQuery query) {
        // 构建查询条件
        LambdaQueryWrapper<Article> wrapper = new LambdaQueryWrapper<>();
        if (query.getKeyword() != null && !query.getKeyword().isEmpty()) {
            wrapper.and(w -> w.like(Article::getTitle, query.getKeyword())
                   .or()
                   .like(Article::getSummary, query.getKeyword())
                   .or()
                   .like(Article::getContent, query.getKeyword()));
        }
        if (query.getCategoryId() != null) {
            wrapper.eq(Article::getCategoryId, query.getCategoryId());
        }
        if (query.getAuthor() != null && !query.getAuthor().isEmpty()) {
            wrapper.eq(Article::getAuthor, query.getAuthor());
        }
        if (query.getStatus() != null) {
            wrapper.eq(Article::getStatus, query.getStatus());
        }
        
        // 分页查询
        Page<Article> page = new Page<>(query.getPage(), query.getSize());
        return articleMapper.selectPage(page, wrapper);
    }
    
    @Override
    public boolean createArticle(Article article) {
        return articleMapper.insert(article) > 0;
    }
    
    @Override
    public boolean updateArticle(Article article) {
        return articleMapper.updateById(article) > 0;
    }
    
    @Override
    public boolean deleteArticle(Long id) {
        return articleMapper.deleteById(id) > 0;
    }
    
    @Override
    public Article getById(Long id) {
        return articleMapper.selectById(id);
    }
}