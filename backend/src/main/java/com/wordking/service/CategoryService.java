package com.wordking.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.wordking.dto.request.CategoryRequest;
import com.wordking.entity.Category;

public interface CategoryService {
    /**
     * 根据类型获取分类列表
     */
    IPage<Category> getCategoriesByType(String type, Integer page, Integer size);
    
    /**
     * 创建分类
     */
    boolean createCategory(String type, CategoryRequest request);
    
    /**
     * 更新分类
     */
    boolean updateCategory(Long id, CategoryRequest request);
    
    /**
     * 删除分类
     */
    boolean deleteCategory(Long id);
    
    /**
     * 根据ID获取分类
     */
    Category getById(Long id);
}
