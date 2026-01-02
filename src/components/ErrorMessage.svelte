<script>
  import IconError from "../assets/images/icon-error.svg";

  let { message } = $props();
</script>

<div>
  <figure>
    <img src={IconError} alt="Error message" />
  </figure>
  <p>{message}</p>
</div>

<style>
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--sp-8);
  }

  figure {
    width: clamp(var(--sp-32), 6vw, var(--sp-40));
    aspect-ratio: 1;
  }

  img {
    width: 100%;
  }

  p {
    color: var(--clr-error);
    font-weight: var(--fw-regular);
    line-height: var(--lh-150);
  }
</style>
