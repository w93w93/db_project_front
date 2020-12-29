<template>
  <div class="test">
    <div class="searchBar">
      <b-icon icon="search" class="icon"></b-icon>
      <b-form-input v-model="text" placeholder="Search" type="search" class="has-search"></b-form-input>
      
    </div>

    <vue-masonry-wall :items="items" :options="options" @append="append">
      <template v-slot:default="{ item }">
        <div class="Item">
          <img :src="item.image" />

          <div class="Content">
            <h5 class="text-ellipsis-1l">{{ item.title }}</h5>
            <p class="text-ellipsis-2l">{{ item.content }}</p>
          </div>
        </div>
      </template>
    </vue-masonry-wall>
  </div>
</template>
<script>
import VueMasonryWall from "vue-masonry-wall";
export default {
  name: "test",
  components: { VueMasonryWall },
  data() {
    return {
      text: null,
      options: {
        width: 300,
        padding: {
          2: 8,
          default: 12,
        },
      },
      items: [
        {
          title: "Sed non ante non cras amet",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas non sagittis leo. Vestibulum sit amet metus nec neque dignissim dapibus.",
          image: "https://picsum.photos/id/1015/600/600",
        },
        {
          title: "Curabitur sit amet nunc",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id mollis erat. Aliquam erat volutpat. Nunc erat lacus, rhoncus nec.",
          image: "https://picsum.photos/id/1019/600/700",
        },
        {
          title: "Proin pharetra, ante metus",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ac diam ac ex efficitur posuere. Pellentesque cursus pellentesque risus, non.",
          image: "https://picsum.photos/id/1039/600/800",
        },
        {
          title: "Cras pharetra non enim a",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi malesuada varius nibh, a malesuada nisi feugiat eget. Aenean convallis semper.",
          image: "https://picsum.photos/id/1042/600/300",
        },
      ],
    };
  },
  methods: {
    append() {
      for (let i = 0; i < 20; i++) {
        const id = Math.floor(Math.random() * 1000);
        const height = Math.floor(Math.random() * 200) + 600;
        this.items.push({
          title: `Appended ${i}`,
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas non sagittis leo. Vestibulum sit amet metus nec neque dignissim dapibus.",
          image: `https://picsum.photos/id/${id}/600/${height}`,
        });
      }
    },
  },
};
</script>
