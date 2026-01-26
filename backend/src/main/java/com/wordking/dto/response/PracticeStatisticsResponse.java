package com.wordking.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PracticeStatisticsResponse {
    private Integer totalSessions;
    private Integer totalQuestions;
    private Integer totalCorrect;
    private Integer totalWrong;
    private BigDecimal correctRate;
    private BigDecimal averageScore;
    private BigDecimal averageTimePerQuestion;
    private Integer mistakeCount;
    private Integer masteredWords;
    private Integer learningWords;
    private Integer newWords;
}
