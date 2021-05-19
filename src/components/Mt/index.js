import MtBreadcrumb from './MtBreadcrumb' // 折叠面板
import MtButton from './MtButton'
import MtForm from './MtForm'
import MtFormItem from './MtFormItem'
import MtHamburger from './MtHamburger'
import MtInputNumber from './MtInputNumber'
import MtSvgIcon from './MtSvgIcon'
import MtTable from './MtTable'
import MtDialog from './MtDialog'
import MtUploadImage from './MtUploadImage'
import MtDataContent from './MtDataContent'
import MtEditContent from './MtEditContent'
import MtSearchContent from './MtSearchContent'
import MtUploadExcel from './MtUploadExcel'
const components = [
  MtBreadcrumb,
  MtButton,
  MtForm,
  MtFormItem,
  MtHamburger,
  MtInputNumber,
  MtSvgIcon,
  MtTable,
  MtDialog,
  MtUploadImage,
  MtDataContent,
  MtEditContent,
  MtSearchContent,
  MtUploadExcel
]

const install = function (Vue, opts = {}) {
  components.map(component => {
    Vue.component(component.name, component)
  })
}

/* 支持使用标签的方式引入 */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  MtBreadcrumb,
  MtButton,
  MtForm,
  MtFormItem,
  MtHamburger,
  MtInputNumber,
  MtSvgIcon,
  MtTable,
  MtDialog,
  MtUploadImage,
  MtDataContent,
  MtEditContent,
  MtSearchContent,
  MtUploadExcel
}
