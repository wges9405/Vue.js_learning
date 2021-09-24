const myNav = {
    template:`
        <nav :style="{'transform':transform}">
            <div class="nav-bg"></div>
            <div class="nav-content">
                <hr>
                <div class="menu-title">
                    <div style="display:flex;flex-direction:row;justify-content:center;">
                        <div class="list-icon">
                            
                        </div>
                        <div class="list list-content">
                            <div>Vue Practice 2</div>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="menu-list">
                    <a class="menu-a"
                        v-for="(m, index) in menuList"
                        :href=m.href
                        :class="{'theme-light':curPage==m.listTitle}"
                        @click.prevent="changePage(m.listTitle)">
                        <div class="list list-icon">
                            <i class="mdi" :class=" m.icon"></i>
                        </div>
                        <div class="list list-content">
                            <div class="list-title">{{ m.listTitle }}</div>
                            <div class="list-subtitle">{{ m.listSubTitle }}</div>
                        </div>
                    </a>
                </div>
            </div>
        </nav>
    `,
    emits: ["change"],
    methods: {
        changePage(newPage) {this.$emit('change', newPage)},
    },
    props: {
        curPage: String,
        transform: String,
    },
    data() {
        return {
            menuList: [
                {
                    id: 0,
                    icon: "mdi-view-dashboard",
                    listTitle: "Dashboard",
                    listSubTitle: "",
                    href: "",
                },
                {
                    id: 1,
                    icon: "mdi-account",
                    listTitle: "User Profile",
                    listSubTitle: "",
                    href: "",
                },
                {
                    id: 2,
                    icon: "mdi-clipboard-outline",
                    listTitle: "Regular Tables",
                    listSubTitle: "",
                    href: "",
                },
                {
                    id: 3,
                    icon: "mdi-format-font",
                    listTitle: "Typography",
                    listSubTitle: "",
                    href: "",
                },
                {
                    id: 4,
                    icon: "mdi-chart-bubble",
                    listTitle: "Icons",
                    listSubTitle: "",
                    href: "",
                },
                {
                    id: 5,
                    icon: "mdi-map-marker",
                    listTitle: "Google Maps",
                    listSubTitle: "",
                    href: "",
                },
                {
                    id: 6,
                    icon: "mdi-bell",
                    listTitle: "Notifications",
                    listSubTitle: "",
                    href: "",
                },
            ]
        }
    },
}

const myHeader = {
    template:`
        <header :style="{'left':left}">
            <div class="toolbar">
                <div class="nav-shift">
                    <button class="tool btn-nav-shift" @click="shiftNav()">
                        <i class="mdi mdi-dots-vertical"></i>
                    </button>
                </div>
                <div style="color: #505050;">{{ curPage }}</div>
                <div style="flex-grow:1"></div>
                <!---->
                <div class="search-bar">
                    <div style="display:flex;box-sizing: inherit;">
                        <input id="input-search" type="text" class="search-input" placeholder="A">
                        <label class="search-label">Search</label>
                    </div>
                    <div>
                        <button class="tool">
                            <i class="mdi mdi-magnify"></i>
                        </button>
                    </div>
                </div>
                <div style="width:12px"></div>
                <!---->
                <a class="list list-icon tool-btn">
                    <i class="mdi mdi-view-dashboard"></i>
                </a>
                <button  class="list list-icon tool-btn">
                    <i class="mdi mdi-bell" style="color: #000;"></i>
                </button>
                <a  class="list list-icon tool-btn">
                    <i class="mdi mdi-account"></i>
                </a>
            </div>
        </header>
    `,
    emits: ["shift"],
    methods: {
        shiftNav() {this.$emit('shift')},
    },
    props: {
        curPage: String,
        left: String,
    },
    data() {
        return {

        }
    },
}

const app = {
    components: {
        myNav,
        myHeader,
    },
    template:`
        <my-header :curPage=curPage :left=left @shift=shiftNav></my-header>

        <my-nav :curPage=curPage :transform=transform @change=changePage></my-nav>
        <main></main>
        <!--
        <my-main></my-main>
        <my-footer></my-footer>
        -->
    `,
    data() {
        return {
            curPage: "Dashboard",
            Nav: true,
            transform: "translateX(0%)",
            left: "260px",
        }
    },
    methods: {
        changePage(newPage) {this.curPage = newPage},
        shiftNav() {
            if (this.Nav) {
                this.transform = "translateX(-100%)"
                this.left = "0px"
            }
            else {
                this.transform = "translateX(0%)"
                this.left = "260px"
            }
            this.Nav = !this.Nav
        },
        onResize() {
            if (window.innerWidth < 940) {
                this.transform = "translateX(-100%)"
                this.left = "0px"
                this.Nav = false
            }
            else {
                this.transform = "translateX(0%)"
                this.left = "260px"
                this.Nav = true
            }
        },
    },
    computed: {},
    created() {
        window.addEventListener('resize', this.onResize)
    },
    destroyed() {
        window.removeEventListener("resize", this.onResize);
    },
}

Vue.createApp(app).mount('#app')