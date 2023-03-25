/*
 * @Author: your name
 * @Date: 2020-12-13 16:42:44
 * @LastEditTime: 2021-03-26 15:35:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Web前端练习d:\mysite\js\index.js
 */
// 轮播图效果
// 获取元素
var list = document.querySelector('.img-list');
var ul_li = list.querySelectorAll('li');
var banner = document.querySelector('#banner');
var left = document.querySelector('.left');
var right = document.querySelector('.right');
var circle = document.querySelector('.list');
var ol_li = circle.querySelectorAll('li');
var liWidth = ul_li[0].offsetWidth;
// 图片下标,定时器
var index = 0,
	timer = null,
	timer1 = null;
// 圆点下标
var val = 0;
// 设置一个开关防止多次点击
var key = true;
// 设置默认选中小圆点
ol_li[0].className = 'active';
function run(elem,target){
	clearInterval(timer);
	timer = setInterval(function(){
		var start = elem.offsetLeft,
		// 一张图片每15ms走的距离（从开始位置到结束位置）
			step = (target - start) / 20;
		if (step < 0) {
			step = Math.floor(step);
		} else {
			step = Math.ceil(step);
		}
		// 在走完之后才能进行点击，在运动是点击箭头是无效的
		if (step == 0) {
			key = true;
		}
		start = start + step;
		elem.style.left = start + 'px';
	},20);
}
right.onclick = function(){
	if (key) {
		key = false;
		index++;
		if (index > ul_li.length - 1) {
			index = 1;
			list.style.left = 0;
		}
		val++;
		val = index;
		if (val > ol_li.length - 1) {
			val = 0;
		}
		run(list,-index * liWidth);
		for (var i = 0; i < ol_li.length; i ++) {
			ol_li[i].className = '';
		}
		ol_li[val].className = 'active';
	}
};
left.onclick = function(){
	if (key) {
		key = false;
		index--;
		if (index < 0) {
			index = ul_li.length - 2;
			list.style.left = -(ul_li.length - 1) * liWidth + 'px';
		}
		val++;
		val = index;
		if (val > ol_li.length - 1) {
			val = 0;
		}
		run(list,-index * liWidth);
		for (var i = 0; i < ol_li.length; i ++) {
			ol_li[i].className = '';
		}
		ol_li[val].className = 'active';
	}
};
// 给小圆点绑定鼠标滑入事件
for (var i = 0; i < ol_li.length; i ++) {
	ol_li[i].index = i;
	ol_li[i].onmouseenter = function(){
		for (var j = 0; j < ol_li.length; j ++) {
			ol_li[j].className = '';
		}
		this.className = 'active';
		// this.style.left = this.index * liWidth + 'px';
		run(list,-this.index * liWidth);
	}
}
// 自动轮播
var autoPlay = function () {
	if (key) {
		key = false;
		index++;
		if (index > ul_li.length - 1) {
			index = 1;
			list.style.left = 0;
		}
		val++;
		val = index;
		if (val > ol_li.length - 1) {
			val = 0;
		}
		run(list,-index * liWidth);
		for (var i = 0; i < ol_li.length; i ++) {
			ol_li[i].className = '';
		}
		ol_li[val].className = 'active';
	}
}
timer1 = setInterval(autoPlay,5000);
banner.onmouseleave = function() {
	timer1 = setInterval(autoPlay,5000);
}
banner.onmouseenter = function() {
	clearInterval(timer1);
}
