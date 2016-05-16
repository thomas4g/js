$$ = $$ || {}
$$.ajax = {
    req: function (type, url, callback, data) {
        var oReq = new XMLHttpRequest()
        oReq.open(type, url, true)
        oReq.onreadystatechange = function (e) {
            if (oReq.readyState === 4) {
                callback(oReq, e)
            }
        } 
        oReq.send(data)
    }
};

// Reasons to use semicolons...

['get', 'post', 'put', 'patch', 'delete'].forEach(function (verb) {
    $$.ajax[verb] = $$.ajax.req.bind(null, verb.toUpperCase())
})
