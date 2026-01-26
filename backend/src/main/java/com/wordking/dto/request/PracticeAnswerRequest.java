package com.wordking.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PracticeAnswerRequest {
    @NotNull(message = "练习会话ID不能为空")
    private Long sessionId;
    
    @NotNull(message = "用户ID不能为空")
    private Long userId;
    
    @NotNull(message = "词汇ID不能为空")
    private Long wordId;
    
    @NotNull(message = "用户答案不能为空")
    private String userAnswer;
    
    @NotNull(message = "是否正确不能为空")
    private Boolean isCorrect;
    
    private Double answerTime;
    
    private String practiceMode;
}
