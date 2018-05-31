/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: browser.js @author: walljack@163.com @date: 18-5-31 上午10:24 @version: 1.0
 */

// import { captureRightClick, ie, ieVersion, mobile, webkit } from "../util/browser"
let userAgent = navigator.userAgent;
let platform = navigator.platform;

export let gecko = /gecko\/\d/i.test(userAgent);
let ieUpto10 = /MSIE \d/.test(userAgent);
let ie11up = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(userAgent);
let edge = /Edge\/(\d+)/.exec(userAgent);
export let ie = ieUpto10 || ie11up || edge;
export let ieVersion = ie && (ieUpto10 ? document.documentMode || 6 : +(edge || ie11up)[1]);
export let webkit = !edge && /WebKit\//.test(userAgent);
let qtwebkit = webkit && /Qt\/\d+\.\d+/.test(userAgent);
export let chrome = !edge && /Chrome\//.test(userAgent);
export let presto = /Opera\//.test(userAgent);
export let safari = /Apple Computer/.test(navigator.vendor);
export let macGeMountainLion = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(userAgent);
export let phantom = /PhantomJS/.test(userAgent);

export let ios = !edge && /AppleWebKit/.test(userAgent) && /Mobile\/\w+/.test(userAgent);
export let android = /Android/.test(userAgent);
// This is woefully incomplete. Suggestions for alternative methods welcome.
// export let mobile = ios || android || /webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(userAgent);
export let mobile = (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|UCBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone|Opera Mini|Opera Mobi)/i));

export let mac = ios || /Mac/.test(platform);
export let chromeOS = /\bCrOS\b/.test(userAgent);
export let windows = /win/i.test(platform);

let prestoVersion = presto && userAgent.match(/Version\/(\d*\.\d*)/);
if (prestoVersion) prestoVersion = Number(prestoVersion[1]);
if (prestoVersion && prestoVersion >= 15) {
    presto = false;
    webkit = true;
}
// Some browsers use the wrong event properties to signal cmd/ctrl on OS X
export let flipCtrlCmd = mac && (qtwebkit || presto && (prestoVersion === null || prestoVersion < 12.11));
export let captureRightClick = gecko || (ie && ieVersion >= 9);
