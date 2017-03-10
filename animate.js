class Animate {

    static drawLine(ctx, x0, y0, x1, y1, t=1)
    {
        if (t == 0)
            return;
        ctx.moveTo(x0, y0);
        ctx.lineTo(x0 + (x1 - x0) * t, y0 + (y1 - y0) * t)
    }

    static drawCircle(ctx, x, y, radius, t=1)
    {
        if (t == 0)
            return;
        ctx.moveTo(x + radius, y);
        ctx.arc(x, y, radius, 0, 6.282 * t);
    }
}
