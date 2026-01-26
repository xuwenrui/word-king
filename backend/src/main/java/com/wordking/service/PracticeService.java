package com.wordking.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.wordking.dto.request.PracticeAnswerQuery;
import com.wordking.dto.request.PracticeAnswerRequest;
import com.wordking.dto.request.PracticeSessionQuery;
import com.wordking.dto.response.MistakeResponse;
import com.wordking.dto.response.PracticeStatisticsResponse;
import com.wordking.entity.PracticeRecord;
import com.wordking.entity.PracticeSession;

public interface PracticeService {
    /**
     * 创建练习会话
     */
    boolean createPracticeSession(PracticeSession session);
    
    /**
     * 更新练习会话
     */
    boolean updatePracticeSession(PracticeSession session);
    
    /**
     * 根据ID获取练习会话
     */
    PracticeSession getById(Long id);
    
    /**
     * 获取练习会话列表
     */
    IPage<PracticeSession> getPracticeSessions(PracticeSessionQuery query);
    
    /**
     * 记录练习答案
     */
    PracticeRecord recordAnswer(PracticeAnswerRequest request);
    
    /**
     * 获取练习答案列表
     */
    IPage<PracticeRecord> getPracticeAnswers(PracticeAnswerQuery query);
    
    /**
     * 获取错题列表
     */
    IPage<MistakeResponse> getMistakes(PracticeAnswerQuery query);
    
    /**
     * 获取练习统计信息
     */
    PracticeStatisticsResponse getStatistics(Long userId, String startDate, String endDate);
}