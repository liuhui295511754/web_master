
    let sexIdcardFilter = value => {
        if (!value) {
          return ''
        } else {
          let data = value.slice(0,10)
          return data
        }
    }
    export default {
        sexIdcardFilter
      }