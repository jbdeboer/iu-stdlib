function qs(x) { return document.querySelector(x); }
function qsa(x) { return document.querySelectorAll(x); }

function ce(x, className) {
    var elt = document.createElement(x);
    if (className !== undefined) {
        elt.className = className;
    }
    return elt;
}

function ctn(x) { return document.createTextNode(x); }

function send(url, payload, successFn, errorFn) {
        oReq = new XMLHttpRequest();
        oReq.addEventListener("load", function(res) {
            if (res.target.status != 200) {
                errorFn();
                return
            }                
            data = JSON.parse(res.target.response)
            if (!data['success']) {
                errorFn();
                return
            }
            successFn(data);
        });
        method = payload === undefined ? "GET" : "POST"
        if (payload === "DELETE") {
            method = "DELETE"
        }
        oReq.open(method, url);
        oReq.setRequestHeader('X-CSRFToken', getCookieValue('csrftoken'))
        oReq.send(method === "POST" ? JSON.stringify(payload) : undefined);
}

function dataFailure(res) {
    console.log('Failure', res)
    alert('Something went wrong. Please reload the page and try again.')
}

function removeChildren(cc) { 
    while (cc.firstChild) {
        cc.removeChild(cc.firstChild);
    }
}

// from http://stackoverflow.com/questions/5639346/what-is-the-shortest-function-for-reading-a-cookie-by-name-in-javascript
function getCookieValue(a, b) {
    b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
}