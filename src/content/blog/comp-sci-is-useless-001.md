---
pubDatetime: 2024-11-17T12:00:00Z
title: "Comp Sci is Useless"
postSlug: comp-sci-is-useless-001
featured: true
draft: false
tags:
  - university
  - computer science
  - maths
  - Data Structures and Algorithms
  - comp-sci-is-useless
# ogImage: "comp-sci-is-useless/ogImage.png"
description: The first edition of my "Comp Sci" is useless series
---

### Preface <sub>(please skip)</sub>

I'm a little over two and a half years into the tech industry professionally, and I'm just starting my first year at uni.
I've largely held the belief that getting a computer science degree was a waste of time, but I've decided to do it because I guess "it's better to have one and not need it than to need one and not have it". And while I'm here I might as well try to see the good side of the experience.

For this post and any following in the series, the term "comp sci" will probably be referring to computer science as a university program/degree and not as a practice. Of course, as a software developer, I 100% think that computer science as a practice is of great benefit. I'm just more sceptical of having to pay huge sums of money to learn what I (and many much more cracked friends) have been able to learn and achieve through self-learning.

**DISCLAIMER**: I do not think I am "cracked", nor do I think I will benefit absolutely nothing from my time in uni. This series is more of a whimsical way of reflecting on and documenting my time here.

# Comp Sci is Useless: The First Edition

<div>
    <img src="/comp-sci-is-useless/image.jpg" />
</div>

In this series, I will be reflecting on how things I learn & experience because of my computer science (and other courses) classes are **_useful_** to me. At the end of my uni experience, I will then evaluate whether my time was wasted or not.

The idea to do this came because of something that happened recently, which is the main focus of this edition.

## The Problem

My friend, who is slightly more new to tech than I am got an interview as a junior backend engineer at a cool company. She is good at logical thinking but usually has trouble translating her thoughts into code without the help of online resources (google, chatgpt, etc). Because of this she wasn't able to 100% solve her interview question (she still passed because she's cool like that!) and decided to send it to me to walk her through how I would do it.

The question was quite simple but also interesting, "find the missing number in an array". You are given an array of unsorted numbers from 0 to n-1, and exactly one number is missing from the array. We are tasked with finding that number. Easy, right?

## My First Solution

My first solution, the brute force method, was to first sort the array `arr`, say in ascending order. Then iterate through each number `i`, checking if the next number in the array `i+1`, was exactly greater by 1. I.e. `arr[i+1] - arr[i] === 1` (yes I write javascript!). If this case is false, then the number `arr[i] + 1` is the missing number. Easy. A similar solution would be checking `arr[i] === i` since the numbers are 0-indexed as well (here, if the case is false then `i` is the missing number).

```ts
function solution(arr) {
  arr.sort((a, b) => a - b);
  if (arr[0] !== 0) return console.log(0); // edge case: missing 0
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i + 1] - arr[i] !== 1) return console.log(arr[i] + 1);
  }
  return console.log(arr[arr.length - 1] + 1); // edge case: missing last number
}
```

## My "Comp Sci" solution

The week before I was given this problem we had just treated sequences and series in MTH 101 (Elementary Maths), it was something I'd done earlier in life but it felt like we looked at it in a bit more detail and gained more understanding of the topic. "Why did I bring this up?", you may ask. Well because this question is exactly that. It's an arithmetic progression sequence, with its first term `a`<sub>1</sub> as 0 and common difference `d` as 1.

"Ok, but what does this have to do with the problem statement?", I'm getting there, hold on.

The sum of an AP sequence is given as:

![sum of AP](https://wikimedia.org/api/rest_v1/media/math/render/svg/5623eb3a2ee603f741a2971ba17fe28149c61fec)

> Where **n** is the number of terms.

Do you see what I'm getting at? No? Using the A.P. sum formula we can get the sum of the expected numbers in the array. But we're missing one, right? So if we subtract the sum in the array, i.e. the sum of the numbers we actually have, we should get the value of the missing number.

Let me show some code, and quit yapping:

```ts
function solution(arr: number[]) {
  const n = arr.length + 1;
  const expectedSum = (n / 2) * (n - 1); // sum of A.P. sequence
  const missingNum = expectedSum - arr.reduce((acc, num) => acc + num, 0);
  console.log(missingNum);
}
```

I was feeling fancy, and used `.reduce` to find the sum of the numbers in the array, and subtracted that from the sum we got using the AP formula. This solution (in my humble and unbiased opinion) is elegant and dare I say, sexy.

## Conclusion

Okay comp sci can have this one. Thanks to a different way of thinking, I was able to avoid needing to sort the array completely (which is O(nlog(n)) in JS btw) and needing to loop over the array once again (O(n)). I'm not absolutely sure how that combines to form the overall time complexity, probably O(n \* nlog(n)), but we can already see that it's bad.

All that versus a simple O(n) solution that is clean and covers all the edge cases in one go? Comp sci wins... today.
