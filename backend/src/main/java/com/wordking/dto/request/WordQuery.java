package com.wordking.dto.request;

import lombok.Data;

@Data
public class WordQuery {
    private Integer page = 1;
    private Integer size = 10;
    private String keyword;
    private Integer difficulty;
    private Long categoryId;
    private Integer count;  // 用于练习时指定词汇数量
}