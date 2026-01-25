package com.wordking.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.wordking.entity.User;
import com.wordking.mapper.UserMapper;
import com.wordking.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {
    
    private final UserMapper userMapper;
    
    @Override
    public User findByUsername(String username) {
        return userMapper.findByUsername(username);
    }
    
    @Override
    public boolean createUser(User user) {
        return userMapper.insert(user) > 0;
    }
    
    @Override
    public boolean updateUser(User user) {
        return userMapper.updateById(user) > 0;
    }
    
    @Override
    public boolean deleteUser(Long id) {
        return userMapper.deleteById(id) > 0;
    }
    
    @Override
    public User getById(Long id) {
        return userMapper.selectById(id);
    }
}