package com.wordking.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.wordking.dto.request.PracticeAnswerQuery;
import com.wordking.dto.request.PracticeAnswerRequest;
import com.wordking.dto.request.PracticeSessionQuery;
import com.wordking.dto.response.MistakeResponse;
import com.wordking.dto.response.PracticeStatisticsResponse;
import com.wordking.entity.PracticeRecord;
import com.wordking.entity.PracticeSession;
import com.wordking.entity.Word;
import com.wordking.mapper.PracticeRecordMapper;
import com.wordking.mapper.PracticeSessionMapper;
import com.wordking.mapper.WordMapper;
import com.wordking.service.PracticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class PracticeServiceImpl extends ServiceImpl<PracticeSessionMapper, PracticeSession> implements PracticeService {
    
    private final PracticeSessionMapper practiceSessionMapper;
    private final PracticeRecordMapper practiceRecordMapper;
    private final WordMapper wordMapper;
    
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
    
    @Override
    public IPage<PracticeSession> getPracticeSessions(PracticeSessionQuery query) {
        LambdaQueryWrapper<PracticeSession> wrapper = new LambdaQueryWrapper<>();
        if (query.getUserId() != null) {
            wrapper.eq(PracticeSession::getUserId, query.getUserId());
        }
        if (query.getStatus() != null) {
            wrapper.eq(PracticeSession::getStatus, query.getStatus());
        }
        
        Page<PracticeSession> page = new Page<>(query.getPage(), query.getSize());
        return practiceSessionMapper.selectPage(page, wrapper);
    }
    
    @Override
    public PracticeRecord recordAnswer(PracticeAnswerRequest request) {
        PracticeRecord record = PracticeRecord.builder()
                .sessionId(request.getSessionId())
                .wordId(request.getWordId())
                .userAnswer(request.getUserAnswer())
                .isCorrect(request.getIsCorrect() ? 1 : 0)
                .answerTime(request.getAnswerTime() != null ? request.getAnswerTime().intValue() : null)
                .build();
        
        practiceRecordMapper.insert(record);
        return record;
    }
    
    @Override
    public IPage<PracticeRecord> getPracticeAnswers(PracticeAnswerQuery query) {
        LambdaQueryWrapper<PracticeRecord> wrapper = new LambdaQueryWrapper<>();
        if (query.getSessionId() != null) {
            wrapper.eq(PracticeRecord::getSessionId, query.getSessionId());
        }
        if (query.getIsCorrect() != null) {
            wrapper.eq(PracticeRecord::getIsCorrect, query.getIsCorrect() ? 1 : 0);
        }
        
        Page<PracticeRecord> page = new Page<>(query.getPage(), query.getSize());
        return practiceRecordMapper.selectPage(page, wrapper);
    }
    
    @Override
    public IPage<MistakeResponse> getMistakes(PracticeAnswerQuery query) {
        LambdaQueryWrapper<PracticeRecord> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(PracticeRecord::getIsCorrect, 0);
        
        if (query.getUserId() != null) {
            wrapper.in(PracticeRecord::getSessionId, 
                    practiceSessionMapper.selectList(
                            new LambdaQueryWrapper<PracticeSession>()
                                    .eq(PracticeSession::getUserId, query.getUserId())
                    ).stream().map(PracticeSession::getId).collect(Collectors.toList())
            );
        }
        if (query.getWordId() != null) {
            wrapper.eq(PracticeRecord::getWordId, query.getWordId());
        }
        
        wrapper.orderByDesc(PracticeRecord::getCreatedTime);
        
        Page<PracticeRecord> page = new Page<>(query.getPage(), query.getSize());
        IPage<PracticeRecord> records = practiceRecordMapper.selectPage(page, wrapper);
        
        Page<MistakeResponse> responsePage = new Page<>(records.getCurrent(), records.getSize(), records.getTotal());
        List<MistakeResponse> responses = records.getRecords().stream().map(record -> {
            Word word = wordMapper.selectById(record.getWordId());
            return MistakeResponse.builder()
                    .id(record.getId())
                    .userId(null)
                    .wordId(record.getWordId())
                    .word(word != null ? word.getWord() : "")
                    .correctAnswer(word != null ? word.getWord() : "")
                    .userAnswer(record.getUserAnswer())
                    .mistakeCount(1)
                    .lastMistakeTime(record.getCreatedTime())
                    .createdTime(record.getCreatedTime())
                    .build();
        }).collect(Collectors.toList());
        
        responsePage.setRecords(responses);
        return responsePage;
    }
    
    @Override
    public PracticeStatisticsResponse getStatistics(Long userId, String startDate, String endDate) {
        LambdaQueryWrapper<PracticeSession> sessionWrapper = new LambdaQueryWrapper<>();
        sessionWrapper.eq(PracticeSession::getUserId, userId);
        
        List<PracticeSession> sessions = practiceSessionMapper.selectList(sessionWrapper);
        
        LambdaQueryWrapper<PracticeRecord> recordWrapper = new LambdaQueryWrapper<>();
        recordWrapper.in(PracticeRecord::getSessionId, 
                sessions.stream().map(PracticeSession::getId).collect(Collectors.toList())
        );
        
        List<PracticeRecord> records = practiceRecordMapper.selectList(recordWrapper);
        
        int totalSessions = sessions.size();
        int totalQuestions = records.size();
        int totalCorrect = (int) records.stream().filter(r -> r.getIsCorrect() == 1).count();
        int totalWrong = totalQuestions - totalCorrect;
        
        BigDecimal correctRate = totalQuestions > 0 
                ? new BigDecimal(totalCorrect).multiply(new BigDecimal(100))
                        .divide(new BigDecimal(totalQuestions), 1, RoundingMode.HALF_UP)
                : BigDecimal.ZERO;
        
        BigDecimal averageScore = sessions.stream()
                .map(PracticeSession::getScore)
                .filter(score -> score != null)
                .reduce(BigDecimal.ZERO, BigDecimal::add)
                .divide(new BigDecimal(totalSessions > 0 ? totalSessions : 1), 1, RoundingMode.HALF_UP);
        
        double averageTime = records.stream()
                .filter(r -> r.getAnswerTime() != null)
                .mapToInt(PracticeRecord::getAnswerTime)
                .average()
                .orElse(0.0);
        
        return PracticeStatisticsResponse.builder()
                .totalSessions(totalSessions)
                .totalQuestions(totalQuestions)
                .totalCorrect(totalCorrect)
                .totalWrong(totalWrong)
                .correctRate(correctRate)
                .averageScore(averageScore)
                .averageTimePerQuestion(BigDecimal.valueOf(averageTime).setScale(1, RoundingMode.HALF_UP))
                .mistakeCount(totalWrong)
                .masteredWords(0)
                .learningWords(0)
                .newWords(0)
                .build();
    }
}