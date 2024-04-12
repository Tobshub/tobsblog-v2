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
    <img src="https://raw.githubusercontent.com/Tobshub/edging/main/owl.png" />
</div>

For the past two months or so, I’ve only done work related programming. So to take the edge off, I decided to do some recreational programming and it popped into my head to try to implement edge detection. It’s something I’d never done before, and knew nothing about, so I knew it was sure to be a fun learning experience.

Code: [Github](https://github.com/tobshub/edging)

Like I said, I knew nothing about edge detection to begin with. So my first step was finding out the best (and/or easiest to implement) algorithm used for edge detection.
And I stumbled on [this article](https://www.analyticsvidhya.com/blog/2022/08/comprehensive-guide-to-edge-detection-algorithms), which served as a good starting point and also helped me decide on which algorithm to implement: the canny edge detection algorithm.

I wanted to implement this in either C++ or Rust, to improve my skills and feel for either. And I later decided upon using Rust because the US government says I should.
Also, it is at this point where I complain that most articles/tutorials on this topic are not only in python but end up using some library that obfuscates the actual important logic behind the steps in this algorithm (OpenCV, I’m looking at you).

## Step 1: Grayscale

The first step in the canny edge detection algorithm is applying a grayscale filter. Most non-grayscale images use either RGB or RGBA pixel representation. R G B standing for Red Green and Blue, with the A standing for Alpha (the transparency of the pixel). Each with values ranging from 0 to 255 (so 8 bits or an unsigned byte). This means that in an image using RGB every 3 byte values represent a single pixel, and with RGBA every 4 byte values represent a single pixel.

Knowing the number of bytes that make up a single pixel (what I like to call pixel width) is important for iterating over the individual pixels of the image. If you used an RGB image in a grayscale implementation built for RGBA images only, it would mess up the image completely.

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
    <img src="https://raw.githubusercontent.com/Tobshub/edging/main/owl-grayscale.png" />
</div>

## Step 2: Gaussian Blur

According to [wikipedia](https://en.wikipedia.org/wiki/Gaussian_blur), Gaussian blur is the result of blurring an image using a Gaussian function. Quite the definition right?

Essentially, in this step you're smoothening the edges in the image and reducing the overall image noise. Who would have thought that to detect edges you'd need to make the image less... edgy.

The Gaussian function (in one dimension) is defined as this beauty:

![gaussian function](https://wikimedia.org/api/rest_v1/media/math/render/svg/dd16b16869269dba008d19c0969515a1d50b3ae2)

> In practice, it is best to take advantage of the Gaussian blur’s separable property by dividing the process into two passes. In the first pass, a one-dimensional kernel is used to blur the image in only the horizontal or vertical direction. In the second pass, the same one-dimensional kernel is used to blur in the remaining direction. The resulting effect is the same as convolving with a two-dimensional kernel in a single pass, but requires fewer calculations.

For this reason, I utilized the 1-D Gaussian function, and simply applied the resultant kernel in both directions.

```rust
const KERNEL_RADIUS: i32 = 2;
const KERNEL_SIZE: usize = (KERNEL_RADIUS * 2 + 1) as usize;

fn gaussian_blur(mut src: Vec<u8>, image_width: i32) -> Vec<u8> {
    let mut dst = vec![0; src.len()];
    let mut kernel: [f64; KERNEL_SIZE] = [0.0; KERNEL_SIZE];
    let mut sum = 0.0;

    let sigma: f64 = ((KERNEL_RADIUS / 2) as f64).max(1.0);

    // compute kernel for 1D gaussian blur
    for x in -KERNEL_RADIUS..=KERNEL_RADIUS {
        let exponent = -(x * x) as f64 / (2.0 * sigma * sigma);
        let numerator = std::f64::consts::E.powf(exponent);
        let denominator = 2.0 * std::f64::consts::PI * sigma * sigma;

        let kernel_value = numerator / denominator;
        kernel[(x + KERNEL_RADIUS) as usize] = kernel_value;
        sum += kernel_value;
    }

    // normalize kernel
    (0..KERNEL_SIZE).for_each(|x| {
        kernel[x] /= sum;
    });

    // apply kernel in x direction
    (0..src.len()).for_each(|px| {
        let mut new_pixel = 0.0;

        for kernel_x in -KERNEL_RADIUS..=KERNEL_RADIUS {
            let kernel_value = kernel[(kernel_x + KERNEL_RADIUS) as usize];

            let neighbor_px = px as i32 + kernel_x;

            if neighbor_px < 0 || neighbor_px >= src.len() as i32 {
                continue;
            }

            let npx = src[neighbor_px as usize] as f64 * kernel_value;
            new_pixel += npx;
        }

        dst[px] = new_pixel as u8;
    });

    // apply kernel in y direction
    (0..dst.len()).for_each(|py| {
        let mut new_pixel = 0.0;

        for kernel_x in -KERNEL_RADIUS..=KERNEL_RADIUS {
            let kernel_value = kernel[(kernel_x + KERNEL_RADIUS) as usize];

            let neighbor_py = py as i32 + kernel_x * image_width;

            if neighbor_py < 0 || neighbor_py >= dst.len() as i32 {
                continue;
            }

            let npx = dst[neighbor_py as usize] as f64 * kernel_value;
            new_pixel += npx;
        }

        src[py] = new_pixel as u8;
    });

    src
}
```

In our implementation, we assume that the input image byte array has a pixel width of 1 (i.e. grayscale has been applied). This allows us to simplify the implementation by taking every index of the byte array as a sole pixel of the image. We first apply the kernel in the x dimension and store the results in `dst`. Then we apply the kernel in the y dimension and store the results back in `src` (as we don't want the results from previous iterations in the y dimension to affect our results).

<div>
  <img src="https://raw.githubusercontent.com/Tobshub/edging/main/owl-blur.png" />
</div>

## Step 3: Sobel Filter

The [Sobel-Feldman operator](https://en.wikipedia.org/wiki/Sobel_operator) is used in this step to find the intensity gradients of the image. This is done by convolving (applying) 3x3 kernels in the _x_ and _y_ direction.

![convolution operations](https://wikimedia.org/api/rest_v1/media/math/render/svg/2c013324e3b5a4a98f3205663020d6dea32dbff8)

> Where **A** is the source image.

The results of the kernel convolutions are used to calculate:

- the Gradient magnitude ![gradient magnitude formula](https://wikimedia.org/api/rest_v1/media/math/render/svg/23ae6772c5f58751fc6014b71d6adafb30a31c79)

- and the Gradient direction ![gradient direction formula](https://wikimedia.org/api/rest_v1/media/math/render/svg/b3e4efe0d943867ba795d1a960f36d71c1812880)

These two values (**G** and **Θ**) are crucial for the next step.
