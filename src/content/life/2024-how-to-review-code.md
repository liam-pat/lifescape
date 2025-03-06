---
title: "How To Review Code"
date: 2024-08-05
description: "How 2 review code, 减少 developer 与 reviewer 的冲突，建立良好的沟通。"
tags: ["life","work"]
---

> 根據自己的經驗跟 [別人](https://www.hitzhangjie.pro/blog/2019-09-10-%E5%A6%82%E4%BD%95%E6%9B%B4%E5%A5%BD%E5%9C%B0%E8%BF%9B%E8%A1%8C%E4%BB%A3%E7%A0%81review/#what-do-code-reviewers-look-for)遇到的問題總結的 code review

# 1) Picking the Best Reviewers (Who）

* **Appropriated Reviewer** - 自己仰慕或听他意見，可以 CC or @reviewer, 即時別人沒時間也讓他知道、
* **Reviewer Ability** - 是否有能力 review developer 的 code ？
* **In-Person Reviews** - 團隊中面對面 Review，可集成多人觀點意見 BUT depend on 公司文化、

# 2) What to Look For In a Code Review (What)
> reference: https://google.github.io/eng-practices/review/reviewer/looking-for.html

* **Naming** - 初級工程師會犯的錯, 变量名、类名、方法名... 是否清晰、精炼
* **Design** - 程序设计、架构设计... 是否合理，是否帶有產品思維
* **Functionality** - 功能產品人員是否接受；要战未来，是否存在 bug / deadlocks / race conditions etc...
* **Complexity** - keep the code simple, 不要過度設計 / 控制 API 
* **Test** - Unit Test && Feature Test
* **Comments** - 注釋盡可能少，不因語言特性而寫注釋。@todo @notice release 之前解決並刪除
* **Style** - 符合规范代码风格。Not Import Pick，寫出例子；做邏輯修改的同時，不要大片 code format。
* **Documentation** - 發現文檔 outdated ，要提醒更新。
* **Every Line** - 若看不懂的代碼，要跟開發者聯繫，並且商議不損失複雜度的情況下是否可以寫得更加簡單、
* **Context** - 如果需要看大量的上下文，應當拆分出多個小函數去實現、
* **Good Things** - review 過程也是互相分享，互相學習的過程，比如分享優秀的 package/library

# 3) How to Do a Code Review (How)

## Standard (標準)
> reference: https://google.github.io/eng-practices/review/reviewer/standard.html
> In general, reviewers should favor approving a CL once it is in a state where it definitely improves the overall code health of the system being worked on, even if the CL isn’t perfect.

* **Maintain** - code 可持續優化，即可以 **多次** 修改 & 維護。
* **Modify** - Reviewer 必須有 **責任** 維護涉及到修改部分。
* **Owner** - Reviewer 得有代碼的 **修改權限**，即使自己去修改也保證不出問題。
* **Not Important** - Reviewer comment 上可分享經驗 & 新東西，並不是強制 developer 要這樣做。(better to have)
* **Blemishes** - NO best, ONLY better, 允許瑕疵，代碼可持續 維護 & 優化即可。
* **Principles** - code style/library，沒有明確規定就可以使用自己 style。
* **Resolving Conflicts** - 意見不一致，多几个人咨詢；若都有支持方，沒大 defect，可以不去修改，最好由 reviewer 给出修改意见。

## Navigating a CL in Review (定位)
> reference: https://google.github.io/eng-practices/review/reviewer/navigate.html

* **Take a broad view of the change** - 先看修改是否有意義，若无 -> reject， 请用合适的**措辞**向开发者解释、
* **Examine the main parts of the CL** - 先看 commit msg，background/ticket id etc. 
* **Look through the rest of the CL in an appropriate sequence** - business logic > design > complexities

### How to Write Code Review Comments
> reference: https://google.github.io/eng-practices/review/reviewer/comments.html

* **Courtesy** - 禮貌，語言的藝術。reviewer 並不總比 developer 優秀。
* **Explain Why** - reasons
* **Giving Guidance**  write a demo / share article, 讓 developer 知道你是認真 review。
* **Accepting Explanations**  虛心請教 developer, 記得要在他有時間的時候

### Handling Pushback in Code Reviews 
> reference: https://google.github.io/eng-practices/review/reviewer/pushback.html

* **Who is Right?** - developer 比較清楚業務、保持傾聽，若還是沒解決，尋求多人幫助。
* **Upsetting Developers** - developer vs reviewer，基本上是 reviewer 沒做好功夫。
* **Cleaning it Up Later** - developer 答應之後修改，記得要督促 developer。
* **General Complaints About Strictness reviewr** - review 寬鬆->嚴格。

### Developer's Perspective

* ***Commit Msg*** - [FYI](https://www.jvt.me/posts/2024/07/12/things-know-commits) 
* ***Don’t Take it Personally*** - 控制情緒.... reviewer incompetent/無禮貌/無建設性，talk in private, 再决定要否换 reviewer。
* ***Fix the Code*** - reviewer 看不懂 code, 若實現複雜了，就修改一番；若不是，就要写好 comment

## Speed of Code Reviews (時間)
> reference: https://google.github.io/eng-practices/review/reviewer/speed.html

### a) Why Should Code Reviews Be Fast?

1. 团队整体推进的速度被严重拖慢,
    - release 會被 delay， 除非公司允許 release 滯後；
    - 隔了幾天/周/月，記憶已不清晰，需重新看 code ，如果你是 developer 該怎樣想？
2. developer 开始抗议 / 不重视 Code review
    - developer 多日后才收到 feedback， 改完又等幾天，是否在意 developer 心情變化呢？
3. 代码整体健康度会受到影响
    - 速度過慢, feature 已經準備 release 了，上次 feature 還在 review status, developer 决定 merge code 呢？

### b) How Fast Should Code Reviews Be?

* immediately review > in 1 day > assign other people 

### c) Fast Responses 

* 固定時間 review
* 不同時區，盡量不要在下班時間 review，不然 developer 在你下班時間 response 你該怎麼辦？
* 如果沒什麼大問題，立刻 comment LGTM / 給點小建議, 這可讓 developer 心情愉悅

### d) Speed vs Interruption 
* developer 空閒時 review
* 避免 reviwer 忙的時候去 review

### e) Supplement

* large amount of change list, developer 應拆分多個 commits / feature branch
* Emergencies 區分出緊急的，優先 review