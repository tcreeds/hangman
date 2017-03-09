

class HangmanCanvas {

    init()
    {
        this.canvas = document.getElementById("drawCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.canvasWidth = this.canvas.width;
        this.canvasHeight = this.canvas.height;

        this.parts = [
            this.drawHead,
            this.drawBody,
            this.drawLeftArm,
            this.drawRightArm,
            this.drawLeftLeg,
            this.drawRightLeg
        ];

    }

    enter()
    {
        this.drawStand();
    }

    exit()
    {
        if (this.canvas)
            this.canvas.width = this.canvas.width;
        this.expand();
    }

    expand()
    {
        $(this.canvas).removeClass("minimized");
    }

    minimize()
    {
        $(this.canvas).addClass("minimized");
    }

    drawStand()
    {
        this.ctx.strokeStyle = "#0000ff";
        this.ctx.lineWidth = 8;

        this.ctx.moveTo(150, 350);
        this.ctx.lineTo(150, 100);
        this.ctx.lineTo(300, 100);
        this.ctx.lineTo(300, 130);
        this.ctx.stroke();

        this.ctx.lineWidth = 4;
    }

    drawNextPart(index)
    {
        if (index >= 0 && index < this.parts.length)
            this.parts[index].call(this);
    }

    drawHead()
    {
        this.ctx.moveTo(320, 150);
        this.ctx.arc(300, 150, 20, 0, 6.282);
        this.ctx.stroke();
    }

    drawBody()
    {
        this.ctx.moveTo(300, 170);
        this.ctx.lineTo(300, 260);
        this.ctx.stroke();
    }

    drawRightArm()
    {
        this.ctx.moveTo(300, 180);
        this.ctx.lineTo(250, 210);
        this.ctx.stroke();
    }

    drawLeftArm()
    {
        this.ctx.moveTo(300, 180);
        this.ctx.lineTo(350, 210);
        this.ctx.stroke();
    }

    drawRightLeg()
    {
        this.ctx.moveTo(300, 260);
        this.ctx.lineTo(250, 310);
        this.ctx.stroke();
    }

    drawLeftLeg()
    {
        this.ctx.moveTo(300, 260);
        this.ctx.lineTo(350, 310);
        this.ctx.stroke();
    }
}
