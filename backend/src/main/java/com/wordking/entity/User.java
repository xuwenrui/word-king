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
@TableName("T_USER")
public class User {
    @TableId(type = IdType.AUTO)
    private Long id;
    
    @NotBlank(message = "用户名不能为空")
    @TableField("USERNAME")
    private String username;
    
    @TableField("PASSWORD")
    private String password;
    
    @TableField("EMAIL")
    private String email;
    
    @TableField("NICKNAME")
    private String nickname;
    
    @TableField("STATUS")
    private Integer status;
    
    @TableField(value = "CREATED_TIME", fill = FieldFill.INSERT)
    private LocalDateTime createdTime;
    
    @TableField(value = "UPDATED_TIME", fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updatedTime;
}