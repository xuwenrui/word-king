package com.wordking.dto.request;

import lombok.Data;

@Data
public class ArticleQuery {
    private Integer page = 1;
    private Integer size = 10;
    private String keyword;
    private Long categoryId;
    private String author;
    private Integer status;
}