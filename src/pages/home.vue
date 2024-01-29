<template>
  <div class="wrapper">
    <h1>online Demo</h1>
    <ul>
      <li>
        <router-link to="/fixedTopTable">
          <el-link type="primary">表格吸顶</el-link>
        </router-link>
      </li>
      <li>
        <router-link to="/cssFixedTopTable">
          <el-link type="primary">纯CSS表格吸顶</el-link>
        </router-link>
      </li>
      <li>
        <router-link to="/keywordHighlight">
          <el-link type="primary">关键字高亮</el-link>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
</style>