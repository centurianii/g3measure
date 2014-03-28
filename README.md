g3measure
=========
A custom object that provides info about width, height and position of a window, document, viewport or element. It's even capable to present collision detection or visibility of an element from the current viewport in detailed form as a concatenation of words "top", "right", "bottom" and "left".

Usage
=====
<p>Pass a string or a node reference as in <code>g3.measure(el)</code> and you get an object like this one:
<pre>
<code>
{
   'outerWidth': value, 
   'innerWidth': value, 
   'outerHeight': value, 
   'innerHeight': value
   'width': value, 
   'height': value, 
   'left': value, 
   'top': value, 
   'viewLeft': value, 
   'viewTop': value, 
   'viewRight': value, 
   'viewBottom': value, 
   'visible': value
}
</code>
</pre>
</p>
<p>Axis start on upper left corner. Horizontal axis expands to the right. Vertical axis expand to the bottom. <code>outer*</code> values include border + padding + content. <code>inner*</code> values don't include border. Property 'visible' is true if the element is visible on viewport, false if not or, a string that is built up from  the words: <code>top, right, bottom, left</code> if the relevant sides of the element are visible.</p>

Dependencies
============
None.

Objects
=======
<p>Returned objects vary from the passed argument.</p>

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
<li>
<p>In version <code>v.0.2</code> all unnecessary functions are erased from user access to conform to our policy of zero to minimum functions exposed on users.</p></li>

<li>Function <code>g3.measure(el).intersect()</code>: finds the intersection between viewport and element's area which is considered as the one who contains <code>border + padding + content</code>.
<p>It returns <code>true or false</code> as <code>visible()</code> and in case of partial visibility, an object 
<pre>
<code>
{
   'viewLeft': value, 
   'viewTop': value, 
   'width': value, 
   'height': value
}
</code>
</pre></p></li>
 
<li>Function <code>g3.measure(el).difference()</code>: it calculates the distances from the edges of the viewport to the element's area which is considered as the one who contains <code>border + padding + content</code>.
<p>It returns <code>false</code> if element is not visible and in all other cases, an object 
<pre>
<code>
{
   'left': value, 
   'top': value, 
   'right': value, 
   'bottom': value
}
</code>
</pre>
</p>
</li>
</ol>

<h3>Properties (all are built on construction from version v.0.2)</h3>
<ol>
   <li><code>outerWidth</code></li>
   <li><code>innerWidth</code></li>
   <li><code>outerHeight</code></li>
   <li><code>innerHeight</code></li>
   <li><code>width</code></li>
   <li><code>height</code></li>
   <li><code>left</code></li>
   <li><code>top</code></li>
   <li><code>viewLeft</code></li>
   <li><code>viewTop</code></li>
   <li><code>viewBottom</code></li>
   <li><code>viewRight</code></li>
   <li><code>visible</code></li>
</ol>

Versions
========
<h3>Updates in v.0.2</h3>
<ul>
<li>methods of returned object when the argument is an element are erased to conform with policy of zero to minimum function exposure to users</li>
<li>added the string parsing to extract values and units</li>
<li>added methods <code>g3.measure(el).intersect()</code> and <code>g3.measure(el).difference()</code></li>
<li>added support for mobiles in viewport.</li>
</ul>
<h3>v.0.1</h3>
<ul>
<li>basic operations with some functions for user to call.</li>
</ul>

Evaluator test page
===================
See: <a href="http://centurianii.github.io/g3measure/">g3measure</a>

Have fun!
