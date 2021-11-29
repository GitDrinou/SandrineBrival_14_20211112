
export const formatDataForSelect = (arr) =>  {
    let newTable = []
    for(let item of arr) {
        newTable.push(
           {
                value: item.abbreviation ? item.abbreviation : item.name,
                label: item.name
           } 
        )        
    }
    return newTable
}


export function modaleEvents(elt, url_return) {

    const origin = window.location.origin

    const doc = document.querySelector('.js-document')

    const open = (dialog) => {
        dialog.setAttribute('aria-hidden', false)        
        doc.setAttribute('aria-hidden', true)
    }

    const close = (dialog) => {
        window.location.assign(origin.concat(url_return))
        dialog.setAttribute('aria-hidden', true)        
        doc.setAttribute('aria-hidden', false) 
    }

    const dialog = document.getElementById(elt.getAttribute('aria-controls'))        
    const dismissTriggers = dialog.querySelectorAll('[data-dismiss]')
    
    open(dialog)
    
    dismissTriggers.forEach((dismissTrigger) => {
        const dismissDialog = document.getElementById(dismissTrigger.dataset.dismiss)
        dismissTrigger.addEventListener('click', (e) => {
            e.preventDefault()
            close(dismissDialog)
        })
    })
}

export function formatDate(value) {

    const date = new Date(value)

    return (date.getMonth() + 1) + "/" +date.getDate()  + "/" + date.getFullYear()
}

export function sortedDatas(array, column) {

    const newArray = array.sort(function compare(a, b) {
        if (a[column] < b[column])
            return -1;
        if (a[column] > b[column] )
            return 1;
        return 0;
    })

    return newArray
}