// 获取到当前项目的名称
var contextPath = function () {
    var pathName = document.location.pathname;
    var index = pathName.substr(1).indexOf("/");
    var result = pathName.substr(0,index+1);
    return result;
}

function sendSmsCode() {
    var has = true;
    console.log($("#verifytype"))
    var _json = jQuery.param({
        "username": $("#username").val(),
        "verifytype":$("#verifytype").val()
    });
    $.ajax({
        type: "post",
        url: contextPath()+"/sendSmsCode",
        data:_json,
        dataType: "json",
        success: function (data) {
            console.log(data);
            if (data.rsp=="1"){
                console.log("发送成功");
            }else {
                console.log("发送失败");
            }
        },
        error:function (e) {
            console.log(e)
        }
    });
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}