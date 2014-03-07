g3measure
=========
A custom object that provides info about width, height and position of a window, document, viewport or element. It's even capable to present collision detection or visibility of an element from the current viewport in detailed form as a concatenation of words "top", "right", "bottom" and "left".

Usage
=====
<p>Pass a string or a node reference as in <code>g3.measure(el)</code> and you get an object like this one: <code>{'outerWidth': value, 'innerWidth': value, 'outerHeight': value, 'innerHeight': value}</code>.</p>

Dependencies
============
None.

Objects
=======
<p>Returned objects varied from the passed argument.</p>
<h3>1. <code>g3.measure(window.screen)</code> or <code>g3.measure('screen')</code></h3>
<p>Returns <code>{'width': value, 'height': value}</code>.</p>
<h3>2. <code>g3.measure('viewport')</code></h3>
<p>Returns <code>{'left': value, 'top': value, 'width': value, 'height': value}</code>.</p>
<h3>3. <code>g3.measure(window.document)</code> or <code>g3.measure('document')</code></h3>
<p>Returns <code>{'width': value, 'height': value}</code>.</p>
<h3>4. <code>g3.measure(el)</code></h3>
<p>Returns a custom object.</p>
<h3>Methods</h3>
<ol>
<li>Get the element's size: <code>g3.measure(el).size()</code>.
<p>Sets properties: <code>width</code> and <code>height</code>. Chainable.</p></li>
<li>Get the element's position on viewport and document: <code>g3.measure(el).position()</code>.
<p>Sets properties: <code>left</code>, <code>top</code>, <code>viewLeft</code>, <code>viewTop</code>, <code>viewBottom</code>, <code>viewRight</code>. Chainable.</p></li>
<li>Get the element's viewport collision or visibility: <code>g3.measure(el).visible()</code>.
<p>Returns a string build by the concatenation of words "top", "right", "bottom" and "left" or false when the element is not visible. Breaks the chain and does not return this object.</p></li>
</ol>
<h3>Properties</h3>
<ol>
<li><ol>on construction:
<li><code>outerWidth</code></li>
<li><code>innerWidth</code></li>
<li><code>outerHeight</code></li>
<li><code>innerHeight</code></li>
</ol>
</li>
<li>
<ol>on method <code>this.size()</code>:
<li><code>width</code></li>
<li><code>height</code></li>
</ol>
</li>
<li>
<ol>on method <code>this.position()</code>:
<li><code>left</code></li>
<li><code>top</code></li>
<li><code>viewLeft</code></li>
<li><code>viewTop</code></li>
<li><code>viewBottom</code></li>
<li><code>viewRight</code></li>
</ol>
</li>
</ol>

Evaluator test page
===================
See: <a href="http://centurianii.github.io/g3measure/">g3measure</a>

Have fun!
