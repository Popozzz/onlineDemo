<template>
  <div id="app">
    <div class="wrapper">
      <el-radio-group v-model="mode" class="options">
    <el-radio label="normal">正常模式</el-radio>
    <el-radio label="fixedLeft">固定左边列</el-radio>
    <el-radio label="fixedRight">固定右边列</el-radio>
    <el-radio label="fixedLeftRight">固定左右列</el-radio>
  </el-radio-group>
      <render-table
        v-if="mode === 'normal'"
        key="normal"
        :border="border"
        :fixedTop="true"
        :data="tableData"
        :columns="getColumns({ fixedLeft: false, fixedRight: false })"
      />
      <render-table
        v-if="mode === 'fixedLeft'"
        key="fixedLeft"
        :border="border"
        :fixedTop="true"
        :data="tableData"
        :columns="getColumns({ fixedLeft: true, fixedRight: false })"
      />
      <render-table
        v-if="mode === 'fixedRight'"
        key="fixedRight"
        :border="border"
        :fixedTop="true"
        :data="tableData"
        :columns="getColumns({ fixedLeft: false, fixedRight: true })"
      />
      <render-table
        v-if="mode === 'fixedLeftRight'"
        key="fixedLeftRight"
        :border="border"
        :fixedTop="true"
        :data="tableData"
        :columns="getColumns({ fixedLeft: true, fixedRight: true })"
      />
    </div>
  </div>
</template>

<script>
import RenderTable from "./components/RenderTable.vue";

export default {
  name: "App",
  components: {
    RenderTable,
  },
  data() {
    const tableData = new Array(100).fill(0).map((_, index) => {
      return {
        date: "2016-05-03",
        name: "王小虎",
        province: "上海",
        city: "普陀区",
        address: `上海市普陀区金沙江路 ${1 + index} 弄`,
        zip: 2000001 + index,
      };
    });
    return {
      tableData,
      mode: 'normal',
      checkList: ["border", "fixedRight"],
    };
  },
  computed: {
    border() {
      return this.checkList.includes("border");
    },
    fixedLeft() {
      return this.checkList.includes("fixedLeft");
    },
    fixedRight() {
      return this.checkList.includes("fixedRight");
    },
    columns() {
      return [
        {
          label: "日期",
          prop: "date",
          width: "150",
          fixed: this.fixedLeft,
        },
        {
          prop: "name",
          label: "姓名",
          width: "120",
        },
        {
          prop: "province",
          label: "省份",
          width: "120",
        },
        {
          prop: "city",
          label: "市区",
          width: "120",
        },
        {
          prop: "address",
          label: "地址",
          width: "300",
        },
        {
          prop: "zip",
          label: "邮编",
          width: "120",
          fixed: this.fixedRight ? "right" : null,
        },
      ];
    },
  },
  methods: {
    getColumns({ fixedLeft = false, fixedRight = false } = {}) {
      return [
        {
          label: "日期",
          prop: "date",
          width: "150",
          fixed: fixedLeft? 'left': null,
        },
        {
          prop: "name",
          label: "姓名",
          width: "120",
        },
        {
          prop: "province",
          label: "省份",
          width: "120",
        },
        {
          prop: "city",
          label: "市区",
          width: "120",
        },
        {
          prop: "address",
          label: "地址",
          width: "300",
        },
        {
          prop: "zip",
          label: "邮编",
          width: "120",
          fixed: fixedRight ? "right" : null,
        },
      ];
    }
  },
};
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
* {
  box-sizing: border-box;
}
.wrapper {
  width: 800px;
  margin: 0 auto;
  .options {
    width: 100%;
    margin: 30px 0;
    text-align: left;
  }
}
</style>
