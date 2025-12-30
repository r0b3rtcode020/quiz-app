<script>
  import SunLight from "../assets/images/icon-sun-dark.svg";
  import MoonLight from "../assets/images/icon-moon-dark.svg";
  import SunDark from "../assets/images/icon-sun-light.svg";
  import MoonDark from "../assets/images/icon-moon-light.svg";

  let { isDark = $bindable() } = $props();

  let IconSun = $derived(isDark ? SunDark : SunLight);
  let IconMoon = $derived(isDark ? MoonDark : MoonLight);
</script>

<div class="theme">
  <figure>
    <img src={IconSun} alt="Sun" />
  </figure>
  <label class="switch">
    <input id="switch" type="checkbox" bind:checked={isDark} />
    <span class="slider round"></span>
  </label>
  <figure>
    <img src={IconMoon} alt="Moon" />
  </figure>
</div>

<style>
  .theme {
    display: flex;
    align-items: center;
    gap: clamp(var(--sp-8), 2.1vw, var(--sp-16));
    padding: clamp(var(--sp-8), 2.1vw, var(--sp-16));
  }

  figure {
    width: var(--sp-16);
  }

  .switch {
    position: relative;
    display: inline-block;
    width: var(--sp-32);
    height: var(--sp-20);
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--clr-purple-600);
    border-radius: 63rem;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: var(--sp-12);
    width: var(--sp-12);
    left: var(--sp-4);
    bottom: var(--sp-4);
    background-color: white;
    transition: 0.2s;
    border-radius: 50%;
  }

  input:focus-visible + .slider {
    outline: 0.125rem solid var(--clr-purple-600);
    outline-offset: 0.125rem;
  }

  input:checked + .slider:before {
    transform: translateX(var(--sp-12));
  }

  /*****************************************************
  *****************   MEDIAQUERIES   *******************
  *****************************************************/

  @media (width >= 48rem) {
    figure {
      width: var(--sp-24);
    }

    .switch {
      width: var(--sp-48);
      height: var(--sp-28);
    }

    .slider:before {
      height: var(--sp-20);
      width: var(--sp-20);
    }

    input:checked + .slider:before {
      transform: translateX(var(--sp-20));
    }
  }
</style>
