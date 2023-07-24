
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

const lowerCase = async(placeName) =>{
    let lowerCase = placeName.toLowerCase()
    return lowerCase
}


module.exports = {
    autoScroll: autoScroll,
    titleCase: titleCase,
    lowerCase: lowerCase,
    
}

  