function register() {
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
        url: contextPath() + "/registerUser",
        data: {
            username: $("#username").val(),
            verifycode: $("#verifycode").val(),
            password: $("#password").val(),
            verifytype: $("#verifytype").val(),
            inviteCode: $("#inviteCode").val(),
            bindingId:_bindingId
        },
        dataType: "json",
        success: function (data) {
            console.log(data);

        },
        error: function (e) {
            console.log(e)
        }
    });
}


function checkCompanyCode() {
    $.ajax({
        type: "post",
        url: contextPath() + "/chkRegister",
        data: {inviteCode: $("#inviteCode").val()},
        dataType: "json",
        success: function (data) {
            console.log(data);
            if (!data.message) {
                $("#error_message").html("<span id='error_span' style='color: red'>该注册码不存在</span>");
                $("#errorResult").val(1);
            } else {
                $("#error_span").remove();
                $("#errorResult").val(0);
            }


        }
    });
}




