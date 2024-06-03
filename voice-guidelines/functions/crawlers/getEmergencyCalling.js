const axios = require('axios')
const cheerio = require('cheerio')

exports.handler = async function (context, event, callback) {

    const emergencies = []
    const url = event.URL

    try{

        const { data } = await axios.get(url)
        const $ = cheerio.load(data)

        const emergencyCallingTable = '#guideline-tables > div > div:nth-child(5) > div > div > table > tbody'
        const emergencyCallingTable_2 = '#base-page-7c9c6637a6 > main > section.section-wrapper.default > div > div:nth-child(5) > div > div > table > tbody'

        if($(emergencyCallingTable).find('tr').children().length > 0){
            $(emergencyCallingTable).find('tr').each((index, row) => {

                emergencies.push({
                    [($(row).find('td:nth-child(1)').text()).trim()]:($(row).find('td:nth-child(2)').text()).trim()
                })
    
            })
        }else{
            $(emergencyCallingTable_2).find('tr').each((index, row) => {

                emergencies.push({
                    [($(row).find('td:nth-child(1)').text()).trim()]:($(row).find('td:nth-child(2)').text()).trim()
                })
    
            })
        }

        

    }catch (error) {
        console.error(`Error: ${error}`)
        callback(error)
    }

  callback(null, JSON.stringify({"emergencies": emergencies}));
}
