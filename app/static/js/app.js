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
            <img src="/static/images/mountains.jpg" alt="mountains homepage">
        </div>

        <div id="home_options">
            <img id="camera_logo" src="/static/images/photography.png" alt="camera logo">
            <h2>Photogram</h2>
            <hr>
            <p>Share your favorite moments with friends, family and the world.</p>

            <button type="button" class="btn btn-success">Register</button>
            <button type="button" class="btn btn-primary">Login</button>
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
        <h2>Register</h2>
        <div id="reg">
            <form @submit.prevent="reg_form" method="POST" enctype="multipart/form-data" id="reg_form">
                <p>
                    <label for="username">Username:</label> <br>
                    <input v-model="username" required placeholder="edit me">
                </p>

                <p>
                    <label for="password">Password:</label> <br>
                    <input v-model="password" required placeholder="edit me">
                </p

                <p>
                    <label for="first name">Firstname:</label> <br>
                    <input v-model="first_name" required placeholder="edit me">
                </p>

                <p>
                    <label for="last name">Lastname:</label> <br>
                    <input v-model="last_name" required placeholder="edit me">
                </p>

                <p>
                    <label for="email">Email:</label> <br>
                    <input v-model="email" required placeholder="edit me">
                </p>

                <p>
                    <label for="location">Location:</label> <br>
                    <input v-model="location" required placeholder="edit me">
                </p>

                <p>
                    <label for="biography">Biography:</label> <br>
                    <textarea v-model="biography" placeholder="add multiple lines"></textarea>
                </p>

                <p>
                    <label for="photo">Photo:</label> <br>
                    <input type="file" name="photo">
                </p>

                <button type="button" class="btn btn-success">Register</button>

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
        <h2>Login</h2>
        <div id="log">
            <form @submit.prevent="log_form" method="POST" enctype="multipart/form-data" id="log_form">

                <p>
                    <label for="username">Username:</label> <br>
                    <input v-model="username" required placeholder="edit me">
                </p>

                <p>
                    <label for="password">Password:</label> <br>
                    <input v-model="password" required placeholder="edit me">
                </p>

            </form>
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
        <h2>Login</h2>
        <div id="newp">
            <form @submit.prevent="new_posts" method="POST" enctype="multipart/form-data" id="new_posts">

                <p>
                    <label for="photo">Photo:</label> <br>
                    <input type="file" name="photo">
                </p>

                <p>
                    <label for="caption">Caption:</label> <br>
                    <textarea v-model="caption" placeholder="write a caption"></textarea>
                </p>

                <button type="button" class="btn btn-success">Submit</button>

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
