const puppeteer = require('puppeteer');
const helperFunctionsObj = require('./helperFunctions');


(async()=>{
    let baseUrl = 'https://www.google.com/maps/search/atracci%C3%B3n+tur%C3%ADstica+en+Chiapas+OR+cascadas+en+Chiapas+OR+parque+nacional+en+chiapas/@17.2574412,-92.2388338,11z/data=!4m2!2m1!6e1?entry=ttu'
    let totalResults = 10
    let searchTerm = 'atracción turística en Chiapas OR cascadas en Chiapas OR parque nacional en chiapas'
    let typeOfPlace = 'Parque Ecoturístico'
    let corePlace = 'chiapas'
    let slug = 'parques-ecoturisticos-chiapas'
    let fileName = 'parquesEcoturismoChiapas.xlsx'
    let sheetName = 'fullDB_CHIS'
    let targetWebsite = 'rumbonaturaleza.com'

    const browser = await puppeteer.launch({headless:false})
    const page = await browser.newPage()
    await page.setViewport({width:1300, height:900})
    await page.goto(`${baseUrl}`, {waitUntil: 'domcontentloaded'})

    await helperFunctionsObj.autoScroll(page, searchTerm)
        
    const placesLinksList = await page.evaluate((totalResults)=>{
        const dataCardsArr = document.querySelectorAll('a.hfpxzc')
            const urlsList = []
            dataCardsArr.forEach((card)=>{
                urlsList.push(card.href)
            })
            return urlsList.slice(0,totalResults)
    },totalResults)

    console.log ('The links list to found places is:', placesLinksList)
    console.log ('The total number of found places is:', placesLinksList.length)

    const placesData=[]
    let acct = 0
    for(let link of placesLinksList){
        await page.goto(link)
        await page.waitForSelector('.DUwDvf.fontHeadlineLarge span')
        
        //compartir --> iframe//
        await page.waitForSelector('button.g88MCb.S9kvJb[data-value="Compartir"]')
        await page.click('button.g88MCb.S9kvJb[data-value="Compartir"]')
        await page.waitForNavigation()
        await page.waitForSelector('button.zaxyGe.L6Bbsd.YTfrze')
        await page.click('button.zaxyGe.L6Bbsd.YTfrze')
        await page.waitForSelector('input.yA7sBe')
        const iframeMap = await page.$eval('input.yA7sBe', el => el.getAttribute('value'))
        const mapWidth = iframeMap.replace('width="600"','width="390"')
        const iframeResized = mapWidth.replace('height="450"','height="420"')
        //END OF compartir --> iframe//

        const placeSpecifics = await page.evaluate((typeOfPlace, corePlace,acct,targetWebsite, iframeResized,slug,helperFunctionsObj.titleCase, helperFunctionsObj.lowerCase )=>{
            const placeInfo = {}
            const placeName = document.querySelector('h1.DUwDvf.fontHeadlineLarge').textContent 

            const titleCaseName = helperFunctionsObj.titleCase(placeName)

            const lowerCaseName = helperFunctionsObj.lowerCase(placeName)

            placeInfo.name = placeName        
            placeInfo.titleCaseName = titleCaseName        
            placeInfo.lowerCaseName = lowerCaseName 
            return placeInfo
        },typeOfPlace,corePlace,acct, targetWebsite, iframeResized,slug, helperFunctionsObj.titleCase, helperFunctionsObj.lowerCase)

            acct++
            placesData.push({acct, ...placeSpecifics})
            console.log(placeSpecifics)
    }
    
    console.log('placesData:', placesData)
    console.log('placesData Lengt:', placesData.length)

    await browser.close()
})()