package com.wordking.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@TableName("T_ARTICLE")
public class Article {
    @TableId(type = IdType.AUTO)
    private Long id;
    
    @NotBlank(message = "标题不能为空")
    @TableField("TITLE")
    private String title;
    
    @TableField("CONTENT")
    private String content;
    
    @TableField("SUMMARY")
    private String summary;
    
    @TableField("CATEGORY_ID")
    private Long categoryId;
    
    @TableField("AUTHOR")
    private String author;
    
    @TableField("STATUS")
    private Integer status;
    
    @TableField(value = "CREATED_TIME", fill = FieldFill.INSERT)
    private LocalDateTime createdTime;
    
    @TableField(value = "UPDATED_TIME", fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updatedTime;
}