<template>
  <div class="main-container">
    <TheNav />

    <div class="main-right flex-column">
      <div class="main-view flex flex-column">
        <div class="flex main-content">
          <TheMenu />
          <TheContent />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheNav from "./components/layout/TheNav.vue";
import TheMenu from "./components/layout/TheMenu.vue";
import TheContent from "./components/layout/TheContent.vue";
export default {
  name: "App",
  components: {
    TheNav,
    TheMenu,
    TheContent,
  },
};
</script>

<style>
@import url("./css/main.css");
</style>
