package com.wordking.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.wordking.entity.Word;
import com.wordking.dto.request.WordQuery;

import java.util.List;

public interface WordService {
    /**
     * 获取词汇列表
     */
    IPage<Word> getWords(WordQuery query);
    
    /**
     * 创建词汇
     */
    boolean createWord(Word word);
    
    /**
     * 更新词汇
     */
    boolean updateWord(Word word);
    
    /**
     * 删除词汇
     */
    boolean deleteWord(Long id);
    
    /**
     * 根据ID获取词汇
     */
    Word getById(Long id);
    
    /**
     * 获取练习用词汇
     */
    List<Word> getPracticeWords(WordQuery query);
}