const countriesListElement = window.document.getElementById('countries-list')

const getCountries = async (url) => {

    const response = await fetch('./crawlers/getCountriesFromURL?URL='+url, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        }
      })

    const countryList = await response.json()

    countryList.forEach(country => {
        const listElement = document.createElement('li')

        const button = document.createElement('button')
        button.className = 'btn btn-dark collapsible'
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

const filterCountries = () => {

    let input, filter, li

    input = document.getElementById('filterCountriesInput')
    filter = input.value.toUpperCase()
    li = countriesListElement.getElementsByTagName('li')

    for(var i=0; i<li.length; i++){
        let text = li[i].children[0].innerHTML

        if(text.toUpperCase().indexOf(filter) > -1  ){
            li[i].style.display = ""
        }else{
            li[i].style.display = "none"
        }
    }

}

window.addEventListener("load", async () => {

    await getCountries('https://www.twilio.com/en-us/guidelines/voice')
    
})