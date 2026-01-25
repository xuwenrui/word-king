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
@TableName("T_WORD")
public class Word {
    @TableId(type = IdType.AUTO)
    private Long id;
    
    @NotBlank(message = "词汇不能为空")
    @TableField("WORD")
    private String word;
    
    @TableField("PHONETIC")
    private String phonetic;
    
    @TableField("MEANING")
    private String meaning;
    
    @TableField("PART_OF_SPEECH")
    private String partOfSpeech;
    
    @TableField("EXAMPLE")
    private String example;
    
    @TableField("DIFFICULTY")
    private Integer difficulty;
    
    @TableField("CATEGORY_ID")
    private Long categoryId;
    
    @TableField(value = "CREATED_TIME", fill = FieldFill.INSERT)
    private LocalDateTime createdTime;
    
    @TableField(value = "UPDATED_TIME", fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updatedTime;
}