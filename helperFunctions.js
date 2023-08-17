
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
    // console.log('la missing data es--->',missingDataArray)
    // console.log('la placeData data es--->',placeData)
    // console.log('la dataSize data es--->',dataSize)
    // console.log('la placeContacts data es--->',placeContacts)

    let infodelLugar = {address:'datainicio', city:'datainicio', phone:'datainicio', web:'datainicio'}  
    //console.log('consologeando placedata pasada como param a la funcion',placeData)

    if(placeData === null){      
        console.log('cayo en caso 0 : null')  
        infodelLugar.phone= 'No cuenta con teléfono'  
        infodelLugar.web= 'Web no disponible'            
        infodelLugar.address= 'No cuenta con dirección'
        infodelLugar.city= 'No cuenta con ciudad'     
       
    }else if(bothPhoneAndWebMissing(missingDataArray) === true && dataSize === 1){
        console.log('cayo en caso 1 : bothph&web size =1')  
        infodelLugar.phone = 'No cuenta con teléfono'  
        infodelLugar.web = 'Web no disponible'  
        infodelLugar.address = placeData ? placeData[0].textContent : ' no hubo address',
        infodelLugar.city = 'No cuenta con ciudad'
        
    }else if(bothPhoneAndWebMissing(missingDataArray) === true && dataSize === 2){
        console.log('cayo en caso 2 : bothph&web size =2') 
            infodelLugar.phone = 'No cuenta con teléfono'  
            infodelLugar.web = 'Web no disponible'              
            infodelLugar.address = placeData ? placeData[0].textContent : 'no hubo address'
            infodelLugar.city = placeData? placeData[1].textContent  : 'no hubo city'
       
    }else if(bothPhoneAndWebMissing(missingDataArray) === true && dataSize > 2){
        console.log('cayo en caso 3 : bothph&web size >2') 
            infodelLugar.phone = 'No cuenta con teléfono'
            infodelLugar.web= 'Web no disponible'            
            infodelLugar.address = placeData ? placeData[0].textContent : 'no hubo address'
            infodelLugar.city = placeData ? placeData[1].textContent : 'no hubo city'  
      
    //     //extra = document.querySelectorAll('.Io6YTe.fontBodyMedium')[2].textContent  
    // }else if(bothPhoneAndWebMissing(missingDataArray) === false && onlyPhoneMissing(missingDataArray) === true && dataSize === 1){
    //     infodelLugar.phone = 'No cuenta con teléfono'  
    //     infodelLugar.web = placeContacts
    //     infodelLugar.address = placeData[0].textContent
    //     infodelLugar.city = 'No cuenta con ciudad'
    // }else if(bothPhoneAndWebMissing(missingDataArray) === false && onlyPhoneMissing(missingDataArray)=== true && dataSize ===2){
    //     infodelLugar.phone = 'No cuenta con teléfono'
    //     infodelLugar.web = placeContacts
    //     infodelLugar.address = 'No cuenta con dirección'
    //     infodelLugar.city = placeData[0].textContent
    // }else if(bothPhoneAndWebMissing(missingDataArray)===false && onlyPhoneMissing(missingDataArray)===true&&dataSize >2){
    //     infodelLugar.phone = 'No cuenta con teléfono'
    //     infodelLugar.web = placeContacts
    //     infodelLugar.address = placeData[0].textContent
    //     infodelLugar.city = placeData[2].textContent
    // }else if(bothPhoneAndWebMissing(missingDataArray)=== false && onlyWebMissing(missingDataArray) === true && dataSize === 1){
    //     infodelLugar.phone = placeData[0].textContent
    //     infodelLugar.web = 'Web no disponible' 
    //     infodelLugar.address = 'No cuenta con dirección'
    //     infodelLugar.city = 'No cuenta con ciudad'
    // }else if(bothPhoneAndWebMissing(missingDataArray)===false && onlyWebMissing(missingDataArray) === true && dataSize === 2){
    //     infodelLugar.phone = placeData[1].textContent
    //     infodelLugar.web = 'Web no disponible' 
    //     infodelLugar.address = placeData[0].textContent
    //     infodelLugar.city = 'No cuenta con ciudad'
    // }else if(bothPhoneAndWebMissing(missingDataArray)===false && onlyWebMissing(missingDataArray) === true && dataSize > 2){
    //     infodelLugar.phone = placeData[1].textContent
    //     infodelLugar.web = 'Web no disponible' 
    //     infodelLugar.address = placeData[0].textContent
    //     infodelLugar.city = placeData[2].textContent
    // }else if(onlyWebMissing(missingDataArray) === false && onlyPhoneMissing(missingDataArray) === false && dataSize === 2){
    //     infodelLugar.phone = placeData[1].textContent
    //     infodelLugar.web = placeContacts
    //     infodelLugar.address = 'No cuenta con dirección'
    //     infodelLugar.city = 'No cuenta con ciudad'
    // }else if(onlyWebMissing(missingDataArray) === false && onlyPhoneMissing(missingDataArray) === false && dataSize === 3){
    //     infodelLugar.phone = placeData[2].textContentae
    //     infodelLugar.web = placeContacts
    //     infodelLugar.address = placeData[0].textContent
    //     infodelLugar.city = 'No cuenta con ciudad'
    // }else if(onlyWebMissing(missingDataArray) === false && onlyPhoneMissing(missingDataArray) === false && dataSize >= 4){
    //     infodelLugar.phone = placeData[2].textContent
    //     infodelLugar.web = placeContacts
    //     infodelLugar.address = placeData[0].textContent
    //     infodelLugar.city = placeData[3].textContent   
    }else{
        console.log('cayo en caso 4 : caso excepcional') 
        infodelLugar.phone = 'caso excepcional revisar caso'
        infodelLugar.web = 'caso excepcional revisar caso'
        infodelLugar.address = 'caso excepcional revisar caso'
        infodelLugar.city = 'caso excepcional revisar caso' 
    }
    console.log(infodelLugar)
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

  