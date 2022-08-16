// For Firebase JS SDK v7.20.0 and later, measurementId is optional


   app.controller("loginCtrl", function ($scope , $rootScope) {

          // Get all courses
          var emailinput;
          var passwordinput;
        
          $scope.login = function () {
            emailinput = document.querySelector('#inputEmail').value;
            passwordinput = document.querySelector('#inputPassword').value;
            if (emailinput === "" || passwordinput === "") {
              Swal.fire({
                text: "Vui lòng không để trống thông tin đăng nhập!",
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                });
              return;
            }      
            const account = [];                    
            // Lấy database từ bảng users, với điều kiện trường email == với email nhập vào
            db.collection('users').where("email", "==", emailinput).get().then((snapshot) => {
              // Kiểm tra dữ liệu tra về có hay không
              if (snapshot.docs.length > 0) {
                snapshot.docs.forEach(doc => {
                  account.push(doc.data());                       
                  if (emailinput === doc.data().email) {
                    if (passwordinput === doc.data().password) {
                      Swal.fire({
                        text: "Đăng nhập thành công!",
                        icon: 'success',
                        confirmButtonColor: '#3085d6'
                      }).then(function () {
                        localStorage.setItem('name', doc.data().email);                    
                         window.location.reload();
                      });
                    } else {
                      Swal.fire({
                        text: "Sai mật khẩu!",
                        icon: 'question',
                        confirmButtonColor: '#3085d6'
                      });
                    }
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
              };
        
        
          gapi.load('auth2', function () { // Loads the auth2 component of gapi
            gapi.auth2.init({ // initialize the auth2 using your credentials
              client_id: "369999691417-cg9r5mejon9keookk214orn2nus0obgs.apps.googleusercontent.com"
            }).then(function onInit() { // on complete of init
              gapi.signin2.render("g-signin2", { // render the HTML button on the screen providing the ID of the element (g-signin2)
                'scope': 'profile email',
                'width': 460,
                'height': 55,
                'longtitle': true,
                'theme': 'dark',
                'onsuccess': function (googleUser) { // This executes when a user successfully authorizes you to their data by clicking the button and selecting their account.
                  var profile = googleUser.getBasicProfile();
                  // $rootScope.imagegg = profile.getImageUrl();
                  console.log('ID: ' + profile.getId());
                  console.log('Name: ' + profile.getName());
                  console.log('Image URL: ' + profile.getImageUrl());                
                  console.log('Email: ' + profile.getEmail());               
                  localStorage.setItem('name', profile.getEmail());
                  localStorage.setItem('image', profile.getImageUrl());
                  db.collection('users').where("email", "==", profile.getEmail()).get().then((snapshot) => {
                    console.log(snapshot.docs.length);
                    if (snapshot.docs.length != 0) {  
                      window.location.href="#!home";
                      window.location.reload();
                    } else {
                      db.collection('users').add({
                        fullname: profile.getName(),
                        password: "123",
                        email: profile.getEmail(),
                      }).then(function () {                            
                        window.location.href="#!home";
                           window.location.reload();
                      });
                    }
                  });
                
                }
              });
            });
          });
        })