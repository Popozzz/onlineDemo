<template>
  <div class="wrapper">
    <h3>纯CSS表格吸顶</h3>
    <el-radio-group v-model="mode" class="options">
      <el-radio label="normal">正常模式</el-radio>
      <el-radio label="fixedLeft">固定左边列</el-radio>
      <el-radio label="fixedRight">固定右边列</el-radio>
      <el-radio label="fixedLeftRight">固定左右列</el-radio>
    </el-radio-group>
    <el-table
      border
      :data="tableData"
      v-sticky-table-header="0"
    >
      <el-table-column label="日期" prop="date" min-width="150" :fixed="fixedLeft"></el-table-column>
      <el-table-column label="姓名" prop="name" width="120"></el-table-column>
      <el-table-column label="省份" prop="province" width="120"></el-table-column>
      <el-table-column label="市区" prop="city" width="120"></el-table-column>
      <el-table-column label="地址" prop="address" width="300"></el-table-column>
      <el-table-column label="邮编" prop="zip" min-width="120" :fixed="fixedRight"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "CSSFixedTopTable",
  components: {},
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
      mode: "normal",
    };
  },
  computed: {
    fixedLeft() {
      return /left/i.test(this.mode)? 'left' : null
    },
    fixedRight() {
      return /right/i.test(this.mode)? 'right' : null
    }
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
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