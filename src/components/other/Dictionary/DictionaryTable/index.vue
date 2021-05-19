<template>
    <div class="common-table">
        <el-table :data="tableData" style="font-size:14px"  stripe border  >
            <el-table-column label="序号" type="index" width="85">
            </el-table-column>
            
            <el-table-column show-overflow-tooltip align="center" v-for="item in tableLabel" :key="item.prop" :label="item.label" >
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" >
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--分页-->
        <el-pagination   style="text-align: right;" layout="sizes,prev, pager, next,jumper , total" :total="config.total" :current-page.sync="config.pageNum" @current-change="changePage" @size-change="ChangeSize" :page-size="config.pageSize"></el-pagination>
    </div>
</template>

<script>

    export default {
        props: {
            tableData: Array,
            tableLabel: Array,
            config: Object
        },
        methods: {
            //更新
            handleEdit(row) {
                this.$emit('edit', row.id)
            },
            //删除
            handleDelete(row) {
                this.$emit('del',row.id)
            },
            //分页
            changePage(page) {
                this.$emit('changePage', page)
            },
            //页数
            ChangeSize(page){
                this.$emit('changeSize', page)
            }
        }
    }
</script>

