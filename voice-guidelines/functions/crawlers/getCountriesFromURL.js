const axios = require('axios')
const cheerio = require('cheerio')

exports.handler = async function (context, event, callback) {

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

  callback(null, JSON.stringify(countries));
};
