// ==UserScript==
// @name         B站与油管屏蔽原神内鬼爆料相关视频
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  祝原神爆料内鬼冚家富贵，雄性抵插棍，雌性烂臭閪
// @author       凡云 - https://space.bilibili.com/3491267
// @match        *://*.bilibili.com/*
// @match        *://*.youtube.com/*
// @icon         https://static.hdslb.com/images/favicon.ico
// @require      https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js
// @grant        none
// @license      MIT
// ==/UserScript==
 
(function() {
    'use strict';
    var fuckOffRecoString = /2\.9|3\.0|3\.1|3\.2|草神|草 神|爆料|白术|草元素|草反应|草系反应|草雷|草环境|智慧/
    var fuckOffSearchString = /2\.9|3\.0|3\.1|3\.2|草神|草 神|爆料|草元素|草反应|草系反应|草雷|草环境|智慧/
    var fuckOffYtbString = /2\.9|3\.0|3\.1|3\.2|dendro|leak|tighnari|草元素|草反应|草系反应|草环境/
 
    setInterval(() => {
        // B站首页推荐栏（旧版）
        fuckOffBili(fuckOffRecoString, '.rcmd-box', '.video-card-reco', '.title', false)
        // B站首页推荐栏（新版）
        fuckOffBili(fuckOffRecoString, '.recommend-container__2-line', '.bili-video-card', '.bili-video-card__info--tit', true)
        // B站右侧推荐栏（旧版）
        fuckOffBili(fuckOffRecoString, '#reco_list', '.video-page-card', '.title', true)
        // B站右侧推荐栏（新版）
        fuckOffBili(fuckOffRecoString, '#reco_list', '.video-page-card-small', '.title', true)
        // B站视频播放结束推荐列表（新旧版）
        fuckOffBili(fuckOffRecoString, '.bpx-player-ending-related', '.bpx-player-ending-related-item', '.bpx-player-ending-related-item-title', true)
        // B站搜索页（旧版）
        fuckOffBili(fuckOffSearchString, '#server-search-app .video-list', '.video-item', '.title', true)
        // B站新版搜索页（新版）
        fuckOffBili(fuckOffSearchString, '.search-page .video-list', '.video-list-item', '.bili-video-card__info--tit', true)
        // 油管首页
        fuckOffYtb(fuckOffYtbString, 'ytd-rich-grid-renderer', 'ytd-rich-item-renderer', 'yt-formatted-string', false)
        // 油管搜索页
        fuckOffYtb(fuckOffYtbString, 'ytd-item-section-renderer', 'ytd-video-renderer', 'yt-formatted-string', false)
        // 油管视频右侧推荐栏
        fuckOffYtb(fuckOffYtbString, 'ytd-watch-next-secondary-results-renderer', 'ytd-item-section-renderer ytd-compact-video-renderer', '#video-title', true)
    }, 500)
 
    function fuckOffBili(fuckOffString = '', main = '', item = '', title = '', isRemove = false) {
        if ($(main).length && $(main).length > 0) {
            $(main + ' ' + item).each(function(){
                let that = $(this)
                let testString = fuckOffFormat(that.find(title).text())
                if (fuckOffString.test(testString)) {
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
                    // console.log(testString)
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