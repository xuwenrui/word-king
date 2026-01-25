package com.wordking.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@TableName("T_PRACTICE_SESSION")
public class PracticeSession {
    @TableId(type = IdType.AUTO)
    private Long id;
    
    @TableField("USER_ID")
    private Long userId;
    
    @TableField("WORD_IDS")
    private String wordIds;  // 以逗号分隔的词汇ID列表
    
    @TableField("TOTAL_QUESTIONS")
    private Integer totalQuestions;
    
    @TableField("CORRECT_ANSWERS")
    private Integer correctAnswers;
    
    @TableField("SCORE")
    private BigDecimal score;
    
    @TableField("START_TIME")
    private LocalDateTime startTime;
    
    @TableField("END_TIME")
    private LocalDateTime endTime;
    
    @TableField("STATUS")
    private Integer status;
    
    @TableField(value = "CREATED_TIME", fill = FieldFill.INSERT)
    private LocalDateTime createdTime;
    
    @TableField(value = "UPDATED_TIME", fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updatedTime;
}