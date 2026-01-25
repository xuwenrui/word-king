package com.wordking.controller;

import com.wordking.dto.response.Result;
import com.wordking.entity.PracticeSession;
import com.wordking.service.PracticeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/practice")
@RequiredArgsConstructor
public class PracticeController {
    
    private final PracticeService practiceService;
    
    /**
     * 开始练习会话
     */
    @PostMapping("/sessions")
    public Result<String> startPractice(@Valid @RequestBody PracticeSession session) {
        boolean success = practiceService.createPracticeSession(session);
        if (success) {
            return Result.success("练习会话创建成功");
        } else {
            return Result.error("练习会话创建失败");
        }
    }
    
    /**
     * 更新练习会话
     */
    @PutMapping("/sessions/{id}")
    public Result<String> updatePractice(@PathVariable Long id, 
                                         @Valid @RequestBody PracticeSession session) {
        session.setId(id);
        boolean success = practiceService.updatePracticeSession(session);
        if (success) {
            return Result.success("练习会话更新成功");
        } else {
            return Result.error("练习会话更新失败");
        }
    }
    
    /**
     * 获取练习会话详情
     */
    @GetMapping("/sessions/{id}")
    public Result<PracticeSession> getPracticeSession(@PathVariable Long id) {
        PracticeSession session = practiceService.getById(id);
        if (session != null) {
            return Result.success(session);
        } else {
            return Result.error("练习会话不存在");
        }
    }
}