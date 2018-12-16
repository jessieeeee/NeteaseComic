'use strict'

let koa = require('koa')
let logger = require('koa-logger')
let session = require('koa-session')
let http = require('http')

let mongoose = require('mongoose')
mongoose.Promise = require('bluebird') // bluebird设置为mongoose内置的库
let dbUrl = 'mongodb://localhost/test' // 设置mongo数据库访问地址
mongoose.connect(dbUrl) //连接数据库


let path = require('path')
let model_path = path.join(__dirname, '/model')
let fs = require('fs')
const bodyParser = require('koa-bodyparser')

// 遍历模型所在的文件夹,如果是js文件就加载,如果是目录就递归
let walk = function(modelPath) {
    fs.readdirSync(modelPath)
    .forEach(file => {
        var filePath = path.join(modelPath, '/' + file)
        var stat = fs.statSync(filePath)
        if (stat.isFile()){
          if (/(.*)\.(js|coffee)/.test(file)) {
              console.log(filePath)
              require(filePath)
          }
        }
        else if(stat.isDirectory()){
            walk(filePath)
        }
    });
}

walk(model_path)
let app = new koa()
app.keys = ['jessie']  //中间件加密的key
app.use(logger())  //加载日志中间件
app.use(session(app)) //加载session中间件
app.use(bodyParser()) //加载body解析中间件


let router = require('./config/router')() // 加载路由规则
app.use(router.routes());
app.use(router.allowedMethods());

let server = http.Server(app.callback())
server.listen(1234)
let webSocketUtil = require('./controller/websocketutil')
webSocketUtil.init(server)
console.log('listening:1234')