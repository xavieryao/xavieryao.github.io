---
layout: post
title: "Deep Learning: 深度前馈网络"
date: 2017-01-20 16:27
categories:
  - "Deep Learning"
---

*深度前馈网络*（*deep feedforward networks*, or *multilayer perceptrons*）本质上是一个“函数近似机”。以分类器为例，我们希望构造一个函数$$\boldsymbol{y}=f(\boldsymbol{x};\boldsymbol{\theta})$$，通过学习参数$$\boldsymbol{\theta}$$使得这个函数能够尽可能地近似于将输入映射到标签的映射$$y=f^\ast(\boldsymbol{x})$$。而我们要模拟的函数$$f$$通常是一个复合函数

$$
f(\boldsymbol{x}) = f^{(3)}(f^{(2)}(f^{(1)}(\boldsymbol{x})))
$$

因此被称作 **网络**。

深度前馈网络的通常结构是若干个隐藏层$$\boldsymbol{h}=\alpha(\boldsymbol{W^\top h + b})$$和一个输出层$$\boldsymbol{y} = f(\boldsymbol{h})$$。由于若干个仿射变换$$\boldsymbol{h} = \boldsymbol{W^\top h + b}$$组合而成的映射依然是仿射变换，为了使网络能表达更多的函数，需要非线性的激活函数$$\alpha(\boldsymbol{h})$$。

对于隐藏层（Hidden Units），最常用的激活函数是$$g(z)=\mathrm{max}\{0,z\}$$，称为ReLU(Rectified Linear Units)。由于ReLU和普通的线性变换几乎没有差别，使得梯度下降法可以取得很好地学习效果。其特点在于，$$z<0$$时会处于一种“饱和”的状态。虽然，$$g(z)=\mathrm{max}\{0,z\}$$在$$z=0$$处不可导，但由于数值计算中的$$0$$往往是由于舍入误差导致的，而不是“真正的”$$0$$，因此在$$z=0$$取左／右导数作为其导数是可行的。

输出层的选择与代价函数（cost function）息息相关。通常，我们的优化目标是达到最大似然。输出条件高斯概率分布的均值

$$
p(\boldsymbol{y}\vert\boldsymbol{x}) = \mathcal{N}(\boldsymbol{y;\hat{y},I})
$$

通常采用线性输出$$\hat{\boldsymbol{y}} = \boldsymbol{W^\top h + b}$$。此时最小化交叉熵等价于最小化均方差。若要输出Bernoulli概率分布$$P(y=1\vert\boldsymbol{x})$$，采用*sigmoid*函数：

$$
\hat{y} = \sigma(\boldsymbol{w^\top h} + b)
$$

其中

$$
\sigma(x) = \frac{1}{1+\exp(-x)}
$$

其象为开区间$$(0,1)$$。要获得*Multinoulli*输出（如分类器的输出：输入属于各个分类的概率），采用 *softmax* 函数：

$$
\mathrm{softmax}(\boldsymbol{z})_{i} = \frac{\exp(z_i)}{\sum_j \exp(z_j)}
$$

任何一个前馈网络，在输出层之外只要拥有一个隐藏层，且这个隐藏层的激活函数有界、单调递增且不是常函数、（如 *logistic sigmoid* 函数），则这个网络可零误差地近似任何一个博雷尔可测(Borel measurable)函数(*universal approximation theorem*)。但是，前馈网络的层数过少会使得其参数过多，使得学习和泛化变得困难。经验上讲，更深的前馈网络会带来更好的泛化能力。
