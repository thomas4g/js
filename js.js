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

    if (selectors.length > 1) {
        result = iterable ? result : [result] 
        var newSelector = selectors.slice(1).join(' ')
        result = result.reduce(function (results, context) {
            return results.concat($(newSelector, context))
        }, [])
    }
    if (result.length === 1) result = result[0]
    return result
}
