import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

var hoursStore = {
  debug: true,
  state: {
    data: [],
    dataUrl: '',
    locations: [],
    sheets: [],
    spreadsheetKey: '1hK_4p-jx7dxW3RViRcBDSF_4En2QGgxx-Zy7zXkNIQg',
    status: 'Initializing',
    terms: [],
    termsUrl: ''
  },
  buildUrl (base, key, mode, format) {
    // This will build a URL from which Axios can load data.
    // base is the overall spreadsheet key: 1hK_4p-jx7dxW3RViRcBDSF_4En2QGgxx-Zy7zXkNIQg
    // key is the optional specific sheet key: oj9ljf6
    // mode is either 'index' or 'data'
    //   index is used when loading the list of other sheets.
    //   data is used when loading the contents of a specific sheet.
    // format is either 'tabletop' or something else (which means json)
    var url = 'https://spreadsheets.google.com/'
    switch (mode) {
      case 'data':
        url += 'feeds/list/' + base + '/' + key + '/public/values'
        break
      case 'index':
      default:
        url += 'feeds/worksheets/' + base + '/public/basic'
    }
    switch (format) {
      case 'tabletop':
        url += '?alt=json-in-script&callback=Tabletop.singleton.loadSheets'
        break
      case 'json':
      default:
        url += '?alt=json'
    }
    return url
  },
  extractSheetKey (url) {
    // This will take in a URL to a specific sheet within a Google spreadsheet, and
    // return the key for that sheet.
    // sample input:
    //   https://spreadsheets.google.com/feeds/worksheets/1hK_4p-jx7dxW3RViRcBDSF_4En2QGgxx-Zy7zXkNIQg/public/basic/oj9ljf6
    // sample output:
    //   oj9ljf6
    return url.slice(url.lastIndexOf('/') + 1, url.length)
  },
  findSemester (sheet) {
    return sheet.name === 'Semester Breakdown'
  },
  initialize () {
    // This performs the store initialization steps.
    // 1. Define the base URL for the spreadsheet we are harvesting.
    // 2. Load the index of sheets in that spreadsheet.
    // 3. parse that index of sheets, building an array of sheet names and data urls.
    this.setStatus('Initializing')

    // 1. Defining the base URL...
    this.state.dataUrl = this.buildUrl(this.state.spreadsheetKey, '', 'index', 'json')

    // 2. Load the index of sheets
    if (this.debug) console.log('loading data from ' + this.state.dataUrl)
    this.setStatus('Loading...')
    this.axios
      .get(this.state.dataUrl)
      .then(response => {
        this.setStatus('Inside then step')
        this.state.data = response.data.feed.entry
      })
      .finally(() => {
        if (this.debug) console.log('...response received')
        this.setStatus('Loaded')
        // 3. Parse the index of sheets, populating the array of sheet information
        this.state.sheets = this.parseData(this.state.data)
        // Populate list of terms.
        this.loadTerms()
      })
    // Further steps will be invoked inside the finally() step above.
    if (this.debug) console.log('...response sent, waiting for response')
    this.setStatus('Waiting...')
  },
  setStatus (newStatus) {
    if (this.debug) console.log('status set to ', newStatus)
    this.state.status = newStatus
  },
  loadTerms () {
    if (this.debug) console.log('looking for Terms sheet')
  },
  parseData (data) {
    // This parses the returned information about all sheets and extracts a few things:
    // 1. Where the term inforation is stored (the 'Semester Breakdown' sheet)
    // 2. Where the current base schedule is
    // 3. Where the exceptions sheet is
    // 4. URLs for each sheet's data
    this.setStatus('Parsing loaded data...')
    console.log(data.length)
    var i, name, key, url
    var result = []
    for (i = 0; i < data.length; i++) {
      name = data[i].content.$t
      key = this.extractSheetKey(data[i].id.$t)
      url = this.buildUrl(this.state.spreadsheetKey, key, 'data', 'json')
      result.push({ name: name, key: key, url: url })
    }
    return result
  }
}

new Vue({
  router,
  data: hoursStore,
  mounted () {
    console.log('App mounted')
    this.initialize()
  },
  render: h => h(App)
}).$mount('#app')
