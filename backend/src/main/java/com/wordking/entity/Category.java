package com.wordking.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@TableName("T_CATEGORY")
public class Category {
    @TableId(type = IdType.AUTO)
    private Long id;
    
    @TableField("NAME")
    private String name;
    
    @TableField("DESCRIPTION")
    private String description;
    
    @TableField("TYPE")
    private String type;
    
    @TableField("WORD_COUNT")
    private Integer wordCount;
    
    @TableField("ARTICLE_COUNT")
    private Integer articleCount;
    
    @TableField(value = "CREATED_TIME", fill = FieldFill.INSERT)
    private LocalDateTime createdTime;
    
    @TableField(value = "UPDATED_TIME", fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updatedTime;
}
