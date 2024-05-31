const countriesListElement = window.document.getElementById('countries-list')
const loadingElement = window.document.getElementById('loading')
const TWILIO = 'https://www.twilio.com/'

const getCountries = async (url) => {

    startLoading()

    const response = await fetch('./crawlers/getCountriesFromURL?URL='+url, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        }
      })

    const countryList = await response.json()

    stopLoading()

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

const decorateLocaleSummary = (parentNode, localeSummary) => {

    const table = document.createElement('table')
    table.className = 'table table-striped table-dark table-hover'
    const tbody = document.createElement('tbody')

    let tr = document.createElement('tr')
    let th = document.createElement('th')
    th.innerHTML = 'Locale Summary'
    tr.appendChild(th)
    th = document.createElement('th')
    tr.appendChild(th)
    tbody.appendChild(tr)

    localeSummary.Summary.forEach((element) => {
        let tr = document.createElement('tr')

        let td = document.createElement('td')
        let key = Object.keys(element)[0]
        td.innerHTML =  validateString(JSON.stringify(key)) 

        tr.appendChild(td)

        td = document.createElement('td')
        td.innerHTML = validateString(JSON.stringify(element[key]))
        tr.appendChild(td)

        tbody.appendChild(tr)
    })
    
    table.appendChild(tbody)
    parentNode.appendChild(table)

}

const listElementClicked = async (event) => {

    const listElement = event.target.parentNode

    const url = listElement.id

    console.log(listElement)

    if(url == 'countries-list'){
        console.log('Error, no country specified')
    }else{

        const localeSummary = await getLocaleSummary(listElement.id)
        decorateLocaleSummary(listElement, localeSummary)

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

const startLoading = () => {

    const button = document.createElement('button')
    button.className = 'btn btn-dark'
    button.type = 'button'
    const span = document.createElement('span')
    span.className = 'spinner-border spinner-border-sm'
    span.role = 'status'
    span.ariaHidden = 'true'

    button.appendChild(span)
    loadingElement.appendChild(button)

}

const stopLoading = () => {

    while (loadingElement.firstChild) {
        loadingElement.removeChild(loadingElement.firstChild);
    }

}

const validateString = (strToReplace) => {
    return strToReplace.replace(/['"]+/g, '')
}

window.addEventListener("load", async () => {

    await getCountries('https://www.twilio.com/en-us/guidelines/voice')
    
})