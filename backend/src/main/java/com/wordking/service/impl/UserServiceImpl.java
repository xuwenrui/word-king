package com.wordking.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.wordking.dto.request.LoginRequest;
import com.wordking.dto.response.LoginResponse;
import com.wordking.dto.response.UserProgressResponse;
import com.wordking.entity.User;
import com.wordking.mapper.UserMapper;
import com.wordking.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;

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
    public LoginResponse login(LoginRequest request) {
        User user = findByUsername(request.getUsername());
        if (user != null && user.getPassword().equals(request.getPassword())) {
            return LoginResponse.builder()
                    .token("dummy-token-" + user.getId())
                    .userId(user.getId())
                    .username(user.getUsername())
                    .nickname(user.getNickname())
                    .email(user.getEmail())
                    .build();
        }
        return null;
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
    
    @Override
    public UserProgressResponse getUserProgress(Long id) {
        User user = getById(id);
        if (user == null) {
            return null;
        }
        
        return UserProgressResponse.builder()
                .userId(user.getId())
                .totalWords(0)
                .masteredWords(0)
                .learningWords(0)
                .newWords(0)
                .totalArticles(0)
                .readArticles(0)
                .totalPracticeSessions(0)
                .averageScore(BigDecimal.ZERO.setScale(1, RoundingMode.HALF_UP))
                .studyDays(0)
                .lastStudyDate(LocalDateTime.now())
                .build();
    }
}