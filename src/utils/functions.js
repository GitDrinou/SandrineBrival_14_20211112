/**
 * @constant function : Format Data for Select
 * @param {array} arr 
 * @returns new table to be include in the Select component
 */
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

/**
 * Function : Modale Events
 * @param {boolean} isUpdate 
 * @param {DOMElement} elt 
 * @param {URL} url_return 
 */
export function modaleEvents(isUpdate, elt, url_return) {

    const origin = window.location.origin

    const doc = document.querySelector('.js-document')

    if (isUpdate) { 
        document.getElementById('dialog-title').innerHTML = "Employee updated"
        document.getElementById('dialog-desc').innerHTML = "This employee is successfully updated on your database"
    }

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

/**
 * Function  : format Date
 * @param {date} value 
 * @returns a new format date as MM/DD/YYYY
 */
export function formatDate(value) {

    const date = new Date(value)  
    return (date.getMonth() + 1) + "/" + date.getDate()  + "/" + date.getFullYear()
}

/**
 * Function Sorted Datas
 * @param {array} array 
 * @param {string} oldColumn 
 * @param {string} newColumn 
 * @returns a new sorted table
 */
export function sortedDatas(array, oldColumn, newColumn) {
    
    let newArray = []
    if (oldColumn === '' || oldColumn !== newColumn) {
        newArray = array.sort(function compare(a, b) {
            if (a[newColumn] < b[newColumn])
                return -1
            if (a[newColumn] > b[newColumn] )
                return 1
            return 0        
        })
    } else if (oldColumn === newColumn) {
        newArray = array.sort(function compare(a, b) {
            if (b[newColumn] < a[newColumn])
                return -1
            if (b[newColumn] > a[newColumn] )
                return 1
            return 0        
        })
    }

    return newArray
}