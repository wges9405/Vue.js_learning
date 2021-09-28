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
const svg_template = {
    template:`
      <svg  xmlns="http://www.w3.org/2000/svg"
            style="width:100%;height:100%;position:absolute;top:0;left:0;"
            :width=width :height=height :viewBox="viewBox"
            preserveAspectRatio="none">
        <!-- x axis -->
        <g class="ct-axis" v-show=shows[0]>
          <line v-for="(tag, index) in xTags"
                :x1=x[index] :x2=x[index]
                :y1=pt :y2=height-pd
                :class="[tag==''?'ct-axis-base':'']"
                ></line>
        </g>
        <!-- x tags -->
        <g class="ct-tags ct-x-tag" v-show=shows[1]>
          <text v-for="(tag, index) in xTags"
                :x=x[index] :y=height-pd+20
                >{{ tag }}</text>
        </g>
        <!-- y axis -->
        <g class="ct-axis" v-show=shows[2]>
          <line v-for="(tag, index) in yTags"
                :x1=pl :x2=width-pr
                :y1=y[index] :y2=y[index]
                :class="[tag=='0'?'ct-axis-base':'']"
                ></line>
        </g>
        <!-- y tags -->
        <g class="ct-tags ct-y-tag" v-show=shows[3]>
          <text v-for="(tag, index) in yTags"
                :x=pl-10 :y=y[index]
                >{{ tag }}</text>
        </g>
        <!-- bars -->
        <g class="ct-bar" v-show=shows[4]>
          <line v-for="(val, index) in vals"
                :x1=x[index+1] :x2=x[index+1]
                :y1=(1-val/max)*height :y2=height-pd
                ></line>
        </g>
        <!-- circle -->
        <g class="ct-circle" v-show=shows[5]>
          <circle v-for="(val,index) in vals"
                  :cx=x[index+1]
                  :cy=(1-val/max)*height
                  r=5
                  />
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
        pl: Number, pr: Number, pt: Number, pd: Number,
        xTags: Array, yTags: Array, vals: Array,
    },
    data() {
        return {
            viewBox: '',
            max: 0,
            d: '',
            x: [],
            y: [],
            val: [],
        }
    },
    created() {
        this.viewBox= '0 0 ' + this.width + ' ' + this.height
        this.max = this.yTags[0]*2-this.yTags[1]
        for (var i=0; i<this.xTags.length; i++) {
            this.x.push(i/this.xTags.length*(this.width-this.pl-this.pr)+this.pl)
            if (i>=1) this.val.push((1-this.vals[i-1]/this.max)*this.height)
          
            if (i==1) {
                this.d = 'M' + this.x[i] +' '+ this.val[i-1]
            }
            else if (i>1) {
                this.d = this.d + ' ' + 'L' + this.x[i] +' '+ this.val[i-1]
            }
        }
        for (var i=0; i<this.yTags.length; i++) {
          this.y.push((i+1)/this.yTags.length*(this.height-this.pt-this.pd)+this.pt)
        }
    },
}

const svg1 = {
    components: {svg_template},
    template:`
        <svg_template :width=width :height=height :pl=pl :pr=pr :pt=pt :pd=pd
                    :xTags=xTags :yTags=yTags :vals=vals :shows=shows></svg_template>
    `,
    data() {
        return {
            // x-axis x-label y-axis y-label bar circle path
            shows: [true, true, true, true, true, false, false], 
            width: 400,
            height: 400,
            pl: 40, pr:10, pt:10, pd:40,
            xTags: ['','Ja','Fe','Ma','Ap','Mai','Ju','Jul','Au','Se','Oc','No','De'],
            yTags: [800,600,400,200,0,],
            vals: [542,443,320,780,553,453,326,434,568,610,756,895],
        }
    },
}
const svg2 = {components: {svg_template},
    template:`
        <svg_template :width=width :height=height :pl=pl :pr=pr :pt=pt :pd=pd
                    :xTags=xTags :yTags=yTags :vals=vals :shows=shows></svg_template>
    `,
    data() {
        return {
            // x-axis x-label y-axis y-label bar circle path
            shows: [true, true, true, true, false, true, true], 
            width: 400,
            height: 400,
            pl: 40, pr:10, pt:10, pd:40,
            xTags: ['','M','T','W','T','F','S','S'],
            yTags: [40,30,20,10,0,],
            vals: [12,17,7,17,23,18,38],
        }
    },
}
const svg3 = {components: {svg_template},
    template:`
        <svg_template :width=width :height=height :pl=pl :pr=pr :pt=pt :pd=pd
                    :xTags=xTags :yTags=yTags :vals=vals :shows=shows></svg_template>
    `,
    data() {
        return {
            // x-axis x-label y-axis y-label bar circle path
            shows: [true, true, true, true, false, true, true], 
            width: 400,
            height: 400,
            pl: 40, pr:10, pt:10, pd:40,
            xTags: ['','12am','3pm','6pm','9pm','12pm','3am','6am','9am'],
            yTags: [800,600,400,200,0,],
            vals: [230,750,450,300,280,240,200,190],
        }
    },
}
const dashboard = {
    components: {svg1,svg2,svg3},
    template:`
        <section id="Dashboard" class="container">
            <div class="row">
                <div class="col-lg-4 col-12">
                    <div class="card">
                        <div class="d-flex">
                            <div class="card-head">
                                <div class="ct-square">
                                    <svg1 class="svg1"></svg1>
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
                                    <svg2 class="svg2"></svg2>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <h4 class="card-title">Daily Sales</h4>
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
                                    <svg3 class="svg3"></svg3>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <h4 class="card-title">Completed Tasks</h4>
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