package com.wordking.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.wordking.dto.response.PronunciationResponse;
import com.wordking.entity.Word;
import com.wordking.mapper.WordMapper;
import com.wordking.service.WordService;
import com.wordking.dto.request.WordQuery;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class WordServiceImpl extends ServiceImpl<WordMapper, Word> implements WordService {
    
    private final WordMapper wordMapper;
    
    @Override
    public IPage<Word> getWords(WordQuery query) {
        // 构建查询条件
        LambdaQueryWrapper<Word> wrapper = new LambdaQueryWrapper<>();
        if (query.getKeyword() != null && !query.getKeyword().isEmpty()) {
            wrapper.and(w -> w.like(Word::getWord, query.getKeyword())
                   .or()
                   .like(Word::getMeaning, query.getKeyword()));
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
    
    @Override
    public boolean createWord(Word word) {
        return wordMapper.insert(word) > 0;
    }
    
    @Override
    public boolean updateWord(Word word) {
        return wordMapper.updateById(word) > 0;
    }
    
    @Override
    public boolean deleteWord(Long id) {
        return wordMapper.deleteById(id) > 0;
    }
    
    @Override
    public Word getById(Long id) {
        return wordMapper.selectById(id);
    }
    
    @Override
    public List<Word> getPracticeWords(WordQuery query) {
        // 如果没有指定数量，默认返回10个
        Integer count = query.getCount() != null ? query.getCount() : 10;
        return wordMapper.selectRandomWords(query.getDifficulty(), count);
    }
    
    @Override
    public PronunciationResponse getPronunciation(Long id) {
        Word word = wordMapper.selectById(id);
        if (word == null) {
            return null;
        }
        return PronunciationResponse.builder()
                .wordId(word.getId())
                .audioUrl("/api/words/" + word.getId() + "/audio")
                .phonetic(word.getPhonetic())
                .build();
    }
}