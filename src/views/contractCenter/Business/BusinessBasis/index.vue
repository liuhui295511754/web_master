<template>
  <div>
    <!-- 合同基本信息 -->
    <div>
      <p class="title-top">合同基本信息</p>
      <!-- 航司合同基本信息 -->
      <el-card v-if="airlinesBasic == '信息'">
        <mt-form
          ref="form"
          :col="2"
          :rules="rules"
          :model="formLabel"
          label-width="120px"
        >
          <mt-form-item label="合同编号" prop="code" :spans="12">
            <el-input
              v-model="formLabel.code"
              placeholder="请选择合同编号"
            ></el-input>
          </mt-form-item>
          <mt-form-item label="合同名称" prop="name" :spans="12">
            <el-input
              v-model="formLabel.name"
              placeholder="请选择合同名称"
            ></el-input>
          </mt-form-item>

          <mt-form-item
            label="航司名称"
            prop="airlineName"
            :spans="12"
            class="label-left"
            clearable
          >
            <el-select
              v-model="formLabel.airlineName"
              placeholder="请选择航空公司/航空公司代码"
              style="width:100%"
              @change="airlines"
            >
              <el-input type="text" placeholder="请输入" v-model="dropDownValue">
                <el-button slot="append" icon="el-icon-search" plain @click="searchIcon"></el-button>
              </el-input>
                <!-- <el-option label="" value=''></el-option> -->
              <el-option v-for="item in selectList" :key="item.id" :label="item.name" :value="item.id"></el-option>

                <!-- <el-input
                  type="text"
                  placeholder="请输入"
                  v-model="dropDownValue"
                  clearable

                >
                <el-button slot="append" icon="el-icon-search" plain @click="searchIcon"></el-button>
                </el-input>
                <el-option label="" value=''></el-option>
              <el-option v-for="item in selectList"  :value="item" :label="item.name" :key="item.id"></el-option> -->

            </el-select>
          </mt-form-item>

          <mt-form-item label="承租方名称" prop="contractName" :spans="12">
            <el-input
              v-model="formLabel.contractName"
              placeholder="请选择承租方名称"
            ></el-input>
          </mt-form-item>

          <mt-form-item label="合同有效期" prop="settlementCycle" :spans="12">
            <el-date-picker
              v-model="formLabel.settlementCycle"
              type="datetimerange"
              start-placeholder="请选择开始日期"
              end-placeholder="请选择结束日期"
              :default-time="['12:00:00']"
              style="width:100%"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
          </mt-form-item>
          <mt-form-item label="备注" prop="remark" :spans="12">
            <el-input v-model="formLabel.remark"></el-input>
          </mt-form-item>

          <mt-form-item label="结算方式" :spans="24">
            <el-input
              type="textarea"
              v-model="formLabel.settleWay"
              :rows="3"
              resize="none"
              placeholder="请输入内容 "
            ></el-input>
          </mt-form-item>

          <mt-form-item
            label="是否自动延顺"
            prop="mandatory"
            :spans="12"
            class="label-left"
          >
            <el-switch v-model.number="formLabel.postponeStatus"
                       :active-value="1"
                       :inactive-value="0">
            </el-switch>
          </mt-form-item>
          <mt-form-item
            label="是否清算"
            prop="mandatory"
            :spans="12"
            class="label-left"
          >
            <el-switch v-model.number="formLabel.clearStatus"
                       :active-value="1"
                       :inactive-value="0">
            </el-switch>
          </mt-form-item>

          <mt-form-item
            label="合同包含服务"
            :spans="24"
            class="label-left"
          >
            <el-checkbox-group v-model="formLabel.list" @change="changeAirlineList">
              <el-checkbox
                v-for="item in airlineServices"
                :label="item.serviceId"
                :key="item.serviceId"
              >{{ item.serviceName }}
              </el-checkbox>
            </el-checkbox-group>
          </mt-form-item>
          <mt-form-item label="合同扫描件上传" :spans="12">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </mt-form-item>
        </mt-form>
      </el-card>

      <!-- 通用合同信息 -->
      <el-form   :model="formLabel" ref="form" label-width="120px"  class="demo-form-inline" v-else>
        <el-row>
          <el-col :span="12"  v-for="item in searchLable" :key="item.model" >
              <el-form-item :label="item.label" :prop="item.prop" :rules="[
                { required: true, message: '必填项不能为空', trigger: ['blur','change'] }]" >
                <el-input v-model="formLabel[item.model]" :placeholder="'请输入' + item.label" v-if="item.type==='input'"></el-input>
                  <el-select v-model="formLabel[item.model]" :placeholder="'请选择' + item.label" style="width:100%" v-if="item.type === 'select'">
                    <el-option v-for="item in item.opts" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>

                  <el-select v-model.trim="formLabel[item.model]" :placeholder="'请选择' + item.label" style="width:100%"
                    v-if="item.type === 'receptionUnitName'"   @change="receptionUnit">
                  <el-input
                    type="text"
                    placeholder="请输入"
                    v-model="dropDownValue"
                  >
                    <el-button slot="append" icon="el-icon-search" plain @click="searchIconAfter"></el-button>
                  </el-input>
                    <!-- <el-option label="" value=''></el-option> -->
                    <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                <el-switch v-model="formLabel[item.model]" v-if="item.type === 'switch'"></el-switch>
                <el-date-picker v-model="formLabel[item.model]" type="datetimerange"  align="right" style="width:100%" start-placeholder="请选择开始日期" end-placeholder="请选择结束日期" v-if="item.type === 'datetime'" value-format="yyyy-MM-dd HH:mm:ss"> </el-date-picker>
              </el-form-item>
            </el-col>

          <div v-if="airlinesBasic == '采购'">
            <el-col :span="24">
              <el-form-item label="结算方式">
                <el-input
                  type="textarea"
                  v-model="formLabel.settleWay"
                  :rows="3"
                  resize="none"
                  placeholder="请输入内容 "
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="合同内容" >
            <el-input
              type="textarea"
              v-model="formLabel.content"
              :rows="3"
              resize="none"
              placeholder="请输入内容 "
            ></el-input>
          </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="合同扫描件上传" >
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
            </el-col>
          </div>

          <!-- 商旅合同(后结算)-->
          <div v-if="airlinesBasic == '后结算'">
            <el-col :span="24">
              <el-form-item label="结算方式">
                <el-input
                  type="textarea"
                  v-model="formLabel.settleWay"
                  :rows="3"
                  resize="none"
                  placeholder="请输入内容 "
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item
                label="合同包含服务"
                prop="contractAirline"
                :spans="24"
                class="label-left"
                required
              >
                <el-checkbox-group v-model="formLabel.list" @change="changeList">
                  <el-checkbox
                    v-for="item in services"
                    :label="item.serviceId"
                    :key="item.serviceId"
                  >
                    {{ item.serviceName }}
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col :span="24" >
            <el-form-item label="合同扫描件上传" >
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>

            <div v-for="(item, index) in formLabel.contractAirline" :key="index">
              <!-- 嘉宾服务 -->
              <el-card v-if="item.serviceId==203612545685568" >
                <div slot="header" class="clearfix" >{{ item.serviceName }}</div>
                <el-alert
                  title="提示：接待人数指的是按照结算周期累计接待人数。例如结算周期为3个月，则指的是累计3个月的接待人数梯度价格！"
                  type="success"
                  :closable="false"
                  center>
                </el-alert>
                <mt-form-item label="服务内容" :spans="24" >
                  <el-input
                  type="textarea"
                  v-model="item.contents"
                  class="resizeNone"
                  :rows="3"
                  resize="none"
                  placeholder="请输入内容 "
                ></el-input>
                </mt-form-item>

                <mt-form-item label="收费模式" :spans="12">
                  <el-radio-group v-model="item.tollModel">
                    <el-radio :label=0>隔离区内外统一收费</el-radio>
                    <el-radio :label=1>隔离区内外分开收费</el-radio>
                  </el-radio-group>
                </mt-form-item>
                <business-guest
                  :formLabel="formLabel"
                  :tableData="formLabel.serviceGuests"
                  :tollModel='item.tollModel'
                ></business-guest>
              </el-card>
              <!-- 全流程服务 -->
              <el-card  v-if="item.serviceId==203612594446400">
                <div slot="header" class="clearfix" >{{ item.serviceName }}</div>
                <mt-form-item label="服务内容" :spans="24" >
                  <el-input
                  type="textarea"
                  v-model="item.contents"
                  class="resizeNone"
                  :rows="3"
                  resize="none"
                  placeholder="请输入内容 "
                ></el-input>
                </mt-form-item>
                 <business-process
                  :formLabel="formLabel"
                  :tableData="formLabel.serviceProcesses"
                 ></business-process>
              </el-card>
              <!-- 快速安检服务 -->
              <el-card  v-if="item.serviceId==203612633106496">
                <div slot="header" class="clearfix" >{{ item.serviceName }}</div>
                <mt-form-item label="服务内容" :spans="24">
                  <el-input
                  type="textarea"
                  v-model="item.contents"
                  class="resizeNone"
                  :rows="3"
                  resize="none"
                  placeholder="请输入内容 "
                ></el-input>
                </mt-form-item>
                  <business-security
                    :formLabel="formLabel"
                    :tableData="formLabel.serviceSecurities"
                  ></business-security>
              </el-card>
              <!-- 迎送宾服务 -->
              <el-card  v-if="item.serviceId==203612660973632">
                <div slot="header" class="clearfix">{{ item.serviceName }}</div>
                <mt-form-item label="服务内容" :spans="24" >
                  <el-input
                  type="textarea"
                  v-model="item.contents"
                  class="resizeNone"
                  :rows="3"
                  resize="none"
                  placeholder="请输入内容 "
                ></el-input>
                </mt-form-item>
                <mt-form-item label="收费标准" :spans="12">
                  <el-input v-model="item.fee"></el-input>
                </mt-form-item>
                <el-col :span="12">
                  <div class="pricemarign">元/人</div>
                </el-col>
              </el-card>
              <!-- 包厅服务 -->
              <el-card  v-if="item.serviceId==203612694816832">
                <div slot="header" class="clearfix" >{{ item.serviceName }}</div>
                <mt-form-item label="服务内容" :spans="24">
                  <el-input
                  type="textarea"
                  v-model="item.contents"
                  class="resizeNone"
                  :rows="3"
                  resize="none"
                  placeholder="请输入内容 "
                ></el-input>
                </mt-form-item>
                 <business-service
                   :formLabel="formLabel"
                   :tableData="formLabel.serviceHalls"
                   :dialogViewContract="dialogViewContract"
                 ></business-service>
              </el-card>
              <!-- 冠名厅 -->
              <el-card  v-if="item.serviceId==203612727550016">
                <div slot="header" class="clearfix" >{{ item.serviceName }}</div>
                  <mt-form-item label="服务内容" :spans="24">
                    <el-input
                      type="textarea"
                      v-model="item.contents"
                      class="resizeNone"
                      :rows="3"
                      resize="none"
                      placeholder="请输入内容 "
                    ></el-input>
                  </mt-form-item>
                  <business-named :formLabel="formLabel"
                                  :contractAfterView='contractAfterView'>
                  </business-named>
              </el-card>
            </div>
          </div >
        </el-row>
          <el-form-item><slot></slot></el-form-item>
      </el-form>

      <el-card v-if="airlinesBasic == '预储值'">
        <mt-form
          ref="form"
          :col="2"
          :rules="rules"
          :model="formLabel"
          label-width="120px"
        >
          <mt-form-item label="合同编号" prop="code" :spans="12">
            <el-input v-model="formLabel.code" placeholder="请选择客户合同编号"></el-input>
          </mt-form-item>
          <mt-form-item label="合同名称" prop="name" :spans="12">
            <el-input v-model="formLabel.name" placeholder="请选择合同名称"></el-input>
          </mt-form-item>

          <mt-form-item label="客户名称" prop="receptionUnitName" :spans="12">
             <el-select
              v-model="formLabel.receptionUnitName"
              placeholder="请选择客户(商旅客户，下拉可搜索)"
              style="width:100%"
              @change="receptionUnit"
            >
                <el-input
                  type="text"
                  placeholder="请输入"
                  v-model="dropDownValue"
                >
                <el-button slot="append" icon="el-icon-search" plain @click="searchIconSave"></el-button>
                </el-input>
