<svelte:head>
    <title>Learning Topics</title>
    <meta name="description" content="Choose your learning topics">
</svelte:head>

<script>
  import CommonLayout from "../../lib/CommonLayout.svelte";
</script>

<CommonLayout>
  <div>
    <h1 class="text-2xl font-semibold text-center px-1">
      What would you like to improve on French?
    </h1>
  <div class="flex flex-col items-center mt-4">
    <a href="/tutoring?category=grammar" class="block text-center transition-all duration-300 min-w-52 px-8 py-2 border hover:bg-accent hover:text-white border-accent text-accent mt-4 rounded-4xl shadow shadow-gray-400">
      Grammar
    </a>
    <a href="/tutoring?category=vocabulary" class="block text-center transition-all duration-300 min-w-52 px-8 py-2 border hover:bg-accent hover:text-white border-accent text-accent mt-4 rounded-4xl shadow shadow-gray-400">
      Vocabulary
    </a>
    <a href="/tutoring?category=pronunciation" class="block text-center transition-all duration-300 min-w-52 px-8 py-2 border hover:bg-accent hover:text-white border-accent text-accent mt-4 rounded-4xl shadow shadow-gray-400">
      Pronunciation
    </a>
    <a href="/tutoring" class="block text-center transition-all duration-300 min-w-52 px-8 py-2 border hover:bg-gray-400 hover:text-white border-gray-400 text-gray-400 mt-4 rounded-4xl shadow shadow-gray-400">
      Nothing, just chat
    </a>
  </div>
</div>
</CommonLayout>
<style>
  @reference "tailwindcss/theme";
</style>