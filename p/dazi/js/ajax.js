
function ajax() {
    var ajaxData = {
        type: arguments[0].type || "GET",
        url: arguments[0].url || "",
        async: arguments[0].async || "true",
        data: arguments[0].data || null,
        dataType: arguments[0].dataType || "text",
        contentType: arguments[0].contentType || "application/x-www-form-urlencoded",
        beforeSend: arguments[0].beforeSend || function() {},
        success: arguments[0].success || function() {},
        error: arguments[0].error || function() {}
    }
    ajaxData.beforeSend()
    var xhr = createxmlHttpRequest();
    xhr.responseType = ajaxData.dataType;
    xhr.open(ajaxData.type, ajaxData.url, ajaxData.async);
    xhr.setRequestHeader("Content-Type", ajaxData.contentType);
    xhr.send(convertData(ajaxData.data));
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                ajaxData.success(xhr.response)
            } else {
                ajaxData.error()
            }
        }
    }
}

function createxmlHttpRequest() {
    if (window.ActiveXObject) {
        return new ActiveXObject("Microsoft.XMLHTTP");
    } else if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
    }
}

function convertData(data) {
    if (typeof data === 'object') {
        var convertResult = "";
        for (var c in data) {
            convertResult += c + "=" + data[c] + "&";
        }
        convertResult = convertResult.substring(0, convertResult.length - 1)
        return convertResult;
    } else {
        return data;
    }
}


ajax({
    type: "POST",
    url: "http://route.showapi.com/1287-1",
    dataType: "json",
    data: {
        showapi_appid: 100, //是	易源应用id
        showapi_sign: '6356B7D41DABBDDD2F7EC560C5786300', //是	为了验证用户身份，以及确保参数不被中间人篡改，需要传递调用者的数字签名。
        showapi_timestamp: new Date().getTime(), //否	客户端时间。
        showapi_sign_method: 'md5', //否	签名生成方式，其值可选为"md5"或"hmac"。如果不传入则默认"md5"。
        showapi_res_gzip: 1,
    },
    beforeSend: function() {
        //some js code
    },
    success: function(msg) {
        console.log(msg)
    },
    error: function() {
        console.log("error")
    }
})