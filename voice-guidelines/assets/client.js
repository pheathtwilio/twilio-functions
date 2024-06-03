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
    th.setAttribute('width', '60%')
    th.innerHTML = 'Locale Summary'
    tr.appendChild(th)
    th = document.createElement('th')
    th.setAttribute('width','40%')
    tr.appendChild(th)
    tbody.appendChild(tr)

    localeSummary.Summary.forEach((element) => {
        let tr = document.createElement('tr')

        let td = document.createElement('td')
        let key = Object.keys(element)[0]
        let temp = replaceNewLine(key)
        td.innerHTML =  validateString(temp) 

        tr.appendChild(td)

        td = document.createElement('td')
        temp = replaceNewLine(element[key])
        td.innerHTML = validateString(temp)
        tr.appendChild(td)

        tbody.appendChild(tr)
    })
    
    table.appendChild(tbody)
    parentNode.appendChild(table)

}

const getReachability = async (url) => {

    const response = await fetch('./crawlers/getReachability?URL='+TWILIO+url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })


    return await response.json()
}

const decorateReachability = (parentNode, reachability) => {

    const table = document.createElement('table')
    table.className = 'table table-striped table-dark table-hover'
    const tbody = document.createElement('tbody')

    let tr = document.createElement('tr')
    let th = document.createElement('th')
    th.setAttribute('width', '60%')
    th.innerHTML = 'Reachability'
    tr.appendChild(th)
    th = document.createElement('th')
    th.setAttribute('width', '20%')
    th.innerHTML = 'Inbound'
    tr.appendChild(th)
    th = document.createElement('th')
    th.setAttribute('width', '20%')
    th.innerHTML = 'Outbound'
    tr.appendChild(th)
    tbody.appendChild(tr)

    reachability.Reachability.forEach((element) => {

        let tr = document.createElement('tr')
        let td = document.createElement('td')
        let key = Object.keys(element)[0]
        let temp = replaceNewLine(key)
        td.innerHTML = validateString(temp)
        tr.appendChild(td)

        td = document.createElement('td')
        temp = replaceNewLine(element[key].inbound)
        td.innerHTML = validateString(temp)
        tr.appendChild(td)

        td = document.createElement('td')
        temp = replaceNewLine(element[key].outbound)
        td.innerHTML = validateString(temp)
        tr.appendChild(td)

        tbody.appendChild(tr)

    })


    table.appendChild(tbody)
    parentNode.appendChild(table)
}

const getCallerID = async (url) => {

    const response = await fetch('./crawlers/getCallerID?URL='+TWILIO+url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })

    return await response.json()
}

const decorateCallerID = (parentNode, callerIDs) => {

    const table = document.createElement('table')
    table.className = 'table table-striped table-dark table-hover'
    const tbody = document.createElement('tbody')

    let tr = document.createElement('tr')
    let th = document.createElement('th')
    th.setAttribute('width','60%')
    th.innerHTML = 'Caller ID'
    tr.appendChild(th)
    th = document.createElement('th')
    th.setAttribute('width', '20%')
    th.innerHTML = 'Inbound'
    tr.appendChild(th)
    th = document.createElement('th')
    th.setAttribute('width', '20%')
    th.innerHTML = 'Outbound'
    tr.appendChild(th)
    tbody.appendChild(tr)

    callerIDs['Caller ID'].forEach((element) => {

        let tr = document.createElement('tr')
        let td = document.createElement('td')
        let key = Object.keys(element)[0]
        let temp = replaceNewLine(key)
        td.innerHTML = validateString(temp)
        tr.appendChild(td)

        td = document.createElement('td')
        temp = replaceNewLine(element[key].inbound)
        td.innerHTML = validateString(temp)
        tr.appendChild(td)

        td = document.createElement('td')
        temp = replaceNewLine(element[key].outbound)
        td.innerHTML = validateString(temp)
        tr.appendChild(td)

        tbody.appendChild(tr)

    })

    table.appendChild(tbody)
    parentNode.appendChild(table)

}

