# 15-puzzle

[![wakatime](https://wakatime.com/badge/user/490d4c04-1df9-407e-b68a-ef095e264a78/project/d1018355-8a0b-4eef-b122-43c4777ed3b9.svg)](https://wakatime.com/badge/user/490d4c04-1df9-407e-b68a-ef095e264a78/project/d1018355-8a0b-4eef-b122-43c4777ed3b9)

[15-puzzle](https://en.wikipedia.org/wiki/15_puzzle) game written in Vue3!

## Gameplay

<p align="center">
    <image src="./README.assets/animation-1.gif" alt="animation-1" width="100%"></image>
</p>

<p align="center">
    <image src="./README.assets/animation-2.gif" alt="animation-2" width="100%"></image>
</p>



## Getting Started

**Installation**

```shell
npm install #or yarn install
```

**Run**

```shell
npm serve #or yarn serve
```

And then you can start to play in your localhost (generally in http://localhost:8080/).



> **But** I have not done more algorithm optimizations yet.
>
> So most of the random cases will make the browser unresponsive : (




## How is the solution achieved

I used the `Iterative deepening A* (IDA*)` to solve the puzzle.

And take the sum of Manhattan of each block to the correct position as the evaluation function.



## ~~Murmuring~~

I spend 15 hours coding in total.

It turns out that algorithm optimization will cost you more time.

~~速通 lbj 人工智能围棋一实验~~
