package com.wordking.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.wordking.entity.Article;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ArticleMapper extends BaseMapper<Article> {
    /**
     * 根据分类获取文章
     */
    List<Article> selectByCategory(@Param("categoryId") Long categoryId);
    
    /**
     * 模糊搜索文章
     */
    List<Article> selectByKeyword(@Param("keyword") String keyword);
    
    /**
     * 根据作者获取文章
     */
    List<Article> selectByAuthor(@Param("author") String author);
}