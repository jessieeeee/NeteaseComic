# NeteaseComic
- 这是一个获取网易，腾讯免费漫画的全栈项目
- 服务端：nodejs + koa + mongoose
- 数据抓取：puppeteer抓取web端数据返回给客户端
- 客户端：react-native + mobx，适配android，ios双平台
## 当前进度截图：
![image](http://oqujmbgen.bkt.clouddn.com/images/comic_1.png?imageView2/2/w/500/h/500/q/100|imageslim)
![image](http://oqujmbgen.bkt.clouddn.com/images/comic_2.png?imageView2/2/w/500/h/500/q/100|imageslim)
![image](http://oqujmbgen.bkt.clouddn.com/images/comic_3.png?imageView2/2/w/500/h/500/q/100|imageslim)
![image](http://oqujmbgen.bkt.clouddn.com/images/comic_4.png?imageView2/2/w/500/h/500/q/100|imageslim)
![image](http://oqujmbgen.bkt.clouddn.com/images/comic_5.png?imageView2/2/w/500/h/500/q/100|imageslim)
![image](http://oqujmbgen.bkt.clouddn.com/images/comic_6.png?imageView2/2/w/500/h/500/q/100|imageslim)
## 如何运行
### 服务端
1. cd server
2. npm install --save
3. node app
### 客户端
1. npm install --save
2. react-native start
3. 编译
- Android:
- gradle clean && gradle build
- ios:
- xcode build && run
4. 选择你的运行设备, 安装app运行

## 已完成功能：
1. 免费网易漫画列表的接口实现和数据展示
2. 免费腾讯漫画列表的接口实现和数据展示
3. 网易漫画详情接口实现和数据展示
4. 腾讯漫画详情接口实现和数据展示
5. 漫画内容的接口实现和数据展示
6. 当前漫画内容的弹幕接口实现
## 未完成功能：
1. 用户模块相关接口开发，注册登录界面开发
2. 优化获取漫画内容接口
3. 优化漫画内容的弹幕接口和客户端展示
4. 搜索模块相关接口开发，搜索界面开发

