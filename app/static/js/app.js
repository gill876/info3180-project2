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
          <li class="nav-item active">
            <router-link class="nav-link" to="/logout">Logout <span class="sr-only">(current)</span></router-link>
          </li>
        </ul>
      </div>
    </nav>
    `
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

            <button id="home_btn1" type="button" class="btn btn-success">Register</button>
            <button id="home_btn2" type="button" class="btn btn-primary">Login</button>
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
        <div id="reg">
            <form @submit.prevent="reg_form" method="POST" enctype="multipart/form-data" id="reg_form">
                <p class="reg_form">
                    <label for="username">Username:</label> <br>
                    <input class="form_ele" v-model="username" required placeholder="Enter username">
                </p>

                <p class="reg_form">
                    <label for="password">Password:</label> <br>
                    <input class="form_ele" v-model="password" required placeholder="Enter password">
                </p>

                <p class="reg_form">
                    <label for="first name">Firstname:</label> <br>
                    <input class="form_ele" v-model="first_name" required placeholder="First name">
                </p>

                <p class="reg_form">
                    <label for="last name">Lastname:</label> <br>
                    <input class="form_ele" v-model="last_name" required placeholder="Last name">
                </p>

                <p class="reg_form">
                    <label for="email">Email:</label> <br>
                    <input class="form_ele" v-model="email" required placeholder="Enter email">
                </p>

                <p class="reg_form">
                    <label for="location">Location:</label> <br>
                    <input class="form_ele" v-model="location" required placeholder="Enter location">
                </p>

                <p class="reg_form">
                    <label for="biography">Biography:</label> <br>
                    <textarea id="form_bib" class="form_ele" v-model="biography" placeholder="add multiple lines"></textarea>
                </p>

                <p class="reg_form">
                    <label for="photo">Photo:</label> <br>
                    <input type="file" name="photo">
                </p>

                <button id="reg_button" type="button" class="btn btn-success">Register</button>

            </form>
        </div>
     </div>
    `,
     data: function() {
        return {}
     }
 });

 const Login = Vue.component('login', {
    template: `
     <div id="login">
        <h2 id="log_head">Login</h2>
        <div id="log">
            <form @submit.prevent="log_form" method="POST" enctype="multipart/form-data" id="log_form">

                <p class="log_info">
                    <label  id="log_u" for="username">Username:</label> <br>
                    <input class="log_ele" v-model="username" required placeholder="Enter username">
                </p>

                <p class="log_info">
                    <label for="password">Password:</label> <br>
                    <input class="log_ele" v-model="password" required placeholder="Enter password">
                </p>

                <button id="log_button" type="button" class="btn btn-success">Login</button>

            </form>
        </div>
     </div>
    `,
     data: function() {
        return {}
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
                    <img id="profile_img" src="/static/images/icons8-neutral-person-dark-skin-tone-48.png" alt="profile img">  
                </div>

                <div id="mypro_perdata">
                    <p>
                        John Brown
                    </p>

                    <p>
                        Kingston, Jamaica
                    </P>

                    <p>
                        Member since May 2020
                    </p>

                    <p>
                        This is my short biography so you can learn more about me.
                    </p>
                </div>

                <div id="mypro_phodata">
                    <p>
                        6
                    </p>
                    <p>
                        post
                    </p>

                    <p>
                        10
                    </p>

                    <p>
                        followers
                    </p>

                    <button id="home_btn2" type="button" class="btn btn-primary">Follow</button>
                </div>

            </div>

            <div id="mypro_images">
            </div>

        </div>
     </div>
    `,
     data: function() {
        return {}
     }
 });

 const NewPosts = Vue.component('newposts', {
    template: `
     <div id="newposts">
        <h2 id="newp_head">New Posts</h2>
        <div id="newp">
            <form @submit.prevent="new_posts" method="POST" enctype="multipart/form-data" id="new_posts">

                <p class="newp_info">
                    <label id="newp_photo" for="photo">Photo:</label> <br>
                    <input id="newp_ele" type="file" name="photo">
                </p>

                <p class="newp_info">
                    <label for="caption">Caption:</label> <br>
                    <textarea id="newp_txt" v-model="caption" placeholder="write a caption..."></textarea>
                </p>

                <button id="newp_button" type="button" class="btn btn-success">Submit</button>

            </form>
        </div>
     </div>
    `,
     data: function() {
        return {}
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

        {path: "/explore", component: Explore},

        {path: "/users", component: MyProfile},

        {path: "/posts/new", component: NewPosts},

        // This is a catch all route in case none of the above matches
        {path: "*", component: NotFound}
    ]
});

// Instantiate our main Vue Instance
let app = new Vue({
    el: "#app",
    router
});
