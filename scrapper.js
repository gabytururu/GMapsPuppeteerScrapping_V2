const puppeteer = require('puppeteer');
const autoScroll = require('./helperFunctions')

(async()=>{
    let baseUrl = 'https://www.google.com/maps/search/atracci%C3%B3n+tur%C3%ADstica+en+Chiapas+OR+cascadas+en+Chiapas+OR+parque+nacional+en+chiapas/@17.2574412,-92.2388338,11z/data=!4m2!2m1!6e1?entry=ttu'
    // let totalResults = 120
    let searchTerm = 'atracción turística en Chiapas OR cascadas en Chiapas OR parque nacional en chiapas'
    // let typeOfPlace = 'Parque Ecoturístico'
    // let corePlace = 'chiapas'
    // let slug = 'parques-ecoturisticos-chiapas'
    // let fileName = 'parquesEcoturismoChiapas.xlsx'
    // let sheetName = 'fullDB_CHIS'
    // let targetWebsite = 'rumbonaturaleza.com'

    const browser = await puppeteer.launch({headless:false})
    const page = await browser.newPage()
    await page.setViewport({width:1300, height:900})
    await page.goto(`${baseUrl}`, {waitUntil: 'domcontentloaded'})

    //autoScroll(page, searchTerm)
    //await browser.close()
})()