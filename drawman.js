

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

        this.drawSteps = hangmanData.strikes;
        this.joints = hangmanData.joints;

        this.drawCounter = -1;
        this.drawing = false;
        this.animationLength = 750;

    }

    enter()
    {
        this.drawing = true;
        this.lastAnimateStartTime = Date.now();
        requestAnimationFrame(this.draw.bind(this));
    }

    exit()
    {
        this.drawCounter = -1;
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
            this.drawStand(this.drawCounter == -1 ? lerp : 1);
            for (var i = 0; i <= this.drawCounter; i++)
            {
                if (i < this.drawSteps.length)
                {
                    var type = "line";
                    if (this.drawSteps[i].length == 3)
                        type = this.drawSteps[i][2];

                    var joint1 = this.joints[this.drawSteps[i][0]];
                    var joint2 = this.joints[this.drawSteps[i][1]];

                    if (type == "line")
                        Animate.drawLine(this.ctx, joint1.x, joint1.y, joint2.x, joint2.y, i == this.drawCounter ? lerp : 1);
                    else if (type == "circle")
                        Animate.drawCircle(this.ctx, joint1.x, joint1.y, joint2.y - joint1.y, i == this.drawCounter ? lerp : 1)
                    this.ctx.stroke();
                }
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
        this.ctx.stroke();
        this.ctx.lineWidth = 4;
    }
}
