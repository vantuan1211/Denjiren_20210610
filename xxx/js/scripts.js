/* -----------------------------------------------
Table of Contents (common js)
--------------------------------------------------
1. userAgent判別
2. URL判別
3. 設定
4. JSファイル読み込み時即実行(Execute JavaScript when the page loaded.)
5. DOM構築後実行(Execute JavaScript when the DOM is fully loaded.)
6. 画像など含めてページ読込み完了後に実行(Execute JavaScript when the Window Object is fully loaded.)
7. 動的コンテンツに対してイベントを設定
8. その他のイベントを設定
9. 関数(プラグイン)複数

// require jQuery JavaScript Library v3.5.1
/* ------------------------------------------------------------
 * [ userAgent ] http://www.useragentstring.com/pages/useragentstring.php
 * ------------------------------------------------------------ */
var ua                   = window.navigator.userAgent;
var appVer               = window.navigator.appVersion;

//PC
var isIE                 = ua.indexOf('MSIE') != -1 || ua.indexOf('Trident') != -1;
var isIE6                = isIE && appVer.indexOf('MSIE 6') != -1;
var isIE7                = isIE && appVer.indexOf('MSIE 7.') != -1;
var isIE8                = isIE && ua.indexOf('Trident/4.') != -1;
var isIE9                = isIE && ua.indexOf('Trident/5.') != -1;
var isIE10               = isIE && ua.indexOf('Trident/6.') != -1;
var isIE11               = ua.indexOf('Trident/7.') != -1;

var isFirefox            = ua.indexOf('Firefox') != -1;
var isChrome             = ua.indexOf('Chrome') != -1;
var isSafari             = ua.indexOf('Safari') != -1;

//Mobile (smartphone + tablet)
var isMobileSafari       = ua.match(/iPhone|iPad|iPod/i) ? true : false;
var isMobileSafariTypeT  = ua.match(/ipad/i) ? true : false;
var isMobileSafariTypeS  = ua.match(/iphone|ipod/i) ? true : false;
var isAndroid            = ua.indexOf('Android') != -1;
var isMobileAndroidTypeT = isAndroid && ua.indexOf('Mobile') == -1;
var isMobileAndroidTypeS = isAndroid && ua.indexOf('Mobile') != -1;
var isAndroidChrome      = isChrome && isAndroid;
var isAndroidFirefox     = isFirefox && isAndroid;
var isMobileFirefox      = isFirefox && ua.indexOf('Mobile') != -1;
var isTabletFirefox      = isFirefox && ua.indexOf('Tablet') != -1;

//PC or Mobile
var isTablet             = isMobileSafariTypeT || isMobileAndroidTypeT || isTabletFirefox;
var isSmartPhone         = isMobileSafariTypeS || isMobileAndroidTypeS || isMobileFirefox;
var isMobile             = isTablet || isSmartPhone || isAndroidChrome || isAndroidFirefox;
var isPC                 = !isMobile;



/* ------------------------------------------------------------
 * [ Location ]
 * ------------------------------------------------------------ */
var  locationHref     = window.location.href,     // http://www.google.com:80/search?q=demo#test
     locationProtocol = window.location.protocol, // http:
     locationHostname = window.location.hostname, // www.google.com
     locationHost     = window.location.host,     // www.google.com:80
     locationPort     = window.location.port,     // 80
     locationPath     = window.location.pathname, // /search
     locationSearch   = window.location.search,   // ?q=demo
     locationHash     = window.location.hash;     // #test

