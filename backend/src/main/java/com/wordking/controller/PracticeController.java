package com.wordking.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.wordking.dto.request.PracticeAnswerQuery;
import com.wordking.dto.request.PracticeAnswerRequest;
import com.wordking.dto.request.PracticeSessionQuery;
import com.wordking.dto.response.MistakeResponse;
import com.wordking.dto.response.PracticeStatisticsResponse;
import com.wordking.dto.response.Result;
import com.wordking.entity.PracticeRecord;
import com.wordking.entity.PracticeSession;
import com.wordking.service.PracticeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    
    /**
     * 获取练习会话列表
     */
    @GetMapping("/sessions")
    public Result<IPage<PracticeSession>> getPracticeSessions(PracticeSessionQuery query) {
        IPage<PracticeSession> sessions = practiceService.getPracticeSessions(query);
        return Result.success(sessions);
    }
    
    /**
     * 记录练习答案
     */
    @PostMapping("/answers")
    public Result<PracticeRecord> recordAnswer(@Valid @RequestBody PracticeAnswerRequest request) {
        PracticeRecord record = practiceService.recordAnswer(request);
        if (record != null) {
            return Result.success("答案记录成功", record);
        } else {
            return Result.error("答案记录失败");
        }
    }
    
    /**
     * 获取练习答案列表
     */
    @GetMapping("/answers")
    public Result<IPage<PracticeRecord>> getPracticeAnswers(PracticeAnswerQuery query) {
        IPage<PracticeRecord> answers = practiceService.getPracticeAnswers(query);
        return Result.success(answers);
    }
    
    /**
     * 获取错题列表
     */
    @GetMapping("/mistakes")
    public Result<IPage<MistakeResponse>> getMistakes(PracticeAnswerQuery query) {
        IPage<MistakeResponse> mistakes = practiceService.getMistakes(query);
        return Result.success(mistakes);
    }
    
    /**
     * 获取练习统计信息
     */
    @GetMapping("/statistics")
    public Result<PracticeStatisticsResponse> getStatistics(@RequestParam Long userId,
                                                             @RequestParam(required = false) String startDate,
                                                             @RequestParam(required = false) String endDate) {
        PracticeStatisticsResponse statistics = practiceService.getStatistics(userId, startDate, endDate);
        return Result.success(statistics);
    }
}