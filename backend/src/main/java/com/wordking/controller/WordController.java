package com.wordking.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.wordking.dto.request.WordQuery;
import com.wordking.dto.response.Result;
import com.wordking.entity.Word;
import com.wordking.service.WordService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/words")
@RequiredArgsConstructor
public class WordController {
    
    private final WordService wordService;
    
    /**
     * 获取词汇列表
     */
    @GetMapping
    public Result<?> getWords(WordQuery query) {
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
    public Result<List<Word>> getPracticeWords(WordQuery query) {
        List<Word> words = wordService.getPracticeWords(query);
        return Result.success(words);
    }
}