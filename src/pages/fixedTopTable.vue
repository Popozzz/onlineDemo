<template>
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
      border
      :fixedTop="true"
      :data="tableData"
      :columns="getColumns({ fixedLeft: false, fixedRight: false })"
    />
    <render-table
      v-if="mode === 'fixedLeft'"
      key="fixedLeft"
      border
      :fixedTop="true"
      :data="tableData"
      :default-sort = "{prop: 'date', order: 'descending'}"
      :columns="getColumns({ fixedLeft: true, fixedRight: false })"
    />
    <render-table
      v-if="mode === 'fixedRight'"
      key="fixedRight"
      border
      :fixedTop="true"
      :data="tableData"
      :columns="getColumns({ fixedLeft: false, fixedRight: true })"
    />
    <render-table
      v-if="mode === 'fixedLeftRight'"
      key="fixedLeftRight"
      border
      :fixedTop="true"
      :data="tableData"
      :columns="getColumns({ fixedLeft: true, fixedRight: true })"
    />
  </div>
</template>

<script>
import RenderTable from "@/components/RenderTable.vue";
export default {
  name: "FixedTopTable",
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
      mode: "normal",
    };
  },
  computed: {},
  methods: {
    getColumns({ fixedLeft = false, fixedRight = false } = {}) {
      return [
        {
          label: "日期",
          prop: "date",
          width: "150",
          sortable: true,
          fixed: fixedLeft ? "left" : null,
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
    },
  },
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