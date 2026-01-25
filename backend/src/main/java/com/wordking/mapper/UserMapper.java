package com.wordking.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.wordking.entity.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper extends BaseMapper<User> {
    /**
     * 根据用户名查找用户
     */
    User findByUsername(String username);
}