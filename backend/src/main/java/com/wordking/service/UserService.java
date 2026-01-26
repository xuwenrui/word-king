package com.wordking.service;

import com.wordking.dto.request.LoginRequest;
import com.wordking.dto.response.LoginResponse;
import com.wordking.dto.response.UserProgressResponse;
import com.wordking.entity.User;

public interface UserService {
    /**
     * 根据用户名查找用户
     */
    User findByUsername(String username);
    
    /**
     * 用户登录
     */
    LoginResponse login(LoginRequest request);
    
    /**
     * 创建用户
     */
    boolean createUser(User user);
    
    /**
     * 更新用户
     */
    boolean updateUser(User user);
    
    /**
     * 删除用户
     */
    boolean deleteUser(Long id);
    
    /**
     * 根据ID获取用户
     */
    User getById(Long id);
    
    /**
     * 获取用户学习进度
     */
    UserProgressResponse getUserProgress(Long id);
}