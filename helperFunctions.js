
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
        }while(document.querySelector('.H1vSq') === null)
    },searchTerm)
}

// const createLinksList = await page.evaluate((totalResults)=>{
//     const dataCardsArr = document.querySelectorAll('a.hfpxzc')
//     const urlsList = []
//     dataCardsArr.forEach((card)=>{
//         urlsList.push(element.href)
//     })
//     return urlsList.slice(0,totalResults)
// },totalResults)

const createLinksList = (totalResults) =>{
    const dataCardsArr = document.querySelectorAll('a.hfpxzc')
    const urlsList = []
    dataCardsArr.forEach((card)=>{
        urlsList.push(element.href)
    })
    return urlsList.slice(0,totalResults)
}


module.exports = {
    autoScroll,
    createLinksList,
}