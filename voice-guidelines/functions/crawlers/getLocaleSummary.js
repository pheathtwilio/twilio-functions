const axios = require('axios')
const cheerio = require('cheerio')

exports.handler = async function (context, event, callback) {

    const localeSummary = []
    const url = event.URL

    try{

    const { data } = await axios.get(url)
    const $ = cheerio.load(data)

    const localeSummaryTable = '#guideline-tables > div > div:nth-child(1) > div > div > table > tbody'
    const localeSummaryTable_2 = '#base-page-7c9c6637a6 > main > section.section-wrapper.default > div > div:nth-child(1) > div > div > table > tbody'

    if($(localeSummaryTable).find('tr').children().length > 0){
        $(localeSummaryTable).find('tr').each((index, row) => {

            localeSummary.push({
                [($(row).find('td:nth-child(1)').text()).trim()]:($(row).find('td:nth-child(2)').text()).trim()
            })
    
        })
    }else{
        $(localeSummaryTable_2).find('tr').each((index, row) => {

            localeSummary.push({
                [($(row).find('td:nth-child(1)').text()).trim()]:($(row).find('td:nth-child(2)').text()).trim()
            })
    
        })
    }
    

    }catch (error) {
        console.error(`Error: ${error}`)
        callback(error, '')
    }   

  callback(null, JSON.stringify({"Summary": localeSummary}));
};
