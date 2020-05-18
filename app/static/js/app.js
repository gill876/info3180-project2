/* Add your Application JavaScript */
Vue.component('app-header', {
    template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <a class="navbar-brand" href="#"> <img id="camera_logo" src="/static/images/photography.png" alt="camera logo"> Photogram</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item active">
            <router-link class="nav-link" to="/explore">Explore <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item active">
            <router-link class="nav-link" to="/users/{user_id}">My Profile <span class="sr-only">(current)</span></router-link>
          </li>
          <li v-if="!status_log" class="nav-item active">
            <router-link class="nav-link" to="/login">Login <span class="sr-only">(current)</span></router-link>
          </li>
          <li v-else class="nav-item active">
            <router-link class="nav-link" to="/logout">Logout <span class="sr-only">(current)</span></router-link>
          </li>
        </ul>
      </div>
    </nav>
    `,

    computed: {
        status_log: function() {
            if (sessionStorage.getItem('token')) {
                return true;
            } else {
                return false;
            }
        }
    }
});

Vue.component('app-footer', {
    template: `
    <footer>
        <div class="container">
            <p>Copyright &copy; Flask Inc.</p>
        </div>
    </footer>
    `
});

const Logout = Vue.component('logout', {
    template: `
    <div>Logging out...</div>
    `,
    methods: {
        logOut: function () {
            let self = this;
            fetch("/api/auth/logout", { method: 'GET', headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }})
                .then(function (response) {
                    return response.json();
                })
                .then(function (response) {
                    let result = response.data;
                    alert(result.user.username + " logged out!")
                    sessionStorage.removeItem('token');
                    console.info('Token removed from sessionStorage.');
                    router.push("/")
                    location.reload()
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    },

    beforeMount(){
        this.logOut()
    }
});

const Home = Vue.component('home', {
   template: `
    <div id="home_page">
        <div id="home_img">
            <img id="mountain_home" src="/static/images/mac-osx-sierra-lu-1366x768.jpg" alt="mountains homepage">
        </div>

        <div id="home_options">
            <h2><img id="camera_logo" src="/static/images/photography.png" alt="camera logo"> Photogram</h2>
            <hr>
            <p>Share your favorite moments with friends, family and the world.</p>

            <button id="home_btn1" @click="$router.push('register')" type="button" class="btn btn-success">Register</button>
            <button id="home_btn2" @click="$router.push('login')" type="button" class="btn btn-primary">Login</button>
        </div>
    </div>
   `,
    data: function() {
       return {}
    }
});

const Register = Vue.component('register', {
    template: `
     <div id="registration">
        <h2 id="reg_head">Register</h2>
        <div>{{messages}}</div>
        <div id="reg">
            <form @submit.prevent="regForm" method="POST" enctype="multipart/form-data" id="reg_form">
                <p class="reg_form">
                    <label for="username">Username:</label> <br>
                    <input class="form_ele" name="username" required placeholder="Enter username">
                </p>

                <p class="reg_form">
                    <label for="password">Password:</label> <br>
                    <input name="password" type="password" class="form_ele" required placeholder="Enter password">
                </p>

                <p class="reg_form">
                    <label for="firstname">Firstname:</label> <br>
                    <input name="firstname" class="form_ele" required placeholder="First name">
                </p>

                <p class="reg_form">
                    <label for="lastname">Lastname:</label> <br>
                    <input name="lastname" class="form_ele" required placeholder="Last name">
                </p>

                <p class="reg_form">
                    <label for="email">Email:</label> <br>
                    <input name="email" class="form_ele" required placeholder="Enter email">
                </p>

                <p class="reg_form">
                    <label for="location">Location:</label> <br>
                    <input name="location" class="form_ele" required placeholder="Enter location">
                </p>

                <p class="reg_form">
                    <label for="biography">Biography:</label> <br>
                    <textarea name="biography" class="form_ele" placeholder="add multiple lines"></textarea>
                </p>

                <p class="reg_form">
                    <label for="photo">Photo:</label> <br>
                    <input id="photo" type="file" name="photo">
                </p>

                <button type="submit" id="reg_button" class="btn btn-success">Register</button>

            </form>
        </div>
     </div>
    `,
     data: function() {
        return {
            messages: ''
        }
     },

     methods: {
        regForm: function(){
            //console.log("hi hello")
            let self = this;
            let reg_form = document.getElementById('reg_form');
            let form_data = new FormData(reg_form);
            fetch("/api/users/register", { method: 'POST', body: form_data, headers: { 'X-CSRFToken': token }, credentials: 'same-origin'}).then(function (response) {
                return response.json();
                }).then(function (jsonResponse) {
                    // display a success message
                    console.log(jsonResponse);
                    self.messages = jsonResponse;
                    alert("User Registered!")
                    router.push("login")
                }).catch(function (error) {
                        console.log(error);
                    });
        }
     }
 });

 const Login = Vue.component('login', {
    template: `
     <div id="login">
        <h2 id="log_head">Login</h2>
        <div>{{messages}}</div>
        <div id="log">
            <form @submit.prevent="loginForm" method="POST" id="log_form">

                <p class="log_info">
                    <label  id="log_u" for="username">Username:</label> <br>
                    <input name="username" class="log_ele" required placeholder="Enter username">
                </p>

                <p class="log_info">
                    <label for="password">Password:</label> <br>
                    <input name="password" type="password" class="log_ele" required placeholder="Enter password">
                </p>

                <button id="log_button" type="submit" class="btn btn-success">Login</button>

            </form>
        </div>
     </div>
    `,
     data: function() {
        return {
            messages: '',
            token: ''
        }
     },

    methods: {
        loginForm: function(){
            let self = this;
            let log_form = document.getElementById('log_form');
            let form_data = new FormData(log_form);
            fetch("/api/auth/login", { method: 'POST', body: form_data, headers: { 'X-CSRFToken': token }, credentials: 'same-origin'}).then(function (response) {
                return response.json();
                }).then(function (jsonResponse) {
                    // display a success message
                    console.log(jsonResponse);
                    self.messages = jsonResponse;
                    let jwt_token = jsonResponse.data.token;

                    // We store this token in sessionStorage so that subsequent API requests
                    // can use the token until it expires or is deleted.
                    sessionStorage.setItem('token', jwt_token);
                    console.info('Token generated and added to sessionStorage.');
                    self.token = jwt_token;
                    alert("Logged In!")
                    router.push("explore")
                    location.reload()
                }).catch(function (error) {
                        console.log(error);
                    });
        }
     }
 });

 const Explore = Vue.component('explore', {
    template: `
    <div id="explore">
       <div id="exp">
           <ul>
                <li>
                    <div id="explore_blank">
                        <p id="post_user">
                                <img id="profile_img" src="/static/images/icons8-neutral-person-dark-skin-tone-48.png" alt="profile img">   
                                profile name
                        </p>

                        <img id="user_post" src="/static/images/XX---Grid---NYC-2560x1600.jpg" alt="user post">

                        <p id="post_para">
                            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium 
                            voluptatum delenitiatque corrupti quos dolores et quas
                        </p>

                        <div id="post_info">
                                <div id="left_side">
                                        <p id="left_data"><img id="empty_heart" src="/static/images/icons8-heart-outline-50.png" alt="empty like"> 10 likes</p>
                                </div>

                                <div id="right_side">
                                        <p id="right_data">16 May 2020</p>
                                </div>
                        </div>
                    </div>
                </li>
            </ul>

            <div id="new_post_btn">
                <button id="home_btn2" type="button" class="btn btn-primary">New Post</button>
            </div>
       </div>
    </div>
   `,
     data: function() {
        return {}
     }
 });

 const MyProfile = Vue.component('myprofile', {
    template: `
     <div id="myprofile">
        <div id="mypro">

            <div id="mypro_info">

                <div id="mypro_image">
                    <img id="mypro_img" :src="'/static/uploads/' + profile_img" alt="profile img">  
                </div>

                <div id="mypro_perdata">
                    <h3>
                        {{fullname}}
                    </h3>

                    <p id="location_info">
                        Kingston, Jamaica
                    </P>

                    <p id="member_info">
                        Member since May 2020
                    </p>

                    <p>
                        This is my short biography so you can learn more about me.
                    </p>
                </div>

                <div id="mypro_phodata">

                    <div id="data_tracker">

                        <div id="post_count">
                            <p id="pos_num">
                                6
                            </p>

                            <p>
                                post
                            </p>
                        </div>

                        <div id="follow_count">
                            <p id="fol_num">
                                10
                            </p>

                            <p>
                                followers
                            </p>
                            
                        </div>
                    </div>

                    <button id="mypro_btn" type="button" class="btn btn-primary">Follow</button>

                </div>

            </div>

            <div id="mypro_images">
                <ul>
                    <li v-for="post in posts">
                        <img id="img_box" v-bind:src="'/static/photos/' + post"/>
                    </li>
                </ul>
            </div>
            <!--<img src="/static/js/test.jpg"/>-->
        </div>
     </div>
    `,
     data: function() {
        return {
            posts: [],
            profile_img: '',
            fullname: 'Failed',
            followers: 0,
            following: 0,
            biography: '',
            joined: ''
        }
     },

     created: function(){
        let self = this;
        fetch('/api/secure', {
            'headers': {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        }).then(function (response) {
                return response.json();
            }).then(function (response) {
                let result = response.data;
                console.log("User ID retrieved");
                self.user_id = result.user.id
                return result.user.id
            }).then( function(user_id){
                let self = this;
                fetch("/api/users/" + user_id + "/posts", { method: 'GET', headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }})
                .then(function (response) {
                    return response.json();
                    })
                    .then(function (jsonResponse) {
                        // display a success message
                        console.log(jsonResponse.posts);
                        console.log(jsonResponse.profile_img);
                        self.posts = jsonResponse.posts;
                        self.profile_img = jsonResponse.profile_img;
                        self.fullname = jsonResponse.fullname;
                    })
                    .catch(function (error) {
                            console.log(error);
                        });
            }).catch(function (error) {
                console.log(error);
            })
     }
 });

 const NewPosts = Vue.component('newposts', {
    template: `
     <div id="newposts">
        <h2 id="newp_head">New Posts</h2>
        <div class="result alert alert-info">
            {{ result }}
        </div>
        <div id="newp">
            <form @submit.prevent="newPost" method="POST" enctype="multipart/form-data" id="new_posts">

                <p class="newp_info">
                    <label id="newp_photo" for="photo">Photo:</label> <br>
                    <input id="newp_ele" type="file" name="photo">
                </p>

                <p class="newp_info">
                    <label for="caption">Caption:</label> <br>
                    <textarea name="caption" id="newp_txt" placeholder="write a caption..."></textarea>
                </p>

                <button id="newp_button" type="submit" class="btn btn-success">Submit</button>

            </form>
        </div>
     </div>
    `,
     data: function() {
        return {
            messages: '',
            result: ''
        }
     },

     methods: {
        newPost: function () {
            let self = this;
            fetch('/api/secure', {
                'headers': {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                }
            }).then(function (response) {
                    return response.json();
                }).then(function (response) {
                    let result = response.data;
                    console.log("User ID retrieved");
                    self.user_id = result.user.id
                    return result.user.id
                }).then( function(user_id){
                    let self = this;
                    let new_posts = document.getElementById('new_posts');
                    let form_data = new FormData(new_posts);
                    fetch("/api/users/" + user_id + "/posts", { method: 'POST', body: form_data, headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token'), 'X-CSRFToken': token }, credentials: 'same-origin'}).then(function (response) {
                        return response.json();
                        }).then(function (jsonResponse) {
                            // display a success message
                            console.log(jsonResponse);
                            self.messages = jsonResponse;
                        }).catch(function (error) {
                                console.log(error);
                            });
                }).catch(function (error) {
                    console.log(error);
                })
        }
     }
 });

const NotFound = Vue.component('not-found', {
    template: `
    <div>
        <h1>404 - Not Found</h1>
    </div>
    `,
    data: function () {
        return {}
    }
})

// Define Routes
const router = new VueRouter({
    mode: 'history',
    routes: [
        {path: "/", component: Home},
        // Put other routes here
        {path: "/register", component: Register},

        {path: "/login", component: Login},

        {path: "/logout", component: Logout},

        {path: "/explore", component: Explore},

        {path: "/users/{user_id}", component: MyProfile},

        {path: "/posts/new", component: NewPosts},

        // This is a catch all route in case none of the above matches
        {path: "*", component: NotFound}
    ]
});

// Instantiate our main Vue Instance
let app = new Vue({
    el: "#app",
    router,
    data: function(){
        return {
            user_id: 0
        }
    }
});
