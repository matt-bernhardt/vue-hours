import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

var hoursStore = {
  debug: true,
  state: {
    currentDate: new Date(),
    currentTerm: '',
    data: [],
    dataUrl: '',
    locations: [],
    sheets: [],
    spreadsheetKey: '1hK_4p-jx7dxW3RViRcBDSF_4En2QGgxx-Zy7zXkNIQg',
    status: 'Initializing',
    terms: [],
    termsData: {},
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
  findCurrentSemester (array) {
    return array.end >= this.state.currentDate
  },
  findSemesterSheet (sheet) {
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
    this.setStatus('Loading data from ' + this.state.dataUrl)
    this.axios
      .get(this.state.dataUrl)
      .then(response => {
        this.setStatus('Storing received data')
        this.state.data = response.data.feed.entry
      })
      .finally(() => {
        this.setStatus('Parsing stored data')
        // 3. Parse the index of sheets, populating the array of sheet information
        this.state.sheets = this.parseData(this.state.data)
        // Populate list of terms.
        this.loadTerms()
      })
    // Further steps will be invoked inside the finally() step above.
    if (this.debug) console.log('...response sent, waiting for response')
    this.setStatus('Waiting...')
  },
  lookupCurrentSemester (needleDate) {
    // This will return the term object for the semester containing a provided date.
    // Sort the terms sheet
    this.setStatus('Looking up semester for ' + needleDate)
    var result = 'Default Hours'
    result = this.state.terms.find(this.findCurrentSemester, this).name
    return result
  },
  setDate (newDate) {
    if (this.debug) console.log('setting "current" date to ' + newDate)
    this.state.currentDate = newDate
    this.setTerm(this.lookupCurrentSemester(this.state.currentDate))
  },
  setTerm (newTerm) {
    if (this.debug) console.log('setting currentTerm to ' + newTerm)
    this.state.currentTerm = newTerm
  },
  setStatus (newStatus) {
    if (this.debug) console.log('status set to ', newStatus)
    this.state.status = newStatus
  },
  loadTerms () {
    // This will populate the terms array inside the store.
    // 1. Identify the URL for the specific sheet that contains term information.
    // 2. Loads the contents of that sheet.
    // 3. Parses the response to populate the terms array.
    // 1. Identify the URL
    this.state.termsUrl = this.state.sheets.find(this.findSemesterSheet).url
    this.setStatus('Loading term information from ' + this.state.termsUrl)

    // 2. Loads data from that URL
    this.axios
      .get(this.state.termsUrl)
      .then(response => {
        this.state.termsData = response.data.feed.entry
      })
      .finally(() => {
        // Populate the array of terms from returned data.
        this.state.terms = this.parseTerms(this.state.termsData)
        // Look up current date (which then looks up the current semester)
        this.setDate(new Date())

        this.setStatus('Finished loading')
      })
  },
  parseData (data) {
    // This parses the returned information about all sheets and extracts a few things:
    // 1. Where the term inforation is stored (the 'Semester Breakdown' sheet)
    // 2. Where the current base schedule is
    // 3. Where the exceptions sheet is
    // 4. URLs for each sheet's data
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
  },
  parseTerms (data) {
    // This parses returned information about terms.
    this.setStatus('Parsing received terms information')
    var i, name, start, end
    var result = []
    for (i = 0; i < data.length; i++) {
      name = data[i].gsx$semestername.$t
      start = new Date(data[i].gsx$start.$t)
      end = new Date(data[i].gsx$end.$t)
      result.push({ name: name, start: start, end: end })
    }
    // Sort the array of terms for easier parsing and lookups later.
    this.setStatus('Sorting terms')
    result.sort(function (a, b) {
      return new Date(a.end) - new Date(b.end)
    })
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
