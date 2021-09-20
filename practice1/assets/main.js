const myHeader = {
    template:`
        <header id="top">
            <div class="header-menu" style="margin:0px auto;padding:1rem;max-width:1200px;">
                <h1 style="margin:0;">
                    <a :href=homePage style="color:black;text-decoration:none;display:flex;">Frontend Practice 1</a>
                </h1>
                <div class="menu-links">
                    <a :href=project>Projects</a>
                    <a :href=homePage>FAQ </a>
                    <a :href=homePage>Home</a>
                </div>
            </div>
        </header>
    `,
    props: {
        homePage: String,
    },
    data() {
        return {
            project:"#top",
        }
    },
    created () {
        this.project = this.homePage+"#top"
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
    }
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

const layoutBlk = {
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
            if (!this.show) {this.val = "Show Less"}
            else {this.val = "Show More"}
        }
    },
}

const myMain = {
    components: {
        heroContainer,
        layoutBlk,
    },
    template:`
        <main>
            <hero-container></hero-container>
            <layoutBlk :show="show" @swap="swapLayout"></layoutBlk>
            <p v-if="show">More</p>
            <p v-else>Less</p>
        </main>
    `,
    data() {
        return {
            show:false,
        }
    },
    methods: {
        swapLayout(event) {
            this.show = !this.show
        }
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