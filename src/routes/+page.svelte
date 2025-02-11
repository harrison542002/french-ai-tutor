<svelte:head>
    <title>Welcome to Bonjour</title>
    <description>Bonjour is where you leverage your French Skils.</description>
</svelte:head>

<script>
  import CommonLayout from "../lib/CommonLayout.svelte";
</script>

<CommonLayout>
<div class="text-center">
    <h1 class="text-2xl font-semibold">
      Welcome to <span class="text-4xl font-parisienne text-accent font-bold">Bonjour </span>
    </h1>
    <p class="text-sm font-light">Ready to start your tutoring session ?</p>
    <a href="/options" class="hover:bg-accent/75 transition-all duration-500 px-8 py-2 block bg-accent text-white mt-4 rounded-4xl shadow shadow-gray-400">
      Yes
    </a>
  </div>
</CommonLayout>


<style>
  @reference "tailwindcss/theme";

</style>