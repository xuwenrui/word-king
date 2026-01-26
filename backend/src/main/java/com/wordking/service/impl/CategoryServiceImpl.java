package com.wordking.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.wordking.dto.request.CategoryRequest;
import com.wordking.entity.Category;
import com.wordking.mapper.CategoryMapper;
import com.wordking.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class CategoryServiceImpl extends ServiceImpl<CategoryMapper, Category> implements CategoryService {
    
    private final CategoryMapper categoryMapper;
    
    @Override
    public IPage<Category> getCategoriesByType(String type, Integer page, Integer size) {
        LambdaQueryWrapper<Category> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Category::getType, type);
        
        Page<Category> pageObj = new Page<>(page, size);
        return categoryMapper.selectPage(pageObj, wrapper);
    }
    
    @Override
    public boolean createCategory(String type, CategoryRequest request) {
        Category category = Category.builder()
                .name(request.getName())
                .description(request.getDescription())
                .type(type)
                .wordCount(0)
                .articleCount(0)
                .build();
        
        return categoryMapper.insert(category) > 0;
    }
    
    @Override
    public boolean updateCategory(Long id, CategoryRequest request) {
        Category category = categoryMapper.selectById(id);
        if (category == null) {
            return false;
        }
        
        category.setName(request.getName());
        category.setDescription(request.getDescription());
        
        return categoryMapper.updateById(category) > 0;
    }
    
    @Override
    public boolean deleteCategory(Long id) {
        return categoryMapper.deleteById(id) > 0;
    }
    
    @Override
    public Category getById(Long id) {
        return categoryMapper.selectById(id);
    }
}
