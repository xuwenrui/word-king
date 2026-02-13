console.log('Testing Feishu Messenger with configured credentials...\n');

import FeishuMessenger from '../src/messenger.js';

const messenger = new FeishuMessenger();

console.log('Configuration:');
console.log(`  App ID: ${messenger.appId ? messenger.appId.slice(0, 10) + '...' : 'Not configured'}`);
console.log(`  App Secret: ${messenger.appSecret ? messenger.appSecret.slice(0, 10) + '...' : 'Not configured'}`);
console.log();

if (!messenger.appId || !messenger.appSecret) {
  console.error('❌ Error: FEISHU_APP_ID and FEISHU_APP_SECRET must be configured');
  console.log();
  console.log('Please set environment variables in lib/feishu/.env:');
  console.log('  FEISHU_APP_ID=cli_xxxxxxxxxxxxxxxx');
  console.log('  FEISHU_APP_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
  process.exit(1);
}

console.log('Test 1: Get Tenant Access Token...');
try {
  const token = await messenger.getTenantAccessToken();
  console.log('✓ Token obtained successfully');
  console.log(`  Token: ${token.slice(0, 30)}...`);
  console.log(`  Token Length: ${token.length} characters`);
} catch (error) {
  console.error('❌ Failed to get token:', error.message);
  console.log();
  console.log('Please check:');
  console.log('1. FEISHU_APP_ID is correct');
  console.log('2. FEISHU_APP_SECRET is correct');
  console.log('3. The app is published in Feishu');
  console.log('4. The app has the required permissions');
  process.exit(1);
}
console.log();

console.log('Test 2: Create Text Card...');
const textCard = messenger.createTextCard(
  '测试消息',
  '**这是一条测试消息**\n\n- 项目: Word King\n- 状态: 成功\n- 时间: 2026-02-14'
);
console.log('✓ Text card created');
console.log();

console.log('Test 3: Create Button Card...');
const buttonCard = messenger.createButtonCard(
  '操作卡片',
  '请选择一个操作：',
  [
    {
      text: '查看详情',
      type: 'primary',
      url: 'https://example.com',
    },
    {
      text: '取消',
      type: 'default',
      url: 'https://example.com/cancel',
    },
  ]
);
console.log('✓ Button card created');
console.log();

console.log('Test 4: Create Status Card...');
const statusCard = messenger.createStatusCard(
  '部署完成',
  'success',
  '**项目**: Word King\n**环境**: Production\n**状态**: ✅ 成功\n**时间**: 2026-02-14 14:30'
);
console.log('✓ Status card created');
console.log();

console.log('Test 5: Create Notification Card...');
const notificationCard = messenger.createNotificationCard(
  '代码审查请求',
  'PR #123: 添加新功能\n\n作者: @john\n\n请尽快审查',
  [
    {
      text: '查看 PR',
      type: 'primary',
      url: 'https://github.com/repo/pull/123',
    },
  ]
);
console.log('✓ Notification card created');
console.log();

console.log('Test 6: Send Test Message (Optional)...');
console.log('To send an actual message, uncomment the code below and set a valid receive_id:');
console.log();
console.log('const receiveId = "ou_xxxxxxxxxxxxxxxx";');
console.log('const result = await messenger.sendTextMessage(receiveId, "Test message from Feishu Messenger");');
console.log('console.log(result);');
console.log();

console.log('='.repeat(60));
console.log('All Tests Passed!');
console.log('='.repeat(60));
console.log();
console.log('Next Steps:');
console.log('1. Get a valid receive_id (Open ID) from Feishu');
console.log('2. Uncomment test message code to send actual messages');
console.log('3. Use the MCP server in Trae to send messages');
console.log();
