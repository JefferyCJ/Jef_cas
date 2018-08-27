function hasVerify() {
    if ("LoginView" == $("#submittype").val()) {
        var has = true;
        $.ajax({
            type: "post",
            url: contextPath() + "/chkCode",
            data: {username: $("#username").val()},
            dataType: "json",
            success: function (data) {
                console.log(data.hasVerify);
                has = data.hasVerify;
                if ("LoginView" == $("#submittype").val()) {
                    if (has) {
                        $("#verifySection").css("display", "block");
                        $("#passwordSection").css("display", "none");

                    } else {
                        $("#verifySection").css("display", "none");
                        $("#passwordSection").css("display", "block");
                    }
                }
            }
        });
    }
}

function casregister() {
    $("#passwordSection2").css("display", "block");
    $("#verifySection").css("display", "block");
    $("#inviteCodeSection").css("display", "block");
    $("#submittype").val("RegisterView");
    $("#register").css("display", "none");
    $("#btn_login").val("注册/登录");
    $("#verifytype").val("Registered");
}

function login() {
    postData();
}


//发送请求到服务器
function postData(){
    //发送请求到后台
    $.ajax({
        type : "post",  // 使用提交的方法 post、get
        url : contextPath()+"/login",   // 提交的地址
        data : {
            username:$("input[name='username']").val(),
            password:$("input[name='password']").val(),
            twicepassword:$("input[name='twicepassword']").val(),
            verifycode:$("input[name='verifycode']").val(),
            verifytype:$("input[name='verifytype']").val(),
            invitecode:$("input[name='invitecode']").val(),
            submittype:$("input[name='submittype']").val(),
            execution:$("input[name='execution']").val(),
            _eventId:"submit",
            geolocation:"",
            submit:"登录"
        },  // 数据
        async : false,   // 配置是否异步操作
        success : function(data, textStatus,xhr){  // 回调操作
            //用户名和密码不能为空的情况错误
            var msg = $(data).find("#errors").find("span").html();
            setCodeInfo("info",true,msg);
            console.log("登录失败");
        },  error: function(xhr, textStatus, errorMsg){
            console.log(xhr);
            switch(xhr.status){
                case 302:
                    var tagetUrl = getTargetPath();
                    //用命名活密码没有填写的情况
                    setCodeInfo("info",true,"登录成功,马上条撞到目标网站："+tagetUrl);


                    //跳转服务
                    window.location.href=tagetUrl;
                    break;
                case 401:
                    //验证失败的情况
                    setCodeInfo("info",true,"用户名和密码有问题");
                    break;
            }
        }
    });
}

// 设定验证码的错误提示消息
function setCodeInfo(elementId,error,msg){
    if(error){
        $("#"+elementId).html("<font color='red'>"+msg+"</font>");
    }else{
        $("#"+elementId).html("<font color='blue'>"+msg+"</font>");
    }
}
