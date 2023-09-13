<script>
  import { base } from "$app/paths";
  import { page } from "$app/stores";
</script>

<header>
  <nav>
    <ol class="flex justify-center gap-4 text-lg text-stone-400">
      <li>
        <a
          class="border-b-2 border-solid active:border-blue-400 active:text-blue-400
            {$page.route.id === '/'
            ? 'border-stone-300 text-stone-300'
            : 'border-transparent hover:border-stone-400'}"
          href="{base}/"
        >
          Role Picker
        </a>
      </li>
      <li>
        <a
          class="border-b-2 border-solid active:border-blue-400 active:text-blue-400
            {$page.route.id === '/info'
            ? 'border-stone-300 text-stone-300'
            : 'border-transparent hover:border-stone-400'}"
          href="{base}/info"
        >
          Info
        </a>
      </li>
    </ol>
  </nav>
</header>
