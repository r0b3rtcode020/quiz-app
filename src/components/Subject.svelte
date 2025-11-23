<script>
  import { link } from "svelte5-router";

  let { href, text, icon } = $props();
</script>

<a {href} use:link>
  <figure>
    <img src={icon} alt={text} />
  </figure>
  <span>{text}</span>
</a>
