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
@TableName("T_PRACTICE_RECORD")
public class PracticeRecord {
    @TableId(type = IdType.AUTO)
    private Long id;
    
    @TableField("SESSION_ID")
    private Long sessionId;
    
    @TableField("WORD_ID")
    private Long wordId;
    
    @TableField("USER_ANSWER")
    private String userAnswer;
    
    @TableField("IS_CORRECT")
    private Integer isCorrect;
    
    @TableField("ANSWER_TIME")
    private Integer answerTime;  // 以秒为单位
    
    @TableField(value = "CREATED_TIME", fill = FieldFill.INSERT)
    private LocalDateTime createdTime;
}