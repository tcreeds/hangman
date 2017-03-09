

class HangmanCanvas {

    init()
    {
        this.canvas = document.getElementById("drawCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.canvasWidth = this.canvas.width;
        this.canvasHeight = this.canvas.height;

        this.parts = [
            this.drawStand,
            this.drawHead,
            this.drawBody,
            this.drawLeftArm,
            this.drawRightArm,
            this.drawLeftLeg,
            this.drawRightLeg
        ];

        this.drawCounter = 0;
        this.drawing = false;
        this.animationLength = 750;

    }

    enter()
    {
        this.drawing = true;
        this.drawNextPart();
        requestAnimationFrame(this.draw.bind(this));
    }

    exit()
    {
        this.drawCounter = 0;
        this.drawing = false;
        if (this.canvas)
            this.canvas.width = this.canvas.width;
        this.expand();
    }

    draw()
    {
        if (this.drawing)
        {
            this.canvas.width = this.canvas.width;
            var lerp = Math.min((Date.now() - this.lastAnimateStartTime) / this.animationLength, 1);
            for (var i = 0; i < this.drawCounter; i++)
            {
                if (i < this.parts.length)
                    this.parts[i].call(this, i == this.drawCounter - 1 ? lerp : 1);
            }
            requestAnimationFrame(this.draw.bind(this));
        }
    }

    expand()
    {
        $(this.canvas).removeClass("minimized");
    }

    minimize()
    {
        $(this.canvas).addClass("minimized");
    }

    drawNextPart()
    {
        this.drawCounter++;
        this.lastAnimateStartTime = Date.now();
    }

    drawStand(lerpValue)
    {
        this.ctx.strokeStyle = "#0000ff";
        this.ctx.lineWidth = 8;
        var lerp1 = Math.min(lerpValue * 3, 1);
        var lerp2 = Math.max(Math.min(lerpValue * 3 - 1, 1), 0);
        var lerp3 = Math.max(Math.min(lerpValue * 3 - 2, 1), 0);
        Animate.drawLine(this.ctx, 150, 350, 150, 100, lerp1)
        Animate.drawLine(this.ctx, 150, 100, 300, 100, lerp2)
        Animate.drawLine(this.ctx, 300, 100, 300, 130, lerp3);

        this.ctx.lineWidth = 4;
    }

    drawHead(lerpValue)
    {
        Animate.drawCircle(this.ctx, 300, 150, 20, lerpValue)
    }

    drawBody(lerpValue)
    {
        Animate.drawLine(this.ctx, 300, 170, 300, 260, lerpValue)
    }

    drawRightArm(lerpValue)
    {
        Animate.drawLine(this.ctx, 300, 180, 250, 210, lerpValue);
    }

    drawLeftArm(lerpValue)
    {
        Animate.drawLine(this.ctx, 300, 180, 350, 210, lerpValue);
    }

    drawRightLeg(lerpValue)
    {
        Animate.drawLine(this.ctx, 300, 260, 250, 310, lerpValue);
    }

    drawLeftLeg(lerpValue)
    {
        Animate.drawLine(this.ctx, 300, 260, 350, 310, lerpValue);
    }
}
