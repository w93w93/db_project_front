<template>
  <div class="imageWall">
    <div class="row">
      <div class="col-10">
        <div class="searchBar">
          <b-icon icon="search" class="icon"></b-icon>
          <b-form-input
            v-model="searchText"
            placeholder="Search"
            type="search"
            class="has-search"
          ></b-form-input>
        </div>
      </div>
      <div class="col-2">
        <div class="button">
          <b-button variant="outline-danger" pill @click="logout"
            ><b-icon icon="power"></b-icon> Logout</b-button
          >
        </div>
      </div>
    </div>
    <h4 v-if="items.length == 0">no images</h4>
    <vue-masonry-wall :items="items" :options="options" v-else>
      <template v-slot:default="{ item }">
        <div class="Item" @click="showImageInfo(item.id, item.image)">
          <img :src="item.image" />

          <!-- <div class="Content">
            <h5 class="text-ellipsis-1l">{{ item.title }}</h5>
            <p class="text-ellipsis-2l">{{ item.content }}</p>
          </div> -->
        </div>
      </template>
    </vue-masonry-wall>
    <b-modal
      id="imageInfo"
      ref="imageInfo"
      size="lg"
      title=""
      v-model="modalShow"
      hide-header
      hide-footer
      hide-header-close
      centered
    >
      <div class="row">
        <div class="col imgInfo">
          <img :src="img_url" />
          <div class="info">
            <span>上傳者: {{ uploader }}</span>
            <div class="icons">
              <span @click="clickLiked"
                ><b-icon icon="hand-thumbs-up" :class="likeClass"></b-icon>
                {{ like_count }}</span
              >
              <span @click="clickHeart"
                ><b-icon :icon="heartIcon"></b-icon> {{ favoriteText }}</span
              >
            </div>
          </div>
          <span>評分: {{ rating }}</span>
        </div>
        <div class="col imgComment">
          <h4>評論</h4>
          <h5 v-if="commentItems.length == 0">無評論</h5>
          <div v-else class="comment">
            <b-list-group>
              <b-list-group-item v-for="(v, i) in commentItems" :key="i">
                <h6 class="commentUser">{{ v.user }}</h6>
                <p>{{ v.content }}</p>
              </b-list-group-item>
            </b-list-group>
          </div>
          <div class="postComment">
            <b-form-rating
              v-model="rateValue"
              variant="warning"
              class="mb-2"
            ></b-form-rating>
            <b-form-textarea
              id="textarea-default"
              v-model="commentText"
              placeholder="寫下你的感想吧"
              rows="2"
              max-rows="3"
            ></b-form-textarea>
            <b-button variant="outline-primary" size="sm" @click="submit"
              >送出</b-button
            >
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script>
import VueMasonryWall from "vue-masonry-wall";
import {
  getImages,
  search,
  imgInfo,
  changeFavorite,
  changeLike,
  rate,
  comment,
} from "@/apis.js";
export default {
  name: "imageWall",
  components: { VueMasonryWall },
  data() {
    return {
      is_liked: false,
      likeClass: "unlike",
      is_favorite: false,
      imgId: null,
      favoriteText: "收藏",
      rateValue: 0,
      commentText: null,
      rating: 0,
      heartIcon: "heart",
      like_count: null,
      uploader: null,
      img_url: null,
      modalShow: false,
      searchText: null,
      options: {
        width: 300,
        padding: {
          2: 8,
          default: 12,
        },
      },
      commentItems: [],
      items: [
        // {
        //   title: "Sed non ante non cras amet",
        //   content:
        //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas non sagittis leo. Vestibulum sit amet metus nec neque dignissim dapibus.",
        //   image: "https://picsum.photos/id/1015/600/600",
        // },
        // {
        //   title: "Curabitur sit amet nunc",
        //   content:
        //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id mollis erat. Aliquam erat volutpat. Nunc erat lacus, rhoncus nec.",
        //   image: "https://picsum.photos/id/1019/600/700",
        // },
        // {
        //   title: "Proin pharetra, ante metus",
        //   content:
        //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ac diam ac ex efficitur posuere. Pellentesque cursus pellentesque risus, non.",
        //   image: "https://picsum.photos/id/1039/600/800",
        // },
        // {
        //   title: "Cras pharetra non enim a",
        //   content:
        //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi malesuada varius nibh, a malesuada nisi feugiat eget. Aenean convallis semper.",
        //   image: "https://picsum.photos/id/1042/600/300",
        // },
      ],
    };
  },
  watch: {
    searchText(val) {
      this.items = [];
      search({
        userId: this.$store.state.userId,
        content: val,
      })
        .then((response) => {
          for (let i of response.data) {
            this.items.push({
              id: i.id,
              image: `http://localhost:3001${i.url}`,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    is_favorite(val) {
      if (val) {
        this.heartIcon = "heart-fill";
        this.favoriteText = "已收藏";
      } else {
        this.heartIcon = "heart";
        this.favoriteText = "收藏";
      }
    },
    is_liked(val) {
      if (val) {
        this.likeClass = "like";
      } else {
        this.likeClass = "unlike";
      }
    },
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
    logout() {
      this.$store.commit("set", ["userId", null]);
      this.$router.push({ path: "/login" });
    },
    getImage() {
      getImages()
        .then((response) => {
          for (let i of response.data) {
            this.items.push({
              id: i.id,
              image: `http://localhost:3001${i.url}`,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    showImageInfo(img_id, url) {
      this.imgId = img_id;
      imgInfo({
        imgId: img_id,
        userId: this.$store.state.userId,
      })
        .then((response) => {
          this.commentItems = [];
          this.rateValue = 0;
          this.uploader = response.data.img.uploader.username;
          this.like_count = response.data.like_count;
          this.rating =
            response.data.rating != null ? response.data.rating.toFixed(1) : 0;
          this.is_favorite = response.data.is_favorite;
          this.is_liked = response.data.liked;
          // if (response.data.is_favorite) {
          //   this.heartIcon = "heart-fill";
          //   this.favoriteText = "已收藏";
          // }else{
          //   this.heartIcon = "heart";
          //   this.favoriteText = "收藏";
          // }
          for (let i of response.data.comment) {
            this.commentItems.push({
              content: i.content,
              user: i.username,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
      this.img_url = url;
      this.modalShow = true;
    },
    clickHeart() {
      let favorite = 0;
      if (this.is_favorite) {
        favorite = 0;
        this.is_favorite = false;
      } else {
        favorite = 1;
        this.is_favorite = true;
      }
      changeFavorite({
        userId: this.$store.state.userId,
        imgId: this.imgId,
        on: favorite,
      })
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    },
    clickLiked() {
      let liked = 0;
      if (this.is_liked) {
        liked = 0;
        this.is_liked = false;
      } else {
        liked = 1;
        this.is_liked = true;
      }

      changeLike({
        userId: this.$store.state.userId,
        imgId: this.imgId,
        on: liked,
      })
        .then(() => {
          imgInfo({
            imgId: this.imgId,
            userId: this.$store.state.userId,
          })
            .then((response) => {
              this.like_count = response.data.like_count;
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    submit() {
      if (this.rateValue != 0) {
        rate({
          userId: this.$store.state.userId,
          imgId: this.imgId,
          rate: this.rateValue,
        })
          .then(() => {
            imgInfo({
              imgId: this.imgId,
              userId: this.$store.state.userId,
            })
              .then((response) => {
                this.rateValue = 0;
                this.rating =
                  response.data.rating != null
                    ? response.data.rating.toFixed(1)
                    : 0;
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      }

      if (this.commentText) {
        comment({
          userId: this.$store.state.userId,
          imgId: this.imgId,
          content: this.commentText,
        })
          .then(() => {
            imgInfo({
              imgId: this.imgId,
              userId: this.$store.state.userId,
            })
              .then((response) => {
                this.commentItems = [];
                this.commentText = null;
                for (let i of response.data.comment) {
                  this.commentItems.push({
                    content: i.content,
                    user: i.username,
                  });
                }
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
  mounted() {
    this.getImage();
    console.log(this.$store.state.userId);
  },
};
</script>
