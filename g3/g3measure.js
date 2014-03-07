/********************************Object measure*********************************
 * Defines utility methods that calculate dimensions and position of an element,
 * window, document or viewport. In case of an element, a collision detection
 * method exists.
 * @module {g3.measure}
 *
 * @version 0.1
 * @author Scripto JS Editor by Centurian Comet.
 * @copyright MIT licence.
 ******************************************************************************/
(function(g3, window, document, undefined){
/*
 * Add necessary functions from 'g3.utils' namespace.
 */
g3.utils = g3.utils || {};
g3.utils.type = (typeof g3.utils.type === 'function')? g3.utils.type : function (obj){
   if(obj === null)
      return 'null';
   else if(typeof obj === 'undefined')
      return 'undefined';
   return Object.prototype.toString.call(obj).match(/^\[object\s(.*)\]$/)[1].toLowerCase();
};

/********************************Object measure*********************************
 * Defines utility methods that calculate dimensions and position of an element,
 * window, document or viewport. In case of an element, a collision detection
 * method exists.
 * @module {g3.measure}
 * @function {g3.measure}
 * @public
 * @param {String|Object} 'el' is a string or a node reference that we want to 
 * calculate.
 * @param {Window} 'win' is the window reference of the document or if null, the 
 * current one.
 * @return {Object} Depending of passed 'el' argument it contains different 
 * properties, if argument is
 * - window.screen or 'screen': {'width': value, 'height': value}
 * - 'viewport': {'left': value, 'top': value, 'width': value, 'height': value}
 * - 'document': {'width': value, 'height': value}
 * - node reference: returns these values by default 
 *      {'outerWidth': value, 'innerWidth': value, 'outerHeight': value, 
 *       'innerHeight': value}.
 * @object {g3.measure(el)} when argument 'el' is a node reference
 * @public
 *
 * @function {g3.measure(el).size}
 * @public
 * @return {Object} It adds to the default values the following:
 * {'width': value, 'height': value}. Chainable.
 * @function {g3.measure(el).position}
 * @public
 * @return {Object} It adds to the default values the following:
 * {'left': value, 'top': value, 'viewLeft': value, 'viewTop': value, 
 * 'viewRight': value, 'viewBottom': value} all at the same axis (horizontal 
 * expands to the right, vertical to the bottom). Chainable.
 * @function {g3.measure(el).visible}
 * @public
 * @return {String|Boolean} It returns false if the element is not visible on 
 * the viewport or, a string build up from the words: top, right, bottom and 
 * left if the relevant sides of the element are visible. It calls 'this.size()' 
 * and 'this.position()' and breaks the chain.
 *
 * @version 0.1
 * @author Scripto JS Editor by Centurian Comet.
 * @copyright MIT licence.
 ******************************************************************************/
   g3.measure = function(el, win){
      if(!win || (win.self !== win) || (win.window !== win))
         win = window;

      if((el === win.screen) || (el === 'screen')){
         if(el === 'screen')
            el = win.screen;
         return {'width': el.width, 'height': el.height};
      }else if(el === 'viewport'){
         var left = win.document.documentElement.scrollLeft,
             top = win.document.documentElement.scrollTop,
             width = win.document.documentElement.clientWidth,
             height = win.document.documentElement.clientHeight;
         return {'left': left, 'top': top, 'width': width, 'height': height};
      }else if((el === win.document) || (el === 'document')){
         if(el === 'document')
            el = win.document;
         var width = win.document.documentElement.scrollWidth,
             height = win.document.documentElement.scrollHeight;
         return {'width': width, 'height': height};
      }else if(typeof el === 'object'){
         var outerWidth = el.offsetWidth,
             innerWidth = el.clientWidth,
             outerHeight = el.offsetHeight,
             innerHeight = el.clientHeight;
         return {
            'outerWidth': outerWidth,
            'innerWidth': innerWidth,
            'outerHeight': outerHeight,
            'innerHeight': innerHeight,
            //delay initialization, sets 'width', 'height'
            size: function(){return _size.call(this, el, win);},
            //delay initialization, sets 'left', 'top', 'viewLeft', 'viewTop', 'viewBottom', 'viewRight'
            position: function(){return _inDocument.call(this, el, win);},
            //visible in viewport
            visible: function(){return _visible.call(this, el, win);}
         };
      }else
         return null;
      
      function _size(el, win){
         var width, height;
         if(win.getComputedStyle){
            width = parseFloat(win.getComputedStyle(el).getPropertyValue('width'));
            height = parseFloat(win.getComputedStyle(el).getPropertyValue('height'));
         //IE<=8
         }else if(el.currentStyle){
            width = parseFloat(el.currentStyle.getAttribute('width'));
            height = parseFloat(el.currentStyle.getAttribute('height'));
         //padding errors!
         }else{
            width = this['innerWidth'];
            height = this['innerHeight'];
         }
         this['width'] = width;
         this['height'] =  height;
         return this;
      }
      
      function _inDocument(el, win){
         //use viewport
         _inViewport.call(this, el, win);
         if(el.getBoundingClientRect){
            var view = g3.measure('viewport', win);
            this['left'] =  this['viewLeft'] + view['left'];
            this['top'] = this['viewTop'] + view['top'];
         }
         return this;
      }
      
      function _inViewport(el, win){
         if(el.getBoundingClientRect){
            var tmp = el.getBoundingClientRect();
            this['viewTop'] = tmp['top'];
            this['viewLeft'] = tmp['left'];
            this['viewBottom'] = tmp['bottom'];
            this['viewRight'] = tmp['right'];
         }else{
            var view = g3.measure('viewport', win);
            //move tree upwards
            var x = 0, y = 0;
            while(el != null){
               x += el.offsetLeft;
               y += el.offsetTop;
               el = el.offsetParent;
            }
            this['left'] =  x;
            this['top'] = y;
            this['viewTop'] = this['top'] - view['top'];
            this['viewLeft'] = this['left'] - view['left'];
            this['viewBottom'] = this['viewTop'] + this['outerHeight'];
            this['viewRight'] = this['viewLeft'] + this['outerWidth'];
         }
         return this;
      }
      
      function _visible(el, win){
         if(typeof this['width'] === 'undefined')
            this.size();
         if(typeof this['left'] === 'undefined')
            this.position();
         var view = g3.measure('viewport', win),
             result = 0;
         //x-axis collision: right, left sides
         if((this['viewTop'] < view['height']) && (this['viewBottom'] > 0)){
            if((this['viewRight'] >= 0) && (this['viewRight'] <= view['width']))
               result += 2;
            if((this['viewLeft'] >= 0) && (this['viewLeft'] <= view['width']))
               result += 8;
         }
         //y-axis collision: top, bottom sides
         if((this['viewRight'] > 0) && (this['viewLeft'] < view['width'])){
            if((this['viewTop'] >= 0) && (this['viewTop'] <= view['height']))
               result += 1;
            if((this['viewBottom'] >= 0) && (this['viewBottom'] <= view['height']))
               result += 4;
         }
         //now binary 'result' contains false or side collision with this order:
         //left-bottom-right-top
         if(result === 0)
            return false;
         else{
            var tmp, res = '';
            tmp = result & parseInt('0001', 2);
            if(Number(tmp).toString(2).slice(0, 1) === '1')
               res += 'top ';
            tmp = result & parseInt('0010', 2);
            if(Number(tmp).toString(2).slice(0, 1) === '1')
               res += 'right ';
            tmp = result & parseInt('0100', 2);
            if(Number(tmp).toString(2).slice(0, 1) === '1')
               res += 'bottom ';
            tmp = result & parseInt('1000', 2);
            if(Number(tmp).toString(2).slice(0, 1) === '1')
               res += 'left';
            res = res.replace(/^\s+|\s+$/g, '');
            return res;
         }
      }
   }
}(window.g3 = window.g3 || {}, window, document));