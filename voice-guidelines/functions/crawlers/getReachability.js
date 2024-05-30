const axios = require('axios')
const cheerio = require('cheerio')

exports.handler = async function (context, event, callback) {

    const reachability = []
    const url = event.URL

    try{

        const { data } = await axios.get(url)
        const $ = cheerio.load(data)

        const reachabilityTable = '#guidelineTable_c4 > div > div > table > tbody'
        const reachabilityTable_2 =  '#guidelineTable_c4-c5-c6 > div > div > table > tbody'

        console.log($(reachabilityTable).find('tr').children().length)
        console.log($(reachabilityTable_2).find('tr').children().length)

        if($(reachabilityTable).find('tr').children().length > 0){
            $(reachabilityTable).find('tr').each((index, row) => {

                reachability.push({
                    [($(row).find('td:nth-child(1)').text()).trim()]:{inbound:$(row).find('td:nth-child(2)').text().trim(), outbound:$(row).find('td:nth-child(3)').text().trim()}
                })
    
            })
        }else{
            $(reachabilityTable_2).find('tr').each((index, row) => {

                reachability.push({
                    [($(row).find('td:nth-child(1)').text()).trim()]:{inbound:$(row).find('td:nth-child(2)').text().trim(), outbound:$(row).find('td:nth-child(3)').text().trim()}
                })
    
            })
        }

        console.log(reachability)

    }catch (error) {
        console.error(`Error: ${error}`)
        callback(error)
    }   

  callback(null, JSON.stringify({"Reachability": reachability}));
};
