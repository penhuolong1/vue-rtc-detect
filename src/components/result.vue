<template>
  <div>
    <el-table
      :data="resultList"
      stripe
      align="center"
      style="width: 100%">
      <el-table-column
        prop="project"
        align="center"
        label="检测项目">
      </el-table-column>
      <el-table-column
        prop="result"
        align="center"
        label="检测结果">
        <template slot-scope="scope">
          <span :class="scope.row.result == 1 ? '':'red'">{{scope.row.result == 1 ? '正常':'异常'}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },
  props: {
    resultList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  components: {

  },
  created () {

  },
  mounted () {

  },
  methods: {

  }
};
</script>

<style scoped>
.red{
  color: red;
}
</style>
