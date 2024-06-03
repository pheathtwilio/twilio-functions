const axios = require('axios')
const cheerio = require('cheerio')

exports.handler = async function (context, event, callback) {

    const callerids = []
    const url = event.URL

    try{

        const { data } = await axios.get(url)
        const $ = cheerio.load(data)

        const callerTable = '#guideline-tables > div > div:nth-child(3) > div > div > table > tbody'
        const callerTable_2 = '#base-page-7c9c6637a6 > main > section.section-wrapper.default > div > div:nth-child(3) > div > div > table > tbody'

        if($(callerTable).find('tr').children().length > 0){
            $(callerTable).find('tr').each((index, row) => {

                callerids.push({
                    [($(row).find('td:nth-child(1)').text()).trim()]:{inbound:$(row).find('td:nth-child(2)').text().trim(), outbound:$(row).find('td:nth-child(3)').text().trim()}
                })

            })
        }else{
            $(callerTable_2).find('tr').each((index, row) => {

                callerids.push({
                    [($(row).find('td:nth-child(1)').text()).trim()]:{inbound:$(row).find('td:nth-child(2)').text().trim(), outbound:$(row).find('td:nth-child(3)').text().trim()}
                })

            })
        }

    }catch (error) {
        console.error(`Error: ${error}`)
        callback(error)
    }

  callback(null, JSON.stringify({"Caller ID": callerids}));
}
