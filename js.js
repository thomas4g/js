/* 
    Fast/simple selector
    $('#id') to get by id
    $('.class') to get by class
    $('name') to get by name
    
    Separate queries by spaces to get children, e.g
    $('#id .class') to get all elements with class 'class' in element with id 'id'

    Returns array when there are multiple or no results (empty array), or single element
    if querying by id
*/

function $ (selector, context) {
    context = context || document
    
    var selectors = selector.split(' ')    
    
    var selector = selectors[0] 
    var queryType = selector[0]
    var query = selector.substring(1)
    var result;
    var iterable = false;
    if (queryType === '#') {
        result = context.getElementById(query)
    } else if (queryType === '.') {
        result = context.getElementsByClassName(query).toArray()
        iterable = true;
    } else {
        result = context.getElementsByTagName(query).toArray()
        iterable = true;
    }
    if (result === null) return []

    if (selectors.length > 1) {
        result = iterable ? result : [result] 
        var newSelector = selectors.slice(1).join(' ')
        result = result.reduce(function (results, context) {
            return results.concat($(newSelector, context))
        }, [])
    }

    // if we queried for a single element by id
    if (result.length === 1 && queryType === '#') result = result[0]
    return result
}
