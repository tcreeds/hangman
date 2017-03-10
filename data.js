var standPoints = [

];

var hangmanData = {
    joints: {
        "head": {
            x: 300,
            y: 150
        },
        "neck": {
            x: 300,
            y: 170
        },
        "shoulders":{
            x: 300,
            y: 180
        },
        "rightElbow":{
            x: 275,
            y: 195
        },
        "rightHand":{
            x: 250,
            y: 210
        },
        "leftElbow":{
            x: 325,
            y: 195
        },
        "leftHand": {
            x: 350,
            y: 210
        },
        "pelvis": {
            x: 300,
            y: 260
        },
        "rightKnee":{
            x: 275,
            y: 285
        },
        "rightFoot":{
            x: 250,
            y: 310
        },
        "leftKnee":{
            x: 325,
            y: 285
        },
        "leftFoot":{
            x: 350,
            y: 310
        }
    },
    connections: [
        ["head", "neck"],
        ["neck", "shoulders"],
        ["shoulders", "rightElbow"],
        ["rightElbow", "rightHand"],
        ["shoulders", "leftElbow"],
        ["leftElbow", "leftHand"],
        ["shoulders", "pelvis"],
        ["pelvis", "rightKnee"],
        ["rightKnee", "rightFoot"],
        ["pelvis", "leftKnee"],
        ["leftKnee", "leftFoot"]
    ],
    strikes: [
        ["head", "neck", "circle"],
        ["neck", "pelvis"],
        ["shoulders", "rightHand"],
        ["shoulders", "leftHand"],
        ["pelvis", "rightFoot"],
        ["pelvis", "leftFoot"]
    ]
}
