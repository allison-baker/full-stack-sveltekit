<script lang='ts'>
    export let data: any
    
    async function fetchMovie(id: string) {
        const res = await fetch('../api/movie')
        const movie = await res.json()
        console.log(movie)
    }
</script>

<main>
    <h1 class="m-4">Movies</h1>
    <h2>{data.body.length} Movies rated PG, PG-13, or R from the year 1985.</h2>
    <div class="mx-4 flex flex-wrap gap-4">
        {#each data.body as movie}
            <div class="flex flex-col items-center p-4">
                <h2 class="">{movie.title}</h2>
                <button class="btn variant-ghost-primary" on:click={() => fetchMovie(movie._id)}>Details</button>
            </div>
        {/each}
    </div>
</main>