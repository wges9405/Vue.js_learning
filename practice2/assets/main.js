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
        <header>
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
                <a class="list list-icon tool-btn" href="" @click.prevent="">
                    <i class="mdi mdi-view-dashboard"></i>
                </a>
                <button  class="list list-icon tool-btn">
                    <i class="mdi mdi-bell" style="color: #000;"></i>
                </button>
                <a  class="list list-icon tool-btn" href="" @click.prevent="">
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
    },
    data() {
        return {

        }
    },
}

const dashboard = {
    template:`
        <section id="Dashboard" class="container">
            <div class="row">
                <div class="col-lg-4 col-12">
                    <div class="card">
                        <div class="d-flex">
                            <div class="card-head">
                                <div class="ct-square">
                                    <svg  width="100%" height="100%" style="width:100%;height:100%">
                                        <g>
                                            <line y1="120" y2="120" x1="40" x2="1000" class="ct-grid"></line>
                                        </g>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <h4 class="card-title">Websit Views</h4>
                            <p>Last Campaign Performance</p>
                        </div>
                        <hr class="divider">
                        <div class="action">
                            <i class="mdi mdi-clock-outline"></i>
                            <span>updated 10 minutes ago</span>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-12">
                    <div class="card">
                        <div class="d-flex">
                            <div class="card-head">
                                <div class="ct-square">
                                    <svg  width="100%" height="100%" style="width:100%;height:100%">
                                        <g>
                                            <line y1="120" y2="120" x1="40" x2="1000" class="ct-grid"></line>
                                        </g>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <h4 class="card-title">Websit Views</h4>
                            <p>Last Campaign Performance</p>
                        </div>
                        <hr class="divider">
                        <div class="action">
                            <i class="mdi mdi-clock-outline"></i>
                            <span>updated 10 minutes ago</span>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-12">
                    <div class="card">
                        <div class="d-flex">
                            <div class="card-head">
                                <div class="ct-square">
                                    <svg  width="100%" height="100%" style="width:100%;height:100%">
                                        <g>
                                            <line y1="120" y2="120" x1="40" x2="1000" class="ct-grid"></line>
                                        </g>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <h4 class="card-title">Websit Views</h4>
                            <p>Last Campaign Performance</p>
                        </div>
                        <hr class="divider">
                        <div class="action">
                            <i class="mdi mdi-clock-outline"></i>
                            <span>updated 10 minutes ago</span>
                        </div>
                    </div>
                </div>
                
            </div>
        </section>
    `,
}
const userProfile = {
    template:`<section id="User Profile"></section>`,
}
const regularTables = {
    template:`<section id="Regular Tables"></section>`,
}
const typography = {
    template:`<section id="Typography"></section>`,
}
const icons = {
    template:`<section id="Icons"></section>`,
}
const googleMaps = {
    template:`<section id="Google Maps"></section>`,
}
const notifications = {
    template:`<section id="Notificatinos"></section>`,
}

const myMain = {
    components: {
        dashboard,
        userProfile,
        regularTables,
        typography,
        icons,
        googleMaps,
        notifications,
    },
    template:`
        <main>
            <dashboard v-if="curPage==='Dashboard'"></dashboard>
            <user-profile v-else-if="curPage==='User Profile'"></user-profile>
            <regular-tables v-else-if="curPage==='Regular Tables'"></regular-tables>
            <typography v-else-if="curPage==='Typography'"></typography>
            <icons v-else-if="curPage==='Icons'"></icons>
            <google-maps v-else-if="curPage==='Google Maps'"></google-maps>
            <notifications v-else-if="curPage==='Notifications'"></notifications>
        </main>
    `,
    props: {
        curPage: String,
    }
}

const myFooter = {
    template:`
        <footer>
            <div class="foot-container">
                <div class="content">
                    <a class="foot-a" href="" @click.prevent="">about us</a>
                </div>
                <div class="content">
                    <a class="foot-a" href="" @click.prevent="">blog</a>
                </div>
                <div class="content">
                    <a class="foot-a" href="" @click.prevent="">licenses</a>
                </div>
                <div style="flex-grow:1"></div>
                <div>
                    2021, made by 
                    <a>Ray</a>
                    refered to 
                    <a class="foot-a" href="https://demos.creative-tim.com/vuetify-material-dashboard/#/">Reference</a>
                </div> 
            </div>
        </footer>
    `,
    props: {
        left: String,
    }
}

const app = {
    components: {
        myNav,
        myHeader,
        myMain,
        myFooter,
    },
    template:`
        <my-header :curPage=curPage :style="{'left':left}" @shift=shiftNav></my-header>

        <my-nav :curPage=curPage :transform=transform @change=changePage></my-nav>
        <my-main :curPage=curPage :style="{'padding-left':left}"></my-main>
        <my-footer :style="{'margin-left':left}"></my-footer>
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