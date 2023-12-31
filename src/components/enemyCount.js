window.score = {
    value: ,
    x: 20,
    y: 20,
    color: 'White',
    draw: function () {
        ctx.fillStyle = this.color;
        ctx.font = '24px Arial';
        ctx.fillText('Enemy Count: ' + this.value, this.x, this.y);
    }
};