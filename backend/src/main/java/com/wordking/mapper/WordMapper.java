package com.wordking.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.wordking.entity.Word;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

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