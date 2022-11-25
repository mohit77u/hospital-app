$(function(){
    // signupForm
    if($('#signupForm').length){
        $("#signupForm").validate({
            rules: {
                name: {
                    required: true,
                },
                phone: {
                    required: true,
                    number: true,
                },
                password: {
                    required: true,
                },
                password_confirmation: {
                    required: true,
                },
            }
        });
    }

    // loginForm
    if($('#loginForm').length){
        $("#loginForm").validate({
            rules: {
                phone: {
                    required: true,
                    number: true,
                },
                password: {
                    required: true,
                }
            }
        });
    }

    // report Form
    if($('#reportForm').length){
        $("#reportForm").validate({
            rules: {
                status: {
                    required: true,
                }
            }
        });
    }

});