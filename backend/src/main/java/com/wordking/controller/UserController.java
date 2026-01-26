package com.wordking.controller;

import com.wordking.dto.request.LoginRequest;
import com.wordking.dto.response.LoginResponse;
import com.wordking.dto.response.Result;
import com.wordking.dto.response.UserProgressResponse;
import com.wordking.entity.User;
import com.wordking.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    
    private final UserService userService;
    
    /**
     * 用户登录
     */
    @PostMapping("/login")
    public Result<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = userService.login(request);
        if (response != null) {
            return Result.success("登录成功", response);
        } else {
            return Result.error("用户名或密码错误");
        }
    }
    
    /**
     * 获取用户信息
     */
    @GetMapping("/{id}")
    public Result<User> getUser(@PathVariable Long id) {
        User user = userService.getById(id);
        if (user != null) {
            return Result.success(user);
        } else {
            return Result.error("用户不存在");
        }
    }
    
    /**
     * 创建用户
     */
    @PostMapping
    public Result<String> createUser(@Valid @RequestBody User user) {
        boolean success = userService.createUser(user);
        if (success) {
            return Result.success("创建成功");
        } else {
            return Result.error("创建失败");
        }
    }
    
    /**
     * 更新用户
     */
    @PutMapping("/{id}")
    public Result<String> updateUser(@PathVariable Long id, 
                                     @Valid @RequestBody User user) {
        user.setId(id);
        boolean success = userService.updateUser(user);
        if (success) {
            return Result.success("更新成功");
        } else {
            return Result.error("更新失败");
        }
    }
    
    /**
     * 删除用户
     */
    @DeleteMapping("/{id}")
    public Result<String> deleteUser(@PathVariable Long id) {
        boolean success = userService.deleteUser(id);
        if (success) {
            return Result.success("删除成功");
        } else {
            return Result.error("删除失败");
        }
    }
    
    /**
     * 获取用户学习进度
     */
    @GetMapping("/{id}/progress")
    public Result<UserProgressResponse> getUserProgress(@PathVariable Long id) {
        UserProgressResponse progress = userService.getUserProgress(id);
        if (progress != null) {
            return Result.success(progress);
        } else {
            return Result.error("用户不存在");
        }
    }
}