const getDTMF = async (url) => {

    const response = await fetch('./crawlers/getDTMF?URL='+TWILIO+url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })

    return await response.json()
}

const decorateDTMF = (parentNode, dtmfs) => {

    const table = document.createElement('table')
    table.className = 'table table-striped table-dark table-hover'
    const tbody = document.createElement('tbody')

    let tr = document.createElement('tr')
    let th = document.createElement('th')
    th.setAttribute('width', '60%')
    th.innerHTML = 'DTMF'
    tr.appendChild(th)
    th = document.createElement('th')
    th.setAttribute('width', '20%')
    th.innerHTML = 'Inbound'
    tr.appendChild(th)
    th = document.createElement('th')
    th.setAttribute('width', '20%')
    th.innerHTML = 'Outbound'
    tr.appendChild(th)
    tbody.appendChild(tr)

    dtmfs.dtmfs.forEach((element) => {

        let tr = document.createElement('tr')
        let td = document.createElement('td')
        let key = Object.keys(element)[0]
        let temp = replaceNewLine(key)
        td.innerHTML = validateString(temp)
        tr.appendChild(td)

        td = document.createElement('td')
        temp = replaceNewLine(element[key].inbound)
        td.innerHTML = validateString(temp)
        tr.appendChild(td)

        td = document.createElement('td')
        temp = replaceNewLine(element[key].outbound)
        td.innerHTML = validateString(temp)
        tr.appendChild(td)

        tbody.appendChild(tr)

    })

    table.appendChild(tbody)
    parentNode.appendChild(table)

}

const getEmergencyCalling = async (url) => {

    const response = await fetch('./crawlers/getEmergencyCalling?URL='+TWILIO+url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })

    return await response.json()
}

const decorateEmergencyCalling = (parentNode, emergencies) => {

    const table = document.createElement('table')
    table.className = 'table table-striped table-dark table-hover'
    const tbody = document.createElement('tbody')

    let tr = document.createElement('tr')
    let th = document.createElement('th')
    th.setAttribute('width', '60%')
    th.innerHTML = 'Emergency Calling'
    tr.appendChild(th)
    th = document.createElement('th')
    th.setAttribute('width','40%')
    tr.appendChild(th)
    tbody.appendChild(tr)

    emergencies.emergencies.forEach((element) => {
        let tr = document.createElement('tr')

        let td = document.createElement('td')
        let key = Object.keys(element)[0]
        let temp = replaceNewLine(key)
        td.innerHTML =  validateString(temp) 

        tr.appendChild(td)

        td = document.createElement('td')
        temp = replaceNewLine(element[key])
        td.innerHTML = validateString(temp)
        tr.appendChild(td)

        tbody.appendChild(tr)
    })
    
    table.appendChild(tbody)
    parentNode.appendChild(table)

}

const listElementClicked = async (event) => {

    const listElement = event.target.parentNode
    const url = listElement.id

    if(listElement instanceof HTMLLIElement){
        const localeSummary = await getLocaleSummary(listElement.id)
        decorateLocaleSummary(listElement, localeSummary)

        const reachability = await getReachability(listElement.id)
        decorateReachability(listElement, reachability)

        const callerids = await getCallerID(listElement.id)
        decorateCallerID(listElement, callerids)

        const dtmfs = await getDTMF(listElement.id)
        decorateDTMF(listElement, dtmfs)

        const emergencies = await getEmergencyCalling(listElement.id)
        decorateEmergencyCalling(listElement, emergencies)

    }else{
        console.log('Error, no country specified')
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

const replaceNewLine = (strToReplace) => {
    return strToReplace.replace(/\r?\n|\r/g, ' - ')
}

window.addEventListener("load", async () => {

    await getCountries('https://www.twilio.com/en-us/guidelines/voice')
    
})