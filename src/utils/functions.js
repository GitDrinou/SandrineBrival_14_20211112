
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
