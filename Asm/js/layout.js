var app = angular.module('myapp',['ngRoute']);
app.controller("layoutCtrl",function($scope,$window){
    $window.onload = function () {
        console.log("is called on page load.");
        gapi.load('auth2', function initSigninV2() {
            gapi.auth2
                .init({
                    client_id:
                        "369999691417-cg9r5mejon9keookk214orn2nus0obgs.apps.googleusercontent.com",
                })
                .then(function (authInstance) {
                    // now auth2 is fully initialized
                });
        });
    };
    var currentUser = localStorage.getItem('name');    
    $scope.check;
    $scope.viewLoaded = function () {
    }
    if (currentUser != null) {
        $scope.logout = function () {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
                localStorage.clear();
            });
            Swal.fire({
                
                icon: 'success',
                title: 'Bạn đã đăng xuất tài khoản!',
                heightAuto: true,
                width: 500,
                timer: 1000
            }).then(function () {
                
                window.location.href="#!/account/login";
                window.location.reload();
            });
        }
    } 
 
 
});
app.config(function ($routeProvider){
    $routeProvider  
    .when("/about",{
        templateUrl: "html/about.html"
    })
    .when("/contact",{
        templateUrl: "html/contact.html"
    })
    .when("/feedback",{
        templateUrl: "html/feedback.html"
    })
    .when("/faq",{
        templateUrl: "html/faq.html"
    })
    .when("/test", {
        templateUrl: "html/test.html", controller:"tnctrl"
    })
    .when("/detailResult/:idch", {
        templateUrl: "html/detailResult.html" ,controller:"dtCtrl"
    })
    .when("/resultTest", {
        templateUrl: "html/resultTest.html" 
    })
    .when("/account/login",{
        templateUrl: "html/account/login.html" , controller:"loginCtrl"
    })
    .when("/account/register",{
        templateUrl: "html/account/register.html" , controller:"dangkyCtrl"
    })
    .when("/account/forgot",{
        templateUrl: "html/account/forgot.html" , controller:"forgotpasswordCtrl"
    })    
    .when("/account/update",{
        templateUrl: "html/account/update.html" , controller:"updateCtrl"
    })
     .when("/home",{
           templateUrl: "html/home.html" ,  controller:"homeCtrl"
       })
   
    // .otherwise({
    //     redirectTo: "/home"
    // });
  
});
app.controller("subjectctrl", function ($scope, $http , $rootScope) {

    $rootScope.cacmonhoc = [];
    $http.get("js/cacmonhoc.js").then(function (d) {
        $rootScope.cacmonhoc = d.data;
    });
    $scope.pageSize=8;
    $scope.start=0;
    $scope.next = function(){       
        if($scope.start < $rootScope.cacmonhoc.length - $scope.pageSize)
        $scope.start +=$scope.pageSize;
    }
    $scope.prev = function(){
        if($scope.start > 0)
        $scope.start -=$scope.pageSize;
    }
    $scope.first = function(){
        $scope.start =0;
    }
    $scope.last = function(){
        sotrang= Math.ceil($rootScope.cacmonhoc.length/$scope.pageSize)
        $scope.start =(sotrang-1) * $scope.pageSize;
    }
  
    // Lấy database từ bảng users, với điều kiện trường email == với email nhập vào
     var currentUser = localStorage.getItem('name'); 
    var idmonhoc = "";
    $scope.test = function(id,name,$timeout) {    
       
        if (currentUser == null) {       
            Swal.fire({
                icon: 'error',
                title: 'Bạn chưa đăng nhập!',
                text: 'Hãy quay lại sau khi đăng nhập!'
            });
        } else {
            Swal.fire({
                title: 'Bắt đầu thi?',
                text: "Bạn đã sẵn sàng!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Có! Bắt đầu thi.',
                cancelButtonText: 'Chưa'
            }).then((result) => {
                if (result.value) {
                    idmonhoc=id;
                       window.location.href= "#!test/?id="+idmonhoc;   
                      
                }
            })
        }
    }
});

app.run(function($rootScope){
    
    $rootScope.$on('$routeChangeStart',function(){
        $rootScope.loading = true;
    });
    $rootScope.$on('$routeChangeSuccess',function(){
        $rootScope.loading = false;
    });
    $rootScope.$on('$routeChangeError',function(){
        $rootScope.loading = false;
        alert("lỗi dòng 112 layout.js");
    });
  
});
app.controller("homeCtrl",function($rootScope){
    $rootScope.email= localStorage.getItem('name');
    $rootScope.imagegg = localStorage.getItem('image');
  
})





