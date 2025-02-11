<svelte:head>
    <title>Tutoring Session</title>
    <description>Start learning now</description>
</svelte:head>

<script lang="ts">
  import { page } from "$app/stores";
  import CommonLayout from "../../lib/CommonLayout.svelte";
  import {marked} from "marked";
  import ArrowUpCircleFill from "virtual:icons/ri/arrow-up-circle-fill";

  let userInput = "";
  let container : HTMLDivElement | null;

  // Function to fetch the streamed data from the server and append to the container
  async function fetchStreamedResponse(inputText: string) {
        const response : any = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: inputText }),
        });         

        if(response?.status === 500){
          // Append a error warning message to user if API response is bad.
          const errorElement = document.createElement('p');
          errorElement.className = "text-center py-8 text-red-500 text-xl border-red-500 border mt-1 mb-2 rounded-4xl";
          errorElement.textContent = "Something went wrong, please try again later!"
          container?.appendChild(errorElement);
          if(container){
                  container.scrollTop = container.scrollHeight;
          }
        } else{
          const reader = response.body?.getReader();
          const decoder = new TextDecoder();
          let done = false;
          let buffer = "";

          // Create a new element (div) and append it to the container
          const newResponseElement = document.createElement('div');
          newResponseElement.className = "text-gray-100 p-4 rounded-4xl bg-accent mb-2";
          container?.appendChild(newResponseElement);

          if(reader){
              while (!done) {
                const { value, done: readerDone } = await reader.read();
                done = readerDone;
                buffer += decoder.decode(value, { stream: true });

                newResponseElement.innerHTML = marked.parse(buffer) as string;
                if(container){
                  container.scrollTop = container.scrollHeight;
                }
              }
          }
        }  
  }

  const handleUserInput = (e : KeyboardEvent) => {
    if(e.key === "Enter"){
      if(container){
        if(userInput.trim()){
          const newUserInput = document.createElement("div");
          newUserInput.innerHTML = `<div class="bg-gray-300 rounded-4xl p-4">${userInput}</div>`;
          newUserInput.className = "flex justify-end mb-2"
          container.appendChild(newUserInput);
          newUserInput.scrollIntoView({ behavior: "smooth" });
          fetchStreamedResponse(userInput)
          userInput = ""
        }
        
      }
    }
  }

  const handleArrowClick = (e : SubmitEvent) => {
    e.preventDefault();
    if(container){
        if(userInput.trim()){
          const newUserInput = document.createElement("div");
          newUserInput.innerHTML = `<div class="bg-gray-300 rounded-4xl p-4">${userInput}</div>`;
          newUserInput.className = "flex justify-end mb-2"
          container.appendChild(newUserInput);
          newUserInput.scrollIntoView({ behavior: "smooth" });
          fetchStreamedResponse(userInput)
          userInput = ""
        }
    }
  }
  
  const categories =  ["grammar", "vocabulary", "pronunciation"];

  $: queryParams = $page.url.searchParams;
  $: category = queryParams.get('category');
  $: {
    if(category){
      if(!categories.includes(category)){
        category = ""
      } else {
        fetchStreamedResponse(`Provide me a guideline to study the French's ${category}.`);
      }
    }
  }
</script>

<CommonLayout>
  <div class="w-[95%] md:w-[80%] lg:w-[50%]">
    {#if container && container.children.length === 0 && !category}
        <p class="text-center py-12 text-2xl font-bold">Would you like to know anything about <span class="font-parisienne font-bold text-accent">French</span>?</p>
    {/if}
    <div class="h-[68vh] overflow-y-auto mt-1 scroll-smooth content-container" bind:this={container} >
      
    </div>
    <form class="w-[95%] md:w-[80%] lg:w-[50%] fixed bottom-[1%] z-30 bg-white" on:submit={(e) => handleArrowClick(e)}>
      <input bind:value={userInput} on:keydown={handleUserInput} type="text" placeholder="Have any questions? Type Here!" class="border block w-[100%] rounded-4xl p-4 border-gray-300 shadow-md"/>
      <button class={`rounded-full absolute right-5 top-4 `} disabled={!userInput}>
        <ArrowUpCircleFill width="25" height="25" color={!userInput ? "gray" : "black"}/>
      </button>
    </form>
  </div>
</CommonLayout>

<style>
  @reference "tailwindcss/theme";
  .content-container {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .content-container::-webkit-scrollbar {
    display: none;
  }
</style>