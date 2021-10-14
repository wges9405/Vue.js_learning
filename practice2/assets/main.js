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
        changePage(newPage) {this.$emit('change', newPage);},
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
                        <i class="mdi icon mdi-dots-vertical"></i>
                    </button>
                </div>
                <div style="color: #505050;">{{ curPage }}</div>
                <div style="flex-grow:1"></div>
                <!---->
                <div class="search-bar">
                    <div style="display:flex;position:relative">
                        <input id="input-search" type="text" class="search-input" placeholder="A">
                        <label class="search-label">Search</label>
                        <div class="search-ripple"></div>
                    </div>
                    <div>
                        <button class="tool">
                            <i class="mdi icon mdi-magnify"></i>
                        </button>
                    </div>
                </div>
                <div style="width:12px"></div>
                <!---->
                <a class="list list-icon tool-btn ripple" href="" :class="[curPage=='Dashboard'?'active':'']" @click.prevent="changePage('Dashboard')">
                    <i class="mdi icon mdi-view-dashboard"></i>
                </a>
                <button  class="list list-icon tool-btn ripple bell">
                    <i class="mdi icon mdi-bell" style="color: #000;"></i>
                </button>
                <a  class="list list-icon tool-btn ripple" href="" :class="[curPage=='User Profile'?'active':'']" @click.prevent="changePage('User Profile')">
                    <i class="mdi icon mdi-account"></i>
                </a>
            </div>
        </header>
    `,
    emits: ["shift","change"],
    methods: {
        shiftNav() {this.$emit('shift');},
        changePage(newPage) {this.$emit('change', newPage);},
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
                    <span > {{ tag }} </span>
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
        shows: Array, // x-axis y-axis x-label y-label bar circle path
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
                <div class="col-12 col-lg-4" v-for="content in row[0]">
                    <div class="card">
                        <div class="card-head" :style="{'background-color':content.header}">
                            <div class="ct-square" ref="square">
                                <svg_template :shows=content.shows :pl=content.pl :pr=content.pr :pt=content.pt :pd=content.pd
                                                :xTags=content.xTags :yTags=content.yTags :vals=content.vals :left=left></svg_template>
                            </div>
                        </div>
                        <div class="card-body">
                            <h4 class="card-title">{{ content.subtitle[0] }}</h4>
                            <p>
                                <i v-if="content.subtitle[0]==='Daily Sales'" class="mdi icon" :class="[content.subtitle[2]>0?'good mdi-arrow-up':'bad mdi-arrow-down']"></i>
                                <span v-if="content.subtitle[0]==='Daily Sales'" :class="[content.subtitle[2]>0?'good':'bad']" >{{ content.subtitle[2] }}%</span>
                                {{ content.subtitle[1] }}
                            </p>
                        </div>
                        <hr class="divider">
                        <div class="action">
                            <i class="mdi mdi-clock-outline icon"></i>
                            <span>{{ content.action }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-sm-6 col-lg-3" v-for="h in row[1]">
                    <div class="card">
                        <div class="d-flex flex-wrap" style="align-items: center;">
                            <div class="d-flex card-head sm" :style="{'background':h.header[0]}">
                                <i class="mdi icon" :class=h.header[1] style="font-size:32px;color:white;"></i>
                            </div>
                            <div class="ms-auto" style="text-align:right;">
                                <div style="font-size:13px;color:gray">{{ h.subtitle[0] }}</div>
                                <h4>{{ h.subtitle[1] }}</h4>
                            </div>
                        </div>
                        <hr class="divider">
                        <div class="action">
                            <i class="mdi icon" :class=h.action[0]></i>
                            <span>{{ h.action[1] }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-md-6">
                    <div class="card">
                        <div class="card-head" :style="{'background':table.header[0]}" style="color:white">
                            <div style="font-size:20px;padding-bottom:5px">{{ table.header[1] }}</div>
                            <div style="font-size:14px">{{ table.header[2] }}</div>
                        </div>
                        <div class="card-body">
                            <div class="table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th v-for="c in Array(5).keys()" :style="{'text-align':(c>1?'right':'left')}">{{ table.head[c] }}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="i in Array(table.rpp).keys()">
                                            <td v-if="table.page*table.rpp+i<table.content.length"
                                                v-for="j in Array(5).keys()" :style="{'text-align':(j>1?'right':'left')}">
                                                <span v-if="j==2">$</span>
                                                <span v-if="j==2">{{ table.content[table.page*table.rpp+i][j].toLocaleString('en-US') }}</span>
                                                <span v-else>{{ table.content[table.page*table.rpp+i][j] }}</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="d-flex table-footer" style="">
                                <div class="d-flex" style="align-items:center;margin-right:15px;">
                                    <span>Rows per page:</span>
                                    <div class="d-flex" style="cursor:pointer;border-bottom:thin solid #5a5a5a;margin:15px 0 15px 30px;" ref="selector" @click.stop="showSelection()">
                                        <div v-if="table.rpp!=table.content.length">{{ table.rpp }}</div>
                                        <div v-else>All</div>
                                        <div>
                                            <i class="mdi icon mdi-menu-down"></i>
                                        </div>
                                    </div>
                                </div>
                                <div style="margin:0 32px 0 24px">{{ table.page*table.rpp+1 }}-{{ Math.min((table.page+1)*table.rpp, table.content.length) }} of {{ table.content.length }}</div>
                                <div >
                                    <button style="height:41px;width:41px;" @click="prevPage()">
                                            <i class="mdi icon mdi-chevron-left"></i>
                                    </button>
                                </div>
                                <div >
                                    <button style="height:41px;width:41px;" @click="nextPage()">
                                            <i class="mdi icon mdi-chevron-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <div class="card">
                        <div class="card-head" :style="{'background':task.header[0]}" style="color:white">
                            <div class="d-flex">
                                <div class="task-list" id="task-list">
                                    <div class="d-flex" :style="{transform:(task.tab[0]+task.tab[1]>task.tab[2] ?'translateX('+ (-task.tab[1]+50) +'px)':'translateX(0px)')}">
                                        <div class="task-tab" :style="{width:task.tab[0]+'px',left:task.tab[1]+'px'}">
                                            <div style="background-color:white;height:100%;width:100%"></div>
                                        </div>
                                        <!---->
                                        <span style="align-self:center;margin:0 10px;">Tasks:</span>
                                        <div class="task-header ripple3" @click="changeTask($event)"
                                            v-for="t in task.tasks" :id=t[0] :class="[curTask==t[0]?'active':'']">
                                            <i class="mdi icon" :class="t[1]"></i>
                                            <span style="text-transform:uppercase">{{ t[0] }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="d-flex">
                                <div class="task-content" v-for="t in task.tasks" v-show="curTask==t[0]?true:false">
                                    <div class="row" v-for="(content, idx) in t[2]" style="align-items:center;width:100%;margin:auto;margin-bottom:20px"> 
                                        <div class="col col-1">
                                            <div class="task-checkbox" @click="check($event)" ref="idx" :id=idx>
                                                <i class="mdi mdi-checkbox-blank-outline unchecked"></i>
                                                <input type="checkbox">
                                                <div class="selection-area unchecked"></div>
                                            </div>
                                        </div>
                                        <div class="col col-9">{{ content }}</div>
                                        <div class="col col-2" style="text-align:right;">
                                            <i class="mdi icon mdi-pencil" style="color:rgba(0,0,0,0.54)"></i>
                                            <i class="mdi icon mdi-close" style="color:red"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-show=menu[2] class="rpp-select-menu" :style="{left:menu[0]+ 'px', top:(Math.min(menu[1]+scrollX,maxheight+scrollX)-150)+ 'px'}">
                <div class="rpp-list">
                    <div id="rpp5" @click="select(5)" class="rpp-select-btn selected">5</div>
                    <div id="rpp10" @click="select(10)" class="rpp-select-btn">10</div>
                    <div id="rpp15" @click="select(15)" class="rpp-select-btn">15</div>
                    <div id="rppAll" @click="select(table.content.length)" class="rpp-select-btn">All</div>
                </div>
            </div>
        </section>
    `,
    props: ['left'],
    data() {
        return {
            row: [
                [
                    {
                        shows: [true, true, true, true, true, false, false], // x-axis y-axis x-label y-label bar circle path
                        pl: 40, pr:10, pt:10, pd:40,
                        xTags: ["","Ja","Fe","Ma","Ap","Mai","Ju","Jul","Au","Se","Oc","No","De"],
                        yTags: [1000,800,600,400,200,0],
                        vals: [542,443,320,780,553,453,326,434,568,610,756,895],
                        /* ------------------------------------------------------------ */
                        header: "pink",
                        subtitle: ["Website Views", "Last Campaign Performance"],
                        action: "updated 10 minutes ago",
                    },{
                        shows: [true, true, true, true, false, true, true],  // x-axis y-axis x-label y-label bar circle path
                        pl: 40, pr:10, pt:10, pd:40,
                        xTags: ["","M","T","W","T","F","S","S"],
                        yTags: [50,40,30,20,10,0],
                        vals: [12,17,7,17,23,18,38],
                        /* ------------------------------------------------------------ */
                        header: "bisque",
                        subtitle: ["Daily Sales", "increase in today's sales", 55],
                        action: "updated 4 minutes ago",
                    },{
                        shows: [true, true, true, true, false, true, true], // x-axis y-axis x-label y-label bar circle path
                        pl: 40, pr:10, pt:10, pd:40,
                        xTags: ["","12am","3pm","6pm","9pm","12pm","3am","6am","9am"],
                        yTags: [1000,800,600,400,200,0],
                        vals: [230,750,450,300,280,240,200,190],
                        /* ------------------------------------------------------------ */
                        header: "burlywood",
                        subtitle: ["Completed Tasks", "Last Last Campaign Performance"],
                        action: "campaign sent 26 minutes ago",
                    }
                ],
                [
                    {
                        header:["cadetblue", "mdi-twitter"],
                        subtitle: ["Followers","+243"],
                        action: ["mdi-clock","updated 10 minutes ago"],
                    }, {
                        header: ["cornflowerblue", "mdi-poll"],
                        subtitle: ["Website Visits","75.521"],
                        action: ["mdi-tag","Tracked from Google Analytics"],
                    }, {
                        header: ["turquoise", "mdi-store"],
                        subtitle: ["Revenue","$34,245"],
                        action: ["mdi-calendar","Last 24 Hours"],
                    }, {
                        header: ["thistle", "mdi-sofa"],
                        subtitle: ["Bookings","184"],
                        action: ["mdi-alert","Get More Space..."],
                    }
                ],
            ],
            table: {
                header: ["darkorange", "Employees Stats", "New employees on 15th September, 2016"],
                head: ["ID", "Name", "Salary", "Country", "City"],
                content: [
                    ["1", "Dakota Rice", 35738, "Niger", "Oud-Tunrhout"],
                    ["2", "Minerva Hooper", 23738, "Curaçao", "Sinaai-Waas"],
                    ["3", "Sage Rodriguez", 56142, "Netherlands", "Overland Park"],
                    ["4", "Philip Chanley", 38735, "Korea, South", "Gloucester"],
                    ["5", "Doris Greene", 63542, "Malawi", "Feldkirchen in Kārnten"],
                    ["6", "Doris Greene", 63542, "Malawi", "Feldkirchen in Kārnten"],
                    ["7", "Doris Greene", 63542, "Malawi", "Feldkirchen in Kārnten"],
                    ["8", "Doris Greene", 63542, "Malawi", "Feldkirchen in Kārnten"],
                    ["9", "Doris Greene", 63542, "Malawi", "Feldkirchen in Kārnten"],
                    ["10", "Doris Greene", 63542, "Malawi", "Feldkirchen in Kārnten"],
                    ["11", "Doris Greene", 63542, "Malawi", "Feldkirchen in Kārnten"],
                ],
                page:0,
                rpp:5, // rows per page
            },
            menu: [0,0, false],
            scrollX: 0,
            maxheight: 0,
            task: {
                header: ["darkgreen"],
                tab: [0,0,0],
                tasks: [
                    [
                        "bugs",
                        "mdi-bug",
                        [
                            "Sign contract for 'What are conference organizers afraid of?'",
                            "Lines From Great Russian Literature? Or E-mails From My Boss?",
                            "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",
                            "Create 4 Invisible User Experiences you Never Knew About",
                        ],
                    ],
                    [
                        "website",
                        "mdi-code-tags",
                        [
                            "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",
                            "Sign contract for 'What are conference organizers afraid of?'",
                        ],
                    ],
                    [
                        "server",
                        "mdi-cloud",
                        [
                            "Lines From Great Russian Literature? Or E-mails From My Boss?",
                            "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",
                            "Sign contract for 'What are conference organizers afraid of?'",
                        ],
                    ],
                ],

            },
            curTask: "bugs",
        }
    },
    methods: {
        showSelection() {
            this.menu[0] = this.$refs.selector.getBoundingClientRect().left;
            this.menu[1] = this.$refs.selector.getBoundingClientRect().top;
            this.menu[2] = !this.menu[2];
            this.scrollX = document.documentElement.scrollTop;
            this.maxheight = this.$refs.selector.getBoundingClientRect().top;
        },
        prevPage() {if (this.table.page>0) this.table.page--;},
        nextPage() {if ((this.table.page+1)*this.table.rpp<this.table.content.length) this.table.page++;},
        select(rpp) {
            this.table.rpp = rpp
            this.menu[2] = false
            document.getElementById('rpp5').className = "rpp-select-btn";
            document.getElementById('rpp10').className = "rpp-select-btn";
            document.getElementById('rpp15').className = "rpp-select-btn";
            document.getElementById('rppAll').className = "rpp-select-btn";
            console.log(this.table.rpp)
            switch(this.table.rpp) {
                case 5: document.getElementById('rpp5').className = "rpp-select-btn selected"; break;
                case 10:document.getElementById('rpp10').className = "rpp-select-btn selected"; break;
                case 15:document.getElementById('rpp15').className = "rpp-select-btn selected"; break;
                default:document.getElementById('rppAll').className = "rpp-select-btn selected"; break;
            }
        },
        changeTask(event) {
            var task = event.currentTarget;
            this.curTask = task.id;
            this.task.tab[0] = task.offsetWidth;
            this.task.tab[1] = task.offsetLeft;
            this.task.tab[2] = document.getElementById("task-list").clientWidth;
            console.log(this.task.tab[1]+this.task.tab[0], this.task.tab[2])
        },
        check(event) {
            var div = event.currentTarget;
            if (div.children[1].checked) {
                div.children[0].className = "mdi mdi-checkbox-blank-outline unchecked";
                div.children[1].checked = false;
                div.children[2].className = "selection-area unchecked";
            }
            else {
                div.children[0].className = "mdi mdi-checkbox-marked";
                div.children[1].checked = true;
                div.children[2].className = "selection-area";
            }
        },
        onResize() {
            if (this.menu[2]) {
                this.menu[0] = this.$refs.selector.getBoundingClientRect().left;
                this.scrollX = document.documentElement.scrollTop;
                this.maxheight = this.$refs.selector.getBoundingClientRect().top;
            }
            this.task.tab[2] = document.getElementById("task-list").clientWidth;
        },
    },
    watch:{
    },
    mounted() {
        var that = this;
        window.addEventListener('resize', that.onResize);
        console.log(that.left);
        document.addEventListener('click', ()=>{that.menu[2] = false;});
        
        this.task.tab[0] = document.getElementById(this.curTask).offsetWidth;
        this.task.tab[1] = document.getElementById(this.curTask).offsetLeft;
        this.task.tab[2] = document.getElementById("task-list").clientWidth;
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.onResize);
    },
}
const userProfile = {
    template:`
        <section id="User Profile" class=" container-fluid">
            <div class="row">
                <div class="col-12 col-md-8">
                    <div class="card">
                        <div class="card-head" style="background-color:#4caf50;">
                            <div style="font-size:20px;font-weight:100;padding-bottom:5px;color:white;">Edit Profile</div>
                            <div style="font-size:14px;color:white;">Complete your profile</div>
                        </div>
                        <div class="card-body">
                            <form>
                                <div class="container">
                                    <div class="row">
                                        <div class="col-12 col-md-4">company</div>
                                        <div class="col-12 col-md-4">User Name</div>
                                        <div class="col-12 col-md-4">Email Address</div>
                                        <div class="col-12 col-md-6">First Name</div>
                                        <div class="col-12 col-md-6">Last Name</div>
                                        <div class="col-12 col-md-12">Address</div>
                                        <div class="col-12 col-md-4">City</div>
                                        <div class="col-12 col-md-4">Country</div>
                                        <div class="col-12 col-md-4">Postal Code</div>
                                        <div class="col-12 col-md-12">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-4">
                    <div class="card">
                        <div class="card-body"></div>
                    </div>
                </div>
            </div>
        </section>
    `,
    props: [],
    data() {
        return {

        }
    },
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
// Vue.createApp(myMain).mount('#app')

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
        <my-header :curPage=curPage :style="{'left':left}" @shift=shiftNav @change=changePage></my-header>
        <my-nav :curPage=curPage :transform=transform @change=changePage></my-nav>
        <my-main :curPage=curPage :left=left :style="{'padding-left':left}"></my-main>
        <my-footer :style="{'margin-left':left}"></my-footer>
    `,
    data() {
        return {
            curPage: "Dashboard",
            Nav: false,
            transform: "translateX(-100%)",
            left: "0px",
        }
    },
    created() {
        window.addEventListener('resize', this.onResize)
    },
    methods: {
        changePage(newPage) {this.curPage = newPage;},
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
    mounted() {
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
    computed: {},
    destroyed() {
        window.removeEventListener("resize", this.onResize);
    },
}

Vue.createApp(app).mount('#app')