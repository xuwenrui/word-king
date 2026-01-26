package com.wordking.dto.request;

import lombok.Data;

@Data
public class PracticeAnswerQuery {
    private Integer page = 1;
    private Integer size = 10;
    private Long sessionId;
    private Long userId;
    private Long wordId;
    private Boolean isCorrect;
}
