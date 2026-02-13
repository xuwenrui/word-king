#!/usr/bin/env node

/**
 * 飞书文本消息测试脚本
 * 
 * 这个脚本用于测试飞书MCP服务器是否可以正常发送文本消息。
 * 它会发送一条简单的文本消息到飞书群组。
 */

import FeishuMessenger from './src/messenger.js';

console.log('🚀 飞书文本消息测试');
console.log('='.repeat(60));

// 创建飞书客户端实例
const messenger = new FeishuMessenger();

// 测试的接收者ID（群组ID）
const RECEIVE_ID = 'oc_800bf2ea6f68216ca816fd64d8d6d906';

/**
 * 发送测试文本消息
 */
async function sendTestTextMessage() {
  console.log(`\n📢 发送测试文本消息到飞书群组...`);
  console.log(`   群组ID: ${RECEIVE_ID}`);
  
  try {
    // 准备消息内容
    const messageContent = `飞书MCP功能测试消息\n` +
                          `发送时间: ${new Date().toLocaleString()}\n` +
                          `测试目的: 验证飞书消息发送功能是否正常\n` +
                          `测试编号: TEST-${Date.now()}\n` +
                          `消息类型: 文本消息\n` +
                          `服务器状态: ✅ 运行中\n` +
                          `请确认是否收到此消息`;
    
    // 发送文本消息
    console.log('\n📝 正在发送消息...');
    const sendResult = await messenger.sendTextMessage(RECEIVE_ID, messageContent);
    
    console.log('\n📋 发送结果');
    console.log('-'.repeat(40));
    
    if (sendResult.success) {
      console.log('✅ 消息发送成功！');
      console.log(`   消息ID: ${sendResult.data.message_id || 'N/A'}`);
      console.log(`   响应代码: ${sendResult.data.code || 'N/A'}`);
      console.log(`   响应消息: ${sendResult.data.msg || 'N/A'}`);
      console.log('\n🎉 请检查飞书群组是否收到消息！');
      
      return true;
    } else {
      console.error('❌ 消息发送失败:', sendResult.error);
      console.log('\n🔧 错误信息:');
      console.log(JSON.stringify(sendResult.error, null, 2));
      return false;
    }
    
  } catch (error) {
    console.error('❌ 发送消息时出错:', error.message);
    console.error('错误堆栈:', error.stack);
    return false;
  }
}

/**
 * 测试飞书API连接
 */
async function testFeishuConnection() {
  console.log('\n🔗 测试飞书API连接...');
  
  try {
    const token = await messenger.getTenantAccessToken();
    console.log('✅ 飞书API连接成功！');
    console.log(`   Token获取成功: ${token.slice(0, 20)}...`);
    return true;
  } catch (error) {
    console.error('❌ 飞书API连接失败:', error.message);
    return false;
  }
}

/**
 * 主函数
 */
async function main() {
  console.log('🎯 测试飞书文本消息发送');
  console.log('='.repeat(60));
  
  // 1. 测试飞书API连接
  const connectionTest = await testFeishuConnection();
  
  if (!connectionTest) {
    console.log('\n❌ API连接测试失败，无法发送消息');
    return;
  }
  
  // 2. 发送测试文本消息
  const messageSent = await sendTestTextMessage();
  
  // 3. 测试结果
  console.log('\n📋 最终测试结果');
  console.log('-'.repeat(40));
  
  if (messageSent) {
    console.log('✅ 测试完成！');
    console.log('   - 飞书API连接正常');
    console.log('   - 文本消息发送成功');
    console.log('   - 请检查飞书群组是否收到消息');
  } else {
    console.log('❌ 测试失败！');
    console.log('   - 飞书API连接正常');
    console.log('   - 文本消息发送失败');
    console.log('   - 请检查错误信息并排查问题');
  }
  
  console.log('\n🔧 排查建议');
  console.log('-'.repeat(40));
  console.log('1. 检查飞书应用权限是否正确配置');
  console.log('2. 确认群组ID是否正确');
  console.log('3. 验证网络连接是否正常');
  console.log('4. 检查飞书应用是否已发布');
  console.log('5. 查看飞书开发者后台的API调用记录');
  
  console.log('\n='.repeat(60));
  console.log('🎯 测试完成！');
  console.log('='.repeat(60));
}

// 执行主函数
main().catch(error => {
  console.error('❌ 测试过程中出错:', error);
  process.exit(1);
});
