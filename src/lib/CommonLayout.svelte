<script>

  import { fade } from "svelte/transition";

</script>
<div class="min-h-96 flex justify-center items-center" in:fade={{delay : 500}} out:fade>
  <slot></slot>
</div>