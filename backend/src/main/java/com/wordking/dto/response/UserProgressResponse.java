package com.wordking.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserProgressResponse {
    private Long userId;
    private Integer totalWords;
    private Integer masteredWords;
    private Integer learningWords;
    private Integer newWords;
    private Integer totalArticles;
    private Integer readArticles;
    private Integer totalPracticeSessions;
    private BigDecimal averageScore;
    private Integer studyDays;
    private LocalDateTime lastStudyDate;
}