<!--                <el-option label="" value=''></el-option>-->
              <el-option v-for="item in options"  :value="item.id" :label="item.name" :key="item.id"></el-option>
            </el-select>
          </mt-form-item>


         <mt-form-item label="合同有效期" prop="settlementCycle" :spans="12">
            <el-date-picker
              v-model="formLabel.settlementCycle"
              type="datetimerange"
              start-placeholder="请选择开始日期"
              end-placeholder="请选择结束日期"
              style="width:100%"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
          </mt-form-item>

          <mt-form-item label="结算方式" :spans="24">
            <el-input
              type="textarea"
              v-model="formLabel.settleWay"
              :rows="3"
              resize="none"
              placeholder="请输入内容 "
            ></el-input>
          </mt-form-item>
          <mt-form-item label="储值金额" prop="storedMoney" :spans="12">
            <el-input v-model="formLabel.storedMoney"
                      onkeyup="this.value= this.value.match(/\d+(\.\d{0,4})?/) ? this.value.match(/\d+(\.\d{0,4})?/)[0] : ''"
                      placeholder="储值金额">
            </el-input>
          </mt-form-item>
          <mt-form-item label="预警金额" prop="warningMoney" :spans="12">
            <el-input v-model="formLabel.warningMoney"
                      onkeyup="this.value= this.value.match(/\d+(\.\d{0,4})?/) ? this.value.match(/\d+(\.\d{0,4})?/)[0] : ''"
                      placeholder="人民币">
            </el-input>
          </mt-form-item>

        <mt-form-item
            label="合同包含服务"
            prop="contractAirline"
            :spans="24"
            class="label-left"
          >
            <el-checkbox-group v-model="formLabel.list" @change="changeSaveList">
             <el-checkbox
              v-for="item in packag"
              :label="item.serviceId"
              :key="item.serviceId"
              >{{ item.serviceName }}
             </el-checkbox>
             <el-checkbox label="套餐服务">
             </el-checkbox>
            </el-checkbox-group>
      </mt-form-item>


          <mt-form-item label="到期平账" :spans="24" prop="settleType" class="label-left">
            <el-col :span="21">
              <el-radio-group v-model.number="formLabel.settleType">
                <el-radio :label="0">人工平账</el-radio>
                <el-radio :label="1">自动平账</el-radio>
              </el-radio-group>
            </el-col>
          </mt-form-item>
          <mt-form-item label="合同扫描件上传" :spans="24">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </mt-form-item>

           <!--预储值-合同包含服务-->
           <div v-for="(item, index) in formLabel.contractAirline" :key="index">
              <!--套餐服务-->
              <el-card v-if="item.serviceId==203612694816832">
               <div slot="header" class="clearfix" >
                 {{ 套餐服务 }}
               </div>
               <mt-form-item label="服务内容" :spans="24" >
                 <el-input
                   type="textarea"
                   v-model="item.contents"
                   class="resizeNone"
                   :rows="3"
                   resize="none"
                   placeholder="请输入内容 "
                 ></el-input>
               </mt-form-item>

               <mt-form-item label="套餐名称" :spans="12">
                 <el-select
                   v-model="formLabel.packageName"
                   placeholder="套餐一"
                   style="width:100%"
                 >
                   <el-option label="套餐一" value="套餐一"></el-option>
                   <el-option label="套餐二" value="套餐二"></el-option>
                   <el-option label="套餐一" value="套餐一"></el-option>
                 </el-select>
               </mt-form-item>
               <mt-form-item label="收费标准" :spans="12">
                 <el-input v-model="formLabel.fee"></el-input>
               </mt-form-item>
             </el-card>
              <!--包厅服务-->
              <el-card  v-if="item.serviceId==203612694816832">
                <div slot="header" class="clearfix" >{{ item.serviceName }}</div>
                <mt-form-item label="服务内容" :spans="24">
                <el-input
                  type="textarea"
                  v-model="item.contents"
                  class="resizeNone"
                  :rows="3"
                  resize="none"
                  placeholder="请输入内容 "
                ></el-input>
                </mt-form-item>
                <business-service
                :formLabel="formLabel"
                :tableData="formLabel.serviceHalls"
                :dialogViewContract="dialogViewContract"
                ></business-service>
              </el-card>

            </div>
        </mt-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import {airlineList} from '@/api/airlines'
