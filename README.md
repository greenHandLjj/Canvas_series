# Canvas_series
这是一款像素小鸟飞行小游戏

R.json 文件是一个配置文件，里面存放了游戏所需要的图片信息，通过Ajax请求这个配置文件得到我具体需要
引入哪些图片供Canvas使用

JS 文件一共有6个，分别为背景类（Background），小鸟类（Bird），游戏类(Game)，大地类(Land)，管子类(Pipe)，场景控制器（SceneManage）
每一个外链的js文件都以闭包的形式向外暴露了一个构造函数，每个构造函数管理其下的成员该如何运行；
采用中介者模式，最高管理者Game.js，管理场景控制器的render， update。
而场景管理器通过场景编号来判断我该出现哪个场景，具体内容在代码中有着详细注释，场景管理器为最核心部分。

注：本项目使用所用的所有图片素材均来自素材网，如有侵权，联系必删!
