---
pubDatetime: 2024-04-12T12:00:00Z
title: Edging with Canny
postSlug: canny-edge-detection
featured: true
draft: true
tags:
  - algorithm
  - rust
  - computer-vision
  - image-processing
ogImage: "canny-edge-detection/ogImage.png"
description: An implementation of the Canny Edge Detection algorithm in Rust.
---

# Edging - A Canny Edge Detection Implementation

<div>
    <img src="https://github.com/Tobshub/edging/blob/main/owl.png" />
</div>

For the past two months or so, I’ve only done work related programming. So to take the edge off, I decided to do some recreational programming and it popped into my head to try to implement edge detection. It’s something I’d never done before, and knew nothing about, so I knew it was sure to be a fun learning experience.

Code: [Github](https://github.com/tobshub/edging)

Like I said, I knew nothing about edge detection to begin with. So my first step was finding out the best (and/or easiest to implement) algorithm used for edge detection.
And I stumbled on [this article](https://www.analyticsvidhya.com/blog/2022/08/comprehensive-guide-to-edge-detection-algorithms), which served as a good starting point and also helped me decide on which algorithm to implement: the canny edge detection algorithm.

I wanted to implement this in either C++ or Rust, to improve my skills and feel for either. And I later decided upon using Rust because the US government says I should.
Also, it is at this point where I complain that most articles/tutorials on this topic are not only in python but end up using some library that obfuscates the actual important logic behind the steps in this algorithm(OpenCV, I’m looking at you).

## Step 1: Grayscale

The first step in the canny edge detection algorithm is applying a grayscale filter. Most non-grayscale images use either RGB or RGBA pixel representation. R G B standing for Red Green and Blue, with the A standing for Alpha(the transparency of the pixel). Each with values ranging from 0 to 255(so 8 bits or an unsigned byte). This means that in an image using RGB every 3 byte values represent a single pixel, and with RGBA every 4 byte values represent a single pixel.

Knowing the number of bytes that make up a single pixel(what I like to call pixel width) is important for iterating over the individual pixels of the image. If you used an RGB image in a grayscale implementation built for RGBA images only, it would mess up the image completely.

The last thing to consider is the grayscale method. There’s three accepted methods of grayscaling I could find:

- Average Method: you find the average of the RGB values of the pixel.
- Luminosity Method: sum of the multiplication of each RGB value by a ratio of how they are perceived.
- Weighted Average Method: an improved version of the luminosity method, with better perceived ratios.

But once you know the pixel width and the grayscale method you want to use, applying a grayscale filter becomes trivial.

```rust
enum Luminosity {
    Red,
    Green,
    Blue,
}

// called Luminosity, but uses the weighted average values
impl Luminosity {
    fn value(self) -> f32 {
        match self {
          Luminosity::Red => 0.299,
          Luminosity::Green => 0.587,
          Luminosity::Blue => 0.144,
        }
    }
}

fn grayscale(src: &[u8], px_width: usize) -> Vec<u8> {
    // the size of the resulting vector is the size of the input array
    // scaled down by the image pixel width.
    // this is because in Grayscale format, the pixel width is 1
    let mut dst = vec![0; src.len() / px_width];
    let mut i = 0;
    while i < src.len() - px_width + 1 {
        let lum = match px_width {
          // if this pixel width is 1,
          // then we can assume the image is already grayscale
          1 => src[i],
          3 | 4 => {
            (src[i] as f32 * Luminosity::Red.value()
             + src[i + 1] as f32 * Luminosity::Green.value()
             + src[i + 2] as f32 * Luminosity::Blue.value()) as u8
          }
          _ => unreachable!(),
        };

        // set the pixel value in the new image vector to the sum of the ratios.
        dst[i / px_width] = lum;
        // go to the start of the next pixel
        i += px_width;
    }

    dst
}
```

<div>
    <img src="https://github.com/Tobshub/edging/blob/main/owl-grayscale.png" />
</div>

## Step 2: Gaussian Blur
