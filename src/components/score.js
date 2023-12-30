window.score = {
    value: 0,
    x: 20,
    y: 20,
    color: 'White',
    draw: function () {
        ctx.fillStyle = this.color;
        ctx.font = '24px Arial';
        ctx.fillText('Score: ' + this.value, this.x, this.y);
    }
};