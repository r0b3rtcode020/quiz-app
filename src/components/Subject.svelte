<script>
  let { title, icon, onClick } = $props();
</script>

<button type="button" onclick={onClick}>
  <figure>
    <img src={icon} alt={title} />
  </figure>
  <span>{title}</span>
</button>
