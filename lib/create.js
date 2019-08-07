const fs = require("fs");//node文件管理器

const chalk = require("chalk");//命令行美化

const ora = require("ora");//图标

const download = require('download-git-repo');//下载github文件

const inquirer = require("inquirer");//交互式命令行工具

const GIT_URL = "direct:https://github.com/robin901118/i84ProjectStandard.git";//仓库地址

/** 命令行问题  **/
const question = [
  {
    type: "input",
    name: "name",
    message: "设置项目名称（e.g:busDoor）",
    validate(val){
      if(/^[A-Za-z]+$/.test(val)) return true;
      return "只能输入英文";
    }
  },
  {
    type: "confirm",
    name: "lodash",
    message: "是否需要使用Lodash"
  },
  {
    type: "confirm",
    name: "dayjs",
    message: "是否需要使用时间库"
  },
  {
    type: "confirm",
    name: "imageLazy",
    message: "是否需要图片懒加载"
  },
  {
    type: "confirm",
    name: "storage",
    message: "是否需要storage库"
  },
  {
    type: "confirm",
    name: "vconsole",
    message: "是否需要vconsole调试器"
  },
  {
    type: "confirm",
    name: "hybrid",
    message: "是否需要APP桥接支持"
  },
  {
    type: "checkbox",
    name: "other",
    message: "其他插件模块",
    choices: [
      "lb-image-editor",
      "family.scss"
    ]
  }
];

/** package.json内容  **/
let initJson = require('../template/packageJson');



module.exports = function(cmd){
  inquirer.prompt(question).then(answer => {
    //创建文件目录
    fs.mkdir(answer.name,function(error){
      if(error){
        console.log(chalk.red(`err:${err}`));//创建错误
        return false;
      }

        console.log("\n");
        const spinner = ora("loading...");
        spinner.start();

        //git clone
        download(
          GIT_URL,
          answer.name,
          {clone:true},
          async function(err) {
            spinner.stop();
            if (err) {
              spinner.fail("git克隆失败");
              console.log(chalk.red(err));
              return false;
            }

            //修改package.json
            initJson['name'] = answer.name;//项目名称
            answer.lodash && (initJson['dependencies']['lodash'] = "4.17.10");
            answer.dayjs && (initJson['dependencies']['dayjs'] = "^1.8.14");
            answer.imageLazy && (initJson['dependencies']['vue-lazy-image-loading'] = "^1.1.5");
            answer.storage && (initJson['dependencies']['good-storage'] = "^1.1.0");
            answer.vconsole && (initJson['dependencies']['vconsole'] = "^3.3.2");
            if (answer['other'].includes('lb-image-editor')) {
              initJson['dependencies']['exif-js'] = "^2.3.0";
              initJson['dependencies']['"lb-image-editor"'] = "^1.0.1";
            }

            //写入文件
            try {
              //写package.json
              await new Promise((resolve, reject) => {
                fs.writeFile(
                  `./${answer.name}/package.json`,
                  JSON.stringify(initJson, null, "\t"),
                  "utf-8",
                  error => {error ? reject(error) : resolve(true)}
                );
              });

              //不需要family.scss则删除该模块
              if(!answer['other'].includes("family.scss")){
                 await new Promise((resolve,reject)=>{
                   fs.unlink(
                     `./${answer.name}/src/assets/css/_family.scss`,
                     error => {error ? reject(error) : resolve(true)}
                   )
                 })
              }

              //不需要混合app-js桥则删除
              if(!answer.hybrid){
                await new Promise((resolve,reject)=>{
                  fs.unlink(
                    `./${answer.name}/src/assets/js/hybrid-bridge.js`,
                    error => {error ? reject(error) : resolve(true)}
                  )
                })
              }


              //创建成功
              spinner.succeed("创建成功\n");
              console.log(chalk.green("接下来你可以\n"));
              console.log(chalk.hex("#00f0ff").bold(`    cd ${answer.name}\n`));
              console.log(chalk.hex("#00f0ff").bold('    yarn or npm install'));

            } catch (e) {
              console.log(e);
            }

          })
    })

  });
};