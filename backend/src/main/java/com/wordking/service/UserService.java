package com.wordking.service;

import com.wordking.entity.User;

public interface UserService {
    /**
     * 根据用户名查找用户
     */
    User findByUsername(String username);
    
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
}