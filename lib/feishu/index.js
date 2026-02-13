#!/usr/bin/env node

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '.env') });

console.log('Starting Feishu MCP Server...');
console.log('='.repeat(50));

// Import and start the MCP server
import('./src/mcp-server.js').then(({ startServer }) => {
  startServer();
}).catch((error) => {
  console.error('❌ Failed to start Feishu MCP server:', error);
  process.exit(1);
});
