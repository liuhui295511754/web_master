<!-- 弹出层调用示例 -->
<!-- <mt-dialog v-model="visible" :confirmBtn="confirmBtn" title="新增">
      <template slot="dialog-body">
        内容区域
      </template>
    </-dialog> -->
<!-- 提交回调 confirmBtn-->
<!-- 标题	title-->
<!-- 显示   visible -->

<!-- 数字输入框调用示例 -->
<!-- 保留小数 -->
<!-- <mt-input-number type="decimal" v-model="value" :precision="2" placeholder="请输入金额"></mt-input-number> -->
<!-- 整数 -->
<!-- <mt-input-number type="number" v-model="value"  placeholder="请输入金额"></mt-input-number> -->

<!-- 上传文件调用案例 -->
<!-- <mt-upload-image type="image" accept=".jpg" action="https://jsonplaceholder.typicode.com/posts/" @success="upLoadSuccess" @remove="removeFile" >
</mt-upload-image> -->

<!-- 文件类型  type  可传：file/image -->
<!-- 上传地址 action-->
<!-- 文件最多上传个数 limit -->
<!-- 文件大小限制 formMaxSize(可传数字，默认10) -->
<!-- 上传时附带的额外参数 data -->
 <!-- 设置上传的请求头部 headers -->
<!-- 成功回调 success -->
<!-- 删除回调 remove -->
<!-- 失败回调 fail -->

<!-- 表格调用案例 -->
<!-- <mt-table :data="tableData" :total="tableData.length">
      <el-table-column v-for="(item, index) in cols"  :key="index" :headerStyle="{background:'#eef1f6',color:'#606266'}"  :label="item.label" :prop="item.prop"></el-table-column>
</mt-table> -->

<!-- 表格数据源 data 	-->
<!-- 表格总数	total  -->
<!-- 当前页 currentPage -->
<!-- 每页显示多少条 pageSize -->
<!-- 表格大小 size  可传：medium / small / mini -->
<!-- 行的样式  rowStyle  可传对象和函数-->
<!-- 单元格样式  cellStyle  可传对象和函数-->
<!-- 表头样式headerStyle  可传对象和函数-->

<!-- 点击某个单元格 cell-click -->
<!-- 点击某一行 rowClick -->
<!--  每页条数发生变化 size-change -->
<!-- 当前页发生变化  currentChange -->

<!-- 按钮 -->
<!-- <mt-button txt="新增"></mt-button> -->
<!-- 按钮内文字 txt，其余参数和element 一样-->

<!-- 表单 -->

<!-- :col="3"控制一行放多少列 如果不写，默认是 3 列 -->
<!-- <mt-form :col="3" :model="form" :rules="rules" ref="ruleForm" label-width="100px"> -->
<!-- :spans="16"是控制单个 input 框占据的列数 如果不写，默认是 8 行 -->
<!-- <mt-form-item label="姓名" prop="name"  :spans="16">
<el-input v-model="form.name"></el-input>
</mt-form-item>
<mt-form-item label="密码" prop="password">
<el-input v-model="form.password" show-password></el-input>
</mt-form-item>
<mt-form-item label="确认密码" prop="check">
<el-input v-model="form.check" show-password></el-input>
</mt-form-item>
</mt-form> -->

<!-- col	设置表格里面子元素一行多列，默认一行三列	1/2/3	1 -->
<!-- model	表单数据对象	—	object -->
<!-- rules	表单验证规则	—	object -->
<!-- label-width	表单域标签的宽度，例如 ‘50px’。作为 Form 直接子元素的 form-item 会继承该值。	自定义	100px -->
<!-- size	用于控制该表单内组件的尺寸	medium / small / mini	string -->
<!-- ref	表单DOM元素,获取表单使用this.$refs[formName].$children[0]. -->

<!-- mt-form-item 表格属性 -->
<!-- spans	设置input框一行占据的列数	8/16/24 -->
<!-- label	input框的文字说明	 -->
<!-- prop	表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的	传入 Form 组件的 model 中的字段	 -->
