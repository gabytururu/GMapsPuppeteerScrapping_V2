
const autoScroll = async(page, searchTerm) => {
    await page.evaluate(async(searchTerm)=>{
        do{
            await new Promise ((resolve, reject)=>{
                let totalHeight = 0;
                let distance = 300;
                let timer = setInterval(()=>{
                    const scrollableMenu = document.querySelector(`div[aria-label="Resultados de ${searchTerm}"]`)
                    let scrollHeight = scrollableMenu.scrollHeight
                    scrollableMenu.scrollBy(0, distance)
                    totalHeight += distance

                    if(totalHeight >= scrollHeight){
                        clearInterval(timer)
                        resolve()
                    }
                },100)
            })
        }while(document.querySelector('.HlvSq') === null)
    },searchTerm)
}

const titleCase = (placeName)=>{
    //const lowerCase = placeName.toLowerCase()
    //const splitted = lowerCase.split(' ')                
    const splitted = placeName.split(' ')                
    let cleanUpArr=[]
    for (let el of splitted){
        const firstUpper = el[0].toUpperCase()
        const restLower = el.slice(1).toLowerCase()
        const fullName = firstUpper + restLower
        cleanUpArr.push(fullName)
    }
    const titleCaseName = cleanUpArr.join(' ')                    
    return titleCaseName 
}

const lowerCase = (placeName) =>{
    let lowerCase = placeName.toLowerCase()
    return lowerCase
}

const onlyPhoneMissing = (array) =>{
    let phoneMissing;
    if(array.find(arrElement => arrElement.includes('teléfono'))){
        phoneMissing = true
    }else{
        phoneMissing = false
    }
    return phoneMissing
}

const onlyWebMissing = (array) =>  {
    let webMissing;
    if(array.find(arrElement => arrElement.includes('web'))){
        webMissing = true
    }else{
        webMissing = false
    }
    return webMissing
}

const bothPhoneAndWebMissing = (array) =>{
    let bothContactsMissing;
    let phoneMissing = onlyPhoneMissing(array)
    let webMissing = onlyWebMissing(array)

    if (phoneMissing && webMissing){
        bothContactsMissing = true
    }else{
        bothContactsMissing = false
    }
    return bothContactsMissing
}


const getPlaceDataInfo = (missingDataArray, placeData, dataSize, placeContacts) =>{

    const {phone, web, address, city}  = infodelLugar
    

    if(placeData === null){
        phone = 'No cuenta con teléfono'  
        web = 'Web no disponible'              
        address = 'No cuenta con dirección'
        city = 'No cuenta con ciudad'
    }else if(bothPhoneAndWebMissing(missingDataArray) === true && dataSize === 1){
        phone = 'No cuenta con teléfono'  
        web = 'Web no disponible'   
        address = placeData[0].textContent
        city = 'No cuenta con ciudad'  
    }else if(bothPhoneAndWebMissing(missingDataArray) === true && dataSize === 2){
        phone = 'No cuenta con teléfono'  
        web = 'Web no disponible'              
        address = placeData[0].textContent
        city = placeData[1].textContent  
    }else if(bothPhoneAndWebMissing(missingDataArray) === true && dataSize > 2){
        phone = 'No cuenta con teléfono'  
        web = 'Web no disponible'              
        address = placeData[0].textContent
        city = placeData[1].textContent
        //extra = document.querySelectorAll('.Io6YTe.fontBodyMedium')[2].textContent  
    }else if(bothPhoneAndWebMissing(missingDataArray) === false && onlyPhoneMissing(missingDataArray) === true && dataSize === 1){
        phone = 'No cuenta con teléfono'  
        web = placeContacts[0].href
        address = placeData[0].textContent
        city = 'No cuenta con ciudad'
    }else if(bothPhoneAndWebMissing(missingDataArray) === false && onlyPhoneMissing(missingDataArray)=== true && dataSize ===2){
        phone = 'No cuenta con teléfono'
        web = placeContacts[0].href
        address = 'No cuenta con dirección'
        city = placeData[0].textContent
    }else if(bothPhoneAndWebMissing(missingDataArray)===false && onlyPhoneMissing(missingDataArray)===true&&dataSize >2){
        phone = 'No cuenta con teléfono'
        web = placeContacts[0].href
        address = placeData[0].textContent
        city = placeData[2].textContent
    }else if(bothPhoneAndWebMissing(missingDataArray)=== false && onlyWebMissing(missingDataArray) === true && dataSize === 1){
        phone = placeData[0].textContent
        web = 'Web no disponible' 
        address = 'No cuenta con dirección'
        city = 'No cuenta con ciudad'
    }else if(bothPhAndWebMissing(missingDataArr)===false && onlyWebMissing(missingDataArr) === true && dataSize === 2){
        phone = placeData[1].textContent
        web = 'Web no disponible' 
        address = placeData[0].textContent
        city = 'No cuenta con ciudad'
    }else if(bothPhAndWebMissing(missingDataArr)===false && onlyWebMissing(missingDataArr) === true && dataSize > 2){
        phone = placeData[1].textContent
        web = 'Web no disponible' 
        address = placeData[0].textContent
        city = placeData[2].textContent
    }else if(onlyWebMissing(missingDataArr) === false && onlyPhoneMissing(missingDataArr) === false && dataSize === 2){
        phone = placeData[1].textContent
        web = placeContacts[0].href
        address = 'No cuenta con dirección'
        city = 'No cuenta con ciudad'
    }else if(onlyWebMissing(missingDataArr) === false && onlyPhoneMissing(missingDataArr) === false && dataSize === 3){
        phone = placeData[2].textContent
        web = placeContacts[0].href
        address = placeData[0].textContent
        city = 'No cuenta con ciudad'
    }else if(onlyWebMissing(missingDataArr) === false && onlyPhoneMissing(missingDataArr) === false && dataSize >= 4){
        phone = placeData[2].textContent
        web = placeContacts[0].href
        address = placeData[0].textContent
        city = placeData[3].textContent   
    }else{
        phone = 'caso excepcional revisar caso'
        web = 'caso excepcional revisar caso'
        address = 'caso excepcional revisar caso'
        city = 'caso excepcional revisar caso' 
    }
    return infodelLugar
}



module.exports = {
    autoScroll,
    titleCase,
    lowerCase,
    onlyPhoneMissing,
    onlyWebMissing,
    bothPhoneAndWebMissing,
    getPlaceDataInfo,
}

  