const axios = require('axios')
const cheerio = require('cheerio')

exports.handler = async function (context, event, callback) {

  const MILLISECONDS = 1000 * 60 * 60 * 24 // 24 hours in milliseconds

  const client = context.getTwilioClient(context.TWILIO_ACCOUNT_SID, context.TWILIO_AUTH_TOKEN)

  const document = await client.sync.v1
    .services(context.VOICE_GUIDELINES_SERVICE_SID)
    .documents(context.VOICE_GUIDELINES_COUNTRY_LIST_DOC_SID)
    .fetch()

  // check time
  let lastUpdated = document.dateUpdated
  let now = new Date(Date.now())

  if((now - lastUpdated) < MILLISECONDS){ // return cache

    console.log("Retrieving Cache")

    callback(null, JSON.stringify(document.data.countries))

  }else{ // get update

    console.log("Retrieving New")

    const countries = []
    const url = event.URL
    
    try {
      const { data } = await axios.get(url)
      const $ = cheerio.load(data)
      
      const guidelineCountryList = '#guidelineCountryList > div > div.grid-container.three-columns.default.medium-gap'
  
      $(guidelineCountryList).children().each((index, element) => {
  
          let country = {
              name: $(element).children('div').children('div').children('h4').text().trim(),
              link: $(element).children('div').children('a').attr('href')
          }
  
          countries.push(country)
  
      })
  
    } catch (error) {
        console.error(`Error: ${error}`)
        callback(error, '')
    }

    // Update Cache

    console.log("Updating Cache")

    await client.sync.v1
      .services(context.VOICE_GUIDELINES_SERVICE_SID)
      .documents(context.VOICE_GUIDELINES_COUNTRY_LIST_DOC_SID)
      .update({ data: {
          countries: countries
        },
      })
  
    callback(null, JSON.stringify(countries));

  }

}
