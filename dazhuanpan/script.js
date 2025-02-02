class WheelGame {
    constructor() {
        this.canvas = document.getElementById('wheel');
        this.ctx = this.canvas.getContext('2d');
        this.startButton = document.getElementById('startButton');
        this.sectionsInput = document.getElementById('sectionsInput');
        this.targetNumber = document.getElementById('targetNumber');
        this.result = document.getElementById('result');
        
        this.isSpinning = false;
        this.currentRotation = -Math.PI / 2; // 设置初始角度为-90度，使指针指向第一个扇区
        this.spinSpeed = 0;
        this.sections = [];
        this.constantSpeed = 0.1; // 添加匀速旋转的速度常量
        this.animationId = null; // 添加动画ID用于控制
        
        // 设置目标数字的初始值和最大值
        this.targetNumber.value = '50';
        this.targetNumber.max = '100';

        this.init();
    }

    init() {
        this.canvas.width = 300;
        this.canvas.height = 300;
        this.generateSections();
        this.draw();
        
        this.startButton.addEventListener('click', () => this.handleButtonClick());
        this.sectionsInput.addEventListener('change', () => {
            this.generateSections();
            this.draw();
        });
    }

    generateSections() {
        const count = parseInt(this.sectionsInput.value) || 30;  // 默认30个分区
        const maxScore = 100; // 设置最高分为100
        
        // 生成递增的最大值数组，然后反转数组顺序
        this.sections = Array.from({length: count}, (_, i) => 
            Math.ceil(((i + 1) / count) * maxScore)
        ).reverse();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const center = this.canvas.width / 2;
        const radius = center - 10;
        const anglePerSection = (Math.PI * 2) / this.sections.length;

        this.ctx.save();
        this.ctx.translate(center, center);
        this.ctx.rotate(this.currentRotation);

        this.sections.forEach((number, index) => {
            const startAngle = index * anglePerSection;
            const endAngle = startAngle + anglePerSection;

            // 只绘制扇形，移除数字绘制
            this.ctx.beginPath();
            this.ctx.moveTo(0, 0);
            this.ctx.arc(0, 0, radius, startAngle, endAngle);
            this.ctx.closePath();
            this.ctx.fillStyle = `hsl(${(360 / this.sections.length) * (this.sections.length - index - 1)}, 70%, 60%)`;
            this.ctx.fill();
            this.ctx.stroke();
        });

        this.ctx.restore();
    }

    spin() {
        if (!this.isSpinning) return;
        
        // 改回顺时针方向旋转
        this.currentRotation += this.constantSpeed;
        this.draw();
        this.animationId = requestAnimationFrame(() => this.spin());
    }

    checkResult() {
        // 计算当前角度，考虑初始-90度偏移
        let angle = ((this.currentRotation + Math.PI / 2) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
        const sectionAngle = (Math.PI * 2) / this.sections.length;
        
        // 直接计算指针指向的扇区索引
        const index = Math.floor(angle / sectionAngle);
        
        // 直接获取该扇区的分数值作为中奖数字
        const winningNumber = this.sections[index];
        const targetNumber = parseInt(this.targetNumber.value) || 50;

        console.log('当前角度:', (angle * 180 / Math.PI).toFixed(2), '度');
        console.log('扇区角度:', (sectionAngle * 180 / Math.PI).toFixed(2), '度');
        console.log('指向扇区:', index + 1);
        console.log('中奖数字:', winningNumber);

        const resultMessage = winningNumber >= targetNumber
            ? `恭喜你达成目标！抽中数字：${winningNumber}`
            : `兄弟，你还得练呢。抽中数字：${winningNumber}`;
        
        this.result.textContent = resultMessage;
        this.result.className = 'result ' + (winningNumber >= targetNumber ? 'success' : 'failure');
        this.startButton.textContent = '开始';
        this.isSpinning = false;
    }

    handleButtonClick() {
        if (!this.isSpinning) {
            // 点击开始按钮
            this.isSpinning = true;
            this.startButton.textContent = '发射';
            this.result.textContent = '';
            this.result.className = 'result';
            this.spin(); // 开始匀速旋转
        } else {
            // 点击发射按钮
            this.isSpinning = false;
            cancelAnimationFrame(this.animationId);
            this.checkResult(); // 立即检查结果
            this.startButton.textContent = '开始';
        }
    }
}

window.addEventListener('load', () => {
    new WheelGame();
});
