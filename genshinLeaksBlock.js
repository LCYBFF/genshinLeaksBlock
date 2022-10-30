// ==UserScript==
// @name         B站、油管、推特屏蔽原神内鬼爆料相关视频
// @namespace    http://tampermonkey.net/
// @version      2.1.3
// @description  祝原神爆料内鬼和传话太监冚家富贵
// @author       凡云 - https://space.bilibili.com/3491267
// @match        *://*.bilibili.com/*
// @match        *://*.youtube.com/*
// @match        *://*.twitter.com/*
// @icon         https://static.hdslb.com/images/favicon.ico
// @require      https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @grant        GM_listValues
// @grant        GM_addValueChangeListener
// @grant        GM_addStyle
// @downloadURL  https://gitee.com/BFFLCY/genshin-leaks-blocker/raw/master/genshin-leaks-blocker.js
// @updateURL    https://gitee.com/BFFLCY/genshin-leaks-blocker/raw/master/genshin-leaks-blocker.js
// @noframes
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';
    // 预设配置
    const fuckOffDefaultConfig = {
        outLink: 'https://www.bilibili.com/video/BV1Ht4y1t7m',
        helpLink: 'https://greasyfork.org/zh-CN/scripts/447376',
        // B站标题正文正则
        fuckOffTitleBili: '/2\\.9|3\\.[0-9]|爆料|草.*(角色|人物)|白术|柯莱|多莉|赛诺|尼露|林尼|琳妮特|伊安珊|普契涅拉|(原神|须弥).*(沙漠|声望|地图)/i',
        // B站UP主黑名单
        fuckOffUsersBili: '/原神百晓生|番鼠鉴赏家|花茶菌_|麻辣柚头车|三日月そら|麻椒黑酱|柠檬酸酸鼠sama|niconico原宿|珉ZM|诚实玩家|VictorGKD|-結成明日奈-|啊皎wijiao|二次元推荐官|跪求B站18加|不上研究生不改name|抱豹宝|慕清溟|不二人游|追风-zzz|天草桑|九重神子_Official|维基洛克|_NIGU_|未泯-_-|改名字真的可以变欧|梦醒一场南柯|黑衣侦探|星扉与Faye|原神最新资讯|云堇我喜欢你啊|-可乐想喝冰阔落-|皇族OL不伤感|克莱恩先生|YOTO油桃小朋友_|御熏|湘夜|清茶沐沐_Kiyotya|感恩呆鹅真君|爱偷蛋的小新|小阿辰Official|桌子上的羊|烧酒博客|凛笙Linson|肥宅阿水|中二之魂陈小屁|得len|星荧之火|Notleaks|来福iFun|GG小茶茶|手夜人hacker|孑孑不是子子|抱紧白晶晶|无限-启源|白玹Xinyu|or信用社主任1|阿叼我亮不亮-|拾叁道|Breadd面包蟹|丨緣帥丶|上山采药的七七|可爱的黄金周|流风回雪up|Cancer梓zz|是王不柴呀|我是你幻幻陛下啊|小沢沢h|houdejian|少三2|你娶初音我嫁牛老师|Just一头臭居居|可曾听闻绛骨|HT_indigo|木木酱_KiKiCyan|溜了看看|ym夜猫子|茉莉绿茶少糖|至东-达达利亚|Daxy妙啊/i',
        // 油管标题正文正则
        fuckOffTitleYtb: '/2\\.9|3\\.[0-9]|dendro|leak|Tighnari|Collei|Dori|dehya|cyno|kusanali|lyney|lynette|iansan|pulcinella|クラクサナリデビ|ドリ|草.*(角色|人物)|sumeru.*music/i',
        // 油管用户黑名单
        fuckOffUsersYtb: '/Undiscovery Genshin|WhyMike Live|Froggy|•Bex•|Anonymous Leaker/i',
        // 推特正文正则
        fuckOffTitleTwitter: '/2\\.9|3\\.[0-9]|dendro|leak|Tighnari|Collei|Dori|dehya|cyno|kusanali|lyney|lynette|iansan|pulcinella|クラクサナリデビ|ドリ|草.*(角色|人物)/i',
        // 推特用户黑名单
        fuckOffUsersTwitter: '/Undiscovery Genshin/i',
        fuckOffTimeout: 500,
        areaList: [{
            name: 'B站首页推荐栏（旧版）',
            area: 'bilibili',
            main: '.rcmd-box',
            item: '.video-card-reco',
            text: '.title',
            media: 'img',
            user: '.up'
        }, {
            name: 'B站首页推荐栏（新版）',
            area: 'bilibili',
            main: '.recommend-container__2-line',
            item: '.bili-video-card',
            text: '.bili-video-card__info--tit a',
            media: 'img',
            user: '.bili-video-card__info--author'
        }, {
            name: 'B站视频页右侧推荐栏（旧版）',
            area: 'bilibili',
            main: '#reco_list',
            item: '.video-page-card',
            text: '.title',
            media: 'img',
            user: '.up'
        }, {
            name: 'B站视频页右侧推荐栏（新版）',
            area: 'bilibili',
            main: '#reco_list',
            item: '.video-page-card-small',
            text: '.title',
            media: 'img',
            user: '.upname .name'
        }, {
            name: 'B站视频播放结束推荐列表（新旧版）',
            area: 'bilibili',
            main: '.bpx-player-ending-related',
            item: '.bpx-player-ending-related-item',
            text: '.bpx-player-ending-related-item-title',
            media: '.bpx-player-ending-related-item-img',
            user: ''
        }, {
            name: 'B站搜索页（旧版）',
            area: 'bilibili',
            main: '#server-search-app .video-list',
            item: '.video-item',
            text: '.title',
            media: 'img',
            user: '.up-name'
        }, {
            name: 'B站搜索页（新版）',
            area: 'bilibili',
            main: '.search-page .video-list',
            item: '.video-list-item, .bili-video-card',
            text: '.bili-video-card__info--tit',
            media: 'img',
            user: '.bili-video-card__info--author'
        }, {
            name: 'B站频道页（精选、综合）',
            area: 'bilibili',
            main: '.card-list',
            item: '.video-card',
            text: '.video-name',
            media: '.cover-picture__image',
            user: '.up-name__text'
        }, {
            name: 'B站UP主空间代表作',
            area: 'bilibili',
            main: '.s-space #i-masterpiece',
            item: '.small-item',
            text: '.title',
            media: 'img',
            user: ''
        }, {
            name: 'B站UP主空间（TA的视频、投稿）',
            area: 'bilibili',
            main: '.s-space .video .content',
            item: '.small-item',
            text: '.title',
            media: 'img',
            user: ''
        }, {
            name: 'B站UP主空间合集',
            area: 'bilibili',
            main: '.s-space .series',
            item: '.small-item',
            text: '.title',
            media: 'img',
            user: ''
        }, {
            name: 'B站UP主空间动态',
            area: 'bilibili',
            main: '.bili-dyn-list__items',
            item: '.bili-dyn-list__item',
            text: '.bili-dyn-content__orig__desc, .bili-dyn-card-video__title',
            media: '.bili-album__preview__picture, .bili-awesome-img',
            user: ''
        }, {
            name: 'B站评论区评论文本（旧版）楼主回复',
            area: 'bilibili',
            main: '.comment-list',
            item: '.list-item',
            text: '.text',
            media: '',
            user: ''
        }, {
            name: 'B站评论区评论文本（旧版）楼中楼回复',
            area: 'bilibili',
            main: '.reply-box',
            item: '.reply-item',
            text: '.text-con',
            media: '',
            user: ''
        }, {
            name: 'B站评论区评论文本（新版）楼主回复',
            area: 'bilibili',
            main: '.reply-list',
            item: '.reply-item',
            text: '.root-reply .reply-content',
            media: '',
            user: ''
        }, {
            name: 'B站评论区评论文本（新版）楼中楼回复',
            area: 'bilibili',
            main: '.sub-reply-list',
            item: '.sub-reply-item',
            text: '.sub-reply-content',
            media: '',
            user: ''
        }, {
            name: '油管首页推荐',
            area: 'youtube',
            main: 'ytd-rich-grid-renderer',
            item: 'ytd-rich-item-renderer',
            text: '#video-title',
            media: 'img',
            user: 'ytd-channel-name yt-formatted-string'
        }, {
            name: '油管搜索页',
            area: 'youtube',
            main: 'ytd-item-section-renderer',
            item: 'ytd-video-renderer',
            text: 'yt-formatted-string:eq(0)',
            media: 'img',
            user: 'ytd-channel-name yt-formatted-string'
        }, {
            name: '油管视频页右侧推荐栏',
            area: 'youtube',
            main: 'ytd-watch-next-secondary-results-renderer',
            item: 'ytd-item-section-renderer ytd-compact-video-renderer',
            text: '#video-title',
            media: 'img',
            user: 'ytd-channel-name yt-formatted-string'
        }, {
            name: '推文列表',
            area: 'twitter',
            main: 'section',
            item: '[data-testid=tweet]',
            text: '[data-testid=tweetText]',
            media: '[data-testid=tweetPhoto], video',
            user: '[data-testid=User-Names]'
        }]
    }
 
    // 当前激活缩写
    var activeName,
    fullFuckOffTitle,
    fullFuckOffUsers,
    areaList
 
    // 预设监听
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver,beforeTime = new Date(),
    observer,
    observerOption = {
        childList: true,
        subtree: true,
    },
    observerFunction = function() {}
 
    // B站
    function fuckOffBili(main = '', item = '', text = '', media = '', user = '') {
        let fuckOffTitle = getFuckOffRegExp(fullFuckOffTitle);
        let fuckOffUsers = getFuckOffRegExp(fullFuckOffUsers);
        $(main + ' ' + item).each(function(){
            let that = $(this)
            let textString = text ? that.find(text).text():''
            let userString = user ? that.find(user).text():''
            if ((fuckOffTitle.test(textString) || fuckOffUsers.test(userString))) {
                blurFuckOff('on', that, text, media)
            } else {
                blurFuckOff('off', that, text, media)
            }
        })
    }
 
    // 油管
    function fuckOffYtb(main = '', item = '', text = '', media = '', user = '') {
        let fuckOffTitle = getFuckOffRegExp(fullFuckOffTitle);
        let fuckOffUsers = getFuckOffRegExp(fullFuckOffUsers);
        $(main + ' ' + item).each(function(){
            let that = $(this)
            let textString = text ? that.find(text).text():''
            let userString = user ? that.find(user).text():''
            if (fuckOffTitle.test(textString) || fuckOffUsers.test(userString)) {
                blurFuckOff('on', that, text, media)
            } else {
                blurFuckOff('off', that, text, media)
            }
        })
    }
 
    // 推特
    function fuckOffTwitter(item = '', text = '', media = '', user = '') {
        let fuckOffTitle = getFuckOffRegExp(fullFuckOffTitle);
        let fuckOffUsers = getFuckOffRegExp(fullFuckOffUsers);
        $(item).each(function(e){
            let that = $(this)
            let textString = text ? that.find(text).text():''
            let userString = user ? that.find(user).text():''
            if ((fuckOffTitle.test(textString) || fuckOffUsers.test(userString)) && $(item).attr('tabindex') === '0') {
                blurFuckOff('on', that, text, media)
            } else {
                blurFuckOff('off', that, text, media)
            }
        })
    }
 
    // 公共
    function fuckOffCommon(main = '', item = '', text = '', media = '', user = '') {
        let fuckOffTitle = getFuckOffRegExp(fullFuckOffTitle);
        let fuckOffUsers = getFuckOffRegExp(fullFuckOffUsers);
        $(main + ' ' + item).each(function(){
            let that = $(this)
            let textString = text ? that.find(text).text():''
            let userString = user ? that.find(user).text():''
            if (fuckOffTitle.test(textString) || fuckOffUsers.test(userString)) {
                blurFuckOff('on', that, text, media)
            } else {
                blurFuckOff('off', that, text, media)
            }
        })
    }
 
    // 获取生效区域列表
    function getAreaList(name = '', field = 'area') {
        let areaListGM = GMGetValue('areaList')
        let list = []
        areaListGM.forEach(e => {
            if (e[field] == name) {
                list.push(e)
            }
        });
        return list
    }
 
    // 统一过滤入口
    function fuckOffArea(name = '') {
        setInterval(() => {
            areaList.forEach(e => {
                switch (name) {
                    case 'bilibili':
                        fuckOffBili(e.main, e.item, e.text, e.media, e.user)
                        break;
                    case 'youtube':
                        fuckOffYtb(e.main, e.item, e.text, e.media, e.user)
                        break;
                    case 'twitter':
                        fuckOffTwitter(e.item, e.text, e.media, e.user)
                        break;
                    default:
                        fuckOffCommon(e.main, e.item, e.text, e.media, e.user)
                        break;
                }
            })
        }, fuckOffDefaultConfig.fuckOffTimeout)
    }
 
    // 目标标题和图片模糊化处理
    function blurFuckOff(type = '', item = '', text = '', media = '') {
        if (type === 'on') {
            // 添加模糊化
            item.addClass('fuckOff')
            item.find(text).addClass('fuckOffBlur').attr('title', item.find(text).text())
            item.find(media).addClass('fuckOffBlur')
        } else {
            // 去除模糊化
            item.removeClass('fuckOff')
            item.find(text).removeClass('fuckOffBlur')
            item.find(media).removeClass('fuckOffBlur')
        }
    }
 
    // 初始化过滤
    function fuckOffInit() {
        if (/bilibili/.test(document.domain)) {
            areaList = getAreaList('bilibili')
            initTabs(0)
            fuckOffArea('bilibili')
        }
 
        if (/youtube/.test(document.domain)) {
            areaList = getAreaList('youtube')
            initTabs(1)
            fuckOffArea('youtube')
        }
 
        if (/twitter/.test(document.domain)) {
            areaList = getAreaList('twitter')
            initTabs(2)
            fuckOffArea('twitter')
        }
 
        observer = new MutationObserver(function (records) {
            var nowTime = new Date();
            if (nowTime - beforeTime > fuckOffDefaultConfig.fuckOffTimeout) {
                beforeTime = nowTime;
                records.map(function (record) {
                    // console.log(record)
                    if (record.addedNodes) {
                        observerFunction()
                    }
                });
            }
        });
 
        // 监听页面变化
        observer.observe(document.body, observerOption);
 
        // 表单赋值
        $('#' + fullFuckOffTitle).val(GMGetValue(fullFuckOffTitle))
        $('#' + fullFuckOffUsers).val(GMGetValue(fullFuckOffUsers))
 
        // 监听
        GMChange(fullFuckOffTitle)
        GMChange(fullFuckOffUsers)
    }
 
    // 恢复过滤前的状态
    function fuckOffRestart() {
        $('.fuckOff').removeClass('fuckOff')
        $('.fuckOffBlur').removeClass('fuckOffBlur')
    }
 
    // 显示/隐藏 屏蔽设置界面
    $('body').on('click', '#fuckOffOpenButton, #fuckOffLayout .bg, #fuckOffLayout .closeButton', function() {
        $('#fuckOffLayout').toggleClass('active')
    })
 
    // 切换tab
    $('body').on('click', '#fuckOffLayout .tabs .tabs-title .tab', function() {
        initTabs($(this).index())
    })
 
    // 设置tab显示
    function initTabs(index = 0) {
        $('#fuckOffLayout .tabs .tabs-title .tab').removeClass('active').eq(index).addClass('active')
        $('#fuckOffLayout .tabs .tabs-content .tab-item').removeClass('active').eq(index).addClass('active')
        // 赋值当前生效域名缩写
        activeName = $('#fuckOffLayout .tabs .tabs-content .tab-item.active').data('name')
        // 赋值键名
        fullFuckOffTitle = 'fuckOffTitle' + activeName
        fullFuckOffUsers = 'fuckOffUsers' + activeName
        // 屏蔽区域文本
        let areas = []
        areaList.forEach(e => {
            areas.push(e.name)
        })
        $('#fuckOffLayout .tabs-content .tab-item.active label').text(areas.join('、'))
    }
 
    // 重置初始化设置
    $('body').on('click', '#fuckOffLayout .btnGroup .resetButton', function() {
        if (confirm('确认重置当前网站配置？')) {
            clearInterval()
            GM_deleteValue(fullFuckOffTitle)
            GM_deleteValue(fullFuckOffUsers)
            fuckOffRestart()
            fuckOffInit()
        }
    })
 
    // 确认保存设置
    $('body').on('click', '#fuckOffLayout .btnGroup .submitButton', function() {
        clearInterval()
        GM_setValue(fullFuckOffTitle, $('#' + fullFuckOffTitle).val())
        GM_setValue(fullFuckOffUsers, $('#' + fullFuckOffUsers).val())
        showMsg('保存成功')
        fuckOffRestart()
        fuckOffInit()
    })
 
    // 获取配置，如不存在则返回默认值
    function GMGetValue(name = '') {
        return GM_getValue(name) ? GM_getValue(name):fuckOffDefaultConfig[name];
    }
 
    // 监听其他标签页的修改操作
    function GMChange(name) {
        if (GM_getValue(name)) {
            GM_addValueChangeListener(name, function(Name, old_value, new_value, remote) {
                if (remote === true) {
                    clearInterval()
                    fuckOffRestart()
                    fuckOffInit()
                }
            })
        }
    }
 
    // 显示提示
    function showMsg(msg = '') {
        $('#fuckOffMsg').text(msg)
        $('#fuckOffMsg').addClass('active')
        setTimeout(() => {
            $('#fuckOffMsg').removeClass('active')
        }, 3000);
    }
 
    // 字符串转RegExp对象
    function getFuckOffRegExp(name = '') {
        let str = GM_getValue(name) ? GM_getValue(name):fuckOffDefaultConfig[name]
        return new RegExp(str.replace(/^\/|\/[a-z]*$/gi, ''), str.replace(/^\/.*\/[^a-z]*/i, ''))
    }
 
    // 右侧按钮背景图标
    var fuckOffOpenButtonImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAABCCAMAAADUivDaAAAAkFBMVEVHcEybnJ+cnJ+anJ+Zm52anJ+cnJ+bm5+bnZ+bm5+cnJ6amp/s5dibnJ9WYXjd186goKPd182goaNpcoR8gpDZ1czZ1MxocoTY08qqq65faX7GxMDX0sm6t7S5t7THxMC0s7RgaX6zs7Sho6hxeoqztLS9vLri3dJ7gpDPzMaXm6KOk5y0tLRyeoqYm6Lj3dLW6FtKAAAADHRSTlMA79/fcG9QgH9AX2BxaR3bAAABz0lEQVRYw8XY63bCIAwAYHUqulXU0Xmpbl7nfdv7v92w0o1CUhI8O8svPcp3QsBArdX+PLqtVvcuoF3v6Wg8xgudnonO3UK0YQmRRkmIMhwhwvAEtlEIb5Mk6b/GGEYYaOAa/QHbKIR+kkQansA2AIFpgALLQASGgQpko0IgGoBwWbIMKAeVcvKAhJmUR7oB1uEs5YZcD7iSSsqMWlNYuEgdC5qBrKa6EilpbRFhKvPYEQxEeFndiGwUNDBBSRMqZASFoPFkWqNbh5W0Qi3Ln07MoHZOPJhOa39jv0ulEw5ienI9P7uNN7R29WklgVDno5/G9dxvmte/M1ASDSsVM6wJEe8pThzWEFFMZGKtxWkMjc821rrMrYnU6kA5k5mXymEBlbNxu8r4aeTzKWUyXjgbwwwyFyBxe/c8dLaWZWyRrSWK7Rk0tvuAgBuZmcUoKKCG+bGvCQJqpBUtR7htCzZmeOMTfvMEjS9djTFVQIxP5BAQ8EECGXomI7oAGx8pRwCN6ZoloGvLECoNolBhkAXUYAiIwRJAgykABlvwjDlf+DF6b3MNFA8TgvdAIvxHGqYAGGzBMyIEx4gSSkakYBnRgr4A5deXRvt//3wgxTeKjHm6C4QG7gAAAABJRU5ErkJggg==',
    // 设置界面标题背景图
    fuckOffLayoutHeaderBgImg = 'data:image/jpeg;base64,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',
    // 设置界面四角图标
    cornerIcon = 'data:image/png;base64,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',
    // 外链图标
    outlinkIcon = 'data:image/png;base64,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',
    // 帮助图标
    helpIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAAq1BMVEVHcEzPv4/Ru43SvI7Pt4/TvI3SvI7Pv4/UvI7Tu4vSvIzPuo/TvI3TvI7TvI7Pr4/TvI7Ru43SvY3SvI7Suo3Pv4/TvI7Pu4/SvIzSvIzTu4/Tu43UvI7Uu47Tu47TvY7SvI/Vvo7UvY7UvY3UvI/SvY/UvI7Su47UvI3UuorVvY7TvI7SvI/Pt4fTuozUvY3Suo7PuorTuo7TvI7SvY/TvI7Pv4/UvY/TvI58mZGrAAAAOHRSTlMAEIDvIL/fIN9AoDCvkO8Qz3Bgn2Ah30CfUECAX8/Pf59P34+fYM+wnzB/b1AgkJ+gMJCPj/4wjz4UWLEAAAHGSURBVFjD7ZjZVoMwEIaHkLIIhRarFKlWW7toF3fN+z+ZF0IINs2EkuPxgv+yk/PlzzAZhgJ06iSRlS4IIZtt0IqS7mesVBROrBMxowGrK1q7p7jxmETTxql5Z3J5zUy51+yYokkTjscUmhriMKbtSTiXHSYvMcDOf3UE0oMe57HC5LFQDRXK06ool6/v0Xok55G5DoiXYf8glNllzMc52XEOgM/N4qBesdSRRoclydLOEFXvQ9CbWiy8PxIvD3eDgUK1ocoSdjYb27DM0h1y6xWP7Ee0WDFUg67w/QrPt3ogRcHNTIF6WiWp72ilBgUFKGmbI/ypBZqlbWMZGOnVEa/sAKtsioDKwl0jlxq9axbSlwe6t59bX6r7OUVBvAk+SYKfDOkyMkuSDp9G+oYES2z56z2/YU0MAfSr9/xUQKXVe9OhWiAQ56JwElgAdLuPhB/nehygDkP0tVgQ1whJd1IyRxIyXpeTOQ1JmcyUncdCeejOgSNHgqkaUpOJ0n8eiCNXXOvGDWfT2E8IIUm2O2iRJ025NZ3VSJcXHelvSSswRHpr81U4rjjn7b5Sx4Y4nNSaU5AMcADGH2Y4AMO8+0ej0z/WNy2G1+uRzMQpAAAAAElFTkSuQmCC',
    // 关闭按钮
    closeIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAAOVBMVEVHcEzPv4/Pt4/UvI7UvY3SvIzSvI7Tu4/Tu4vUvY/SvI7TvI7Pv4/Puo/TvI7SvI7Pr4/UuorTvI6w3uGvAAAAEnRSTlMAICDfn6CgQECf3/4QMO/vEDC0IvapAAABOklEQVRYw+3X0ZKDIAwF0AaUVldr6/9/7JbdVgKSEIwvneE+Z850DAn0cmlpafniTNeQOVcAqGBioOu6ZTS5AjOGipsIyjuRJIIoB0sS6G7oGlP1izq6Zqj7Rl3REUKUNNR2jZA+zlKGRtPT0sdxvnc85PtOSpvzdwpY6P/8EBJyvMRB8D4/WSlyXtJTMr0ZKXGk2UkHnZ102EkkhRNJKgdJSidIWieRnOY26E9ykKR0wv7pTnKU0rCup0hD3P5O67heJ6HzrJKiuVBIyXwdlnZzelDKzHuVNAOzDxMJDHcdWWD2YSSB5S9IL5F7DElgS1e2BWYfbtLLKT4i7tzewJtO+BpxxU0ng1x5Z4ogJ9iZIgiYh8ZSA1lS8v2q+UaUFBxp1/LS2/nx4aDpFpIdpRkVPNqfwJaWb84vmyo1griDd2kAAAAASUVORK5CYII=',
    // 设置界面底部图
    brImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAy0AAAAbCAMAAABGBZAZAAAAb1BMVEXRu43Pt4/Ru43Tu4vQu4zfv4DSuo1HcEzPv4/Ru43Pu4/RvI7Pv4/SuYzPuo3Puo/PvIzPuorKtYrKv4rQu47SuYzNu43Uuo/RuY7SvIzPuYzSv4zPu4vTuo7Quo7UuorQuozPt4fRvI7Pu43RuI6dyzQmAAAAJXRSTlOAIDhAeAhgABBwQEggUGAwUDAYGHgoODBYUFAoQGhoMGggWHBICkyxTwAAAjBJREFUGBntwem2okgQhdEPyMwTATjdqeapu9//GZuSpZYKd9VfIfZGczYKYY3eNAfNqDGFsD5GrRlomiU2CmF9PvNimoamfQNMIayNAUXT0KSGQVEIa/OZQaNJaErNUa0Q1uXA0QdNQRN+MHoxXekahbAkXaMrlhh90AR0J3ecuOkiFyimEJYiFyimC3NOGt1DN3KTuPAnnZgzcFMIy2DOwE0nz86FH0w30JV+k7jWaNQnSAm8UghL0CdICbzSqObGptcVdJa/bBL3imlQA1uzPdAohMdXA/+Y7YFGAyvc882XrDM06pvCnEbSzr3S4NWhUQiPrgOvNNh5epVyk5hRvvYaIeW+KYn3+EGyrFFLCEvQZh3lLPXOe1L52meJX3v+QjGdmRPCo/v2rLO+8Bf2FVKuusK7vMB/WUfZpJ0TwiP7t5Zy1lHuYOu8J227KktoVHU/mZHarBb8oEHvflAIj+81+UGD3qGTWuZsuyrrCJ3Z7mPi3tY0aIGNWQFqhfD4WmBjVoBaAyvcSx93WWfoyuueG7VGlcNLglQphCWoHF4SpEqjlmtpW2X9Cd2wnXPhzzoxZ+CmEJbBnIGbTp6ci9Rm3UD3Wk7cdGEFtlkhLIUV2GZdmHPSZt1BE56co2S60nYKYUnaTlcscZQqTUBTzPltpxDWpeY3N01Bk54YfFIIa1MYPGsSmlYDphDWxoBa09CMwieFsD57vmsGmlFhCmF9DNMMNOdNIazRm+b8DynQD179IlWYAAAAAElFTkSuQmCC';
 
    // 右侧按钮
    const fuckOffOpenButton = "<a id='fuckOffOpenButton'>原神内鬼屏蔽</a>";
    $('body').append(fuckOffOpenButton)
 
    // 设置界面
    const fuckOffLayout = '<div id="fuckOffLayout"><div class="bg"></div><div class="box"><div class="cornerIcon lt"></div><div class="cornerIcon rt"></div><div class="cornerIcon lb"></div><div class="cornerIcon rb"></div><div class="toolerGroup"><a href="javascript:;"class="outlinkButton"target="_blank"title="作者视频介绍"></a><a href="javascript:;"class="helpButton"target="_blank"title="查看帮助文档"></a><a href="javascript:;"class="closeButton"title="关闭界面"></a></div><div class="header"><h1>原神内鬼屏蔽设置</h1></div><div class="body"><div class="tabs"><div class="tabs-title"><div class="tab active">B站</div><div class="tab">油管</div><div class="tab">推特</div></div><div class="tabs-content"><div class="tab-item active"data-name="Bili"><div class="form"><p>标题关键词</p><textarea id="fuckOffTitleBili"rows="5"></textarea></div><div class="form"><p>作者黑名单</p><textarea id="fuckOffUsersBili"rows="5"></textarea></div><div class="form"><p>屏蔽区域</p><label></label></div></div><div class="tab-item"data-name="Ytb"><div class="form"><p>标题关键词</p><textarea id="fuckOffTitleYtb"rows="5"></textarea></div><div class="form"><p>作者黑名单</p><textarea id="fuckOffUsersYtb"rows="5"></textarea></div><div class="form"><p>屏蔽区域</p><label></label></div></div><div class="tab-item"data-name="Twitter"><div class="form"><p>正文关键词</p><textarea id="fuckOffTitleTwitter"rows="5"></textarea></div><div class="form"><p>作者黑名单</p><textarea id="fuckOffUsersTwitter"rows="5"></textarea></div><div class="form"><p>屏蔽区域</p><label></label></div></div></div></div><div class="btnGroup"><div class="resetButton"title="初始化配置"alt=""><span></span><span></span></div><div class="submitButton"title="确认修改"alt=""><div class="yellow-circle"><div class="black-circle"></div></div></div></div><img src=""class="brImg"alt=""></div></div><div id="fuckOffMsg"></div></div>';
    $('body').append(fuckOffLayout)
 
    $('#fuckOffOpenButton').css('background-image', 'url(' + fuckOffOpenButtonImg + ')')
    $('#fuckOffLayout .box .header').css('background-image', 'url(' + fuckOffLayoutHeaderBgImg + ')')
    $('#fuckOffLayout .cornerIcon').css('background-image', 'url(' + cornerIcon + ')')
    $('#fuckOffLayout .outlinkButton').css('background-image', 'url(' + outlinkIcon + ')').attr('href', fuckOffDefaultConfig.outLink)
    $('#fuckOffLayout .helpButton').css('background-image', 'url(' + helpIcon + ')').attr('href', fuckOffDefaultConfig.helpLink)
    $('#fuckOffLayout .closeButton').css('background-image', 'url(' + closeIcon + ')')
    $('.brImg').attr('src', brImg)
 
    // 初始化
    fuckOffInit()
    
    // 样式表
    const FUCKOFF_STYLE = `
        #fuckOffOpenButton {
            position:fixed;
            z-index:99997;
            right:0;
            top:40%;
            width:30px;
            height:120px;
            border-top-right-radius:2px;
            border-bottom-right-radius:2px;
            background-color:rgba(0 178 255);
            font-size:12px;
            color:#fff;
            padding:8px 9px;
            line-height:14px;
            box-sizing:border-box;
            text-decoration:none;
            outline:none;
            cursor:pointer;
            background-position: center 5px;
            background-size: 24px;
            background-repeat: no-repeat;
            padding-top: 30px;
            border-top-left-radius: 8px;
            border-bottom-left-radius: 8px;
            transition: all 0.3s;
        }
        #fuckOffOpenButton:hover {
            box-shadow:0 0px 10px 0 rgba(0 178 255 / 40%);
        }
        #fuckOffLayout {
            display: none;
        }
        #fuckOffLayout *::-webkit-scrollbar {
            width: 6px;
            height: 1px;
        }
        #fuckOffLayout *::-webkit-scrollbar-thumb {
            border-radius: 10px;
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            background: #dfd0b3;
        }
        #fuckOffLayout *::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            border-radius: 10px;
            background: #ededed;
        }
        #fuckOffLayout * {
            font-family: 'system-ui' !important
        }
        #fuckOffLayout .bg {
            position: fixed;
            inset: 0px;
            background: rgba(0, 0, 0, 0.7);
            animation-name: balh-settings-bg;
            animation-duration: 0.5s;
            z-index: 99997;
            cursor: pointer;
        }
        #fuckOffLayout .box {
            position: fixed;
            background: rgb(59, 67, 84);
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            cursor: default;
            z-index: 99998;
        }
        #fuckOffLayout .box * {
            margin: 0;
            line-height: 1.5
        }
        #fuckOffLayout .box .header {
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            text-align: center;
            background-size: contain;
            background-repeat: no-repeat;
            height: 80px;
        }
        #fuckOffLayout .box .body {
            padding: 20px;
            background-color: #ece5d8;
            border-bottom-right-radius: 10px;
            border-bottom-left-radius: 10px;
            background-size: cover;
        }
        #fuckOffLayout .box .body .form {
            margin-bottom: 10px;
        }
        #fuckOffLayout .box img {
            max-width: 100%;
        }
        #fuckOffLayout.active {
            display: block;
        }
        #fuckOffLayout .box h1 {
            color: #d3bc8e;
            font-size: 32px;
            font-weight: bolder;
            line-height: 80px
        }
        #fuckOffLayout .box p {
            color: #323947;
            font-size: 18px;
            margin-bottom: 10px;
        }
        #fuckOffLayout .box label {
            font-size: 16px;
        }
        #fuckOffLayout .box .tabs-title {
            position: relative;
            height: 40px;
            white-space: nowrap;
            border-bottom: 1px solid #7e7e7e;
            display: flex;
        }
        #fuckOffLayout .box .tabs-title .tab {
            display: inline-block;
            vertical-align: middle;
            font-size: 18px;
            position: relative;
            line-height: 40px;
            padding: 0 15px;
            text-align: center;
            cursor: pointer;
            flex: 1 0 0;
            width: auto;
            color: #7e7e7e;
            display: none;
        }
        #fuckOffLayout .box .tabs-title .tab.active {
            color: #323947;
            display:block;
        }
        #fuckOffLayout .box .tabs-title .tab.active::after {
            position: absolute;
            left: 0;
            top: 0;
            content: "";
            width: 100%;
            height: 41px;
            border-radius: 2px 2px 0 0;
            box-sizing: border-box;
            pointer-events: none;
            border-bottom: 2px solid #323947;
        }
        #fuckOffLayout .box .tabs-content .tab-item {
            display: none;
            padding: 10px 0;
            max-height: 400px;
            overflow-x: hidden;
        }
        #fuckOffLayout .box .tabs-content .tab-item.active {
            display: block;
        }
        #fuckOffLayout .box .tabs-content textarea {
            width: 100%;
            box-sizing: border-box;
            resize:none;
            padding: 10px;
            font-size: 16px;
            color: #000;
            height: 120px;
            border-radius: 5px;
            background-color: #fff;
        }
        #fuckOffLayout .box .tabs-content textarea:focus-visible {
            outline: 0;
        }
        #fuckOffLayout .cornerIcon {
            position: absolute;
            width: 24px;
            height: 24px;
            background-size: 24px 24px;
        }
        #fuckOffLayout .cornerIcon.lt {
            left: -10px;
            top: -10px;
        }
        #fuckOffLayout .cornerIcon.rt {
            right: -10px;
            top: -10px;
            transform: rotate(90deg);
        }
        #fuckOffLayout .cornerIcon.lb {
            left: -10px;
            bottom: -10px;
            transform: rotate(-90deg);
        }
        #fuckOffLayout .cornerIcon.rb {
            right: -10px;
            bottom: -10px;
            transform: rotate(180deg);
        }
        #fuckOffLayout .toolerGroup {
            position: absolute;
            top: 30px;
            right: 20px;
        }
        #fuckOffLayout .toolerGroup > * {
            cursor: pointer;
            display: inline-block;
            width: 24px;
            height: 24px;
            background-size: 24px 24px;
            margin-left: 5px;
        }
        #fuckOffLayout .btnGroup {
            display: flex;
            justify-content: space-evenly;
            margin-top: 10px;
        }
        #fuckOffLayout .btnGroup img {
            cursor: pointer;
            opacity: 0.8;
            transition: all 0.3s;
        }
        #fuckOffLayout .btnGroup img:hover {
            opacity: 1;
        }
        .fuckOffHide {
            display: none !important;
        }
        #fuckOffLayout #fuckOffMsg {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            min-width: 100px;
            border-radius: 2px;
            background-color: rgba(0,0,0,.6);
            color: #fff;
            visibility: hidden;
            transition: all 0.3s;
            padding: 12px 25px;
            text-align: center;
        }
        #fuckOffLayout #fuckOffMsg.active {
            visibility: visible;
            z-index: 99999
        }
        .fuckOffBlur {
            filter: blur(30px);
        }
        #fuckOffLayout .resetButton, #fuckOffLayout .submitButton {
          background-color: #333333;
          border-radius: 50%;
          width: 68px;
          height: 68px;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
        }
        #fuckOffLayout .resetButton span {
          border-radius: 10px;
          width: 35px;
          height: 5px;
          background-color: #38a1e4;
          margin: 6px 0;
          transition: 0.4s;
        }
        #fuckOffLayout .resetButton span:first-child {
          -webkit-transform: rotate(-45deg) translate(-12px, 12px);
          transform: rotate(-45deg) translate(-12px, 12px);
        }
        #fuckOffLayout .resetButton span:last-child {
          -webkit-transform: rotate(45deg) translate(-12px, -12px);
          transform: rotate(45deg) translate(-12px, -12px);
        }
        #fuckOffLayout .submitButton .yellow-circle {
          width: 35px;
          height: 35px;
          background-color: #ffcc33;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        #fuckOffLayout .submitButton .black-circle {
          background-color: #333333;
          width: 28px;
          height: 28px;
          border-radius: 50%;
        }
        @media screen and (max-width: 768px){
            #fuckOffLayout .box {
                width: 95%;
            }
            #fuckOffLayout .box .header {
                height: 50px;
            }
            #fuckOffLayout .box h1 {
                font-size: 18px;
                line-height: 50px;
            }
            #fuckOffLayout .toolerGroup {
                top: 15px;
            }
        }
    `;
 
    GM_addStyle(FUCKOFF_STYLE)
 
})();