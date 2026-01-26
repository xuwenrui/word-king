package com.wordking.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MistakeResponse {
    private Long id;
    private Long userId;
    private Long wordId;
    private String word;
    private String correctAnswer;
    private String userAnswer;
    private Integer mistakeCount;
    private LocalDateTime lastMistakeTime;
    private LocalDateTime createdTime;
}
