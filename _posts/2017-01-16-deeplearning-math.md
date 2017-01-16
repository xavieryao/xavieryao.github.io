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

学期里粗略地看了看前6章，大概对基本的思路和概念有了一些了解，也写了一个图像分类网络。代码和数据可以看[我的GitHub](https://github.com/xavieryao/classification_nn)，另外还写了[大作业的报告](https://raw.githubusercontent.com/xavieryao/classification_nn/master/report/report.pdf)。

假期好好读读 Deep Learning Book，记点笔记说不定能管点用。

Applied Math
-------
Deep Learning 里比较关键的是一些应用数学的分支，比如线性代数、概率论和信息论，还有一些数值计算技术。当然微积分也是很重要的！现在感觉线性代数和微积分刚学完就还给老师了，下学期概率论一定要认真学。线性代数和微积分中的一些概念当时学的时候没什么感觉，现在发现在实际应用中还是十分关键的。很多大一学过的基本概念我就不写了。

#### Tensor

我们知道标量是单纯的一个元素，将元素沿一个轴排列构成向量，沿横纵两个轴排列构成矩阵，而沿n个轴排列就构成了 Tensor，或者张量。

#### 特征值分解

对于一个方阵$$\mathbf{A}$$，若存在一个非零向量$$\mathbf{v}$$使得

$$
\mathbf{A}\mathbf{v} = \lambda\mathbf{v}
$$

则$$\mathbf{v}$$称为$$\mathbf{A}$$的一个特征向量，$$\lambda$$称为$$\mathbf{v}$$对应的特征值。若$$\mathbf{A}$$存在n个线性无关的特征向量$$\mathbf{v}^{(i)}$$，令$$\mathbf{V} = [\mathbf{v}^{(1)},\mathbf{v}^{(2)}, \cdots, \mathbf{v}^{(n)}]$$，$$\mathbf{\lambda} = [\lambda_1, \lambda_2, \cdots, \lambda_n]^\top$$，则$$\mathbf{A}$$可分解为

$$
\mathbf{A} = \mathbf{V}\textrm{diag}(\mathbf{\lambda})\mathbf{V}^{-1}
$$

称作方阵$$\mathbf{A}$$的特征值分解。可以认为特征值刻画了$$\mathbf{A}\mathbf{u}$$将$$\mathbf{u}$$在特征值对应的特征向量的方向上scale的程度。

但是，并非所有方阵都有特征值分解，也并非所有的特征值都是实数[^1]。好在，任何实对称矩阵都可分解成

$$
\mathbf{A}=\mathbf{Q}\mathbf{\Lambda}\mathbf{Q}^\top
$$

其中$$\mathbf{Q}$$是正交矩阵，对应于n个正交的单位特征向量，且特征值都是实数。这带给我们这样的性质：

![](/assets/img/2017/dl_math_01.png)

而在深度学习中，我们会经常用到实对称矩阵！对连续函数，它的 Hessian 矩阵是实对称的。而在利用二阶导数的梯度下降中，利用泰勒展开我们有

$$
f(\mathbf{x}) = f(\mathbf{x}^{(0)}) + (\mathbf{x-x^{(0)}})^\top\mathbf{g} + \frac{1}{2}(\mathbf{x-x^{(0)}})^\top\mathbf{H}(\mathbf{x-x^{(0)}})
$$

我们希望在下一次迭代后，$$f$$的值

$$
f(\mathbf{x}-\epsilon\mathbf{g}) = f(\mathbf{x}^{(0)}) + \epsilon \mathbf{g}^\top\mathbf{g} + \frac{1}{2}\epsilon^2\mathbf{g}^\top\mathbf{H}\mathbf{g}
$$

变化最大，此时可以解得

$$
\epsilon^\ast = \frac{\mathbf{g^\top g}}{\mathbf{g^\top Hg}}
$$

在最坏情况下，$$\mathbf{g}$$和 Hessian 矩阵的对应特征值最大的特征向量同向，$$\epsilon^\ast$$应取$$\frac{1}{\lambda_\textrm{max}}$$，即 Hessian 矩阵的特征值决定了学习率的大小。

#### 信息熵

最基本的思想是：得知一件很可能会发生的事情发生所获的的信息量比得知一件不太可能发生的事情发生所获的的信息量少。另外，得知两个独立事件发生，得到的信息量应该是分别得知这两件事情发生得到的信息量的和。因此可以定义事件$$x$$的 *self-information* 为

$$
I(x) = -\log P(x)
$$

以$$e$$为底得到的信息量的单位为 *nats* ，而以2为底所得信息量的单位就是我们所熟知的 *bits* 了。信息熵 *Shannon Entropy* 定义为

$$
H(x) = \mathrm{E}_{\mathrm{x}~P}[I(x)]
$$

它给出了“接收的每条消息中包含的信息的平均量”[^2]。利用信息熵可以刻画两种概率分布之间的差距（*Kullback-Leibler divergence*)，从而提供一种学习算法的优化目标（如 *cross entropy*)。


[^1]: 俞正光, 鲁自群, & 林润亮. (2011). 线性代数与几何.   
[^2]: Wikipedia. (2017). https://zh.wikipedia.org/wiki/熵_(信息论)

**EOF**
