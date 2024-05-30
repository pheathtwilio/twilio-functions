const countriesListElement = window.document.getElementById('countries-list')
const TWILIO = 'https://www.twilio.com/'

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
        listElement.addEventListener('click', listElementClicked)
    })
}

const getLocaleSummary = async (url) => {

    const response = await fetch('./crawlers/getLocaleSummary?URL='+TWILIO+url, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        }
      })

    return await response.json()
}

const listElementClicked = async (event) => {

    const listElement = event.target.parentNode
    const button = event.target

    const url = listElement.id

    if(url == 'countries-list'){
        console.log('Error, no country specified')
    }else{

        const locale = await getLocaleSummary(listElement.id)

        const table = document.createElement('table')
        table.className = 'table table-dark'
        const tbody = document.createElement('tbody')

        locale.Summary.forEach((element) => {
            let tr = document.createElement('tr')

            let td = document.createElement('td')
            let key = Object.keys(element)[0]
            td.innerHTML = JSON.stringify(key)
            tr.appendChild(td)

            td = document.createElement('td')
            td.innerHTML = JSON.stringify(element[key])
            tr.appendChild(td)

            tbody.appendChild(tr)
        })
        
        table.appendChild(tbody)
        listElement.appendChild(table)
        
        // get the country specific details

    }

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