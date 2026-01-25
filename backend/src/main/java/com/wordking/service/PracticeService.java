package com.wordking.service;

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
}