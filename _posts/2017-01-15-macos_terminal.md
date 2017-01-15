---
layout: post
title: "macOS Terminal & Shell 折腾记"
date: 2017-01-15 16:18
categories:
  - macOS
  - 折腾
---

加入 TUNA 协会之后从大鹰、惠老师、康哥那里学了不少人生经验，前段时间折腾了一下我 Mac 的 Terminal 和 Shell，极大地提高了 ~~逼格~~ 生产力。效果先看图吧。

![](/assets/img/2017/terminal_01.png)

1. iTerm2 3.x

 [iTerm2](https://www.iterm2.com/downloads.html) 是到处都在推荐的 Terminal Emulator，支持 256 位色等现代特性。但是！之前一直坚持用原生的 Terminal.app，因为 iTerm2 不是扁平化设计……实在无法接受。前段时间发现 iTerm2 更新到 3.0 之后终于扁平化了……有生之年系列。可以愉快地用 [*agnoster*](https://github.com/agnoster/agnoster-zsh-theme) 之类的逼格甚高的 solarized 配色的 zsh 主题了。

2. zsh-syntax-highlighting

 [oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh) 这个应该已经人尽皆知了，就不多说了。这里要推荐的是一个插件 [zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting)，不多说，逼格甚高，甚高啊！
 ![](/assets/img/2017/terminal_02.png)
 只要在`.zshrc`里启用这个插件就可以，比如

 ```zsh
 plugins=(git zsh-syntax-highlighting)
 ```
3. Powerline

 [Powerline](https://github.com/powerline/powerline) 或者其他类 Powerline 的工具就是惠老师和大鹰终端里那个帅帅的状态栏。它可以被集成到 Vim, zsh 和 IPython 里。
 ![](/assets/img/2017/terminal_03.png)

4. ranger

 [ranger](https://github.com/ranger/ranger) 是一个命令行下的文件管理器，键位和 Vim 一样，
 ![](/assets/img/2017/terminal_04.png)
 哐哐哐，敲黑板，这里要安利萌萌哒肖骐老师的 [elvish](https://github.com/elves/elvish)，内置文件管理器哦～
 ![](/assets/img/2017/terminal_05.jpg)

5. cowsay & lolcat

 ![](/assets/img/2017/terminal_06.png)
 点子是从大鹰那里偷来的。cowsay 的版本很多，但对中文的支持都不是很好，我用的是魔改过的 nodejs 版本。lolcat 的作用是把标准输入染～成～彩～色～

 一次 presentation 之后好多同学都用上了 cowsay ……陈震老师看到某同学的 `cowsay '苟5以 岂5之'` 之后说……“这位同学一定是个………… ~~真正的粉丝~~ 很爱国的同学！”

6. readline keybinding

 这个其实是 shell 的功能([http://www.gnu.org/software/bash/manual/html_node/Bindable-Readline-Commands.html](http://www.gnu.org/software/bash/manual/html_node/Bindable-Readline-Commands.html))，比如说 `C-a` 回到行首， `C-e` 到行尾， `C-k` 删除到行尾之类的，也可以改成 vi 风格的。在 macOS 上是用 `NSxxxx` 实现的能输入文字的地方都可以用emacs keybinding，用惯之后还真的是很爽的。
