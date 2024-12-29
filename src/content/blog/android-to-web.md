---
title: "From Android to Web Development"
pubDate: "2024-12-26"
description: "Some thoughts on my journey learning web development as an Android developer."
author: "Puntogris"
tags: ["web", "android"]
draft: false
image:
  cover: "../../images/android-to-web/cover.webp"
  alt: "Post cover"
---

## My Journey from Android to Web Development in 2024

Disclaimer: This is not a comparison between web and mobile development, i also do not believe one is better than the other. This is simply my experience trying web development in 2024 after years of working on Android.

### The Beginning

For context, I’ve been an Android developer for five years. In 2024, I decided to expand my front-end skills by diving into web development.

The last time I touched web development was when I was a kid, back in the days of Flash. At that time, HTML, CSS, and JavaScript were complete mysteries to me.

### Trying Web Development in 2024

Where to begin? I should have started with the basics: learning HTML, CSS, and JavaScript. But, I jumped straight into the deep end.

Everywhere I looked, I saw mentions of React and Next.js, so I decided to give them a try. Around this time, the Next.js app directory had just been announced. Without much thought, I ran npm install next and began building my first app.

To be honest, I was completely lost. I didn’t know what was happening or how to do anything. This experience made me realize the importance of learning the basics first.

### Key Takeaways

### Frameworks

I experimented with several frameworks, including Next.js, Astro, Remix, SvelteKit, and SolidJS. All of them are fantastic. If I had to choose one, it would be SvelteKit, we vibe like that.

For instance, when I created a simple "Hello World" app, Next.js downloaded 500KB to the browser, on the other hand SvelteKit only 50KB. While this difference wasn’t noticeable in terms of speed for a simple portfolio, the 10x improvement in performance was hard to ignore.

### Hosting and Deployment

I remember that i used a FTP client to upload my websites. Now there are platforms like Vercel, Cloudflare, and Netlify now allow you to host your app for free.

The process is mind-blowingly simple: link your GitHub project, and your app is live in seconds. Crazy, right?

With platforms like Vercel (which I used the most), pushing automatically deploys your app. Just refresh the page, and it’s live. No need to create bundles, upload to the Play Store, wait for approval, and then publish. It’s like magic. This enables fast iteration and deployment.

Even though we should not be scared of servers like [DHH](https://youtu.be/-cEn_83zRFw?si=CpXTNySQ7o6Mv79T&t=1966) said and i agree with him(i'm scared of servers), i can't deny that we can get an MVP running in a few minutes for free!

### Server-Side Code

The concept of server-side code—running logic that never touches the client is still mind-blowing to me. Coming from Android front-end development, where if we want server-side code we need to host it somewhere, and we have to deal with security and maintenance.

In Android, API keys are often hardcoded in the app, which poses significant security risks. While some tricks can hide these keys, it’s not foolproof. In contrast, web frameworks include server-side capabilities by default, simplifying security concerns those keys never touch the client.

This felt like a great start to backend development, something i want to also explore a bit more in the future.

### JavaScript and TypeScript

Coming from Kotlin, JavaScript was a shock. Initially, I was thrilled by the lack of type definitions—it felt liberating.

But as soon as I had to debug complex nested objects, I started missing types. Switching to TypeScript was a game-changer. The type inference is incredibly powerful. For example, defining a server function automatically infers types on the client side.

I do miss classes, though. Having standalone functions scattered in a file felt strange at first, but I’m getting used to it.

UI Development

This was a funny revelation. While learning React, I noticed its similarity to Jetpack Compose, which I had briefly explored. React’s approach of combining UI and logic in the same file felt intuitive.

However, I occasionally missed XML for complex layouts. Navigating a large file to find which button calls which function can be messy. Breaking the UI into smaller, reusable components solved this problem for me.

Tooling

No emulator, no Gradle configuration—just run the app in the browser. Most modern frameworks come with a development server that reloads the app on save.

Want a database? Tools like Turso, Neon, and Supabase let you set one up in a few clicks. Need authentication or storage? Libraries and services are readily available. The simplicity and ease of setup were refreshing.

Final Thoughts

Web development has been a breath of fresh air. I’m glad I gave it a try, and I’m excited about what I can build in the future.

If you’re considering expanding your skill set, I highly recommend exploring web development. It’s a great way to learn and grow as a developer. For me, it eliminated much of the friction I’ve experienced in Android—though that might be because my web projects have been simpler so far.
