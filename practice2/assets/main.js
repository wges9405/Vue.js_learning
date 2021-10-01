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
const svg_content = {
    template:`
    <svg  xmlns="http://www.w3.org/2000/svg" width=100% height=100% preserveAspectRatio="none">
        <!-- Axis -->
        <g class="ct-axis">
            <!-- x axis -->
            <g v-show=shows[0]>
                <line v-for="(tag, index) in xTags"
                      :x1=x[index]*width :x2=x[index]*width
                      :y1=border[2]*height :y2=y[y.length-1]*height
                      :class="[tag==''?'ct-axis-base':'']"
                      ></line>
            </g>
            <!-- y axis -->
            <g v-show=shows[1]>
                <line v-for="(tag, index) in yTags"
                      :x1=x[0]*width :x2=(1-border[1])*width
                      :y1=y[index]*height :y2=y[index]*height
                      :class="[tag=='0'?'ct-axis-base':'']"
                      ></line>
            </g>
        </g>
        <!-- Tags -->
        <g>
            <!-- x tags -->
            <g class="ct-x-tag" v-show=shows[2]>
                <foreignObject v-for="(tag, index) in xTags"
                               :x=(x[index]-x[0]/2)*width :y=y[y.length-1]*height
                               :width=x[0]*width :height=border[3]*height>
                    <span> {{ tag }} </span>
                </foreignObject>
            </g>
            <!-- y tags -->
            <g class="ct-y-tag" v-show=shows[3]>
                <foreignObject v-for="(tag, index) in yTags"
                               :x=0 :y=(y[index]-y[1])*height
                               :width=x[0]*width-5 :height=y[1]*height>
                    <span> {{ tag }} </span>
                </foreignObject>
            </g>
        </g>
        <!-- bars -->
        <g class="ct-bar" v-show=shows[4]>
          <line v-for="(v, index) in val"
                :x1=x[index+1]*width :x2=x[index+1]*width
                :y1=v*height :y2=y[y.length-1]*height
                ></line>
        </g>
        <!-- circle -->
        <g class="ct-circle" v-show=shows[5]>
          <circle v-for="(v,index) in val"
                  :cx=x[index+1]*width :cy=v*height r=5 />
        </g>
        <!-- path -->
        <g class="ct-path" v-show=shows[6]>
          <path :d=d />
        </g>
      </svg>
    `,
    props: {
        shows: Array,
        width: Number, height: Number,
        xTags: Array, yTags: Array,
        x: Array, y: Array, val: Array,
        border: Array,
    },
    data() {
        return {
            d: '',
        }
    },
    updated() {
        if (this.shows[6]) {
            this.d = 'M' + this.x[1]*this.width +' '+ this.val[0]*this.height
            for (var i=1; i<this.val.length; i++) {
                this.d = this.d + ' ' + 'L' + this.x[i+1]*this.width +' '+ this.val[i]*this.height
            }
        }
        
    },
}
const svg_template = {
    components: {svg_content},
    template:`
        <svg_content :width=width :height=height
                       :xTags=xTags :yTags=yTags
                       :x=x :y=y :val=val
                       :border=border :shows=shows></svg_content>
    `,
    props: {
        shows: Array,
        pl: Number, pr: Number, pt: Number, pd: Number,
        xTags: Array, yTags: Array, vals: Array,
        left: String,
    },
    data() {
        return {
            width: 400, height: 400,
            x: [], y: [], val: [],
            border: [],
        }
    },
    created() {
        this.border.push(this.pl/this.width)
        this.border.push(this.pr/this.width)
        this.border.push(this.pt/this.height)
        this.border.push(this.pd/this.height)
        for (var i=0; i<this.xTags.length; i++) {
            var tmp = i/this.xTags.length*(this.width-this.pl-this.pr)+this.pl
            this.x.push(tmp/this.width)
            if (i>0) {
              tmp = (1-this.vals[i-1]/this.yTags[0])*((this.height-this.pt-this.pd)*(1-1/this.yTags.length))+this.pt
              this.val.push(tmp/this.height)
            }
        }
        for (var i=0; i<this.yTags.length; i++) {
            var tmp = i/this.yTags.length*(this.height-this.pt-this.pd)+this.pt
            this.y.push(tmp/this.height)
        }
    },
    mounted() {
        window.addEventListener('resize', this.onResize);
        this.width = this.$el.clientWidth
        this.height = this.$el.clientHeight
    },
    watch:{
        left: function() {
            setTimeout(()=>{this.onResize()}, 500);
        }
    },
    methods: {
        onResize() {
            this.width = this.$el.clientWidth
            this.height = this.$el.clientHeight
        },
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.onResize);
    },
}

