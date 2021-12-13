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