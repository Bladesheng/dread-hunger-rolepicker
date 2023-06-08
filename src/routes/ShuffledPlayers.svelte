<script lang="ts">
  import { Players, type IPlayer } from "$lib/stores/players";

  type IShuffledPlayers = {
    player: IPlayer;
    role: string;
  }[];

  // to remember who was assigned which role the last time
  let previousShuffledPlayers: IShuffledPlayers = [];

  const roles = [
    "Captain ⚓",
    "Chaplain ✝️",
    "Cook 🥩",
    "Doctor 💉",
    "Engineer 🔧",
    "Hunter 🏹",
    "Royal Marine 🔫",
    "Navigator 🔭",
  ];

  // Fisher-Yates (Knuth) shuffle
  // https://stackoverflow.com/a/2450976
  function shuffleArray<Type>(array: Type[]) {
    let currentIndex = array.length;
    let randomIndex;

    // while there remain elements to shuffle
    while (currentIndex !== 0) {
      // pick a random remaining element
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // and swap it with the current element
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  function checkIfNoRepeats(current: IShuffledPlayers, previous: IShuffledPlayers) {
    for (const currentPlayer of current) {
      for (const prevPlayer of previous) {
        if (currentPlayer.player.id === prevPlayer.player.id) {
          // if we find player that is selected now and was also selected before
          if (currentPlayer.role === prevPlayer.role) {
            // if his role is the same now as it was before
            return false;
          }
        }
      }
    }

    // no repeats were found
    return true;
  }

  // shuffle roles into random order and assign them to given players
  function shufflePlayers(selectedPlayers: IPlayer[]) {
    const shuffledRoles = shuffleArray(roles);

    const shuffledPlayers: IShuffledPlayers = [];

    selectedPlayers.forEach((player, index) => {
      shuffledPlayers.push({
        player,
        role: shuffledRoles[index],
      });
    });

    return shuffledPlayers;
  }

  // formats players and roles into discord friendly format and copies it into your clipboard
  async function copyToClipboard(players: IShuffledPlayers) {
    const lines: string[] = [];

    // to calculate minimum ammount of dots
    const longestPlayerRole = Math.max(
      ...players.map(({ player, role }) => {
        return player.name.length + role.length;
      })
    );

    players.forEach(({ player, role }) => {
      // minimum ammount of dots between name and role
      const minDots = 3;

      // actual number of dots between name and role
      let dots = longestPlayerRole - player.name.length - role.length + minDots;

      // override for captain because the anchor emoji is 2 characters wide for some reason
      if (role === "Captain ⚓") {
        dots--;
      }

      lines.push(player.name + ".".repeat(dots) + role);
    });

    // enable monospace font on discord
    lines.push("```");
    lines.unshift("```");

    await navigator.clipboard.writeText(lines.join("\n"));
  }

  function handleShuffle() {
    let shuffledPlayers!: IShuffledPlayers;

    // so that nobody gets the same role twice in a row
    let noRepeats = false;
    while (noRepeats === false) {
      shuffledPlayers = shufflePlayers($Players.selected);
      noRepeats = checkIfNoRepeats(shuffledPlayers, previousShuffledPlayers);
      console.log(noRepeats);
    }

    console.log("Shuffled:", shuffledPlayers);
    previousShuffledPlayers = shuffledPlayers;

    copyToClipboard(shuffledPlayers);
  }
</script>

<section>
  <h1>Přidělené role</h1>

  <ol>
    {#each previousShuffledPlayers as { player, role } (player.id)}
      <li>
        <span>
          {player.name}
        </span>
        <span>
          {role}
        </span>
      </li>
    {/each}
  </ol>

  <div class="buttons">
    <button
      on:click={() => {
        // 8 is max ammount of players
        if ($Players.selected.length <= 8) {
          handleShuffle();
        }
      }}>Vylosovat</button
    >
    <button
      on:click={() => {
        copyToClipboard(previousShuffledPlayers);
      }}>Zkopírovat</button
    >
  </div>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  ol {
    font-size: 1.3rem;
  }

  li {
    display: flex;
    justify-content: space-between;
    gap: 3rem;
  }
  li:nth-child(odd) {
    background-color: var(--color-secondary);
  }

  @media screen and (max-width: 960px) and (min-width: 680px) {
    ol {
      font-size: 2.1vw;
    }
  }
</style>
