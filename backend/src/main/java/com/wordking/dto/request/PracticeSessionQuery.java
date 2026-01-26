package com.wordking.dto.request;

import lombok.Data;

@Data
public class PracticeSessionQuery {
    private Integer page = 1;
    private Integer size = 10;
    private Long userId;
    private String practiceMode;
    private Integer status;
}
