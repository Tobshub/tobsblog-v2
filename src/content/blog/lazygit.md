---
pubDatetime: 2023-11-28
title: Git but Lazy
postSlug: lazygit-review
featured: true
draft: true
tags:
  - git
  - review
  - tui
  - tools
ogImage: "lazygit-review.png"
description: My thoughts on LazyGit - A simple terminal UI for git commands
---

<div>
    <img src="/lazygit-review.png" alt="LazyGit screenshot" />
</div>

My thoughts on LazyGit - A simple terminal UI for git commands - and why you should be using it as a programmer.

## Table of contents

## Git

I doubt anyone reading this article doesn't know what [git](https://git-scm.com) is. But if you don't, here's a quick and simplified summary.

Git is a version control system. It's a way to track changes to files and folders over time.
It also makes it easy to join someone else's changes into your own.

Sounds super useful right? It is. But it's not just super useful, it's also super powerful.
And it takes a lot of time and effort to be able to harness the full power of git.

In personal projects, most of us can get by with using a few simple git commands, like `git add`, `git commit`, and `git push`.
But what happens when you're working on a large project, with multiple contributors?

For a lot of people the git cli, however powerful it may be, is a PITA.

## LazyGit

In the LazyGit [elevator pitch](https://github.com/jesseduffield/lazygit#elevator-pitch), it says:
"git is powerful, but what good is that power when everything is so damn hard to do?"

That's where LazyGit comes in.

With the git cli there are so many things I just never bothered using/doing.

For example:

You make some changes, you commit the changes and then after that you make some more changes and commit them.
Standard stuff. But before you push to your remote repository, you decide to take a look at the changes - a good habit to develop.

Oh no! The first commit you made has a bug!

This has happened to me quite a few times. And when it does it just fix it and make another commit: `git commit -m "fix"`.
This was how I did things for a while, until I started using LazyGit.
In LazyGit, I could just navigate to the commit section, and hit `shift+A` and amend the commit with the staged changes.

![Amend Commit Demo](https://tobsmg.onrender.com/img/p_304736rtp6j)

And of course you can achieve the same thing on the cli but the user experience in LazyGit is much better.

Useful commands are just a keybind away.

Want to reword a commit? It's just `r` and you make the changes you need!
