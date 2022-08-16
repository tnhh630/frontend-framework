app.controller("updateCtrl", function ($scope) {
 var currentUser = localStorage.getItem('name');    
 const input = document.querySelector('.update');
 $scope.docid;
 db.collection("users").where("email","==",currentUser).get().then(snapshot=>{
    snapshot.forEach(function(item){
        $scope.docid=item.id;
        console.log(item.id,"/",item.data());
        $scope.password = item.data().password ;
        $scope.email= item.data().email;
        $scope.fullname= item.data().fullname;
        input.fullname.value = item.data().fullname;
        input.password.value = item.data().password;
        input.email.value=item.data().email;
    })
 });


 
    $scope.update = function () {
        
        var email = $scope.email;
        var fullname = $scope.fullname;
        var password = $scope.password;
       
          
                db.collection('users').doc($scope.docid).update({
                    fullname: fullname,
                    password: password,
                    email: email
                }).then(function () {       
                     alert("Cập nhật thành công!");
                    // window.location.href = "#!home";
                    // window.location.reload();
                });
    }
});
