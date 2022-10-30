// ==UserScript==
// @name         B站与油管屏蔽原神内鬼爆料相关视频
// @namespace    http://tampermonkey.net/
// @version      1.2.1
// @description  祝原神爆料内鬼冚家富贵，雄性抵插棍，雌性烂臭閪
// @author       凡云 - https://space.bilibili.com/3491267
// @match        *://*.bilibili.com/*
// @match        *://*.youtube.com/*
// @match        *://*.twitter.com/*
// @icon         https://static.hdslb.com/images/favicon.ico
// @require      https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js
// @grant        none
// @license      MIT
// ==/UserScript==
 
(function() {
    'use strict';
    
    // B站推荐栏屏蔽
    var fuckOffRecoString = /2\.9|3\.[0-9]|爆料|草.*(神|角色|人物)|白术|赛诺|尼露|柯莱|林尼|琳妮特|伊安珊|普契涅拉|(原神|须弥).*新角色|智慧/
    // B站搜索页屏蔽
    var fuckOffSearchString = /2\.9|3\.[0-9]|爆料|草.*(神|角色|人物)|白术|赛诺|尼露|柯莱|林尼|琳妮特|伊安珊|普契涅拉|(原神|须弥).*新角色|智慧/
    // B站黑名单
    var fuckOffUserListString = /原神百晓生|说书人胧|自由大野猪|番鼠鉴赏家|医药师丶|铃笠|花茶菌_|麻辣柚头车|三日月そら|小姑顾|麻椒黑酱|小鳥遊七奈_|柠檬酸酸鼠sama|游戏BBQ|ガイアの眼帯|niconico原宿|珉ZM|诚实玩家|哎呀_迷路了_迷路了__|裁雨-留虹-|VictorGKD|-結成明日奈-|网文世界|你的玛奇玛小姐|啊皎wijiao|八重神子的小耳朵|二次元推荐官|摆烂小柒|跪求B站18加|西贝TQl|大窝瓜游戏解说|超级猫猫有木兮|不上研究生不改name|抱豹宝|煜洁祺身|bigben丶大笨钟|慕清溟|墨阴白晴|Love-YUI|不二人游|Arindex|大韦丘丘人|追风-zzz|天草桑|九重神子_Official|维基洛克|再肝剁手|疯狂钻石m|_NIGU_|未泯-_-|改名字真的可以变欧|ik-浮士德|梦醒一场南柯|黑衣侦探|奶嗝official|陌秋无衍|星扉与Faye|原神最新资讯|脚踏实地的做一个靓仔|开学送原神号|蕖蕖蕖c|云堇我喜欢你啊|-可乐想喝冰阔落-|吖班班|Metriever小M|烟花武装单推人|麟安Heroo|挽耳听风yq|刻晴刻雨刻阴阳|IGN中国|皇族OL不伤感|克莱恩先生|888888888888888抜|secular___|行窃预兆-Official|原神专家_高玩|YOTO油桃小朋友_|御熏|原神高玩专家-向晚|喜气的肥皂|浮游火蕈兽|湘夜|清茶沐沐_Kiyotya|感恩呆鹅真君|爱偷蛋的小新|笨蛋小阿辰|桌子上的羊|烧酒博客|一包好次的辣条|呆呆小西|雷雨Lyy|凛笙丶Linson|肥宅阿水|中二之魂陈小屁|得len|星荧之火|徐大虾咯|辰星羽空|宅肌颂|Notleaks|来福iFun|布小帆|GG小茶茶|南逸晨光鸭|谯楼上同调|手夜人hacker|孑孑不是子子|抱紧白晶晶|无限-启源|白玹Xinyu|or信用社主任1|原神梦仔|阿叼我亮不亮-|拾叁道|Breadd面包蟹|Nick英语|丨緣帥丶|上山采药的七七|可爱的黄金周|流风回雪up|梦与现实的抉择|玩咖二次元|Cancer梓zz|是王不柴呀|TYT小妮|风纪委员喵可莉|我是你幻幻陛下啊|小沢沢h|houdejian|少三2|你娶初音我嫁牛老师|Just一头臭居居|可曾听闻绛骨|HT_indigo|木木酱_KiKiCyan|JK低手鱼太/
    var fuckOffYtbString = /2\.9|3\.[0-9]|dendro.*character|leak|tighnari|dehya|cyno|lyney|lynette|iansan|collie|pulcinella|kusanali|クラクサナリデビ|草.*(神|角色|人物)|new.*sumeru/
    var fuckOffTwitterString = /2\.9|3\.[0-9]|dendro.*character|leak|tighnari|dehya|cyno|lyney|lynette|iansan|collie|pulcinella|kusanali|クラクサナリデビ|草.*(神|角色|人物)|new.*sumeru/
    var fuckOffTimeout = 500
 
    if (/bilibili/.test(document.domain)) {
        setInterval(() => {
            // B站首页推荐栏（旧版）
            fuckOffBili(fuckOffRecoString, '.rcmd-box', '.video-card-reco', '.title' , '.up', false)
            // B站首页推荐栏（新版）
            fuckOffBili(fuckOffRecoString, '.recommend-container__2-line', '.bili-video-card', '.bili-video-card__info--tit', '.bili-video-card__info--author', true)
            // B站右侧推荐栏（旧版）
            fuckOffBili(fuckOffRecoString, '#reco_list', '.video-page-card', '.title', '.up', true)
            // B站右侧推荐栏（新版）
            fuckOffBili(fuckOffRecoString, '#reco_list', '.video-page-card-small', '.title', '.upname .name', true)
            // B站视频播放结束推荐列表（新旧版）
            fuckOffBili(fuckOffRecoString, '.bpx-player-ending-related', '.bpx-player-ending-related-item', '.bpx-player-ending-related-item-title', '', true)
            // B站搜索页（旧版）
            fuckOffBili(fuckOffSearchString, '#server-search-app .video-list', '.video-item', '.title', '.up-name', true)
            // B站新版搜索页（新版）
            fuckOffBili(fuckOffSearchString, '.search-page .video-list', '.video-list-item', '.bili-video-card__info--tit', '.bili-video-card__info--author', true)
        }, fuckOffTimeout)
    }
 
    if (/youtube/.test(document.domain)) {
        setInterval(() => {
            // 油管首页
            fuckOffYtb(fuckOffYtbString, 'ytd-rich-grid-renderer', 'ytd-rich-item-renderer', 'yt-formatted-string', false)
            // 油管搜索页
            fuckOffYtb(fuckOffYtbString, 'ytd-item-section-renderer', 'ytd-video-renderer', 'yt-formatted-string:first', false)
            // 油管视频右侧推荐栏
            fuckOffYtb(fuckOffYtbString, 'ytd-watch-next-secondary-results-renderer', 'ytd-item-section-renderer ytd-compact-video-renderer', '#video-title', true)
        }, fuckOffTimeout)
    }
 
    function fuckOffBili(fuckOffString = '', main = '', item = '', title = '', user = '', isRemove = false) {
        if ($(main).length && $(main).length > 0) {
            $(main + ' ' + item).each(function(){
                let that = $(this)
                let testString = fuckOffFormat(that.find(title).text())
                let userString = ''
                if (user) {
                    userString = fuckOffFormat(that.find(user).text())
                }
                if (fuckOffString.test(testString) || fuckOffUserListString.test(userString)) {
                    if (isRemove) {
                        that.remove()
                    } else {
                        that.find('img').attr('src', '')
                        that.find(title).text('原神内鬼相关视频，请谨慎观看')
                    }
                }
            })
        }
    }
 
    function fuckOffYtb(fuckOffString = '', main = '', item = '', title = '', isRemove = false) {
        if ($(main).length && $(main).length > 0) {
            $(main + ' ' + item).each(function(){
                let that = $(this)
                let testString = fuckOffFormat(that.find(title).text())
                if (fuckOffString.test(testString)) {
                    // 油管数据有部分加载用的瀑布流，不能删除item
                    if (isRemove) {
                        that.find('img').remove()
                        that.find(title).remove()
                    } else {
                        that.find('img').attr('src', 'https://i.ytimg.com/vi/NJTO9ROonIQ/hq720.jpg')
                        that.find(title).text('原神内鬼相关视频，请谨慎观看')
                    }
                }
            })
        }
    }
 
    // 小写化，清除空格、换行
    function fuckOffFormat(string = '') {
        return string.toLowerCase().replace(/[\r\n]|\ +/g, "")
    }
})();