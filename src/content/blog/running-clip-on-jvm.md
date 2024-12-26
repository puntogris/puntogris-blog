---
title: "Running CLIP on the JVM"
pubDate: "2024-12-20"
description: "Adventure of making a CLIP model in Kotlin"
author: "Puntogris"
tags: ["openclip", "ml", "jvm"]
draft: true
---

## Why?

All started because i had the idea to classify images with AI for a plugin for IntelliJ in Kotlin.

Both the official repo of OpenAI CLIP and OpenCLIP use PyTorch and Python for training.
Fournately, there is a pytorh version for Java so we can run the model in Java.

Two issues though:

- Accuracy: for my use case was in the 50-60% range.
- Size: the model is about 600MB, that's a lot to load into memory.

There must be a better way to do this, right?

## How?

While in reddit i found a post about a port of clip.cpp to Android using JNI.

clip.cpp is a C++ implementation of CLIP that uses models in the GGUF format and runs on CPU. This models can be quantized and go down in size significantly(100mb for q4)

Here start the fun!

I wanted to use my custom fine-tuned model with OpenCLIP but that was in pytorch, so i had to convert it to a GGUF model.(:pain:)

It was a lot of trial and error but i got it working. Later i found an implementation that worked great, but hey at least i learned a thing or two.

Now we have the model in HuggingFace, time to run another script.
Now we have it in a GGUF format, time to run the OpenCLIP script.

A cool human already coded the JNI port, so i just had to make some changes to the script.
We can run adapt the cmake to or need to generate the native library.

I had a lot of issues where the JNI wouldn't load the model(aparentyl this is common), and i figured i would take the easy way out and figure it out later.

So i bundled everything in a jar and ran it.

## Did it worked?

Hope so

Now we need to load the model providing the path to it, and call the methods.

Lets try...

It works!!