/* ============================================================
* Common Script
* ============================================================ */
var Common = (function () {
	function Common() {
		this.onInit();
	}
	
	/**
	* 初期化
	*/
	Common.prototype.onInit = function () {
		var _this = this;
		_this.addAgentClass();
		_this.initGlobalNav();
		_this.smoothScroll();
		_this.jsMediaSNS();
		_this.jsLightBox();
	}

	/**
	* userAgent Classes to <html>
	*/
	Common.prototype.addAgentClass = function(){
		if (isTablet) {
			$('html').addClass('is-tablet');
		}
		if (isSmartPhone) {
			$('html').addClass('is-sp');
		}
		if (isPC) {
			$('html').addClass('is-pc');
		}
		if (isMobile) {
			$('html').addClass('is-mobile');
		}
		if (isIE) {
			$('html').addClass('is-ie');
		}
		if (isIE11) {
			$('html').addClass('is-ie11');
		}
	}

	/**
	* smoothScroll
	*/
	Common.prototype.smoothScroll = function(){
		$('body').on('click', 'a[href^="#"]:not(".js-modal-popup")',function(){
			var href= $(this).attr('href');
			var target = $(href === '#' || href === '' ? 'html' : href);
			var position = target.offset().top - $('#l-header').height();
			$('body,html').animate({scrollTop:position}, 500, 'swing');
			return false;
		});
	}

	/**
	* グローバリゼーション
	*/
	Common.prototype.initGlobalNav = function () {
		$(window).on('scroll', function(){
			if($(window).width() < 768){
				var scrollTop = $(window).scrollTop(),
					footerTop = $('#l-footer').offset().top;
				if(scrollTop >= footerTop - $(window).height()){
					$('.nav-global-wrap').addClass('is-hide');
				}else{
					$('.nav-global-wrap').removeClass('is-hide');
				}
			}
		});
	}

	//Media SNS
	Common.prototype.jsMediaSNS = function () {
		/* ------------------------------------------------------------
		 SNS
		* ------------------------------------------------------------ */
		var lang          = $('html').attr('lang');
		var titleElemText = window.document.title; //jQueryで<head>要素内の情報を取得できないためこの記法

		var txtOriginal   = titleElemText.replace(/\s/g,'');
		var txt           = encodeURI(txtOriginal);
		var url           = location.href;

		var hashTags = ""; //Twitterで使用

		// facebook
		$('.media-sns__facebook').append('<a href="//www.facebook.com/sharer/sharer.php?u=' + url + '" target="_blank" class="brightover"><img src="./img/icon-facebook.svg" alt="Facebook"></a>');
		// twitter
		$('.media-sns__twitter').append('<a href="//twitter.com/intent/tweet?url=' + url + '&amp;text=[' + txt + ']&amp;hashtags=' + hashTags + '" target="_blank" class="brightover"><img src="./img/icon-twitter.svg" alt="Twitter"></a>');

	}

	//Light box
	Common.prototype.jsLightBox = function () {
		$('.detail-box-modal').addClass('is-load');
		$('.js-modal-popup').unbind('click');
		$('.js-modal-popup').click(function(e){
			e.preventDefault();
			var $target = $($(this).attr('href'));
			$('#l-document').width($('#l-document').width());
			$('#l-header').width($('#l-document').width());
			$target.addClass('is-open');
			$('html').addClass('is-hidden');
			return;
		});
		$('.detail-box-modal__heading i').click(function(){
			$('.detail-box-modal.is-open').removeClass('is-open');
			$('html').removeClass('is-hidden');
			$('#l-document').removeAttr('style');
			$('#l-header').removeAttr('style');
		});
		$('.detail-box-modal__close').click(function(){
			$('.detail-box-modal.is-open').removeClass('is-open');
			$('html').removeClass('is-hidden');
			$('#l-document').removeAttr('style');
			$('#l-header').removeAttr('style');
		});
		$('.detail-box-modal').click(function(e){
			if($(e.target).closest('.detail-box-modal__content').length){
					return;
			}
			$('.detail-box-modal.is-open').removeClass('is-open');
			$('html').removeClass('is-hidden');
			$('#l-document').removeAttr('style');
			$('#l-header').removeAttr('style');
		});
	}
	return Common;
}());

/* ============================================================
 * Execute JavaScript when the DOM is fully loaded.
 * ============================================================ */
function eventHandler(){
	var commonJS;
	commonJS = new Common();
}
if(document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}