/*
 * @Author: 刘瑞源
 * @Date: 2021-02-27 13:35:35
 * @LastEditTime: 2021-03-20 16:25:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Web前端练习d:\javascript的学习\js\tools.js
 */
// 圣杯模式
function extend(Target, Origin) {
  function F() {}
  F.prototype = Origin.prototype;
  Target.prototype = new F();
  Target.prototype.constructor = Target;
  Target.prototype.uber = Origin.prototype;
}
var inherit = (function () {
  var F = function () {};
  return function (Target, Origin) {
    F.prototype = Origin.prototype;
    Target.prototype = new F();
    Target.prototype.constructor = Target;
    Target.prototype.uber = Origin.prototype;
  };
})();
// 深度克隆
function deepClone(orgin, target) {
  var target = target || {},
    toStr = Object.prototype.toString,
    arrStr = "[object Array]";
  for (var prop in orgin) {
    if (orgin.hasOwnProperty(prop)) {
      if (orgin[prop] !== "null" && typeof orgin[prop] == "object") {
        // if (toStr.call(orgin[prop]) == arrStr) {
        //  target[prop] = [];
        // }
        // else {
        //  target[prop] = {};
        // }
        target[prop] = toStr.call(orgin[prop]) == arrStr ? [] : {};
        deepClone(orgin[prop], target[prop]);
      } else {
        target[prop] = orgin[prop];
      }
    }
  }
  return target;
}
// 辨别数据类型
function type(target) {
  var ret = typeof target;
  var temp = {
    "[object Array]": "array",
    "[object Object]": "object",
    "[object Number]": "number-object",
    "[object Boolean]": "boolean-object",
    "[object String]": "string-object",
  };
  if (target === null) {
    return null;
  } else if (ret == "object") {
    var str = Object.prototype.toString.call(target);
    return temp[str];
  } else {
    return ret;
  }
}
// 数组去重
Array.prototype.unique = function () {
  var temp = {},
    arr = [],
    len = this.length;
  for (var i = 0; i < len; i++) {
    if (!temp[this[i]]) {
      temp[this[i]] = "abc";
      arr.push(this[i]);
    }
  }
  return arr;
};
// 编程实现：字符串去重
function unique(str) {
  var arr = str.split("");
  // 将字符串str转换为数组
  var arr1 = arr.unique();
  // 调用Array原型上的unique方法进行去重
  var str1 = "";
  for (var i = 0; i < arr1.length; i++) {
    str1 += arr1[i];
  }
  return str1;
  // 以字符串的形式输出
}
// 返回返回元素的第n层祖先元素节点
function retParent(elem, n) {
  while (elem && n) {
    elem = elem.parentElement;
    n--;
  }
  return elem;
}
// 封装myChildren功能
Element.prototype.myChildren = function () {
  var children = this.childNodes;
  var len = children.length;
  var arr = [];
  for (var i = 0; i < len; i++) {
    if (children[i].nodeType == 1) {
      arr.push(children[i]);
    }
  }
  return arr;
};
// 封装hasChildren方法
Element.prototype.hasChildren = function () {
  var children = this.childNodes;
  var len = children.length;
  var arr = [];
  for (var i = 0; i < len; i++) {
    if (children[i].nodeType == 1) {
      return true;
    }
  }
  return false;
};
/* 如果n > 0 -> 返回dom元素的第n个兄弟元素节点，
    如果n < 0 -> 返回dom元素的（上）第n个元素兄弟节点
*/
function retSibling(e, n) {
  while (e && n) {
    if (n > 0) {
      if (e.nextElementSibling) {
        e = e.nextElementSibling;
      } else {
        for (e = e.nextSibling; e && e.nodeType != 1; e = e.nextSibling);
      }
      n--;
    } else {
      if (e.previousElementSibling) {
        e = e.previousElementSibling;
      } else {
        for (
          e = e.previousSibling;
          e && e.nodeType != 1;
          e = e.previousSibling
        );
      }
      n++;
    }
  }
  return e;
}
// 封装insertAfter()
Element.prototype.insertAfter = function (targetNode, afterNode) {
  var beforeNode = afterNode.nextElementSibling;
  if (beforeNode == null) {
    this.appendChild(targetNode);
  } else {
    this.insertBefore(targetNode, beforeNode);
  }
};
// 封装方法获取滚动条滚动距离
function getScrollOffect() {
  if (window.pageXOffset) {
    return {
      x: window.pageXOffset,
      y: window.pageYOffset,
    };
  } else {
    return {
      x: document.body.scrollLeft + document.documentElement.scrollLeft,
      y: document.body.scrollTop + document.documentElement.scrollTop,
    };
  }
}
// 封装方法获取视口尺寸
function getViewportOffect() {
  if (window.innerWidth) {
    return {
      w: window.innerWidth,
      h: window.innerHeight,
    };
  } else {
    if (document.compatMode == "BackCompat") {
      return {
        w: document.body.clientWidth,
        h: document.body.clientHeight,
      };
    } else {
      return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight,
      };
    }
  }
}
// 封装兼容性方法getStyle(获取元素的css属性)
function getStyle(elem, prop) {
  if (window.getComputedStyle) {
    return window.getComputedStyle(elem, null)[prop];
  } else {
    return elem.currentStyle[prop];
  }
}
// 封装动画函数（让物体移动到目标位置）
function animate(element, target) {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
  timer = setInterval(function () {
    // 每次移动的距离
    var step = 10;
    // 盒子当前的位置
    var current = element.offsetLeft;
    if (current >= target) {
      // 让定时器停止
      clearInterval(timer);
      // 让盒子到target的位置
      element.style.left = target + "px";
      return;
    }
    // 移动盒子
    current += step;
    element.style.left = current + "px";
  }, 30);
}
// 封装兼容性方法——为dom对象添加该事件类型的处理函数
function addEvent(elem, type, handle) {
  if (elem.addEventListener) {
    elem.addEventListener(type, handle, false);
  } else if (elem.attachEvent) {
    elem.attachEvent("on" + type, function () {
      handle.call(elem);
    });
  } else {
    elem["on" + type] = handle;
  }
}
// 封装阻止冒泡的函数
function stopBubble(event) {
  if (event.stopPropagation) {
    event.stopPropagation();
  } else {
    event.cancelBubble = true;
  }
}
// 封装兼容性方法取消默认事件
function cancelHandler(event) {
  if (event.preventDefault) {
    event.preventDefault();
  } else {
    event.returnValue = false;
  }
}
// 封装函数实现拖拽功能
function drag(elem) {
  elem.addEventListener(
    "mousedown",
    function (e) {
      var event = e || window.event;
      var x = event.pageX - parseInt(getStyle(div, "left"));
      var y = event.pageY - parseInt(getStyle(div, "left"));
      function cancel(e) {
        var event = e || window.event;
        elem.style.left = event.pageX - x + "px";
        elem.style.top = event.pageY - y + "px";
      }
      document.addEventListener("mousemove", cancel, false);
      elem.addEventListener(
        "mouseup",
        function () {
          document.removeEventListener("mousemove", cancel, false);
        },
        false
      );
    },
    false
  );
}
//  封装函数实现异步加载js的第三种方案
function loadScript(url, callback) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState == "complete" || script.readyState == "loaded") {
        callback();
      }
    };
  } else {
    script.onload = function () {
      callback();
    };
  }
  script.src = url;
  document.head.appendChild(script);
}
function move(obj, attr, target, speed, callback) {
  //关闭上一个定时器，避免执行一次函数就出现一个定时器
  clearInterval(obj.timer);

  //获取对象原来样式值
  var current = parseInt(getStyle(obj, attr)); //parseInt取字符串合法数字，getstyle返回的为数字+px

  //判断速度的正负值
  //比如从0到800，则speed为正，如果800向0，则speed为负
  if (current > target) {
    speed = -speed;
  }
}
