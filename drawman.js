var parts = [
    drawHead,
    drawBody,
    drawLeftArm,
    drawRightArm,
    drawLeftLeg,
    drawRightLeg
];
var canvas;
var ctx;
var canvasWidth;
var canvasHeight;

function clearCanvas()
{
    if (canvas)
        canvas.width = canvas.width;
}

function setupDrawing()
{
    canvas = document.getElementById("drawCanvas");
    ctx = canvas.getContext("2d");
    canvas.width = canvasWidth = canvas.width;
    canvasHeight = canvas.height;

    drawStand();
}

function drawStand()
{
    ctx.strokeStyle = "#0000ff";
    ctx.lineWidth = 4;

    ctx.moveTo(150, 350);
    ctx.lineTo(150, 100);
    ctx.lineTo(300, 100);
    ctx.lineTo(300, 130);
    ctx.stroke();

    ctx.lineWidth = 2;
}

function drawNextPart(index)
{
    if (index >= 0 && index < parts.length)
        parts[index].call();
}

function drawHead()
{
    ctx.moveTo(320, 150);
    ctx.arc(300, 150, 20, 0, 6.282);
    ctx.stroke();
}

function drawBody()
{
    ctx.moveTo(300, 170);
    ctx.lineTo(300, 260);
    ctx.stroke();
}

function drawRightArm()
{
    ctx.moveTo(300, 180);
    ctx.lineTo(250, 210);
    ctx.stroke();
}

function drawLeftArm()
{
    ctx.moveTo(300, 180);
    ctx.lineTo(350, 210);
    ctx.stroke();
}

function drawRightLeg()
{
    ctx.moveTo(300, 260);
    ctx.lineTo(250, 310);
    ctx.stroke();
}

function drawLeftLeg()
{
    ctx.moveTo(300, 260);
    ctx.lineTo(350, 310);
    ctx.stroke();
}
