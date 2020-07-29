require.config({
    baseUrl: 'js',
    paths: {
        jquery: 'jquery-1.12.4.min',
        Vue: 'vue',
        KeyBord: 'keybord',
        SkinChange: 'skin',
        // keybordminjquery: 'keyboard.min'
        word: 'word',
        nicescroll: './plugin/jquery.nicescroll.min'
    }
});

require(['jquery', 'Vue', 'KeyBord', 'SkinChange', 'word', 'nicescroll'], function($, Vue, KeyBord, SkinChange, word, nicescroll) {
    Vue.config.devtools = true;
    var vm = new Vue({
        el: '#app',
        components: { KeyBord, SkinChange },
        data: {
            IsKaishi: {
                type: true,
                content: '',
                isChongXin: false,
                ShuRuFaType: '请保持中文输入法，注意中英文标点',
            },
            YuanNeiRong: '',
            DaZiLieBiao: [],
            XieRuNeiRong: [],
            DaDuanLuoChaiFens: [],
            KaiQiShuRu: 0,
            time: {
                小时: '00',
                分钟: '00',
                秒: '00'
            },
            t: null,
            ZQL: '0.00',
            PiFu: 0,
            ChaiFen: 62,
            TabWordChange: [
                { name: 'HTML练习', type: 'html', class: 'e' },
                { name: 'CSS练习', type: 'css', class: 'e' },
                { name: 'JS练习', type: 'javascript', class: 'e' },
                { name: '中文', type: 'chinese', class: 'z' },
                { name: '英文', type: 'english', class: 'e' },
            ],
            TabWord_show: 0,
        },
        directives: {
            //自定义聚焦指令
            focus: {
                inserted: function(el, {
                    value
                }) {
                    if (el.className == 'inp' + value) {
                        el.focus()
                    }
                }
            }
        },
        computed: {
            //监听内容的变化
            WatchWord() {
                var aa = [];
                if (this.XieRuNeiRong.length > 0) {
                    this.XieRuNeiRong.forEach((i, c, v) => {
                        if (i.length) {
                            aa.push(i.split(""))
                        } else {
                            aa.push(i)
                        }
                    })
                }

                return aa;
            },
            DaDuanLuoChaiFen() {

            },
            UserCumputed() {
                return ({
                    speed: this.XieRuNeiRong.join('').length <= 0 || (this.time.小时 - 0) * 120 + (this.time.分钟 - 0) * 60 + (this.time.秒 - 0) <= 0 ? "0" : Math.round((this.XieRuNeiRong.join('').length / ((this.time.小时 - 0) * 120 + (this.time.分钟 - 0) * 60 + (this.time.秒 - 0))) * 60),
                    jindu: this.YuanNeiRong.length <= 0 ? "0.00%" : ((Math.round(this.XieRuNeiRong.join('').length / this.YuanNeiRong.length * 10000) / 100.00).toFixed(2) + "%")
                })
            }
        },
        beforeCreate() {

        },
        created() {
            this.YuanNeiRong = word[this.TabWordChange[0].type]
            this.init();
            var that = this;
            document.onkeydown = function(event) {
                var event = event || window.event;
                if (event.keyCode == 27) {
                    that.beginDaZi();
                    that.KaiQiShuRu = 0;
                }
            };
        },
        mounted() {
            this.$nextTick(() => {
                document.oncontextmenu = function(evt) {
                    evt.preventDefault();
                }

                document.onselectstart = function(evt) {
                    evt.preventDefault();
                };
                this.IsKaishi.content = `<div style="line-height:150px;">ESC开始和暂停</div>`;
                $(this.$refs.ZheZhaoTip).html(this.IsKaishi.content);
                var e = window.localStorage.getItem('PiFu') - 0;
                if (window.localStorage.getItem('PiFu')) {
                    this.bgchangenex(e, 'bgBingYing');
                    this.bgchangenex(e, 'bgBingYingCf');
                } else {
                    this.bgchangenex(0, 'bgBingYing');
                    this.bgchangenex(0, 'bgBingYingCf');
                }
                $(this.$refs.XieZiBanMain_con).niceScroll({
                    cursorwidth: "5px", // 滚动条的宽度，单位：便素
                    cursorborder: "none", // CSS方式定义滚动条边框
                    cursorborderradius: "0px", // 滚动条圆角（像素）
                    scrollspeed: 550, // 滚动速度
                    mousescrollstep: 10, // 鼠标滚轮的滚动速度 (像素)
                    autohidemode: false,
                    background: "#ddd",
                });


            })
        },
        methods: {
            changeWord(type, ez, i) {
                if (!this.IsKaishi.type) {
                    return;
                } else {
                    this.YuanNeiRong = word[type];
                    switch (type) {
                        case 'css':
                            this.ChaiFen = 79
                            break;
                        case 'javascript':
                            this.ChaiFen = 79
                        case 'html':
                            this.ChaiFen = 62
                            break;
                        case 'chinese':
                            this.ChaiFen = 40
                            break;
                        case 'english':
                            this.ChaiFen = 79
                    }
                }
                this.TabWord_show = i;
                this.init();
            },
            bgchangenex(e, name) {
                if (name) {
                    this.$refs[name].style.background = 'url(images/bg/' + e + '.jpg)' + 'no-repeat'
                    this.$refs[name].style.backgroundSize = 'cover';
                    this.$refs[name].style.backgroundAttachment = 'fixed';
                } else {
                    setTimeout(() => {
                        this.$refs['bgBingYing'].style.background = 'url(images/bg/' + e + '.jpg)' + 'no-repeat'
                        this.$refs['bgBingYing'].style.backgroundSize = 'cover';
                        this.$refs['bgBingYing'].style.backgroundAttachment = 'fixed';
                    }, 2000)
                    this.$refs['bgBingYingCf'].style.height = '0';
                    this.$refs['bgBingYingCf'].style.background = 'url(images/bg/' + e + '.jpg)' + 'no-repeat'
                    this.$refs['bgBingYingCf'].style.backgroundSize = 'cover';
                    this.$refs['bgBingYingCf'].style.backgroundAttachment = 'fixed';
                    this.$refs['bgBingYingCf'].style.height = '100%';

                }
                this.PiFu = e;
            },
            init() {
                //对打字列表进行拆分
                this.time = {
                    小时: '00',
                    分钟: '00',
                    秒: '00'
                };
                var that = this;
                this.DaDuanLuoChaiFens = [];
                this.XieRuNeiRong = [];
                // this.DaZiLieBiao = this.YuanNeiRong.replace(/\s/ig, '').split(""); //去空格
                this.DaZiLieBiao = this.YuanNeiRong.split("");; //
                if (this.DaZiLieBiao.length > that.ChaiFen) {
                    var hang = this.DaZiLieBiao.length % that.ChaiFen == 0 ? parseInt(this.DaZiLieBiao.length / that.ChaiFen) : parseInt(this.DaZiLieBiao.length / that.ChaiFen) + 1;
                    for (var c = 0; c < hang; c++) {
                        this.DaDuanLuoChaiFens.push(this.DaZiLieBiao.splice(0, that.ChaiFen));
                        this.XieRuNeiRong.push([])
                    }
                } else {
                    this.DaDuanLuoChaiFens.push(this.DaZiLieBiao);
                    this.XieRuNeiRong.push([])
                }
            },
            stoporbegin() {

            },
            star() {
                var that = this;
                if (!that.IsKaishi.type) {
                    that.time.秒 - 0;
                    if (that.time.秒 < 9) {
                        that.time.秒++;
                        that.time.秒 = '0' + that.time.秒;
                    } else {
                        that.time.秒++
                    }
                    if (that.time.秒 >= 61) {
                        that.time.分钟 - 0;
                        that.time.秒 = '0' + 1;
                        if (that.time.分钟 < 9) {
                            that.time.分钟++;
                            that.time.分钟 = '0' + that.time.分钟;
                        } else {
                            that.time.分钟++
                        }
                    }
                    if (that.time.分钟 >= 61) {
                        that.time.小时 - 0;
                        that.time.分钟 = '0' + 1;
                        if (that.time.小时 < 9) {
                            that.time.小时++;
                            that.time.小时 = '0' + that.time.小时;
                        } else {
                            that.time.小时++
                        }
                    }
                }
            },
            beginDaZi(cv) {
                $(this.$refs.ZheZhaoTip).html('<div style="line-height:150px;">ESC开始</div>');
                this.IsKaishi.type = !this.IsKaishi.type;
                var that = this;
                if (!this.IsKaishi.type) {
                    this.t = setInterval(this.star, 1000);
                    that.$refs.input01[0].querySelector('input').focus();
                    if (this.IsKaishi.isChongXin) {
                        this.ChongXinKaiShi()
                    }
                } else {
                    clearTimeout(this.t);
                    that.$refs.input01.forEach((element, i) => {
                        that.$refs.input01[i].querySelector('input').blur()
                    })
                }

            },
            ChongXinKaiShi() {
                this.IsKaishi.isChongXin = !this.IsKaishi.isChongXin;
                this.$refs.input01[0].querySelector('input').focus();
                this.time = {
                    小时: '00',
                    分钟: '00',
                    秒: '00'
                };
                this.XieRuNeiRong.forEach((ele, i) => {
                    this.XieRuNeiRong[i] = []
                })
                this.WatchWord.forEach((ele, i) => {
                    this.WatchWord[i] = []
                })
            },
            DaZiJieShu() {
                this.IsKaishi.content = `
                            <style>
                                .DaZiJieShu{}
                                .DaZiJieShu span{width:50%;display: inline-block;text-align:right}
                                .DaZiJieShu b{width:50%;display: inline-block;text-align:left}
                            </style>
                            <div style="" class="DaZiJieShu">
                                <h2>打字结束</h2>
                                <div><span >打字时间：</span><b style="color:#ff5151;">${this.time.小时}:${this.time.分钟}:${this.time.秒}</b></div>
                                <div><span>打字速度：</span><b style="color:#ff5151;">${this.UserCumputed.speed}字/分钟</b></div>
                                <div><span>正确率：</span><b style="color:#ff5151;">${this.ZQL}%</b></div>
                                <div><span>获得称号：</span><b style="color:#ff5151;">打字专家</b></div>
                                <div>Esc重新开始</div>
                            </div>
                        `;
                $(this.$refs.ZheZhaoTip).html(this.IsKaishi.content);
                clearTimeout(this.t);
                this.$refs.input01.forEach((element, i) => {
                    this.$refs.input01[i].querySelector('input').blur()
                })
                this.IsKaishi.type = true;
                this.IsKaishi.isChongXin = true
            }
        },
        watch: {
            WatchWord: {
                handler(newValue, oldValue) {
                    var ZhunQueLv = [];
                    newValue.forEach((i, c, v) => {
                        if (i instanceof Array && i) {
                            if (i.length >= this.DaDuanLuoChaiFens[c].length) {
                                if (this.$refs.input01.length - 1 > c) {
                                    this.$refs.input01[c + 1].querySelector('input').focus();
                                }
                                this.XieRuNeiRong[c] = this.XieRuNeiRong[c].slice(0, this.DaDuanLuoChaiFens[c].length)
                            }
                            i.forEach((ip, cp, vp) => {
                                if (ip != this.DaDuanLuoChaiFens[c][cp]) {
                                    ZhunQueLv.push(ip);
                                }

                            })
                        }
                    });
                    //准确率计算
                    this.ZQL = (this.XieRuNeiRong.join('').length - ZhunQueLv.length) <= 0 ? '0.00' : (((this.XieRuNeiRong.join('').length - ZhunQueLv.length) * 100 / this.XieRuNeiRong.join('').length).toFixed(2)).toString();

                    if (this.XieRuNeiRong.join('').length >= this.YuanNeiRong.split("").length) { //不去空格
                        //当写入完成结束时
                        this.DaZiJieShu();
                    }
                },
                deep: true
            },

        }
    })

});