const dashboard = {
    components: {svg_template},
    template:`
        <section id="Dashboard" class=" container-fluid">
            <div class="row">
                <div class="col-12 col-lg-4" v-for="(svg) in SVGs">
                    <div class="card">
                        <div class="d-flex">
                            <div class="card-head" :style="{'background-color':svg.bg}">
                                <div class="ct-square" ref="square">
                                    <svg_template :shows=svg.shows :pl=svg.pl :pr=svg.pr :pt=svg.pt :pd=svg.pd
                                                  :xTags=svg.xTags :yTags=svg.yTags :vals=svg.vals :left=left></svg_template>
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
            <div class="row">
                <div class="col-sm-6 col-lg-3 col-12" v-for="(h) in smHeaders">
                    <div class="card">
                        <div class="d-flex flex-wrap" style="align-items: center;">
                            <div class="d-flex card-head sm" :style="{'background':h.header[1]}">
                                <i class="mdi" :class=h.header[0] style="font-size:32px;color:white;"></i>
                            </div>
                            <div class="ms-auto" style="text-align:right;">
                                <div style="font-size:13px;color:gray">{{ h.subtitle[0] }}</div>
                                <h4>{{ h.subtitle[1] }}</h4>
                            </div>
                        </div>
                        <hr class="divider">
                        <div class="action">
                            <i class="mdi" :class=h.action[0]></i>
                            <span>{{ h.action[1] }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `,
    props: ['left'],
    data() {
        return {
            SVGs: [
                {
                    bg: 'pink',
                    // x-axis y-axis x-label y-label bar circle path
                    shows: [true, true, true, true, true, false, false],
                    pl: 40, pr:10, pt:10, pd:40,
                    xTags: ['','Ja','Fe','Ma','Ap','Mai','Ju','Jul','Au','Se','Oc','No','De',],
                    yTags: [1000,800,600,400,200,0],
                    vals: [542,443,320,780,553,453,326,434,568,610,756,895],
                },{
                    bg: 'bisque',
                    // x-axis y-axis x-label y-label bar circle path
                    shows: [true, true, true, true, false, true, true], 
                    pl: 40, pr:10, pt:10, pd:40,
                    xTags: ['','M','T','W','T','F','S','S'],
                    yTags: [50,40,30,20,10,0],
                    vals: [12,17,7,17,23,18,38],
                },{
                    bg: 'burlywood',
                    // x-axis y-axis x-label y-label bar circle path  
                    shows: [true, true, true, true, false, true, true],
                    pl: 40, pr:10, pt:10, pd:40,
                    xTags: ['','12am','3pm','6pm','9pm','12pm','3am','6am','9am'],
                    yTags: [1000,800,600,400,200,0],
                    vals: [230,750,450,300,280,240,200,190],
                },
            ],
            smHeaders: [
                {
                    header: ["mdi-twitter", "cadetblue"],
                    subtitle: ["Followers","+243"],
                    action: ["mdi-clock","updated 10 minutes ago"],
                }, {
                    header: ["mdi-poll", "cornflowerblue"],
                    subtitle: ["Website Visits","75.521"],
                    action: ["mdi-tag","Tracked from Google Analytics"],
                }, {
                    header: ["mdi-store", "turquoise"],
                    subtitle: ["Revenue","$34,245"],
                    action: ["mdi-calendar","Last 24 Hours"],
                }, {
                    header: ["mdi-sofa", "thistle"],
                    subtitle: ["Bookings","184"],
                    action: ["mdi-alert","Get More Space..."],
                }
            ],
        }
    },
    mounted() {
        window.addEventListener('resize', this.onResize);
        console.log(this.left)
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.onResize);
    },
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
            <dashboard></dashboard>

            <dashboard v-if="curPage==='Dashboard'" :left=left></dashboard>
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
        left: String,
    }
}
Vue.createApp(myMain).mount('#app')

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
        <my-main :curPage=curPage :left=left :style="{'padding-left':left}"></my-main>
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
    created() {
        window.addEventListener('resize', this.onResize)
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
    destroyed() {
        window.removeEventListener("resize", this.onResize);
    },
}

// Vue.createApp(app).mount('#app')