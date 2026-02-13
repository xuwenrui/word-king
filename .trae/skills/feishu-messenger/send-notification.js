const { sendTaskCompleteNotification } = require('./index.js');

// 测试的接收者ID（群组ID）
const RECEIVE_ID = 'oc_800bf2ea6f68216ca816fd64d8d6d906';

/**
 * 发送任务完成通知
 */
async function sendNotification() {
  console.log('🚀 发送任务完成通知');
  console.log('='.repeat(60));
  
  try {
    // 构建任务执行结果
    const taskResult = {
      tasks: [
        { name: '提交代码', status: 'completed' },
        { name: '同步飞书插件到所有分支', status: 'completed' },
        { name: '执行完通知给飞书', status: 'completed' }
      ],
      files: [
        '.trae/skills/feishu-messenger/index.js',
        '.trae/skills/feishu-messenger/package.json',
        '.trae/skills/feishu-messenger/test.js',
        '.trae/skills/feishu-messenger/send-notification.js'
      ],
      branches: [
        'main',
        'develop',
        'feature/backend-bot',
        'feature/frontend-bot',
        'feature/ui-desiger-bot',
        'feature/feishu-mcp-clean'
      ],
      status: 'success',
      message: '飞书通知技能已成功创建并集成到系统中，现在可以自动发送任务完成通知了！'
    };
    
    console.log(`📢 发送任务完成通知到飞书群组...`);
    console.log(`   群组ID: ${RECEIVE_ID}`);
    
    const result = await sendTaskCompleteNotification(RECEIVE_ID, taskResult);
    
    console.log('\n📋 发送结果');
    console.log('-'.repeat(40));
    
    if (result.success) {
      console.log('✅ 任务完成通知发送成功！');
      console.log(`   消息ID: ${result.data.message_id || 'N/A'}`);
      console.log('\n🎉 通知已成功发送到飞书群组！');
    } else {
      console.error('❌ 任务完成通知发送失败:', result.error);
    }
  } catch (error) {
    console.error('❌ 发送通知时出错:', error.message);
  }
  
  console.log('\n='.repeat(60));
  console.log('🎯 通知发送任务完成！');
  console.log('='.repeat(60));
}

// 执行发送通知
sendNotification().catch(console.error);
