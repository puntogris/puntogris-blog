---
title: "Running CLIP on the JVM"
pubDate: "2024-12-20"
description: "I tried running a custom OpenCLIP model in Kotlin and it was a fun adventure."
author: "Puntogris"
tags: ["openclip", "ml", "jvm"]
draft: false
image:
  cover: "../../images/running-clip-on-jvm/cover.jpg"
  alt: "Post cover"
---

## Why?

It all started with an idea: I wanted to classify images with AI for an Android Studio plugin.

Both the official repositories for [OpenAI CLIP](https://github.com/openai/CLIP) and [OpenCLIP](https://github.com/mlfoundations/open_clip) rely on PyTorch and Python. Luckily, PyTorch has a Java implementation, allowing us to run the model in the JVM.

However, I quickly ran into two major roadblocks:

- **Accuracy**: The model's performance was between 50-60%, which just wasn’t good enough for my needs.
- **Size**: The model was around 600MB, way too big to load into memory for a lightweight plugin.

Clearly, I needed a better approach.

## Finding a Better Way

### Accuracy

Improving accuracy would require fine-tuning the model with a custom dataset. You can read more about that process in [this post](https://www.blog.puntogris.com/fine-tunning-openclip/). But reducing the model's size presented a more complex challenge.

While exploring solutions, I discover [clip.cpp](https://github.com/monatis/clip.cpp), a lightweight C++ implementation of CLIP designed to run efficiently on CPUs. It supports GGUF-formatted models, which can be quantized to drastically reduce their size—down to just ~100MB with q4 quantization. Additionally, I found a JNI port of clip.cpp for Android, making it a perfect candidate for this project.

### The Journey to GGUF

#### Step 1: OpenCLIP to HuggingFace

The first challenge was getting my OpenCLIP model (in PyTorch format) into HuggingFace format. At first, I spent an entire day wrestling with a hacky script to manually map weights, it wasn’t pretty but it worked.

I later found a much [cleaner solution](https://gist.github.com/rwightman/c79fd0241ed3c860e898114931c07990) hidden in a HuggingFace repository comment thread.

#### Step 2: HuggingFace to GGUF

Once the model was in HuggingFace format, the next step was converting it to GGUF with q4 quantization. Luckily, clip.cpp comes with a [handy conversion script](https://github.com/monatis/clip.cpp/blob/main/models/convert_hf_to_gguf.py) that made it super easy to shrink the model down to a fraction of its original size.

#### Step 3: Adapt clip.cpp for Android

To integrate clip.cpp into my Android project, I used a JNI port already available on [Github](https://github.com/shubham0204/clip.cpp/tree/add-android-sample/examples/clip.android) that i found on Reddit. I made some modifications to the build script to generate the native library for Mac. Bundling everything into a JAR, I encountered a new challenge: the library wasn’t being detected during runtime.

After a lot of debugging, I stumbled on a Stack Overflow tip about making [custom native loader](https://stackoverflow.com/a/75623784/3663235). Turns out, that did the trick and got the library loading smoothly.

## Did it worked?

After all the trial and error, I successfully converted my fine-tuned model. Thanks to q4 quantization, the final size was just 100MB, an impressive reduction from the original 600MB.

To test it, I used the CLIPAndroid class and provided the path to the GGUF model:

```kotlin
val clip = CLIPAndroid().apply {
    load(PATH_TO_GGUF_MODEL, verbosity = 1)
}
val embeddings = clip.encode_text("dog", NUMBER_OF_THREADS, VECTOR_DIMS, normalize = true)
Log.d("CLIP", "Embeddings: $embeddings")
```

I won’t spoil the fun, but it logged the embeddings! 🎉

Looking back, even though it was tricky and full of trial and error and custom scripts(like 15), I learned so much along the way. Honestly, it ended up being pretty fun to see it all come together in the end.

If you're interested, you can check out the plugin and all the scripts I used:

- [Telescope, Andrid Studio plugin](https://github.com/puntogris/telescope) -> Just a heads-up, it's still in the experimental stage.
- [Random scripts used for this project](https://github.com/puntogris/clipper) -> These aren't super organized, but they worked for my custom use case. They might be helpful for you as well!
