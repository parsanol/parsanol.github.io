<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="flex gap-12">
      <div class="w-64 flex-shrink-0 hidden lg:block">
        <div class="sticky top-20 h-[calc(100vh-6rem)] overflow-y-auto">
          <DocsNav :show-sections="['about']" />
        </div>
      </div>

      <div class="flex-1 min-w-0">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-8">About Parsanol</h1>

        <p class="text-xl text-gray-600 dark:text-gray-400 mb-12">
          Parsanol is a parser combinator library that brings together the best of two worlds: the elegant syntax of Ruby's Parslet and the blazing fast performance of Rust.
        </p>

        <!-- Origin Story -->
        <section class="content-section">
          <h2>Why We Built Parsanol</h2>
          <p>
            We loved the Ruby syntax of <a href="https://github.com/kss /parslet" target="_blank" rel="noopener noreferrer">Parslet</a>. Its declarative approach to building parsers made complex parsing tasks feel natural and intuitive. However, when parsing large documents or processing high volumes of data, the performance of pure Ruby left something to be desired.
          </p>
          <p>
            We wanted the <strong>best of both worlds</strong>: the beautiful, readable syntax that makes parser construction feel like composing music, combined with the raw speed that only a systems language like Rust can provide.
          </p>
          <p>
            Thus, Parsanol was born. Implemented in Rust for maximum performance, with seamless Ruby bindings that let you write parsers in that same elegant Parslet-inspired style you know and love.
          </p>
        </section>

        <!-- Name Origin -->
        <section class="content-section">
          <h2>The Name "Parsanol"</h2>
          <p>
            The name "Parsanol" is a creative combination that reflects our dual heritage:
          </p>
          <ul class="feature-list">
            <li>
              <strong>"Parse"</strong> — the core purpose of the library
            </li>
            <li>
              <strong>"-anol"</strong> — the IUPAC suffix for alcohols, representing the "life" or "essence" of the parsing
            </li>
            <li>
              <strong>Wordplay on "Rust"</strong> — connecting to our Rust implementation
            </li>
          </ul>
          <p>
            Just as alcohol contains the essence of fermentation, Parsanol contains the essence of parsing — concentrated, powerful, and essential.
          </p>
        </section>

        <!-- Logo Story -->
        <section class="content-section">
          <h2>Our Logo</h2>
          <div class="logo-showcase">
            <img src="/logo.svg" alt="Parsanol Logo" class="logo-large" />
          </div>
          <p>
            Our logo features a <strong>parsnip</strong> — the root vegetable — soaking in a golden life liquid. This imagery carries deep meaning:
          </p>
          <ul class="feature-list">
            <li>
              <strong>The Parsnip</strong> represents the parser itself — a tool that digs into text and extracts meaning from the depths
            </li>
            <li>
              <strong>The Life Liquid</strong> is the parsing engine, breathing life into the structure
            </li>
            <li>
              <strong>The Branches and Leaves</strong> growing from the parsnip represent the semantic parts that the parser extracts — each branch is a meaningful component of the parsed content
            </li>
            <li>
              The liquid nourishes these branches, showing how Parsanol doesn't just break down text — it reveals and organizes the semantic structure within
            </li>
          </ul>
          <p>
            Just as a parsnip draws nutrients from the soil to grow, Parsanol draws structure from raw text to produce meaningful, organized data.
          </p>
        </section>

        <!-- Performance -->
        <section class="content-section">
          <h2>Performance</h2>
          <p>
            Parsanol is built on Rust, giving you <strong>18-44x faster</strong> parsing performance compared to pure Ruby implementations. This makes it ideal for:
          </p>
          <ul class="feature-list">
            <li>Processing large documents or datasets</li>
            <li>Real-time parsing applications</li>
            <li>High-throughput API backends</li>
            <li>Compiler and interpreter development</li>
          </ul>
        </section>

        <!-- Open Source -->
        <section class="content-section">
          <h2>Open Source</h2>
          <p>
            Parsanol is open source and available under the MIT license. We welcome contributions from the community!
          </p>
          <div class="cta-box">
            <a href="https://github.com/parsanol/parsanol-rs" target="_blank" rel="noopener noreferrer">
              <Button variant="primary">
                <Icon name="github" class="mr-2" />
                View on GitHub
              </Button>
            </a>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '../components/atoms/Button.vue'
import Icon from '../components/atoms/Icon.vue'
import DocsNav from '../components/organisms/DocsNav.vue'
</script>

<style scoped>
.page-title {
  @apply text-4xl font-bold text-gray-900 dark:text-white mb-8;
}

.lead {
  @apply text-xl text-gray-600 dark:text-gray-400 mb-12;
}

.content-section {
  @apply mb-12;
}

.content-section h2 {
  @apply text-2xl font-semibold text-gray-900 dark:text-white mb-4;
}

.content-section p {
  @apply text-gray-600 dark:text-gray-400 mb-4 leading-relaxed;
}

.content-section a {
  @apply text-primary-600 dark:text-primary-400 hover:underline;
}

.feature-list {
  @apply list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 mb-4;
}

.feature-list li {
  @apply leading-relaxed;
}

.logo-showcase {
  @apply flex justify-center my-8;
}

.logo-large {
  @apply w-64 h-auto;
}

.cta-box {
  @apply mt-6;
}

@media (max-width: 768px) {
  .logo-large {
    @apply w-48;
  }
}
</style>
