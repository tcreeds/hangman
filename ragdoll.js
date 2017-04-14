class RagDoll {

    constructor()
    {
        this.currentRandom = 0;
        this.randoms = [];
        for (var k = 0; k < 100; k++)
            this.randoms.push(Math.random());
        this.joints = {};
        this.springConstant = 8;
        this.damping = 0.8;
        this.gravity = 3;
        var names = Object.keys(hangmanData.joints);
        for (var i = 0; i < names.length; i++)
        {
            var joint = hangmanData.joints[names[i]];
            this.joints[names[i]] = {
                name: names[i],
                connections: [],
                x: joint.x,
                y: joint.y,
                dx: 0,
                dy: 0,
                force: {
                    x: 0,
                    y: 0
                }
            }
        }
        this.makeConnections();
        this.rootJoint = this.joints[hangmanData.rootJoint];
        this.rootPosition = {
            x: this.rootJoint.x,
            y: this.rootJoint.y}
        this.headRadius = Math.abs(this.joints["neck"].y - this.joints["head"].y);
        this.lastUpdateTime = Date.now();
        this.interval = setInterval(this.update.bind(this), 15);
    }
    
    destroy()
    {
        clearInterval(this.interval);
    }

    makeConnections()
    {
        for (var i = 0; i < hangmanData.connections.length; i++)
        {
            var conn = hangmanData.connections[i];
            var j1 = this.joints[conn[0]];
            var j = this.joints[conn[1]];
            var d = Math.sqrt(((j.x - j1.x) * (j.x - j1.x)) + ((j.y - j1.y) * (j.y - j1.y)));
            console.log(j1.name + "-" + j.name + ": " + d);
            j1.connections.push({
                name: conn[1],
                distance: d
            });
        }
    }
    
    getRandom()
    {
        this.currentRandom++;
        if (this.currentRandom == 100)
            this.currentRandom = 0;
        return this.currentRandom;
        
    }

    update()
    {
        var ground = 350;
        var dt = Date.now() - this.lastUpdateTime;
        this.rootJoint.x = this.rootPosition.x;
        this.rootJoint.y = this.rootPosition.y;
        this.rootJoint.dy = 0;
        this.rootJoint.dx = 0;
        this.addForces(this.rootJoint, dt);
        this.lastUpdateTime = Date.now();
    }

    addForces(joint, dt)
    {
        joint.force.y += this.gravity;
        for (var i = 0; i < joint.connections.length; i++)
        {
            var j = this.joints[joint.connections[i].name];
            this.addForce(joint, j, joint.connections[i]);
            this.addForces(j, dt);
        }
        joint.dx += joint.force.x * (dt/1000);
        joint.dy += joint.force.y * (dt/1000);
        joint.force.x = 0;
        joint.force.y = 0;
        joint.x += joint.dx;
        joint.y += joint.dy;
        joint.x += (this.randoms[this.getRandom()] - 0.5) * 0.5;
    }

    addForce(joint1, joint2, conn)
    {
        var distanceVector = {
            x: joint2.x - joint1.x,
            y: joint2.y - joint1.y
        };
        var relativeVelocity = {
            x: joint2.dx - joint1.dx,
            y: joint2.dy - joint1.dy
        }
        var currentDistance = Math.sqrt(distanceVector.x * distanceVector.x + distanceVector.y * distanceVector.y);
        
        var force = this.calculateSpringForce(currentDistance, conn.distance, distanceVector, relativeVelocity, this.damping, this.springConstant);

        joint1.force.x -= force.x;
        joint1.force.y -= force.y;
        joint2.force.x += force.x;
        joint2.force.y += force.y;
    }

    calculateSpringForce(distance, desiredDistance, distanceVector, relativeVelocity, damping, springConstant)
    {
        var distance;
        var desiredDistance;
        var unitVector = {
            x: distanceVector.x / distance,
            y: distanceVector.y / distance
        };
        var n = -springConstant * (distance - desiredDistance);
        var vec = {
            x: unitVector.x * n,
            y: unitVector.y * n
        };
        var relVel = {
            x: relativeVelocity.x * damping,
            y: relativeVelocity.y * damping
        };
        return {
            x: vec.x - relVel.x,
            y: vec.y - relVel.y
        }
    }

    draw(ctx)
    {
        ctx.beginPath();
        this.drawJoint(ctx, this.rootJoint);
        ctx.stroke();

        ctx.beginPath();
        var head = this.joints["head"];
        ctx.strokeWidth = 4;
        ctx.fillStyle = "white";
        ctx.moveTo(head.x + this.headRadius, head.y);
        ctx.arc(head.x, head.y, this.headRadius, 0, 6.282);
        ctx.fill();
        ctx.stroke();
    }

    drawJoint(ctx, joint)
    {
        for (var i = 0; i < joint.connections.length; i++)
        {
            var j = this.joints[joint.connections[i].name];
            this.drawJoint(ctx, j);

            ctx.moveTo(joint.x, joint.y);
            ctx.lineTo(j.x, j.y);
        }
    }
}
