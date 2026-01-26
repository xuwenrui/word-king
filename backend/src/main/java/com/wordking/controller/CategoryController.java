package com.wordking.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.wordking.dto.request.CategoryRequest;
import com.wordking.dto.response.Result;
import com.wordking.entity.Category;
import com.wordking.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {
    
    private final CategoryService categoryService;
    
    /**
     * 获取词汇分类列表
     */
    @GetMapping("/word")
    public Result<IPage<Category>> getWordCategories(@RequestParam(defaultValue = "1") Integer page,
                                                     @RequestParam(defaultValue = "10") Integer size) {
        IPage<Category> categories = categoryService.getCategoriesByType("word", page, size);
        return Result.success(categories);
    }
    
    /**
     * 创建词汇分类
     */
    @PostMapping("/word")
    public Result<String> createWordCategory(@Valid @RequestBody CategoryRequest request) {
        boolean success = categoryService.createCategory("word", request);
        if (success) {
            return Result.success("创建成功");
        } else {
            return Result.error("创建失败");
        }
    }
    
    /**
     * 更新词汇分类
     */
    @PutMapping("/word/{id}")
    public Result<String> updateWordCategory(@PathVariable Long id,
                                             @Valid @RequestBody CategoryRequest request) {
        boolean success = categoryService.updateCategory(id, request);
        if (success) {
            return Result.success("更新成功");
        } else {
            return Result.error("更新失败");
        }
    }
    
    /**
     * 删除词汇分类
     */
    @DeleteMapping("/word/{id}")
    public Result<String> deleteWordCategory(@PathVariable Long id) {
        boolean success = categoryService.deleteCategory(id);
        if (success) {
            return Result.success("删除成功");
        } else {
            return Result.error("删除失败");
        }
    }
    
    /**
     * 获取文章分类列表
     */
    @GetMapping("/article")
    public Result<IPage<Category>> getArticleCategories(@RequestParam(defaultValue = "1") Integer page,
                                                       @RequestParam(defaultValue = "10") Integer size) {
        IPage<Category> categories = categoryService.getCategoriesByType("article", page, size);
        return Result.success(categories);
    }
    
    /**
     * 创建文章分类
     */
    @PostMapping("/article")
    public Result<String> createArticleCategory(@Valid @RequestBody CategoryRequest request) {
        boolean success = categoryService.createCategory("article", request);
        if (success) {
            return Result.success("创建成功");
        } else {
            return Result.error("创建失败");
        }
    }
    
    /**
     * 更新文章分类
     */
    @PutMapping("/article/{id}")
    public Result<String> updateArticleCategory(@PathVariable Long id,
                                               @Valid @RequestBody CategoryRequest request) {
        boolean success = categoryService.updateCategory(id, request);
        if (success) {
            return Result.success("更新成功");
        } else {
            return Result.error("更新失败");
        }
    }
    
    /**
     * 删除文章分类
     */
    @DeleteMapping("/article/{id}")
    public Result<String> deleteArticleCategory(@PathVariable Long id) {
        boolean success = categoryService.deleteCategory(id);
        if (success) {
            return Result.success("删除成功");
        } else {
            return Result.error("删除失败");
        }
    }
}
