app.controller("dangkyCtrl", function ($scope) {
    $scope.dangky = function () {
        var email = $scope.email;
        var fullname = $scope.fullname;
        var password = $scope.password;
        var repassword = $scope.repassword;
        console.log(email);
        console.log(fullname);
        console.log(password);
        console.log(repassword);

        if (email == null || fullname == null || password == null || repassword == null) {
            alert("Vui lòng nhập thông tin không bỏ trống!!!");
            return;
        } else if (password != repassword) {
            alert("Mật khẩu không trùng nhau!!!");
            return;
        }

        db.collection('users').where("email", "==", email).get().then((snapshot) => {
            console.log(snapshot.docs.length);
            if (snapshot.docs.length > 0) {
                alert("Email đã tồn tại!!");
                return;
            } else {
                alert("Đăng ký thành công!");
                db.collection('users').add({
                    fullname: fullname,
                    password: password,
                    email: email,
                }).then(function () {       
                    localStorage.setItem('name', email);
                    window.location.href = "#!home";
                    window.location.reload();
                });
            }
        });
    }
});
