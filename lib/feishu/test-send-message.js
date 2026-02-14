#!/usr/bin/env node

/**
 * 测试飞书消息发送
 * 
 * 这个脚本用于测试飞书消息发送功能，找出为什么现在没有收到飞书消息的原因。
 */

import FeishuMessenger from './src/messenger.js';

console.log('🚀 测试飞书消息发送');
console.log('='.repeat(60));

// 创建飞书客户端实例
const messenger = new FeishuMessenger();

// 测试的接收者ID（群组ID）
const RECEIVE_ID = 'oc_800bf2ea6f68216ca816fd64d8d6d906';

/**
 * 测试消息发送
 */
async function testMessageSend() {
  console.log(`\n📢 测试发送消息到飞书群组...`);
  console.log(`   群组ID: ${RECEIVE_ID}`);
  console.log(`   App ID: ${messenger.appId}`);
  console.log(`   App Secret: ${messenger.appSecret ? messenger.appSecret.slice(0, 10) + '...' : 'N/A'}`);
  
  try {
    // 测试获取租户访问令牌
    console.log('\n📝 测试获取租户访问令牌...');
    const token = await messenger.getTenantAccessToken();
    console.log(`✅ 租户访问令牌获取成功！`);
    console.log(`   Token: ${token.slice(0, 30)}...`);
    
    // 测试发送文本消息
    console.log('\n📝 测试发送文本消息...');
    const textMessage = `测试消息\n\n**测试时间**: ${new Date().toLocaleString()}\n**测试内容**: 飞书消息发送功能测试\n**测试状态**: 正常`;
    const sendResult = await messenger.sendTextMessage(RECEIVE_ID, textMessage);
    
    console.log('\n📋 发送结果');
    console.log('-'.repeat(40));
    
    if (sendResult.success) {
      console.log('✅ 消息发送成功！');
      console.log(`   消息ID: ${sendResult.data.message_id || 'N/A'}`);
      console.log(`   响应代码: ${sendResult.data.code || 'N/A'}`);
      console.log(`   响应消息: ${sendResult.data.msg || 'ok'}`);
      console.log('\n🎉 消息已成功发送到飞书群组！');
    } else {
      console.error('❌ 消息发送失败:', sendResult.error);
      console.log('\n⚠️  消息发送失败，请检查飞书配置。');
    }
  } catch (error) {
    console.error('❌ 测试出错:', error.message);
    console.error('错误详情:', error);
    console.log('\n⚠️  测试失败，请检查飞书配置。');
  }
  
  console.log('\n='.repeat(60));
  console.log('🎯 测试完成！');
  console.log('='.repeat(60));
}

// 执行测试
testMessageSend().catch(console.error);
