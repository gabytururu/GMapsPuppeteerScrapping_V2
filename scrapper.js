const puppeteer = require('puppeteer');
const {autoScroll, titleCase, lowerCase, onlyPhoneMissing,onlyWebMissing, bothPhoneAndWebMissing, getPlaceDataInfo} = require('./helperFunctions');


(async()=>{
    let baseUrl = 'https://www.google.com.mx/maps/search/parques+ecoturisticos+en+baja+california+norte+OR+centros+ecoturisticos+en+baja+california+norte/@30.5249372,-115.8805746,7.5z/data=!4m2!2m1!6e1?entry=ttu'
    let totalResults = 3
    let searchTerm = 'parques ecoturisticos en baja california norte OR centros ecoturisticos en baja california norte'
    let typeOfPlace = 'Parque Ecoturístico'
    let corePlace = 'Baja California Norte'
    let slug = 'parques-ecoturisticos-baja-california-norte'
    let fileName = 'parquesEcoturismoBajaCaliforniaNorte.xlsx'
    let sheetName = 'fullDB_BCN'
    let targetWebsite = 'rumbonaturaleza.com'

    const browser = await puppeteer.launch({headless:false})
    const page = await browser.newPage()
    await page.exposeFunction('lowerCase', lowerCase)
    await page.exposeFunction('titleCase', titleCase)
    await page.exposeFunction('getPlaceDataInfo', getPlaceDataInfo)
    await page.setViewport({width:1300, height:900})
    await page.goto(`${baseUrl}`, {waitUntil: 'domcontentloaded'})

    await autoScroll(page, searchTerm)
        
    const placesLinksList = await page.evaluate((totalResults)=>{
        const dataCardsArr = document.querySelectorAll('a.hfpxzc')
            const placesLinks = []
            dataCardsArr.forEach((card)=>{
                placesLinks.push(card.href)
            })
            return placesLinks.slice(0,totalResults)
    },totalResults)

    console.log ('The total number of found places is:', placesLinksList.length, 'and The links list to found places is:', placesLinksList)

    const placesData=[]
    let acct = 0
    for(let link of placesLinksList){
        await page.goto(link)       
        await page.waitForSelector('h1.DUwDvf.lfPIob')      
    //     //compartir --> iframe//
    //     await page.waitForSelector('button.g88MCb.S9kvJb[data-value="Compartir"]')
    //     await page.click('button.g88MCb.S9kvJb[data-value="Compartir"]')
    //     await page.waitForNavigation()
    //     await page.waitForSelector('button.zaxyGe.L6Bbsd.YTfrze')
    //     await page.click('button.zaxyGe.L6Bbsd.YTfrze')
    //     await page.waitForSelector('input.yA7sBe')
    //     const iframeMap = await page.$eval('input.yA7sBe', el => el.getAttribute('value'))
    //     const mapWidth = iframeMap.replace('width="600"','width="390"')
    //     const iframeResized = mapWidth.replace('height="450"','height="420"')
    //     //END OF compartir --> iframe//

            // --> ojo , al incluir iframe tmb debe incluirse como param en page eval->const placeSpecifics = await page.evaluate((typeOfPlace, corePlace,acct,targetWebsite, iframeResized,slug,titleCase, lowerCase)=>{

        const placeSpecifics = await page.evaluate(async(typeOfPlace, corePlace,acct,targetWebsite,slug)=>{
            const placeInfo = {}
            
            const missingData = document.querySelectorAll('span.DkEaL')
            const missingDataArray = []
            for (let eachDataPoint of missingData){
                missingDataArray.push(eachDataPoint.innerText)
            }

            const placeData = document.querySelectorAll('.Io6YTe.fontBodyMedium')
            const dataSize = document.querySelectorAll('.Io6YTe.fontBodyMedium').length
           // const placeContacts = document.querySelectorAll('a.CsEnBe')[0].hostname
            const placeContacts = document.querySelectorAll('a.CsEnBe')[0].hostname
            
            // placeInfo.contacts = getPlaceDataInfo( missingDataArray, placeData, dataSize, placeContacts)
            placeInfo.contacts = await getPlaceDataInfo( missingDataArray, placeData, dataSize, placeContacts)
            placeInfo.originalName = document.querySelector('h1.DUwDvf.lfPIob').textContent         
            placeInfo.lowerCaseName = await lowerCase(placeInfo.originalName)
            placeInfo.titleCaseName = await titleCase(placeInfo.originalName)  

            return placeInfo
        },typeOfPlace,corePlace,acct, targetWebsite,slug)

            acct++
            placesData.push({acct, ...placeSpecifics})
            console.log(placeSpecifics)
    }
    
    console.log('placesData:', placesData)
    console.log('placesData Lengt:', placesData.length)

    await browser.close()
})()