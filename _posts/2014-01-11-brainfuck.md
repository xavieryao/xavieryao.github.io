----
-layout: post
-title: "Brainfuck.js"
-date: 2014-01-11
-categories 高中
----

Brainfuck.js is an interpreter for Brainfuck the programming language written in JavaScript. Written by Xavier Yao just for fun.

盖子说得好，Brainfuck是入编译坑的首选。实际上这语言真的很有内涵，诠释了图灵机的工作原理。由此衍生的编程语言有[WhiteSpace](http://compsoc.dur.ac.uk/whitespace/index.php)，[Befunge](http://quadium.net/funge/spec98.html)，[Chef](http://www.dangermouse.net/esoteric/chef.html),[Ook](http://www.dangermouse.net/esoteric/ook.html)，最后当然免不了国人开发的[草泥马语言](http://code.google.com/p/grass-mud-horse/)

这么些个编程语言虽然写法不一样，但是原理基本相同。

请看Brainfuck介绍：

>	Brainfuck 是一个极小的只有8个指令的图灵完全的编程语言。
>
>	除"><+-.,[]"之外的的任何字符都会被忽略 (不包含双引号)。
>
>	Brainfuck 包含一个有30,000个单元为0的数组，和
>	一个数据指针指向当前的单元。
>
>	8个指令如下:
>
>
>	* 	**\+** : 指针指向的单元的值加1
>	*	**\-** : 指针指向的单元的值减1
>	*	**>** : 将指针移动到下一个单元(右边的元素)
>	*	**<** : 将指针移动到上一个单元(左边的元素)
>	*	**.** : 打印当前单元的内容的ASCII值 (比如 65 = 'A').
>	*	**,** : 读取一个字符到当前的单元
>	*	**[** : 如果当前单元的值是0，则向后调转到对应的]处
>	*	**]** : 如果当前单元的值不是0，则向前跳转到对应的[处
>
>	[ 和 ] 组成了一个while循环。很明显，它们必须配对。
>
>	好了这就是brainfuck了。也没那么难，是吧？为了好玩，你可以写你自己的 brainfuck程序，或者用其他语言写一个brainfuck的解释器，解释器非常容易 实现，但是如果你是一个自虐狂的话，你可以尝试用brainfuck写一个brainfuk的 解释器。

事实上用brainfuck写的brainfuck解释器真的存在：[awib](https://code.google.com/p/awib/) 写出这玩意的是什么神人啊……简单目测，这玩意是用把高级语言编译成brainfuck的编译器编译出来的…………

我写的JS版本效果如下：

P.S. 代码请自行F12，有bug，轻吐槽。

<script type="text/javascript" src="javascripts/brainfuck.js"></script>
<p>You can try to start with this Hello World code: <pre class="de1"><span class="sy0">++++++++++</span><span class="sy1">[</span><span class="sy2">&gt;</span><span class="sy0">+++++++</span><span class="sy2">&gt;</span><span class="sy0">++++++++++</span><span class="sy2">&gt;</span><span class="sy0">+++</span><span class="sy2">&gt;</span><span class="sy0">+</span><span class="sy2">&lt;&lt;&lt;&lt;</span><span class="sy0">-</span><span class="sy1">]</span><span class="sy2">&gt;</span><span class="sy0">++</span><span class="sy3">.</span><span class="sy2">&gt;</span><span class="sy0">+</span><span class="sy3">.</span><span class="sy0">+++++++</span><span class="sy3">..</span><span class="sy0">+++</span><span class="sy3">.</span><span class="sy2">&gt;</span><span class="sy0">++</span><span class="sy3">.</span><span class="sy2">&lt;&lt;</span><span class="sy0">+++++++++++++++</span><span class="sy3">.</span><span class="sy2">&gt;</span><span class="sy3">.</span><span class="sy0">+++</span><span class="sy3">.</span><span class="sy0">------</span><span class="sy3">.</span><span class="sy0">--------</span><span class="sy3">.</span><span class="sy2">&gt;</span><span class="sy0">+</span><span class="sy3">.</span><span class="sy2">&gt;</span><span class="sy3">.</span> </pre></p>
<label for="code">Input your code here:</label>
<br />
<textarea id="code" style="margin: 2px; width: 100%; height: 256px; "> </textarea>
<br />
<button onclick="javascript:start()">Run</button>
<br />
<textarea id="console" readonly="readonly" style="margin: 2px; width: 100%; height: 128px; "> </textarea>
<div id="input_area">
<h4 id="invalid">Invalid Input</h4>
<label for="input">The program requires an input:</label>
<input type="text" id="input" />
<button onclick="javascript:resume();">Submit</button>
</div>
