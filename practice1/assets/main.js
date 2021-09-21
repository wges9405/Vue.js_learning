const myHeader = {
    template:`
        <header id="top">
            <div class="header-menu" style="margin:0px auto;padding:1rem;max-width:1200px;">
                <h1 style="margin:0;">
                    <a :href=homePage style="color:black;text-decoration:none;display:flex;">Frontend Practice 1</a>
                </h1>
                <div class="menu-links">
                    <a href="#projects">Projects</a>
                    <a :href=homePage>FAQ </a>
                    <a :href=homePage>Home</a>
                </div>
            </div>
        </header>
    `,
    props: {
        homePage: String,
    },
}

const feature = {
    template:`
        <div class="feature">
            <img :src=fsrc :alt=falt>
            <p class="feature-text">{{ fcontent }}</p>
        </div>
    `,
    props: {
        fid: Number,
        falt: String,
        fsrc: String,
        fcontent: String,
    },
}

const heroContainer = {
    components: {
        feature,
    },
    template:`
        <div class="hero-container">
            <div style="margin:0 0 20px 0">
                <h2 class="hero-title">Become a better frontend developer</h2>
                <p class="hero-sub-title">
                    Take your frontend skills to next level by
                    <strong>recreating real websites</strong>
                    .
                </p>
            </div>
            <div class="features-container">
                <div class="features-inner">
                    <feature v-for="(f, index) in features"
                        :fid="f.id"
                        :falt="f.alt"
                        :fsrc="f.src"
                        :fcontent="f.content"
                    ></feature>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            features: [
                {
                    id: 1,
                    alt: "globe with a search bar",
                    src: "https://images.prismic.io/frontendpractice/f990db40-ba07-479c-b52c-3b2c6caabc89_domain.png?auto=compress,format",
                    content: "Accelerate your skills by recreating real and carefully chosen websites.",
                },
                {
                    id:2,
                    alt: "four part grid of shapes",
                    src:"https://images.prismic.io/frontendpractice/65eee214-bbfe-4f9e-ad0f-70f7785679be_layout.png?auto=compress,format",
                    content:"Improve and test your frontend knowledge with challenges.",
                },
                {
                    id:3,
                    alt: "lightbulb turning on",
                    src:"https://images.prismic.io/frontendpractice/d6e88860-7347-4d32-acf8-aa1f01db8685_idea.png?auto=compress,format",
                    content:"Helpful and curated resources to tackle difficult elements.",
                },
                {
                    id:4,
                    alt: "a color palette sheet",
                    src:"https://images.prismic.io/frontendpractice/8d3c1f70-6ff3-41f0-b9d6-3b46f2899359_pantone.png?auto=compress,format",
                    content:"Save time with color palettes for each individual project.",
                }
            ]
        }
    },
}

const swapBlk = {
    template:`
        <div id="projects" class="subhero-container">
            <div>
                <h3>Below you will find our first collection of ten handpicked websites to recreate. So, are you up for the challenge?</h3>
            </div>
            <div style="padding:30px 0 0 0;">
                <button id="btn" class="swap-btn" :value="Autoswap" @click="emitSwap()">{{ val }}</button>
            </div>
        </div>
    `,
    props: {
        show: Boolean,
    },
    emits: ["swap"],
    data() {
        return {
            val: "",
        }
    },
    methods: {
        emitSwap(event) {
            this.$emit('swap')
        }
    },
    computed: {
        Autoswap() {
            if (this.show) {this.val = "Show Less"}
            else {this.val = "Show More"}
        }
    },
}

const project = {
    template:`
        <div class="project-container" :class="{'less':show, 'even': (p.id%2==0)&&(show)}">
            <div class="project">
                <div class="project-info">
                    <p class="project-bg-number" v-show="show">#{{ p.id }}</p>
                    <!---->
                    <p class="project-number">#{{ p.id }}</p>
                    <h2 class="project-title">{{ p.title }}</h2>
                    <p class="project-subtitle">{{ p.subtitle }}</p>
                    <p>What will you learn?</p>
                    <ul>
                        <li v-for="text in p.list">{{ text }}</li>
                    </ul>
                    <div style="display:flex;justify-content:center;">
                        <a :href=p.detail class="project-detail">View Details</a>
                    </div>
                </div>
                <div class="project-img" v-show="show">
                    <img :srcset=p.src class="img">
                </div>
            </div>
        </div>
    `,
    props: {
        p: Object,
        show: Boolean,
    },
}

const layOut = {
    components: {
        project,
    },
    template:`
        <div :class="{ 'lay-out-less': !show}">
            <project
                v-for="(p, index) in projects"
                :p="p"
                :show="show"
            ></project>
        </div>
    `,
    props: {
        show: Boolean,
    },
    data() {
        return {
            projects: [
                {
                    id: 1,
                    title: "Ableton",
                    subtitle: "About page.",
                    list: ["Typography choices","Spacing","Unique grid layout","Multi-column footer","and more!"],
                    src: "https://www.frontendpractice.com/static/62bbb1ccb81d988f14a524cb2007405e/a69f0/58a92974-13a1-4dc8-82d1-748c92edf44f_fs-1.jpg",
                    detail: 'index.html',
                },
                {
                    id: 2,
                    title: "Starbucks",
                    subtitle: "Rewards page.",
                    list: ["Sticky/fixed header","Tabbed sections","Color choices","Layout practice","and more!"],
                    src: "https://www.frontendpractice.com/static/fb95feb5242c27f9f3795caec0f7a1f4/9c361/d0d045c9-8830-4edb-a481-a6d234284643_w4.png",
                    detail: 'index.html',
                },
                {
                    id: 3,
                    title: "Monogram",
                    subtitle: "Shop page.",
                    list: ["Hero image slider","Image hover transitions","Dropdown menu","Menu hide/appear on scroll","and more!"],
                    src: "https://www.frontendpractice.com/static/997ad2d40b1e297aeab35f8929b1152f/a69f0/d01d3117-ff63-4a83-be38-8c8cc52fba4d_w2.jpg",
                    detail: 'index.html',
                },
                {
                    id: 4,
                    title: "Monstercat",
                    subtitle: "Album release page.",
                    list: ["Dropdown Menus","Alternating styles","Layout practice","Hover states","and more!"],
                    src: "https://www.frontendpractice.com/static/9be251fb48f151e7d71c85dd9cf7f18a/9c361/044e4e72-9a00-4585-a815-ee4aecbce16d_Monstercat%2BAlbum%2BRelease%2Bpage.png",
                    detail: 'index.html',
                },
                {
                    id: 5,
                    title: "Canal Street Market",
                    subtitle: "Home page.",
                    list: ["Unique layout","Hover animations","Typography choices","and more!"],
                    src: "https://www.frontendpractice.com/static/06c7bdbd14258be251139f3b6e2c87f6/9c361/909d6de4-6d1c-4609-8442-afad44b6495b_Market%2BStreet%2BCanal.png",
                    detail: 'index.html',
                },
                {
                    id: 6,
                    title: "Qrates",
                    subtitle: "Why page.",
                    list: ["Accordions","Grid style layout","Unique design","and more!"],
                    src: "https://www.frontendpractice.com/static/941c6d471dad337338b741fa889d34f9/9c361/0f4d948b-bf26-4467-97c9-4d9d33ee1f59_Qrates%2Bwhy.png",
                    detail: 'index.html',
                },
                {
                    id: 7,
                    title: "Backstage Talks",
                    subtitle: "Magazine archive.",
                    list: ["Scroll transitions","Color choices","Fixed content","Minimal layout","and more!"],
                    src: "https://www.frontendpractice.com/static/24a51c6173c67847a3c3f4ae499e947d/9c361/88426856-f72e-4080-92ba-4d67d7a3263a_Backstage%2BTalks.png",
                    detail: 'index.html',
                },
                {
                    id: 8,
                    title: "Déplacé Maison",
                    subtitle: "Home page.",
                    list: ["Unique layout","Cursor animations","Draggable slider","Hover effects","and more!"],
                    src: "https://www.frontendpractice.com/static/20077d18295c4928154836b73e921ede/9c361/347e9d96-407c-4008-9218-4ee3a3edd600_deplace-maison.png",
                    detail: 'index.html',
                },
                {
                    id: 9,
                    title: "Red Square",
                    subtitle: "Agency home page.",
                    list: ["Minimal design","Scroll animations","Hover effects","and more!"],
                    src: "https://www.frontendpractice.com/static/555bff2379d114cf5ee6994467954f1c/9c361/8bc02cef-ba8f-4c10-9369-8d6b9b804cce_Red%2BSquare%2BAgency.png",
                    detail: 'index.html',
                },
                {
                    id: 10,
                    title: "Nintendo",
                    subtitle: "Game info page.",
                    list: ["Dropdown menus","Hover animations","Image lightboxes","Content carousels","and more!"],
                    src: "https://www.frontendpractice.com/static/0253e1aabdff5a88940344e6083b7a66/9c361/1e246b80-6aad-42ab-90d7-d02d663bc3a2_Nintendo%2Bgame%2Bpage.png",
                    detail: 'index.html',
                },
            ]
        }
    },
}

const myMain = {
    components: {
        heroContainer,
        swapBlk,
        layOut,
    },
    template:`
        <main>
            <hero-container></hero-container>
            <swap-blk :show="show" @swap="swapLayout"></swap-blk>
            <lay-out :show="show"></lay-out>
            <a href="#top" id="top-btn" v-show="topBtn">⬆</a>
        </main>
    `,
    data() {
        return {
            show:true,
            topBtn:false,
        }
    },
    created() {
        window.addEventListener("scroll", this.handleScroll);
    },
    methods: {
        swapLayout(event) {
            this.show = !this.show
        },
        handleScroll(event) {
            this.topBtn  = window.scrollY > 0 ? true : false;
        },
    }
}

const myFooter = {
    template:`
        <footer>
            <p>
                2021
                <a :href=homePage>Frontend Practice 1</a>
                By
                <a :href=myGithub>瑞</a>
                with Vue3.0
            </p>
            <p>
                Reference:
                <a :href=reference>Frontend Practice</a>
            </p>
        </footer>
    `,
    props: {
        homePage: String,
        myGithub: String,
        reference: String,
    },
}

const app = {
  components: {
      myHeader,
      myMain,
      myFooter,
  },
  data() {
      return {
        homePage: 'index.html',
        myGithub: 'https://github.com/wges9405',
        reference: 'https://www.frontendpractice.com/',
      }
  },
};

Vue.createApp(app).mount('#app');