app.controller("tnctrl",function($scope,$http,$routeParams,$rootScope,$timeout){
    
  
     $rootScope.cacmonhoc.forEach(ar => {
         if (ar.Id == $routeParams.id) {
             $rootScope.subject = angular.copy(ar);
            return;
        }
     });
    $rootScope.caccauhoi=[];
    $scope.random10CauHoi=[];
    $scope.idMH= $routeParams.idMH;
    $scope.tenMH=$routeParams.tenMH;
    $http.get("database/"+ $routeParams.id +".js").then(
        function(d){
            $rootScope.caccauhoi = d.data;
            // $scope.soCauHoi = $scope.caccauhoi.length-1;
            // for(let i =0; i<10 ; i++){
            //      var rand = Math.floor(Math.random() * $scope.soCauHoi);
            //     $scope.random10CauHoi[i] = angular.copy($scope.caccauhoi[rand]);            
            // }            
        },
        function(d){
            alert("lỗi dòng 191 layout.js");
        }
    );
    
    $rootScope.begin=0;
    $scope.next = (function(){  
        if($scope.begin < 9)
        $rootScope.begin++;
    })
    $scope.prev = (function(){  
        if($scope.begin > 0)
        $rootScope.begin--;
    })
    $rootScope.testMark = 0;  
    $scope.timer = 900;
    $rootScope.elem = [];

    $scope.move = function(x) {
        if($scope.begin < 9)
        $rootScope.begin = x;
    };
    $rootScope.userChoose=[];
    $scope.mark = function() {
        if ($rootScope.caccauhoi[$rootScope.begin].AnswerId == $rootScope.elem[$rootScope.begin].answer) {
            Swal.fire({
                icon: 'success',
                title: 'Chúc mừng bạn đã chọn đúng!',
                text: 'Bạn được cộng ' + $rootScope.caccauhoi[$rootScope.begin].Marks + ' điểm',
                showConfirmButton: false,
                timer: 1200
            });
            $rootScope.testMark += $rootScope.caccauhoi[$rootScope.begin].Marks;
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Rất tiếc! bạn đã chọn sai đáp án.',
                showConfirmButton: false,
                timer: 1200
            });
        }      
        
        $rootScope.userChoose.push({"Cauchon" :$rootScope.elem[$rootScope.begin].answer , "Cauhoi" : $rootScope.begin});
        console.log("choose:"+$rootScope.begin );
        console.log($rootScope.userChoose );
        
    };
    $scope.finish = function() {
        $timeout.cancel(mytimeout);
        Swal.fire({
            title: 'Bạn có chắc không?',
            text: "Bạn thật sự muốn kết thúc bài thi!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Có',
            cancelButtonText: 'Không'
        }).then((result) => {
            if (result.value) {
                $scope.timer = 3;
                Swal.fire({
                    title: 'Kết thúc bài thi',
                    text: "Bài thi sẽ kết thúc sau 3 giây",
                    icon: 'success',
                    showConfirmButton: false,
                    // closeOnClickOutside: false,
                    allowOutsideClick: false,
                    timer: 4000
                    
                });             
                window.location.href= "#!resultTest"; 
                 alert("bạn nhận được: " + $rootScope.testMark + "điểm" );         
            }
        });
    };
   
    $scope.min = 0;
    $scope.sec = 30;
    $scope.onTimeout = function () {
        $scope.sec--;
        mytimeout = $timeout($scope.onTimeout, 600);
        if ($scope.sec < 0) {
            $scope.min--;
            $scope.sec = 59;
        }
        if ($scope.min === 0 && $scope.sec === 0) {
            alert("Đã hết giờ làm bài! Bạn nhận được: " + $rootScope.testMark + "điểm");
            $timeout.cancel(mytimeout);
            window.location.href= "#!resultTest"; 
        }
    }
    var mytimeout = $timeout($scope.onTimeout, 600);

    $scope.stop = function () {
        $timeout.cancel(mytimeout);
    }
    
});
app.controller("dtCtrl",function($scope, $routeParams,$rootScope){
    $rootScope.id= $routeParams.idch;  
    $scope.listcauhoi = [];
    for(var i =0;i < 10 ; i++){
        $scope.listcauhoi[i] = angular.copy($rootScope.caccauhoi[i]);
    }
    
    $rootScope.cauhoichon = [];
    // gộp 2 mảng lại thành 1
    for(var i = 0; i< 10 ; i++){
        if($scope.listcauhoi[i].Id == $rootScope.id){
            $rootScope.cauhoichon.push({
                "Text": $scope.listcauhoi[i].Text,
                "AnswerId": $scope.listcauhoi[i].AnswerId,
                "Answers" : $scope.listcauhoi[i].Answers,
                "Cauchon" : $rootScope.userChoose[i].Cauchon               
            })
            
        }
    }  
  
    console.log($rootScope.cauhoichon);

//    for(var i = 0 ; i < $rootScope.userChoose.length ; i++){
//        $rootScope.cauhoichon[i].Cauchon = $rootScope.userChoose[i].Cauchon;
//    }
    console.log($rootScope.cauhoichon);
  
});
app.controller('forgotpasswordCtrl', function($rootScope, $scope) {
    $scope.getPass = function() {      
        var emailinput;
        emailinput = document.querySelector('#inputEmail').value;
        if (emailinput === "" ) {
            Swal.fire({
              text: "Vui lòng không để trống thông tin đăng nhập!",
              icon: 'warning',
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              });
            return;
          }      
          const account = [];   
     db.collection('users').where("email", "==", emailinput).get().then((snapshot) => {
        // Kiểm tra dữ liệu tra về có hay không
        if (snapshot.docs.length > 0) {
             snapshot.docs.forEach(doc => {
            account.push(doc.data());                       
            if (emailinput === doc.data().email) {            
                Swal.fire({
                icon: 'success',
                title: 'Lấy lại tài khoản thành công!',
                text: 'Mật khẩu: ' + doc.data().password,
                confirmButtonColor: '#3085d6'
                }).then(function () {
                  localStorage.setItem('name', doc.data().email);
                  window.location.href="#!/home";
                  window.location.reload();
                });          
            }else{
                Swal.fire({
                icon: 'error',
                title: 'Lấy lại tài khoản thất bại!',
                text: 'Vui lòng nhập lại thông tin',
                  });
            }
          });
        } else {
            Swal.fire({
                text: "Email không tồn tại!",
                icon: 'question',
                confirmButtonColor: '#3085d6'
              });
        }
       });
    }
});


