---
title: Get Better Code Reviews with this One Weird Trick
layout: post
---
The order as well as the size of a pull request [makes a big difference in the feedback you receive](https://www.youtube.com/watch?v=_SJL7vepQvU). Alberto Bacchelli studied pull requests and found that the files at the top of pull requests get the most amount of comments and feedback. As the number of files increases, the farther back files receive less review.

### Why It Matters
It can be tempting to submit large pull requests to make forward progress. However there is an inherent quality advantage to chopping up your code submissions. Reviewers will look at more code with fresh and careful eyes.

### How I Review Code
Typically I will use GitHub’s Pull Request Review tab to go through each file for obvious bugs and give cursory feedback. I’ll run the test suite and do a basic click test of the file. Smaller pull requests are less daunting for this, while larger ones are more intimidating.

### Too Much Feedback Can Slow Things Down
The other reason for less feedback and suggestions on large pull requests is small improvements or changes that might be helpful in a smaller request feel like blockers on large ones. Everyone wants to get the task done.