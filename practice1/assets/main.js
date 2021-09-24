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
                    <div aria-hidden="true" style="width:100%;padding-bottom:100%;"></div>
                    <img aria-hidden="true" :src=p.srcset[0] class="img" :style="{opacity: complete?0:1}" style="transition-delay: 500ms">
                    <picture>
                        <source
                            :srcset=srcset
                            size="(max-width:800px) 100vw 800px">
                        <img
                            size="(max-width:800px) 100vw 800px"
                            :srcset=srcset
                            :src=p.srcset[3]
                            loading="lazy"
                            class="img"
                            :style="{opacity: complete?1:0}"
                            style="transition: opacity 500ms ease 0s"
                            @load="imgLoad(p.id)">
                    </picture>
                </div>
            </div>
        </div>
    `,
    props: {
        p: Object,
        show: Boolean,
        complete: Boolean,
    },
    emits: ["done"],
    data() {
        return {
            srcset: null,
        }
    },
    created() {
        this.srcset = this.p.srcset[1]+" 200w, "+this.p.srcset[2]+" 400w,"+this.p.srcset[3]+" 800w"
    },
    methods: {
      imgLoad(index) {
          this.$emit('done', index-1)
      }
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
                :complete="complete[index]"
                @done="loadDone"
            ></project>
        </div>
    `,
    props: {
        show: Boolean,
    },
    data() {
        return {
            complete: [false,false,false,false,false,false,false,false,false,false],
            projects: [
                {
                    id: 1,
                    title: "Ableton",
                    subtitle: "About page.",
                    list: ["Typography choices","Spacing","Unique grid layout","Multi-column footer","and more!"],
                    srcset: [
                        "data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAUABQDASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAAMEBQL/xAAXAQEBAQEAAAAAAAAAAAAAAAAAAQID/9oADAMBAAIQAxAAAAHTiuRx2kGbYMrI4X//xAAYEAEBAQEBAAAAAAAAAAAAAAABAgMABP/aAAgBAQABBQKrZt3eyVhzlTGDpCT0bXPedXHv/8QAFBEBAAAAAAAAAAAAAAAAAAAAIP/aAAgBAwEBPwEf/8QAFxEBAAMAAAAAAAAAAAAAAAAAAAECEP/aAAgBAgEBPwHLJf/EABwQAQACAQUAAAAAAAAAAAAAAAEAEQIQEiExMv/aAAgBAQAGPwJiY9zmXtLnglEyCCt6f//EAB0QAQACAgIDAAAAAAAAAAAAAAEAESExQVEQYXH/2gAIAQEAAT8hFNnTqMsDbB6hNStu5mkXLNUJKYgdSxNVzEULOX74/9oADAMBAAIAAwAAABDb537/xAAVEQEBAAAAAAAAAAAAAAAAAAAQAf/aAAgBAwEBPxAh/8QAFxEBAQEBAAAAAAAAAAAAAAAAAQARMf/aAAgBAgEBPxC0iOXTf//EAB0QAQACAgMBAQAAAAAAAAAAAAEAESExQWHRUZH/2gAIAQEAAT8QEFkgEA+0+zCpFAicnvMpDEUA76jlbsG5SgBug5/YLO1QalReoBk17FFFslrlDU//2Q==",
                        "https://www.frontendpractice.com/static/62bbb1ccb81d988f14a524cb2007405e/0e66b/58a92974-13a1-4dc8-82d1-748c92edf44f_fs-1.jpg",
                        "https://www.frontendpractice.com/static/62bbb1ccb81d988f14a524cb2007405e/3f91c/58a92974-13a1-4dc8-82d1-748c92edf44f_fs-1.jpg",
                        "https://www.frontendpractice.com/static/62bbb1ccb81d988f14a524cb2007405e/a69f0/58a92974-13a1-4dc8-82d1-748c92edf44f_fs-1.jpg",
                    ],
                    detail: 'index.html',
                },
                {
                    id: 2,
                    title: "Starbucks",
                    subtitle: "Rewards page.",
                    list: ["Sticky/fixed header","Tabbed sections","Color choices","Layout practice","and more!"],
                    srcset: [
                        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAC4jAAAuIwF4pT92AAADtElEQVQ4y62UbUybVRTHnw/7YMQYSFwMWBgLZeythbZPW562QEeBFlrJhiBgaSNG0kUQhgMHU0h8YRqHJpsmskSWzA9Gsyzx0yR+NSZzytBkW+IXTUzoCx3paEvf27/nXkrBiGYm3uT3nHvPPefcc+7Nc4RQYhOB6EOwEYlvArkcHnlks4Xpt0tLuH/3LgTn2CtwjY9geGYag9OvYWjqLAZI5yad6x/ge2eGMUAw6RwfxnPDQ+h/9TSEYkU1ShSHOE/VHuay+Hj1I1FCvkVH5ZBZFOh0idhXVwPhoEmLAkYRf1nnqST93zCJkNNeSb0KfRPdWPp6DmXtOgjP6OtQKipQqlXusL0mKaP9CnKq0KtwgORBSZ1Hgypiv1mFcx968N5Xc2j3WCEcbjZC+2wbVB0WqDtaoLG3QHS0Qc0k6WvMEsoMapSaReynrIp0SjypU6BYr8Q+zTEoe0y49NkY3pjvxfsf0R1qHK2wv+iEzd0P+6ATtbZmHG9rwrHWRiitJyBv0ENmVONxuwHaXglnZnrhnn4BL513wjXdj/krZ3FufhDNfSIWb7wF4UizCYZTDtSftHMp2lt5drpOK2Hjc1aqjMort2nwyeUhLN78GJOXXDg/9zxGLzjR4WmCOGjEwIQdwgGrBPnLHZCfkHg2h6jE6iYJVQ06Qs8fpZzujAUt06vxmFEJ90QXrn75JtyjFtT0aDD7Tiu+WbDh1FgjhCpzPepOtkFhNeNoSwMv94jFxB+DUc4ehOBBJRUqKdMiSQmHpx2L199G93g7Lrxrwa3P7egaMUNgDjJtbcG5EIQC7ImBvbCIJ0wKfLAwCudUF2r7NPTCBlT16CmgtLczC7oXFWT/tK4Oiu5GXL46joHTEiYuDuHTL2bgfL1zK8P/QiUdVkwVdY44MLs4iflrk5i96KFfz4GFa1MQfli5g3/jx19WcHs3P9/B9yvL+PW3+/h93Yf1tT/w3fIt3PzpNu7dW4aA/3kImUwGu8lSS9qWiUQCq6ur8Hq98Pt88Pq8iMViyFKLy2Qz1OlyxJY9WzMfnmEu3wNpG+ncVo9jOh6YSKSSiBNsnk6nC/ZpFmTbNy+F3K6GGovH8TAS5idtDxYgshnFxmYEqVRqp7dScGa7EY3QfCcJnmGKnEKhEPzBNQQCAQTXHyCaiCGZTMJPax+VuhZYg9/v54eywMFgkNuyq3hA9uxgniH7ZCgj5hyh0zbCG4gnyCmd4iUz50g0ilA0jCSVncmXHQ6Ht4hEEKV9pmfjTxAGE+sLDQ83AAAAAElFTkSuQmCC",
                        "https://www.frontendpractice.com/static/fb95feb5242c27f9f3795caec0f7a1f4/2c27d/d0d045c9-8830-4edb-a481-a6d234284643_w4.png",
                        "https://www.frontendpractice.com/static/fb95feb5242c27f9f3795caec0f7a1f4/31532/d0d045c9-8830-4edb-a481-a6d234284643_w4.png",
                        "https://www.frontendpractice.com/static/fb95feb5242c27f9f3795caec0f7a1f4/9c361/d0d045c9-8830-4edb-a481-a6d234284643_w4.png",
                    ],
                    detail: 'index.html',
                },
                {
                    id: 3,
                    title: "Monogram",
                    subtitle: "Shop page.",
                    list: ["Hero image slider","Image hover transitions","Dropdown menu","Menu hide/appear on scroll","and more!"],
                    srcset: [
                        "data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAQCAwX/xAAXAQADAQAAAAAAAAAAAAAAAAAAAQME/9oADAMBAAIQAxAAAAHvm7OevNWRFCaY+8B//8QAGxABAAIDAQEAAAAAAAAAAAAAAQACAxIhBBH/2gAIAQEAAQUCsEKnzWssdTupPWpjw3s5Cf/EABcRAAMBAAAAAAAAAAAAAAAAAAABEhD/2gAIAQMBAT8BpFrf/8QAGREAAQUAAAAAAAAAAAAAAAAAEwABAhBR/9oACAECAQE/ARuhS2//xAAaEAACAwEBAAAAAAAAAAAAAAAAAQIhMSIQ/9oACAEBAAY/AqijItmIqKOYowbRHp75/8QAGxAAAwADAQEAAAAAAAAAAAAAAAERITFRQcH/2gAIAQEAAT8hlWa3wQ8RYkKXyIy4PSVdFPKjUGnVopMHpTQ//9oADAMBAAIAAwAAABBAKID/xAAZEQACAwEAAAAAAAAAAAAAAAAAARARMWH/2gAIAQMBAT8QsaOA9j//xAAWEQEBAQAAAAAAAAAAAAAAAAABEBH/2gAIAQIBAT8QBE2An//EABwQAQACAwADAAAAAAAAAAAAAAEAESExYUFxgf/aAAgBAQABPxDOo4tLXY5Wj0+WF0uUjCE82aI/LOElURpbHqEjWdVDJNJTSvs0z//Z",
                        "https://www.frontendpractice.com/static/997ad2d40b1e297aeab35f8929b1152f/a69f0/d01d3117-ff63-4a83-be38-8c8cc52fba4d_w2.jpg",
                        "https://www.frontendpractice.com/static/997ad2d40b1e297aeab35f8929b1152f/3f91c/d01d3117-ff63-4a83-be38-8c8cc52fba4d_w2.jpg",
                        "https://www.frontendpractice.com/static/997ad2d40b1e297aeab35f8929b1152f/a69f0/d01d3117-ff63-4a83-be38-8c8cc52fba4d_w2.jpg",
                    ],
                    detail: 'index.html',
                },
                {
                    id: 4,
                    title: "Monstercat",
                    subtitle: "Album release page.",
                    list: ["Dropdown Menus","Alternating styles","Layout practice","Hover states","and more!"],
                    srcset: [
                        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD20lEQVQ4y6WUWUycVRTHPwK1BQSCpTALi0CoLVVqW3EqM5AmpbGAUK0YE0i1al3aoJGOBgKEmAilg6XFgoQupH2QMnRg2IJPPGiivhhjfEBRYkRD2Pe9FPLzO9/0IxLxwXiTf+652//+z7n3HKWvr4/e3l76+/sZHBxkZWWZ1dVVpqamGB0dZXh4mLGxMcYe2AMDA0xNT2tz02o/Pj6u7ZXx/Pw8yr17qywsLLC0tMTq/fv8l7a2vs7a2jrLKyuqkBVtTuloc+FucdLW0oz7bpNm19Z8ysfl5dTU1VJ9tZqGuhrqa69S7rjIxUuVXHBUUK6ut7qcdHW4aWu9i/B0treinH/3Ddrv1HPr1hU+a6jC3VRPVUUxkY+aObA/HkvifmLDgjEF+REVZWKXIQTFxwtFUbA9c4iTWc+SlX6UExmpnEhPRfnkQgnLE79y/dolPizM47uvv2Dot+85csTKy9knseedJefF53nrlRzOqLAlJWIKN+Lvu4ODTz7BC5nHyTieynNpx8hMP4byUdH7/P7zt5x99SVyM1Oxf3COvh++5HDiASwJ8eyLiyYydCe7o8KJi4kiNCxEgyjduyeOZOvTJFkOkXT4KawqlEL7OX758Svy3znF5dJ86qrLNMLEgwmkZWRhsVh4/VSu6p6FkJ3BGI1h+Pn74e3tTVxsNI/HP8a+vbs3oMbwTVam+vn85hXs753h9rUqBn76huRkK+dLKng7L58//xigstKBn+92zGajRvjQtm2YTQbC1bH0OpTMtKN0uW7idl6n4cZlut23aXPeICY6ikd2hRIcHIzVmkRERAS+atwCAh7Gd8d2/P18CQoM9CAokMCAAPzVi5SYmBhycnKJiIzUXu5/w2az0tjYqMXq7wtGo5GWlhbuNDXRpKK5uVkb65AzLpcLp9OJ2+2mqKjIczYlJQW73U5ZWRmlpaU4HA6ys7OJVBVL9iwuLm6dJWtrm8Y9PT0ewvz8fLq6urDZbAh5RkYG8fHxGuHIyAhDQ0Naai4vL2/CxMSEduHs7KyW++3t7R7C2NhYEhIS/hELmZfE1wklV4VIFIs9MzPD3Nzchgci6sFZD4H8Ky8vL3x8fLSxPJZOKNVECESNzEkvlUaqi2BdLRIbhEIi0Il1WycUt3VVAnFTVyiuypoQdnR0bFa4FaHUQ4EeQyHQIaqFWNbkgTo7Ozcr1CGu6zGUgioQt3Rl+qNMTk5qvcRRLvhXhTrklcUtwVZNLpAm7krr7u72nDWbzZhMJg+Mnnw0GsLURN9DYWGhhuLiYg/Uzyu9fOKCggJKSjy2/N/Tr53GYDDwFyJo4gO8rbOYAAAAAElFTkSuQmCC",
                        "https://www.frontendpractice.com/static/9be251fb48f151e7d71c85dd9cf7f18a/2c27d/044e4e72-9a00-4585-a815-ee4aecbce16d_Monstercat%2BAlbum%2BRelease%2Bpage.png",
                        "https://www.frontendpractice.com/static/9be251fb48f151e7d71c85dd9cf7f18a/31532/044e4e72-9a00-4585-a815-ee4aecbce16d_Monstercat%2BAlbum%2BRelease%2Bpage.png",
                        "https://www.frontendpractice.com/static/9be251fb48f151e7d71c85dd9cf7f18a/9c361/044e4e72-9a00-4585-a815-ee4aecbce16d_Monstercat%2BAlbum%2BRelease%2Bpage.png",
                    ],
                    detail: 'index.html',
                },
                {
                    id: 5,
                    title: "Canal Street Market",
                    subtitle: "Home page.",
                    list: ["Unique layout","Hover animations","Typography choices","and more!"],
                    srcset: [
                        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD/klEQVQ4y62Ue1BUZRTAt6bpj/5orCZHjYzGHBxNRCcUWbTYpEAeEo8FWTUMbEpGXpWjDRk+YkGEUtQgiGTGyZjRMgaSMBMfoQPZWMZjYXksLLsLuzuL8pD3r/td5FHjTDnTmTnzne9+5/udc+459yrGxsYQKmR8fFzW/yIzfbUVvdSr1fD1Qyh6e3ux2Wx/c/o3/Sdwf2kXNSFvMFokAR8kq/sFFZJ+vg9dRASckoCi3NHRUflwaGiI4eFh2RbPhD0yMiLbQoXv/YDaij7qI9QTwMHBQTo7O2lubqa9vZ2GhgYMBgNms1l+LvaNjY3yvqurC+E/M1sZKGXYMAkUWbS1tcmXampqZIjFYpH3ra2tsnZ0dFBXVycHFLZOp8NoNEoVDc8A3itZNEVkZzKZprIRzt3d3fJlYYuzpqYmeS+ybGlpkYOK1yHkk3MOboSEMlT4MIr+/n65RHFJZCecBUSUKAAimF6vl1cBFWdiLzK32+0TwHIHN8PCGBNdHhgYkB1F2VarVQaLMRKrgItVQBwOhxxAnAk/cUdkOVnyVJf7+qQO1dejlxxEmQ8uYxODPQnkf5CMCwPTY2OzWzF2GLhcWUntn39gMRmxWaQODg7Qc7sHk9HA3Ts27vTYpfdqkmf1rjQ6vbcdtOlqMTbdIvWsNBUaDXzzCIp9e1MoKylG6eHO805ziNmi5uTxDG5WXcBsMfP7jSrsFqkBNmkuTZ2YpQDXr13idO5BMrdHkrrJh43an9GHhcNXChSf52TxWZYWL89VRKlDWK9SErcxkG/zs7EYWzF3GqQK2jBJq9XSyZVLP/HRe9vZvTmA/dGBHIjy5mjxNWxfFkLVFhSXL5ZTfq4EpdKDt2PeJFodiOblZaQlxXAy9xBFx9I5cTSDgiNa8g5rSft4N+HrPEjbGkRhkobiXdFY9bfutQcUqR8mk3lwH25uS0ne8Q4JsVHEqtw4pAlA+cpKlK+vwS9yA3kHdlIkAWM2R6FRrebwjlB2blvHp3HBdOvrJz7F0WEBTOL9xHdZuMCZ0CBfokP92KpaToG3K3vWuPL0Mlec3D0pPJROWV428ZvCiQhaSkqiN+5KJ1xcZlFdfUUGih+I4tSJ4xTm57BkySJCNvjzlgSMlGBhfm4cCXqJoj27qPmxjOtnz5CfvZdXvV/Ez38hytfm8MLiJ5k971F+qaqcBsbHbSM2Nhpn5/l4ea0m2NuDgFUuhHi6EB+xgorcTHSlP1B7/ozUqCyCg1xZueIZYjRr8fVZjNP8x6j5tWoauODZucx+4nHmPTWLRc/NxV/lRcYHsXxfmEVGSgLffZHDb6UlVJedprggE3XoWlTK5cQl+JCY7Mt6f1euXr04BfwLX6H/zezkQrYAAAAASUVORK5CYII=",
                        "https://www.frontendpractice.com/static/06c7bdbd14258be251139f3b6e2c87f6/2c27d/909d6de4-6d1c-4609-8442-afad44b6495b_Market%2BStreet%2BCanal.png",
                        "https://www.frontendpractice.com/static/06c7bdbd14258be251139f3b6e2c87f6/31532/909d6de4-6d1c-4609-8442-afad44b6495b_Market%2BStreet%2BCanal.png",
                        "https://www.frontendpractice.com/static/06c7bdbd14258be251139f3b6e2c87f6/9c361/909d6de4-6d1c-4609-8442-afad44b6495b_Market%2BStreet%2BCanal.png",
                    ],
                    detail: 'index.html',
                },
                {
                    id: 6,
                    title: "Qrates",
                    subtitle: "Why page.",
                    list: ["Accordions","Grid style layout","Unique design","and more!"],
                    srcset: [
                        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEvElEQVQ4y22Ve1BUZRjGz4RlypihDppyEQG5uFqgIwIBFmJoUiiSqImMgBY4iqtZOuXYDGjqH2plQXax8FaYl8BUQAERYWFZdll2BZT7bcCBFOQiIL/OOc4SNr4z33zzzfvOc573e97nO4JKpaK9vR0phoaG5P3Ro0f09PTQ3d0tr4cPH9LX18fA4OBw3ZMnT+jv7ycpKYnY2FiUSiVVVVUInZ2dcmIk4MDAwPAyhZQz5U3nQfEDNdXV6HQ69Ho9XV1dCCMLRu6mqKuvp7q2RmYoAUjM/lfyTAimL48EHHleFxWJlcMMzp07w82sdArystBrVFQatNRUGqmrvktjfQ3NTY20tbX+x3AkmMTCdH43JATziRZ8c+wot7LTycm4TOHNdEryMtHlZ6HNz6YoL5v8W9nk5txA6OvrRbrHoef08fhxHwFLFvPyBAsSDu6nwqDDqC2k1qihqVJHQ0UJVQYN5aXF6DRF3L59C6GpqYl79+7R0dFBS0sLra2t3L9/n0GZ5RAbw1eiUDizJiyEuK0xfLp9C1/uiuNAwl6SjieSfu0aRp0GvVaDSpWPUFtby5UrVzAYDKjVaiorK2XFpBHpftCOckMovh6zmP+GE/Z205g6dRLW1q9hM92KZYsW8lP8XjQFOZSVainRFCNIAMnJyZSXl8uy19XVDd+hprCAqCUe7IxezdK3vVjk54m7m4K57grsHKezJsCPUwcSMJZpKS0pRl+qQ5CYXbhwgdTUVIqKimR2UvtS3LiewQwLM/bHrmb/biUe7rNwe90FV1dHbB1siVoRxMWzZ6ksN6BTqyg3liG0tbWh1WplsIaGhuHBluL02dOMfknA13kKB7dH4u05F7fZM1G42GNtZ8VmEfB8yjmMRj3q/FzuVtyRAFvldisqKjCUlaGXlr6U3t5ejn1/DEEQsLOZTMAcW+LWBePlOY85rg6sWuzFV5siOHX+klivJS8rg5qquwiSTxsbG2V1JZWbmpvEvVlmGL8vQQb08ZnHvLlz8HScQkLMWk4eiSd+x2b2Ra7jxJ+XRDHU5KSnUl9X/exgm8IkylblNoQXzXAXFfb1dsPedjLe9pPYEx1G6PL3iP98D7+KgIX5N8lIS6G5sf6p9Z4HJtsuIhxh1AvMcHbE0+9Ndik3sT54ETsjw0hM+IS0099RmHmJopyrXE75hbbWlqeAD/7pkJWVnizJ+RmZ2Wzdsh1nJ1fGjbNgrPl4XrW0xOstPzZtiSP+8NccTvyBxJ9PcOLM75xMSeHiX+fFZ+4BgsRIq74tCyEag/7BIdzn+4l3Z8aoVywYP9FSVNochZMDM+0smTTZAhsXBS4e3ngtXkLgylUsXBpEdJySXvFFEqSG7+jVlIp+bO1o51ra31hbWOI0fgIeo8dgO2YsZqPNmTl9GscPxRCzIQh/EWhZ8AqCQ1aydn00q9ZGEBwcJE5Gz1NRSnUlnNm4gQLPd7j+2Rf8tmMXyYGhXAxTEjB7gay0v+8C0v44SlT4cgIDAwgRRQnw92H1B8vxFy0Ys/ljeX5lQL2+iNQP13BHsEH97Y/sPniIaVbWvL8tAZ/Qj2TA8PAIWahu8ffQ2dlFbW0dxaJ3S4rVZKZfJTc3R87/C130qfaFo8FmAAAAAElFTkSuQmCC",
                        "https://www.frontendpractice.com/static/941c6d471dad337338b741fa889d34f9/9c361/0f4d948b-bf26-4467-97c9-4d9d33ee1f59_Qrates%2Bwhy.png",
                        "https://www.frontendpractice.com/static/941c6d471dad337338b741fa889d34f9/31532/0f4d948b-bf26-4467-97c9-4d9d33ee1f59_Qrates%2Bwhy.png",
                        "https://www.frontendpractice.com/static/941c6d471dad337338b741fa889d34f9/9c361/0f4d948b-bf26-4467-97c9-4d9d33ee1f59_Qrates%2Bwhy.png",
                    ],
                    detail: 'index.html',
                },
                {
                    id: 7,
                    title: "Backstage Talks",
                    subtitle: "Magazine archive.",
                    list: ["Scroll transitions","Color choices","Fixed content","Minimal layout","and more!"],
                    srcset: [
                        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAACvUlEQVQ4y5WUy09TQRTG5/aWPkhMUBOjS6MudGcXatQFC9iYaJDolhgSTViZuDGujCuM0RBAQkuhpbeFlr7og9KWPigFiiA+IbrQuPEP+TznXtrelvJw8WVO7sz95nfOzBxhmRiG1T6E9pE3ME+9h3V8CGbPOER5EaK0cLRWUpCyURhjszDGZyHkeR+MUS+MYQUyf6RY5glaeJBBwxzHhQSkpagqIdYyEOusLGoxj9XFq+m69NTLyUZTnmMdmg6lIoc9MESInjNh8nwMIjevbVDJ7v+nloI+FR6JQFoIwDQ1CrN7DGKaNDUCiTaQCnGYnjyC8eVziM2CRlv9/0DDYgIGJiF1FJN4UM6hK5fEtRKRZcKQnw5AevWCDPPHM5TIUFCRL3+toHMpga6AgnvFNLo/V3AhpEDKRCA2co0HdaQh0V3a2UTvah7dUT8euicw8O0jbIoTYvh1nUxveljKavGHBtHpdsD2bhC34nPoWy3gdMQHkQ5RLRPHN1QJsxFcfTuInsUYHm+UcFuZxP3lDPr+/ICplNJO/NiEvDud5smgB71k1ptP4U4siGd/f8H2ZV2l/z/CPcMz+QT6yfAunXIPqf/3Lq5sl1U6vj77DQ96XmyYj+PEVhHXd7dw8+cn2DYKuPH9A85vr2g1bmlYDcpNpHSChqQfYs4F4bVDBN0Q9Fq4riod3cWWhhJR8ISUi2nXgBfxyE9rMaQ9O5bXAVmxw7AwBykVVOdqRvrM2oLTsFLbMnsnYFEcsE5SPOOEuhE/9jWtcZyq5HCWVGsCrGY6jk0BF6zOUVhcY3vGDrQ7htEW8tQXL83j3FoWF7dK6Kh2Ij2VPjb5XbB47DD7nLXRGJuBgWtVTtValUyL24hKbqbSG/J6booy1YRlSIfr9av2vuaf9FT7DOkfmYrM6ckJf2NdWqXTfPlbdO9/1yjS9doUV5AAAAAASUVORK5CYII=",
                        "https://www.frontendpractice.com/static/24a51c6173c67847a3c3f4ae499e947d/9c361/88426856-f72e-4080-92ba-4d67d7a3263a_Backstage%2BTalks.png",
                        "https://www.frontendpractice.com/static/24a51c6173c67847a3c3f4ae499e947d/31532/88426856-f72e-4080-92ba-4d67d7a3263a_Backstage%2BTalks.png",
                        "https://www.frontendpractice.com/static/24a51c6173c67847a3c3f4ae499e947d/9c361/88426856-f72e-4080-92ba-4d67d7a3263a_Backstage%2BTalks.png",
                    ],
                    detail: 'index.html',
                },
                {
                    id: 8,
                    title: "Déplacé Maison",
                    subtitle: "Home page.",
                    list: ["Unique layout","Cursor animations","Draggable slider","Hover effects","and more!"],
                    srcset: [
                        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD7UlEQVQ4y32US1DbVRTG44wudOOom7px4cLOVB1dtFtH68aF47hw5TjOOOqubtTRtlraKUgpTGopSHmU8GgBhZTwKCTBQAIJNCQhDXnwyBNKDRACCYTyDPy8/39MigO6+Obee+693znfPfccxUzYy9bjGOntFXa3luUxC2nN3ho7G9K+mLMu1quybX83KSO1Os/eToLN9RjbG0soBo1aUsmobJQIDkKyLS2ECU67iATdAh7mZid5JJBK/sVCNEgk5Mk5l6CIzYdk5oNGiWhnMy5Hc6+rjcKCi5RczefsD9+KsYDzZ79DWVLIrepy9FoNi4KY/bUMoRT2QTJpvrm+mJNru2+k7EYJEx4brrFh4aCVqspSbtWU09KkkgmtI/25oBRZoh2JQHiJzk3TWF8lH1K33qanu4262goahM08qOe3MqVsu9NYg91qwucexSec5QizCZAl7qfkt7p+7QpVN0vFWET+5Z8pKS6g4PIFLl08T4GQf1fdTH19Ncb+Xtlpd2crpFczkg9mdH83wUo8Krw6CUw5mfI5hAORkMA4M+LxpaT4HliwmXXE5iZJLkUYsw/KQRwilCNkk3FbC4U/fY5KWcS0VUvIYcFv1RF2mpgNjTNyMw/Ney9RcfJ52s99QWjcRGBsQP426Z1/SY4JwjTe0SuoihQUfXOcP359DYfuR4JWIwFbH+EpO7ama7S8/RTlrypo//4zZrxDBBx/5v7yE8nyN1kn5DXSq3oFbd3TtFco6Kx5AY+pmYiQGp4cxatvQv3+MVpeV2A484GIziDjMKH0hukEc/4pdPVvoWt4GV3jO3RVK7D3/sKEuQ+PpUu+3PnpKZpOKKg79RwWdTVh9xCbqYWjIlwTEdroqT3GYNtxTO3FXM97EYdexZi2if4WJRPWXgYvfcmdk89S/sYzdFz4mrB3+AjCrTh74pMvRnzUKU/ze8WH+O8bqCw+h2tAQ9Bu4IHxLn6nAXPRGdo/PoH2q3dp+OhN/K4htkQxHJKcIfRgvKdmQNMokqHD1K2is7kUp7mHkGeEObcRbWMZ+Z+cxieeoLY0H89wz+GPnSWcD7uxjwyg19TjH+nBPdiBy9SB776OkNvM+IieSlHDZTeu4rT0oizOY6D7dobjcFJWRVKceGxD9PXpsBvahWwdU5Ye/DYD0y4zDrOW/u4WLPpWzH0atGoVE6P6o7OcFl0mlXhEYjFEIj5LLBpgeSHIymKYpFgn4jMkYyEeJx5mzoj5+spDeS/bWBRH9cBM80zI5bSfTuaaaRaSY0lNajVKfDEi98xcPzzYoZ9EezQO7y0LqUuZsvvnrkKq4f/C9v/sZZFrf9L5jTh/Ax/kYWu6/dgKAAAAAElFTkSuQmCC",
                        "https://www.frontendpractice.com/static/20077d18295c4928154836b73e921ede/2c27d/347e9d96-407c-4008-9218-4ee3a3edd600_deplace-maison.png",
                        "https://www.frontendpractice.com/static/20077d18295c4928154836b73e921ede/31532/347e9d96-407c-4008-9218-4ee3a3edd600_deplace-maison.png",
                        "https://www.frontendpractice.com/static/20077d18295c4928154836b73e921ede/9c361/347e9d96-407c-4008-9218-4ee3a3edd600_deplace-maison.png",
                    ],
                    detail: 'index.html',
                },
                {
                    id: 9,
                    title: "Red Square",
                    subtitle: "Agency home page.",
                    list: ["Minimal design","Scroll animations","Hover effects","and more!"],
                    srcset: [
                        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAADRklEQVQ4y51SXUiTURg+d/62zSXOti40KJn5Q6Yoc0agEEb4gxaJywuvpCv/KhOz+UvRTVFhZVpOy1UqlXnpRRBiTecUTYJuJCLyIs1+nPt+ns452zdnaZGDZ+/znvOe5zzvez4SEREBjUaDHRQK1/j4VgisUavVfs4iUdM/XYQWSVod1P8Q2kzYoDcgMjLSL0oY2UmJnopqtiHIxLTa9bNE2VBts+XfOVESLXX4P84CYyD3OwwPD+dQhsyiSqXikYHtsXwzsUAQxXJycjISEhIQHR2NqKgo6HQ6GAwG6PV6vhYfH4+YmBg+s7+59zs0mUwoLy9HYWEhcnNzUVtbi7KyMuTn58NsNqOoqAilpaX8suDg4D9a3SDIWsrOzkZFRQU/WFxcjIKCAlgsFpSUlPCcXcgE8/LykJOTs3XLiqDRaER6ejoyMjJ4+3FxccjMzORITU3l+8xpWloaUlJSNnx7geJEeYDQ0FDeCkNISAjCwsIQFBTEEZgr+8pjKY+ogBw+lIXLbVa0NV3AlUttaLlYD2t9DZrOV6OloQaN9WdgvdCAZutFika0Njd50dKM9rZWtDRb0VBfh4a6s9gTGwuSf+wohgf78XSgHyPDT/FswI4HXTfRe/sq+jpt6Oq4RXEdtu4uPLL342GvDX33u9F7rwtDgwN4TNfudtzAnRvXELdvL0jZKQvmZ12YcoxhbsaFt5S7Jp2YHB/CxMuDcIx1wvFmDi7na8zOzWHaRWsnJzDldGBm2gnXFK19Mw6n4zWfPWGfx5Y/6STg2U3Jsm9Bxt9+JlMmSFVVFU8EQYAkSZBlmUaRgurR8+KPIxBXVJCEWZ7zdQZhApJnFKLkFVt1r+EAfX1SXV3JF0TRKybLoi96Kzn/eRzSCoHsbqS5163suQnpK6EHX9CzgM0+iMgoHRM85xMUaLGvMdkrBJ+oV6AH0redFOGQVy3U3RNgLQNfPuhgt7XD/nwUxv2JtOXKE7T8M79Fllchi68o+bLujon63bqpcCekH2bI33dB/BaLhfdmLC72wPluCYlJCSCVp6lt+QQ8VFDwTENYIhDcI3w2kuThc2XzFQU3vVTmFzMIwjLWlo2UJGF+4QM+Ln5CVlYWfgFNzG1n4RIZMQAAAABJRU5ErkJggg==",
                        "https://www.frontendpractice.com/static/555bff2379d114cf5ee6994467954f1c/2c27d/8bc02cef-ba8f-4c10-9369-8d6b9b804cce_Red%2BSquare%2BAgency.png",
                        "https://www.frontendpractice.com/static/555bff2379d114cf5ee6994467954f1c/31532/8bc02cef-ba8f-4c10-9369-8d6b9b804cce_Red%2BSquare%2BAgency.png",
                        "https://www.frontendpractice.com/static/555bff2379d114cf5ee6994467954f1c/9c361/8bc02cef-ba8f-4c10-9369-8d6b9b804cce_Red%2BSquare%2BAgency.png",
                    ],
                    detail: 'index.html',
                },
                {
                    id: 10,
                    title: "Nintendo",
                    subtitle: "Game info page.",
                    list: ["Dropdown menus","Hover animations","Image lightboxes","Content carousels","and more!"],
                    srcset: [
                        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAE3ElEQVQ4y5WUaUxUVxSAX3/1nzXVNm3qCi6oiLapVdEaQhSqqI1WAQHFhSVQkCkM4AgUkE0BoSxSFltRKQ0uIMuIKIIKqCiCIIIiAu6ogEAHmIEZvl6wLv3XvuS7756Tm+/d+3LOlbo9FPT4BkNvD///0b2dqQcG0KjVSG1D8EjkM4qqCUrKIyxNSVhqPgFxxwk6kI3fL8cITMgm+MBJQTYB8ccFJwhNURKRVkhISgFpOZd52KflgUqLVNc5wN1eLaZuaUhTHJBmeyDN8nzNDNnr2EAwR/4uP8dL5JzE3BVpqjOzLKOo7x7k1isN0m0xNAvzqtAzSGbJjNnojqGtM0bWnsy1kfOFVSSTNgRhYOWN/sbdfG3nwXTrPYy3kjPZZhcfrEpiiSKfRiFsEEj1o8IhlsfWItmV8qlTIgG+C1j7ozMePhb4+S5l504TvOUmhPsa4rnbAlOXn4j1nYaVt9jh5ossCLn2b+F91SCO2V1IXi8ZI29gq7838/1zMdkVxzofBes8PQUyLOUyZH4/MFeeIfI/Y+BfiiTvZlFKtxBqaHh95EFGjt3UqSGzAYyPgWH0WRyi/PFIDMc+OhLL306x+mAJ1slZuMX4Iov1x3x/IlPSdcxM72fNoSbujAh7hpAaxVDf0U9sXjFnbjeQ+EL8z/MlBB7cTtSfrkQnWLA3y5egE6HsP2yPZ0YQgadCcKw4h9vjYXY0dbNaEUJZ7R1GXFJdlzD36rD02s1y2y0kn1bi09OCvLMRt4e3cW+5jkt1BrLGHALuFhLx5CqBrxqI73jCsbJydoSHsWi9FUm/H+HmCxVSl3qIflGYKyztkD4cy0dmK5ly0h3jijDm5QdjkLqPT0KjmXg4kvkXI1lfcoQ1mRmYxqfwudtmJEnCyHQV7b0qutSiDkfLfHiYK5crOZ6nJO9cMco7Vylorab4aQ1F92opvN7A6dpb5DVXoGy9Rm5dNTmNNyhoriG7UElZ+ZW3HTMq7FOp6OnoQDuo+c9Np+18BYow8ApEvd6efuW5d0KdEPY/b0fT1cmQRo1ON4T2fbRvGBxlaEgr1qlQ1V6l90Ytf12vQis2NCoc1OkYHAbR0gz+0+4j75F4eIR3/T8a6967FkbQvhdrtDqkpj6oa67iaNpW8i86cyTAhgv+TpxI20FUqTMR5c4EHN3JHg9P/LdsI3OvI0dD3TmVLifukB2JYv2uX+3Iqr9Em3BJjSqoqCugOHgc+cEzibEeS7rNZ4TLJhCTMIn4/MnI0qeR6PoVyavH47dsPOaT9di6bTqXYvTIczEiym0cZ2v+oOmNsLL+LLWp+lzZP5uSOENy4oyIi5hJdpABsTJ90qPsSVC4EeZii/s6B2zNHHCI3ENiZiB5BzeQGmlM0eUC7g0I4X1RhLnXlDj7fIwyXo+q2OnkRk4kM3gC54On4uQ+Azv/77BYugk9/c24mRljt9IMO2dHXD3XIosy4/ugL0koOswDUSTSXSEsry5FETgf1/CFeIuv+e1bKKRLac1YQk7SN2wKW4yJuSuLZwRgPk/Btyt9UPhYsy98BYo0a7aHL+NQ6Una1EJYN3I5dPZR+aSdktangmeUt7Zz40E7t9pfUt54H2XNPfJvPiOroo0LLb2cb+ii7HEPl553Ufm4hfJHbVQ96x29ZP8GO5ucAcr2SPMAAAAASUVORK5CYII=",
                        "https://www.frontendpractice.com/static/0253e1aabdff5a88940344e6083b7a66/2c27d/1e246b80-6aad-42ab-90d7-d02d663bc3a2_Nintendo%2Bgame%2Bpage.png",
                        "https://www.frontendpractice.com/static/0253e1aabdff5a88940344e6083b7a66/31532/1e246b80-6aad-42ab-90d7-d02d663bc3a2_Nintendo%2Bgame%2Bpage.png",
                        "https://www.frontendpractice.com/static/0253e1aabdff5a88940344e6083b7a66/9c361/1e246b80-6aad-42ab-90d7-d02d663bc3a2_Nintendo%2Bgame%2Bpage.png",
                    ],
                    detail: 'index.html',
                },
            ]
        }
    },
    methods: {
        loadDone(index) {
            this.complete[index] = true;
        }
    }
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
    template:`
            <my-header :home-page="homePage"></my-header>
            <my-main></my-main>
            <my-footer :home-page="homePage" :my-github="myGithub" :reference="reference"></my-footer>
    `,
    data() {
        return {
            homePage: 'index.html',
            myGithub: 'https://github.com/wges9405',
            reference: 'https://www.frontendpractice.com/',
        }
    },
};

Vue.createApp(app).mount('#app');