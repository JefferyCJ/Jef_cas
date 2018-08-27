function resetPassword() {
    if ($("#password2").val() != $("#password").val()) {
        $("#error_message").html("<span id='error_span' style='color: red'>两次密码输入不一致</span>");
        $("#errorResult").val(1);
        return false;
    } else {
        $("#error_span").remove();
        $("#errorResult").val(0);
    }
    if ($("#errorResult").val() != 0) {
        return false;
    }
    $.ajax({
        type: "post",
        url: contextPath() + "/editPassword",
        data: {
            username: $("#username").val(),
            verifycode: $("#verifycode").val(),
            password: $("#password").val(),
            verifytype: $("#verifytype").val(),
            password2: $("#password2").val()
        },
        dataType: "json",
        success: function (data) {
            console.log(data);
            if (data.rsp == "9") {
                alert("密码修改成功");
                window.location = contextPath() + "/login.html";
            }else if (data.rsp=="31") {
                $("#error_message").html("<span id='error_span' style='color: red'>两次密码输入不一致</span>");
                $("#errorResult").val(1);
            }else if (data.rsp=="7"){
                $("#error_message").html("<span id='error_span' style='color: red'>该用户不存在</span>");
                $("#errorResult").val(1);
            }else if (data.rsp=="3"){
                $("#error_message").html("<span id='error_span' style='color: red'>验证码错误</span>");
                $("#errorResult").val(1);
            }

        },
        error: function (e) {
            console.log(e)
        }
    });

}