import {getReception, getReceptionView, pubTableList, receptionListType} from '@/api/businessAfter'
import {SchedulingSonList} from '@/api/businessAfter'
import BusinessGuest from "../BusinessGuest";
import BusinessProcess from "../BusinessProcess";
import BusinessSecurity from "../BusinessSecurity";
import BusinessReception from "../BusinessReception";
import BusinessService from "../BusinessService";
import BusinessNamed from "../BusinessNamed";
import BusinessContract from "../BusinessContract";
import { packageList } from '@/api/businessSave'


export default {
  components:{
    BusinessGuest,
    BusinessProcess,
    BusinessSecurity,
    BusinessReception,
    BusinessService,
    BusinessNamed,
    BusinessContract
  },
  data() {
    return {
      type: "商旅客户(后结算)",
      selectList:[],
      receptionUnitAll:[],
      services:[],
      packag:[],
      airlineServices: [],
      dropDownValue: "",
      radio: "1",
      imageUrl: "",
      options:[],
      airlinesall:[],
      pageNum: 1,
      pageSize: 10,
      rules: {
        mandatory: [
          { required: true, message: "必填项不能为空", trigger: "blur" }
        ],
        code: {
          required: true,
          message: "请输入合同编号",
          trigger: "blur",
        },
        name: {
          required: true,
          message: "请输入名称",
          trigger: "blur",
        },
        airlineName: {
          required: true,
          message: "请选择航空公司/航空公司代码",
          trigger: "blur",
        },
        contractName: {
          required: true,
          message: "请输入承租方名称",
          trigger: "blur",
        },
        settlementCycle: {
          required: true,
          message: "请选择开始日期-请选择结束日期",
          trigger: "blur",
        },
        remark: {
          required: true,
          message: "请输入备注",
          trigger: "blur",
        },
        storedMoney: {
          required: true,
          message: "储蓄金额",
          trigger: "blur",
        },
        contractAirline: {
          required: true,
          message: "合同包含服务",
          trigger: "blur",
        },
        settleType: {
          required: true,
          message: "到期平账",
          trigger: "blur",
        },
        receptionUnitName: {
          required: true,
          message: "客户名称",
          trigger: "blur",
        }
      },
    };
  },
  props: {
    formLabel: {
      type: Object,
      required: true
    },
    contractAfter: {
      type: Boolean,
      required: true
    },
    airlinesBasic: {
      type: String,
      required: true
    },
    searchLable:{
      type:Array,
      required:true
    },
    dialogViewContract: {
      type: Boolean,
      required: true
    },
     contractAfterView:{
      type:Boolean,
      required:true
    },
    service:{
      type:Array,
      required:true
    }
  },
  created() {
    this.AfterServeData()
    this.beforeServeData()
    // this.beforePackageData()
    this.airlineServeData()
    this.searchIcon()
    // this.searchIconAfter()
    this.pubTableData()
    this.preTableData()
  },
  methods: {
    changeList(val){
      this.formLabel.contractAirline = [];
      this.services.forEach(element=>{
      if(element.serviceName == '包厅服务'){
        this.formLabel.serviceHalls.forEach(i=>{
          i.serviceId =element.serviceId
        })
      }else if(element.serviceName == '嘉宾服务'){
        this.formLabel.serviceGuests = [
          {
            serviceId:element.serviceId
          }
        ]
      }else if (element.serviceName == '冠名厅') {
        this.formLabel.serviceNamings.forEach(i => {
          i.serviceId = element.serviceId
        })
      }else if (element.serviceName == '全流程服务') {
        this.formLabel.serviceProcesses = [
          {
            serviceId:element.serviceId
          }
        ]
      }else if (element.serviceName == '快速安检服务') {
        this.formLabel.serviceSecurities = [
          {
            serviceId:element.serviceId
          }
        ]
      }
        val.forEach(item=>{
          if(element.serviceId == item){
            this.formLabel.contractAirline.push(element)
          }
        })
      })
      console.log(this.formLabel.serviceHalls)

    },

    //changeSaveList(预储值)
    changeSaveList(val) {
      this.formLabel.contractAirline = [];
      this.packag.forEach(element=>{
        if(element.serviceName == '包厅服务'){
          this.formLabel.serviceHalls.forEach(i=>{
            i.serviceId =element.serviceId
          })
        }
        val.forEach(item=>{
          if(element.serviceId == item){
            this.formLabel.contractAirline.push(element)
          }
        })
      })
    },
    //changeAirlineList(航司合同)
    changeAirlineList(val) {
      this.formLabel.contractAirline = [];
      this.airlineServices.forEach(element => {
        if(element.serviceName == '嘉宾服务'){
          this.formLabel.serviceGuests = [
            {
              serviceId:element.serviceId
            }
          ]
        } else if(element.serviceName == '专人接机'){

        }
        val.forEach(item=>{
          if(element.serviceId == item){
            this.formLabel.contractAirline.push(element)
          }
        })
      })
    },




    //航空公司下拉
   // async searchIcon(){
   //   console.log(this.dropDownValue);
   //   const res = await getReception({name: this.dropDownValue,pageNum: 1, pageSize: 10});
   //   console.log(res);
   //   if(res.code == 1) {
   //     this.selectList = res.data.list[0]
   //     console.log(this.selectList);
   //   }else {
   //     this.$message.error(res.message);
   //   }
   //  },

    //航空公司下拉 搜索
    async searchIcon(){
      const res = await airlineList(this.dropDownValue)
      console.log(res);
      this.selectList = res.data
    },

    //商旅合同后结算下拉 搜索
    async searchIconAfter() {
      // const res = await receptionListType(this.dropDownValue)
      // console.log(res);
      // this.options = res.data
      // console.log(this.options);
    },
    //商旅合同预储值下拉 搜索
    async searchIconSave() {

    },

    //后结算 客户名称下拉
    async pubTableData(){
      const res = await receptionListType({type:0})
      console.log(res);
      this.options = res.data
    },
    //预储值 客户名称下拉
    async preTableData(){
      const res = await receptionListType({type:1})
      console.log(res);
      this.options = res.data
    },
    //后结算 获取下拉框的id 以及 name
    receptionUnit(val){
      if(val){
        let receptionUnitAll = this.options.filter((item)=>{
		  	return item.id === val
      });
        console.log(val);
        console.log(receptionUnitAll);
        //把值赋给要传给后台的表单对象中
		  this.formLabel.receptionUnitName = receptionUnitAll[0].name;
		  this.formLabel.receptionUnitId = receptionUnitAll[0].id;
        console.log(this.formLabel.receptionUnitName);
        console.log(this.formLabel.receptionUnitId);
      }
    },
    //航司合同 获取下拉框的id 以及 name
    airlines(val){
      if(val){
        console.log(val);
        let airlinesall = this.selectList.filter((item)=>{
          return item.id === val
      });
       //把值赋给要传给后台的表单对象中
		  this.formLabel.airlineName = airlinesall[0].name;
		  this.formLabel.airlineId = airlinesall[0].id;
      }
    },
    //商旅合同(后结算) 服务内容
    async AfterServeData(){
    const res = await SchedulingSonList({type: "商旅客户(后结算)"});
      console.log(res);
      this.services = [];
      let array = res.data;
      array.forEach(item => {
        this.services.push({
          serviceId: item.id,
          serviceName: item.name,
          contents: "",
          tollModel: null,
          freeStatus: null,
          fee: null,
          updator: '2'
        });
      });
    },
    //商旅合同(预储值) 服务内容
    async beforeServeData(){
    const res = await SchedulingSonList({type: "商旅客户(预储值)"});
      console.log(res);
      this.packag = [];
      let array = res.data;
      array.forEach(item => {
        this.packag.push({
          serviceId: item.id,
          serviceName: item.name,
          contents:"",
          updator:'2'
        });
      });
    },

    //商旅合同(预储值) 套餐服务
    // async beforePackageData() {
    //   const res = await packageList({ pageNum: 1,pageSize: 10,});
    //   console.log(res)
    //   this.packag = [];
    //   let array = res.data;
    //   array.forEach(item => {
    //     this.packag.push({
    //       serviceId: item.id,
    //       serviceName: item.name,
    //       contents: item.remark,
    //       state: item.state,
    //       packages: item.packages
    //     })
    //   })
    // },


    //航司合同 服务内容
    async airlineServeData(){
      const res = await SchedulingSonList({type: "航司客户"});
      console.log(res);
      this.airlineServices = [];
      let array = res.data;
      array.forEach(item => {
        this.airlineServices.push({
          serviceId: item.id,
          serviceName: item.name,
          contents:"",
          updator:'2'
        });
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    dropDownSearch() {},
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  },
  computed:{

  }
};
</script>

<style lang="scss" scoped>
.el-card {
  margin-bottom: 15px;
}
.title-top {
  text-align: left;
  color: black;
  font-weight: bold;
}
.avatar-uploader {
  width: 178px;
  border: 1px solid #838383;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 88px;
  height: 78px;
  line-height: 78px;
  margin-left: 34px;
}
.label-left {
  text-align: left;
}
.serveadd{
  text-align: right;

}

</style>
