const fs = require("fs");//node文件管理器

const chalk = require("chalk");//命令行美化

const ora = require("ora");//图标

const download = require('download-git-repo');//下载github文件

const inquirer = require("inquirer");//交互式命令行工具

const FULL_URL = "direct:https://github.com/robin901118/i84ProjectStandard.git";//仓库地址（完整版）

const SMART_URL = "direct:https://github.com/robin901118/i84ProjectStandard-smart.git";//仓库地址（轻量版）

/** 命令行问题  **/
const question = [
    {
        type: "input",
        name: "name",
        message: "设置项目名称（e.g:busDoor）",
        validate(val) {
            if (/^[A-Za-z]+$/.test(val)) return true;
            return "只能输入英文";
        }
    },
    {
        type:"list",
        name:"isSmart",
        message: "请选择版本",
        choices: [
            {
                name: "完整版",
                value: false
            },
            {
                name: "轻量版（无vuex）",
                value: true
            }
        ]
    }
];

module.exports = function (cmd) {
    inquirer.prompt(question).then(answer => {
        //创建文件目录
        fs.mkdir(answer.name, function (error) {
            if (error) {
                console.log(chalk.red(`err:${error}`));//创建错误
                return false;
            }

            console.log("\n");
            const spinner = ora("loading...");
            spinner.start();


            //git clone
            download(
                answer.isSmart ? SMART_URL : FULL_URL,
                answer.name,
                {clone: true},
                async function (err) {
                    spinner.stop();
                    if (err) {
                        spinner.fail("git克隆失败");
                        console.log(chalk.red(err));
                        return false;
                    }

                    //创建成功
                    spinner.succeed("创建成功\n");
                    console.log(chalk.green("接下来你可以\n"));
                    console.log(chalk.hex("#00f0ff").bold(`    cd ${answer.name}\n`));
                    console.log(chalk.hex("#00f0ff").bold('    yarn or npm install'));
                })
        })

    });
};