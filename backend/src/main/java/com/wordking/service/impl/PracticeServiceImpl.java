package com.wordking.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.wordking.entity.PracticeSession;
import com.wordking.mapper.PracticeSessionMapper;
import com.wordking.service.PracticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class PracticeServiceImpl extends ServiceImpl<PracticeSessionMapper, PracticeSession> implements PracticeService {
    
    private final PracticeSessionMapper practiceSessionMapper;
    
    @Override
    public boolean createPracticeSession(PracticeSession session) {
        return practiceSessionMapper.insert(session) > 0;
    }
    
    @Override
    public boolean updatePracticeSession(PracticeSession session) {
        return practiceSessionMapper.updateById(session) > 0;
    }
    
    @Override
    public PracticeSession getById(Long id) {
        return practiceSessionMapper.selectById(id);
    }
}