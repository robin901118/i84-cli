#!/usr/bin/env node

const version = require('./package').version;//版本号

const program =require("commander");//命令行解析

const createFile = require("./lib/create");//create命令执行库

//开始执行命令
program
  .version(version,"-v --version")//设置版本号
  .command("create")
  .description("创建页面组件")
  .action((cmd,options)=>createFile(cmd));

program.parse(process.argv);


