const myHeader = {
    template:`
        <div class="header-menu" style="margin:0 auto;padding:1rem;max-width:1200px;">
            <h1>
                <a href="index.html" style="color:black;text-decoration:none;display:flex;">Frontend Practice 1</a>
            </h1>
            <div class="menu-links">
                <a href="index.html" >Projects</a>
                <a href="index.html" >FAQ </a>
                
                <a href="index.html" >Home</a>
            </div>
        </div>
    `
};

const app = {
  components: {
      myHeader,
  }  
};

Vue.createApp(app).mount('#app');