---
layout: post
title: "Deep Learning: 数学基础"
date: 2017-01-16 09:53
categories:
  - "Deep Learning"
---

Preface
-------
[Deep Learning](http://www.deeplearningbook.org) 这本书是大鹰推荐的深度学习入门文献，内容十分全面，从最基本的数学基础到比较前沿的研究都有涉及，Elon Mask 说它是 *“the only comprehensive book on the subject”* 。这本书上个月刚刚出版，在 [Amazon.com](https://www.amazon.com/Deep-Learning-Adaptive-Computation-Machine/dp/0262035618/ref=sr_1_1?ie=UTF8&qid=1472485235&sr=8-1&keywords=deep+learning+book) 上售价67.98刀，其电子版可以在网上免费下载。

学期里粗略地看了看前6章，大概对基本的思路和概念有了一些了解，也写了一个图像分类网络。代码和数据可以看 [我的GitHub](https://github.com/xavieryao/classification_nn)，另外还写了[大作业的报告](https://raw.githubusercontent.com/xavieryao/classification_nn/master/report/report.pdf)。

假期好好读读 Deep Learning Book，记点笔记说不定能管点用。

Applied Math
-------
Deep Learning 里比较关键的是一些应用数学的分支，比如线性代数、概率论和信息论，还有一些数值计算技术。当然微积分也是很重要的！现在感觉线性代数和微积分刚学完就还给老师了，下学期概率论一定要认真学。线性代数和微积分中的一些概念当时学的时候没什么感觉，现在发现在实际应用中还是十分关键的。很多大一学过的基本概念我就不写了。

#### 线性代数 ####

* Tensor

  我们知道标量是单纯的一个元素，将元素沿一个轴排列构成向量，沿横纵两个轴排列构成矩阵，而沿n个轴排列就构成了 Tensor，或者张量。

* 特征值分解

  对于一个方阵$$\mathbf{A}$$，若存在一个非零向量$$\mathbf{v}$$使得

  $$
  \mathbf{A}\mathbf{v} = \lambda\mathbf{v}
  $$

  则$$\mathbf{v}$$称为$$\mathbf{A}$$的一个特征向量，$$\lambda$$称为$$\mathbf{v}$$对应的特征值。若$$\mathbf{A}$$存在n个线性无关的特征向量$$\mathbf{v}^{(i)}$$，令$$\mathbf{V} = [\mathbf{v}^{(1)},\mathbf{v}^{(2)}, \cdots, \mathbf{v}^{(n)}]$$，$$\mathbf{\lambda} = [\lambda_1, \lambda_2, \cdots, \lambda_n]^\top$$，则$$\mathbf{A}$$可分解为

  $$
  \mathbf{A} = \mathbf{V}\textrm{diag}(\mathbf{\lambda})\mathbf{V}^{-1}
  $$


**EOF**
