# 🚲️ Tandem GPT

A virtual tandem partner to practice new vocab/grammar with.

→ Check out the [live version](https://alexw00.github.io/tandem-gpt/).

### Status

This is a mvp version to test the concept. For more info see [this post](https://www.alexanderweichart.de/3_Resources/Ideas/lib/%F0%9F%92%A1+GPT3+Tandem).

### How does it work?

This is a simple web app that uses the [OpenAI GPT-3 API](https://beta.openai.com/) to simulate a conversation with a virtual tandem partner. Every time you submit a message, the app sends the conversation history to the GPT-3 API. GPT-3 is instructed to reply with a message that corrects any mistakes you made in your last message, and adds new vocabulary/grammar. The app then displays the GPT-3 response.

All data is only stored in your browser's local storage, and the app communicates directly with the OpenAI API.
