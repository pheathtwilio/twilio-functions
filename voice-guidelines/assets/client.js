const countriesListElement = window.document.getElementById('countries-list')

const getCountries = async (url) => {

    const response = await fetch('./crawlers/getCountriesFromURL?URL='+url, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        }
      })

    const countryList = await response.json()

    console.log(countryList)

    countryList.forEach(country => {
        const listElement = document.createElement('li')

        const button = document.createElement('button')
        button.className = 'collapsible'
        button.innerHTML = country.name

        const div = document.createElement('div')
        div.className = 'content'
        const p = document.createElement('p')
        div.appendChild(p)

        listElement.className = 'list-group-item'
        listElement.id = country.link
        listElement.appendChild(button)
        listElement.appendChild(div)

        countriesListElement.appendChild(listElement)
    })
}

window.addEventListener("load", async () => {

    await getCountries('https://www.twilio.com/en-us/guidelines/voice')
    
})