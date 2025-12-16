<script>
  import IconError from "../assets/images/icon-error.svg";

  let { message } = $props();
</script>

<div>
  <img src={IconError} alt="Error message" />
  <p>{message}</p>
</div>
