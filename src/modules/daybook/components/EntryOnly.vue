<template>
    <div class="entry-container mb-3 pointer p-2"
         @click="$router.push({name: 'entry', params: {id:10}})"
    >
        <div class="entry-title d-flex">
            <span class="text-success fs-5 fw-bold">13</span>
            <span class="mx-1 fs-5">Mayo</span>
            <span class="mx-2 fw-light">22</span>
        </div>

        <div class="entry-description">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id deleniti veritatis voluptatem cum ex nam nemo iste porro dolorum? Porro voluptatem maiores quis atque ea necessitatibus quisquam placeat iusto! Beatae.
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    .entry-container{
        border-bottom: 1px solid #2c3e50;
        transition: 0.2s all ease-in;
        
        &:hover{
            background-color: lighten($color: grey, $amount: 45);

        }

        .entry-description{
            font-size: 12px;
        }

    }

</style>