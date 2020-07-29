define(['jquery', 'Vue', 'nicescroll'], function($, Vue, nicescroll) {
    return ({
        props: ['skinchangedata'],
        template: `
        <div>
            <div class="HuanFu">
                <div class="Bgtit">
                    <div class="HuanFu">
                        <div class="img"><img src="images/bg/1.jpg" alt=""></div>
                        <div class="h">换肤</div>
                    </div>
                    <div class="HuanFu">
                        <div class="img"><img src="images/bg/1.jpg" alt=""></div>
                        <div class="h">白天</div>
                    </div>
                    <div class="HuanFu">
                        <div class="img"><img src="images/bg/1.jpg" alt=""></div>
                        <div class="h">夜间</div>
                    </div>
                    <div class="HuanFu">
                        <div class="img"><img src="images/bg/1.jpg" alt=""></div>
                        <div class="h">冬天</div>
                    </div>
                </div>
                <div ref="BgListcc" id="BgListcc">
                    <ul><li :class="[{active:showActive == item.code}]" v-for="(item,index) in PiFu.BgLint" :key="index" @click="ChangePiFu($event,item.code)">
                    <div class="Bgli_img"><img v-bind:src="'images/bg/'+item.code+'.jpg'"></div>
                    <div class="Bgli_tit">{{item.name}}</div>
                    </li></ul>
                </div>
            </div>
        </div>
        `,
        data: function() {
            return {
                PiFu: {
                    defult: true,
                    BgLint: [
                        { code: 0, name: '动漫' },
                        { code: 1, name: '紫色傍晚' },
                        { code: 2, name: '蓝色沙滩' },
                        { code: 3, name: '梦幻猫咪' },
                        { code: 4, name: '红树叶' },
                        { code: 5, name: '绿色公园' },
                        { code: 6, name: '山中小窝' },
                        { code: 7, name: '树林' },
                        { code: 8, name: '日暮' },
                        { code: 9, name: '山野' },
                        { code: 10, name: '金色朝阳' }
                    ],
                },
                showActive: 0
            }
        },
        created() {},
        mounted() {
            this.$nextTick(() => {
                $(this.$refs.BgListcc).niceScroll({
                    cursorwidth: "2px", // 滚动条的宽度，单位：便素
                    cursorborder: "none", // CSS方式定义滚动条边框
                    cursorborderradius: "0px", // 滚动条圆角（像素）
                    scrollspeed: 150, // 滚动速度
                    mousescrollstep: 40, // 鼠标滚轮的滚动速度 (像素)
                });
            })
        },
        methods: {
            ChangePiFu(e, i) {
                this.$emit('bgchangenex', i)
                window.localStorage.setItem('PiFu', i);
                this.showActive = i;
            }
        },
        watch: {
            skinchangedata: function(newval, oldval) {
                this.showActive = this.skinchangedata
            }
        }
    })
});