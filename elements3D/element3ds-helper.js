// ==UserScript==
// @name         微元素自动答题
// @namespace    https://github.com/hunmer/Tampermonkey-Scripts/tree/main/elements3D
// @homepage     https://greasyfork.org/zh-CN/scripts/415198-%E5%BE%AE%E5%85%83%E7%B4%A0%E8%87%AA%E5%8A%A8%E7%AD%94%E9%A2%98
// @version      0.2
// @description  微元素自动答题脚本
// @author       neysummer
// @match        https://www.element3ds.com/plugin.php?id=ahome_dayquestion:index
// @match        https://www.element3ds.com/plugin.php?id=ahome_dayquestion:pop
// @updateURL    https://raw.githubusercontent.com/hunmer/Tampermonkey-Scripts/main/elements3D/element3ds-helper.js
// @grant        none
// ==/UserScript==

(function() {
    if(location.href == 'https://www.element3ds.com/plugin.php?id=ahome_dayquestion:pop'){
        document.querySelector(".altw a").click();
        return;
    }
    var timer = setInterval(function(){
        var form = document.querySelector("form[action='plugin.php?id=ahome_dayquestion:pop']");
        if(form != null){
            clearInterval(timer);
            var data = [["关于资源中存在Max病毒，以下说法正确的是？", "发布病毒资源的发布者会受到十分严厉的处罚"], ["刺客、奶妈属于微库中的什么子类","职业"],["持有哪个装备可以每天收入2000元素币？","圣剑-【塞姆里亚】"],["当一个帖子被锁定之后，你不能做的是？","不能回复"],["定义帖子标签，多少个能够领奖？","300"],["发帖一次最大上传的图片数量是？","99"],["发布悬赏帖如何获取更多的元素大神赞助？","价格合理且有充分的描述截图"],["关于多关键词搜索的描述正确的是？","【UI】 空格 【科幻】 可以找到 所有科幻题材的UI资源"],["购买了失效区的资源，应该怎么办？","自己承担部分损失"],["购买了失效区的资源，发举报投诉帖会怎么样？","自己承担部分损失"],["购买的资源如果失效不能下载，正确的做法是？","在论坛举报投诉区发帖"],["画板订阅任务要求需要订阅多少个画板才能获得奖励？","30个"],["胡乱回复被大神扣活跃的规则是？","活跃度越高扣的越多"],["获取装备【赤铁剑】需要发布多少个主题才能申请购买？","400【土豪金 ≥ 6000】"],["据官方投票统计，元素会员最常用的发现新帖方式是？","论坛左上角最新"],["进入元素矿场，发现提示“您的矿场已经被外星生物侵占！，请入群咨询”是怎么回事？","没有登录微元素"],["“技术文章来两篇”任务怎么样才能够完成并领取任务奖励？","必须在【技术文库】大板块下发两个有内容有意义的技术文章帖"],["可以不用回复，就能看到回复可见内容的能力是？","天眼"],["矿场不产出以下哪种材料？","秘银"],["【扩散大招】任务究竟该怎么做？","在QQ群发扩散链接+该帖的图，截图发帖在扩散区"],["目前活跃度兑换元素币的起步金额是？","2000"],["目前土豪金兑换元素币的起步金额是？","1000"],["目前新会员的注册方式是？","QQ注册"],["满足一定条件后，购买装备【元素之盾】需要消耗什么？","8000活跃度【在线时间(小时) ≥ 1200 并且 土豪金 ≥ 3750】"],["[每天一早上元素]的下一句是？","挖矿撩妹两不误"],["哪些内容是微元素不提倡发布的？","源代码"],["哪些用户不是微元素的目标用户群？","同性交友"],["哪个等级可以上传视频文件？","元素王"],["如果你有一组国外大神画的Q版怪物想分享，应该发布在哪个版块？","怪物军团"],["如果你有一组3D怪物的CG图片想分享，应该发在哪个版块？","3D作品中的CG角色"],["如果你浏览论坛的时候发现你喜欢的帖子想分类收藏，正确的做法是？","帖子左下角点画板"],["如果你在看某个帖子时，你想“私信”楼主，那它的按钮在哪里？","点击帖子里楼主头像下方的信封图标"],["如果您发现自己不能上传头像或图片，这说明？","您的浏览器不支持flash,换个浏览器试试看"],["如果充值遇到失败的情况，正确的做法是？","去微元素官方群联系群主并获得额外补偿"],["如果我想练习发帖，正确的做法是？","在[元素口水]练习"],["如果我想快速通关元素学堂，学习元素知识，最迅速全面的方法是？","去[网站帮助][赚币方法]阅读指导"],["如果我想修改网站登录时的用户名，正确的做法是？","购买道具改名卡"],["如果我想要给已经发布的帖子补充新图片，正确的做法是？","编辑帖子 ，插入图片"],["如果我忘记了社区规则，比如活跃度兑换规则，想要搜索下重新温习，应该？","搜索 【活跃度】，最简单的关键词"],["如果我搜索一个明确的资源 如 【unity第一人称射击操作系统工程】没有想要的结果我应该怎么做？","输入简单的词用空格隔开，如 【unity】 【FPS】"],["如果想让更多人在搜索和你帖子内容相关的贴时，能轻易搜索到你的帖子，你可以","添加帖子的标签，尽可能丰富完整"],["如果一个帖子的网盘失效了，最简单的做法是？","在举报区发帖，必须带有原帖地址"],["如果发错了帖子或发多了相同的重复帖子，该怎么删帖？","在申请区发帖并附上要删的帖子链接"],["如果发布的3D模型资源中没有max或maya文件，帖子会被优先移动到","综合模型"],["如果对账户名不满意，网站会员该如何正确地修改自己的账户名？","购买改名卡道具并使用"],["如何有效增加在线时间？","不断看帖"],["我如果完成了某项元素成就，希望获取丰厚的奖励，那么应该？","在申请区发帖-附带成就名称"],["任务究竟该怎么做？","在QQ群发扩散链接+该帖的图，截图发帖在扩散区"],["热搜排行榜中的词来源为？","元素网用户经常搜索的词"],["热搜排行榜页面能显示多少个热搜词？","450"],["设置封面的正确做法是？","先插入完成，再鼠标移动到图上设置"],["什么可以直接兑换微币？","元素币"],["什么样的帖子会被立刻移动到【重复区】","截图展示与之前的一样"],["什么样的内容会被移动到【推荐重发】？","展示图的数量和内容不佳，无法判定品质"],["申请扩散大招赚币，哪一项是必须的？","个人帖子链接"],["神石这个积分是什么？","统计管理员贡献的积分"],["搜索结果中，分词的显示底色是什么颜色？","绿色"],["搜索结果中，同义词的显示底色是什么颜色？","蓝色"],["搜索结果界面右侧的“热搜词”浮动框下面不同颜色区域的是什么词？","推荐词"],["“搜索”除了能搜索帖子外，下拉框中还能够选择搜索什么？","微库图片、画板、用户"],["收费资源帖内的【销售总额】是指？","楼主的税前总收入"],["[首发必发微元素]的下一句是？","荣耀加身装备酷"],["失效资源，付费后不能下载的退币时限是？","购买算起的1个月内"],["SD专区板块位于以下哪个大版块中？","TA技术美术"],["土豪金是因为什么而存在？","元素送给大家的购买返利福利"],["推荐的在QQ群内迅速升级并获取奖励的的方法是？","相互交流学习"],["微库如何查看按照发布时间来排序的图片？","在微库页面点击“新上传”"],["微库一次最大上传的图片数量是？","99"],["微库的体力有什么用？","上传图片到微库会扣减体力"],["微库总共有多少个一级分类？","16"],["【微库】中，关于素材排序的描述正确的是","【关注度】排序是按照用户认可度排序，【新上传】可以看到最新上传的素材"],["【微库】微库VIP功能专属特权是哪个？","批量下图"],["微元素QQ群-超级大群的人数是？","2000人"],["微元素5群 群号是多少？","616268846"],["微元素-原画QQ群的群号是","575782850"],["微元素-新原画QQ群的群号是","674421744"],["微元素 平面设计/影视后期 交流群的群号是？","727880933"],["微元素TA技术美术QQ群的群号是","318958005"],["微元素 地编 SD技术QQ群的群号是？","782480353"],["微元素官方群，等级最低的头衔是？","虚灵"],["微元素官方的微信公众帐号全名是？","微元素CG"],["微元素qq注册登录的初始密码是什么？","没有初始密码，就是空的，要重置后才有"],["微币有什么作用？","能消耗它观看并下载微库的高清图片"],["网站平时说的“私信”，它的按钮在哪里？","头像下方的信封图标"],["网站如果被黑客攻击，无法正常访问，我需要做的事情是？","静静的等待并祈祷"],["为什么有时候帖子发了，但是自己查看时却发现帖子正在审核无法查看呢？","部分版块有发帖人工审核，通过时间不定"],["为什么新的头像上传了，但是头像却没有变化？","需要ctrl+F5刷新页面的缓存才能看到新头像"],["为什么兑换的申请贴完成后，总积分有时候会下降？","因为土豪金的积分计算是×12的而元素币的积分计算是×1的"],["完成成就后？如何获得到丰厚奖励？","在申请区发帖"],["元素扩散大招是指？","把群扩散截图等信息发到扩散者专区"],["元素神的文字颜色是？","绿色"],["元素左上角的常用菜单导航中进去的【最新】页面，会显示最新的多少张帖子？","1000"],["元素没有出现过以下哪个培训机构的广告？","水晶石"],["元素王的下一个等级是？","元素皇"],["元素王的上一个等级是？","元素魔"],["元素鼓励师主要负责哪些事情？","为好的帖子或回复加分"],["元素社区内的大神是指？","网站版主"],["元素装备有什么作用？","酷炫装逼"],["元素悬赏时间到了，也没有满意的答案，该怎么撤销？","在申请区发申请撤销悬赏任务的帖子"],["元素画板目前可以选择的分类是多少个？","14"],["[元素帖子强]的下一句是?","满满正能量"],["【元素搜索】时，怎样的技巧能获取更多结果？","尽可能简单的一个词"],["【元素搜索】时，怎样把符合多个条件的帖子筛选出来？","多个词之间用空格隔开"],["“游戏资讯来两篇”任务怎么样才能够完成并领取任务奖励？","必须在【游戏新闻】板块下发两个有内容有意义的游戏新闻帖"],["原创作品中，新人的诚意制作，功底和制作技巧较浅，缺乏细节和完成度，可被评定为什么等级？","【青铜】"],["原创作品中，大神级巅峰的完美杰作，在全球范围内都堪称经典神作，可被评定为什么等级？","【钻石】"],["原创作品中，水准可以到达主流商业水平标准可被评定为什么等级？","【黄金】"],["用什么图片作为封面最佳而且不会被管理员扣分或移出版块？","资源里最漂亮的画面的截图"],["拥有12个首发资源帖才可以申请的装备是？","圣杖-【安东尼达斯】【元素币 ≥ 50000 并且 首发 ≥ 12】"],["拥有50件元素装备才可以申请的装备是？","女皇之泪"],["【装备】持有什么装备可以每天都获得一定的土豪金？","盾系列装备"],["【装备】持有什么装备可以每天都获得一定的贡献值？","杖系列装备"],["如果发布的3D模型资源中没有max、maya源文件、OBJ、FBX等文件，帖子会被优先移动到","综合模型"],["【装备】需要满足账号已经注册一定天数后才能申请购买获得的装备是？","战甲系列装备"],["在[申请区]可以申请的是哪种？","兑换活跃度"],["发布完整规格的帖子时，设置付费信息应该放在？","帖子最顶部"],["【装备】购买什么系列的装备需要消耗的是活跃度？","盾系列装备"],["发帖获取网站顶部推荐的决定性因素是？","管理员喜好"],["因为网络卡顿造成一个资源的重复购买，我应该怎么做？","在举报区发帖并附上重复购买的资源贴的链接"],["新注册的号，用户名中有[qq]开头字样的，因为是？","QQ昵称与网站某个会员的用户名相同，名字已被占用。"],["想查看自己购买过的帖子记录，最快捷的方法是？","导航-个人中心-购买记录"],["悬赏帖发布多少日之后，大神可以帮助帖主选择正确答案？","7"],["以下哪种方式可获取网站板块的畅下权限？","成为元素大神"],["以下那种积分可以转换为元素币？","活跃度"],["以下哪种行为会被扣积分呢？","活动贴内无意义回复"],["以下哪种操作可能降低你的积分等级？","兑换土豪金为元素币"],["以下哪个区要求持有一定数量的元素币才能进入？","解剖结构"],["以下哪个因素会影响搜索排名？","帖子被查看的数量"],["以下哪个因素不会影响你的元素积分？","扩散"],["以下哪个是教程专区版块的分类名称？","技术文库"],["以下哪个是2D资源版块的分类名称","场景资源"],["以下哪个是3D模型版块的分类名称？","原创角色"],["以下哪个是元素比其他游戏CG网站独创的内容","联想搜索"],["以下哪个管理是元素真女神？","沐语橙风"],["以下哪个管理不是元素真女神","小小小芳"],["以下哪个不是每天都可以做的任务？","参与活动"],["以下哪个版块的封面不是正方形？","游戏研发中的插件资源版块"],["以下哪个页面链接能看到元素历代顶部推荐集合？","元素推荐"],["以下哪一个是元素徽章","感动"],["以下哪一条不是微元素的业内首创？","真实交友"],["以下哪些是元素禁发的内容？","WebEasy游戏"],["以下可以开启充值双倍buff的日子是？","十一月十一"],["以下什么样的封面是不合格的，会被移区？","文件夹内容截图当封面"],["元素资源专区有多少个大版块？","12"],["元素出售资源的交易税是多少？","所有人都是20%"],["元素原创艺术版块的美术作品排位有几个等级？","5"],["元素矿场一共有几种矿石？","活动时增加"],["元素矿场每月什么时间会销毁一颗星球","每个月的24号"],["元素矿场每月随机一爆在哪几个星球中选择","所有星球随机选择"],["元素挖矿：星球爆炸的条件是？","总量低于2%"],["元素挖矿：升级房子的主要目的是","爆炸前有地方安置"],["元素挖矿：哪种矿物质最便宜","煤矿"],["元素活动：如果在要求回复的活动下面灌水会？","被扣活跃度"],["元素活动：如果在要求回复的活动下面灌水会？","被扣积分"],["元素预售达成发放下载地址的步骤是？","有xx人购买帖子内容后，再开放下载地址"],["元素帖子页面，最大能显出的图片宽度是？","1440"],["元素网目前可以上传最大多大的视频？","200M"],["装备【龙枪】的获取条件是？","精华16"],["装备[深渊]的获取条件是？","精华50"],["在[申请区]能申请的是以下哪种？","兑换土豪金"],["在搜索结果中把鼠标移动到帖子封面上显示最多时只能看到以下的什么内容？","标签和同义都有"],["在元素怎么申请首发资源并获得独家推荐？","在申请区发帖附首发贴的链接"],["在同一天内，花费总计1W元素币可以申请获得的装备是？","满天星"],["在同一天内，花费总计1W元素币可以申请的成就是？","挥洒自如"],["在同一天内，连续发布30个有效资源帖子可以申请的成就是？","暴走连击"],["在同一天内，连续发布30个有效资源帖子可以申请获得的装备是？","散夜对剑"],["在悬赏活动中，非参与的回复会被扣分，但是想发表自己的看法或者建议应该怎么办？","帖子左下角评分表达"],["在PC上，点击头像后进入的页面是？","个人首页"],["在哪个区发帖，需要有正确的分类信息？","Unity插件"],["在以下哪个区，非认真参与者且随意回复的话会被扣除大量活跃度？","【悬赏活动】"],["在PSD原画区发布资源，不展示哪种资源细节将会被移出该板块？","PSD分层"],["怎样的购买方式会返还土豪金？","购买支付框模式会返还"],["怎么样的画板不会出现在画板首页，也不会被推荐？","没有封面"],["转载帖子，以下那种行为可能会被扣分？","没有使用正确的文字底色"],["转载文章时，复制过来的文字背景颜色错误，快速修正的方法是?","刷子工具"],["资源板块首页 顶部[主题]后面的第一个橙色数字是？","今天发布的新帖子数"],["2D资源中的【角色资源】指的是？","能直接在游戏中使用的如角色序列，像素角色等素材"],["以下哪个是原画插画版块的分类名称？","精美壁纸"],["原画插画区下面有几个[子区]分类？","16"],["元素矿场，矿长有多少个等级？","24"],["元素矿场总共有几个矿场成就？","7"],["元素晋级会员组总共有几个等级？","10"],["【交易】购买别人的资源就会增加土豪金，转化比例是","10%"],["元素帖子页面，最大能显出的图片宽度是？","1440"],["发布哪种类型的帖子并不会被移动到[综合分享]?","价格不合理"],["【搜索】顶部导航栏的“排行”默认打开是什么榜单？","热搜词榜单"],["【举报】发举报帖举报用脚本外挂刷分行为的人，管理确认有效的，最低将能得到多少奖励？","2000元素币"],["【搜索】搜索界面右侧的“热搜词”浮动框中会随机显示多少个全站前300的热搜词？","20"],["【界面】如果你在看某个帖子时，你想“私信”楼主，那它的按钮在哪里？","点击帖子里楼主头像下方的信封图标"],["装备【深渊】的获取条件是？","精华50"],["导航中的购买记录可看到记录是？","我买其它人资源的记录"],["2D资源中的【角色资源】是指？","能直接在游戏中使用的如角色序列，像素角色等素材"],["新注册的号，用户名中有【qq_】开头字样的，因为是？","QQ昵称与网站某个会员的用户名相同，名字已被占用"],["把售价50+元素币的普通帖升级为精华帖的条件是？","出售次数100"],["把售价200+元素币的普通帖升级为精华帖的条件是？","出售次数50"],["把售价500+元素币的普通帖升级为精华帖的条件是？","出售次数30"],["把售价1000+元素币的普通帖升级为精华帖的条件是？","出售次数20"],["把售价2000+元素币的普通帖升级为精华帖的条件是？","出售次数10"],["把售价5000+元素币的普通帖升级为精华帖的条件是？","出售次数3"],["编辑器板块位于以下哪个大版块中？","TA技术美术"],["关于做【技术文章】任务以下说法正确的是？","做【技术文章】任务只能在技术文章大板块下发技术文章"],["【任务】第一次完成“我的推荐任务”奖励多少元素币？","200"],["【任务】画板订阅任务要求需要订阅多少个画板才能获得奖励？","30"],["关于【悬赏活动】 正确的说法是？","每个认真参与者都可以获得对应奖励"],["【标签】定义帖子标签，多少个能够领奖？","300"],["什么样的内容会被移动到【推荐重发】？","展示图的数量和内容不佳，无法判定品质"],["【装备】持有装备【圣剑系列】挂机可获取的元素币上限是多少？","100万元素币"],["想查看自己购买过的帖子记录，最快捷的方法是？","导航-个人中心-购买记录"],["元素QQ群的主要功能是？","学习"],["关于违规内容的处理，以下说法正确的是","违规内容会移动到其他版块，进行屏蔽处理"],["关于发布的没有角色面部资源的问题，哪项说法是正确的？","没有角色头部的摄影或者绘画全部定义为违规内容处理"],["如果我是萌新想练习发帖，正确的做法是？","在【发帖练习】板块练习"],["关于元素头像上传，2020年情况，说法正确的是","头像只能上传静态的正方形状图片，GIF动态头像已经是绝版"],["关于发任务帖赚取元素币或积分，以下哪项说法是正确的？","发布任务帖要注意用刷子工具清理错误格式，再设置规范的封面"],["【题目】 关于发布的没有角色面部资源的问题，哪项说法是正确的？","没有角色头部的摄影或者绘画全部定义为违规内容处理"],["悬赏帖发布多少日之后，管理员可以帮助帖主选择正确答案？","7"],["关于元素装备，以下说法正确的是？","部分装备会不断增加某种积分，例如元素币、贡献值、活跃度或土豪金，如果会员已经持有量超过说明中的最大值，则不继续增加"],["在2019年，元素搜索中最高频率出现的词是什么","场景"],["在画板封面左上角的橙色数字代表","关注人数"],["最新的元素首页分为三种主色，以下说法正确的是","元素首页三种颜色分别代表了，蓝色资源，橙色技术，绿色原创"],["查看自己帖子收入情况以下哪种说法是正确的","在搜索中搜索【我的收入】或者【帖子收入】"],["关于【微库识图】以下说法正确的是？","微库识图可以通过上传图片的配色，构图，主体内容来以图找图"],["以下哪种做悬赏的方式，是可以安全获得全场最佳的","资源类必须有下载地址或元素帖子，但设置付费外人不可见，并私发给楼主"],["如果星球的周期产量远远低于正在挖矿的人数，那么会发生什么？","大家谁都挖不到"],["【微库】把贴内图片采集到微库的正确方式是？","鼠标移动到贴内图片上，点击【采集到微库】"],["在资源专区/3D作品/CG角色 内发布的帖子应该是那种资源","只是图片资源，图片的内容仅为3D高模角色参考图"],["【分区】在资源专区/3D作品/CG角色 内发布的帖子应该是那种资源","一般的3D模型软件打开的高模3D角色或3D场景 参考图片 或 渲染图片"],["在资源专区/3D作品/游戏模型 内发布的帖子应该是那种资源","只是图片资源，图片的内容仅为3D低模游戏角色参考图"],["2020积分改革后，在线时间对总积分的影响是","在线时间的权重变成了 X 10"],["2020-6月-元素新开了一个等级叫？","元素大神"],["在资源专区/3D模型/CG模型 内发布的帖子应该是那种资源？","一般的3D模型软件打开的高模3D角色或3D场景"],["【神器】轩辕剑的获取条件是","有一个正规资源贴的销售量达到50W元素币"],["蚩尤斧的获取条件是","有10个超过10W元素币的帖子！"],["以下哪一条属于元素群文化？","谨慎交友，禁止搞基"],["","元素王"],["以下对装备特性描述正确的是？","装备有最大上限，超过上限后，需要花费后，才能继续增长增长"],["在一天内连续发布的5个帖子，在发布后的当天内销量都超过500元素币","散夜对剑"],["在一天内连续发布价格超过500元素币的5个有效资源帖子可以申请获得的装备是？","散夜对剑"],["关于查看自己帖子收入情况，以下说法正确的是？","页面顶部的【积分】按钮，积分-【积分记录】-【收入】"],["【微库】关于微库采集或上传到正确分类，正确的做法是","采集中的输入框先输入相关的分类关键词，选择与图片符合的分类，再采集"]];
            var q =form.querySelector("font[color='#FF6600']").innerText.replace("【送分】", '').replace("【题目】", '').replace("【审核】", '').replace('【充值】', '').trim();
            var a;
            for(var d of data){
                if(q.indexOf(d[0]) !== -1){
                    a = d[1].replaceAll(" ", '').trim();
                    break;
                }
            }
            console.log("q: "+q);
            console.log("a: "+a);
            if(d != undefined){
                var s, b=false;
                form.querySelectorAll(".qs_option").forEach(function(d){
                    s = d.innerText.replaceAll(" ", '').trim();
                  console.log(a+" --- "+s ,s == a);
                    if(s == a){
                        b=true;
                        d.click();
                        form.querySelector("button[type='submit']").click();
                        return false;
                    }
                });

                if(!b){
                    alert("题目可能有改动,答案是 ["+a+']');
                }
            }else{
                alert("没有找到答案!");
            }
        }
    }, 1000);
})();