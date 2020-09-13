export default {
    "meta": {
        "renderer": "three.js",
    },
    "objects": [
        {
            "meta":{
                "name": "BOOOOOX",
                "texture": "./assets/textures/wood.jpeg"
            },
            "category": "Box",
            "position": {"x":45,"y":45}
        },
        {
            "meta":{
                "name": "SPHE",
                "dim": {
                    "width": 10,
                    "height": 10
                }
            },
            "category": "Sphere",
            "color" : "#ffff00",
            "position": {"x":38,"y":45}
        },
        {
            "meta":{
                "name": "SPHEEERE"
            },
            "category": "Sphere",
            "color" : "#00ffff",
            "position": {"x":52,"y":45}
        },
        {
            "meta":{
                "name": "HUUUMAN"
            },
            "category": "Humanoid",
            "color" : "#00ff00",
            "position": {"x":45,"y":33}
        },
        {
            "meta":{
                "name": "PLAAANE",
                "texture": "./assets/textures/blueprint.jpg",
                "dim":{
                    "width": 15,
                    "height": 10
                },
                "rotation":{"x":-1}
            },
            "category": "Plane",
            "color" : "#0080ff",
            "position": {"x":30,"y":70}
        },
        {
            "meta":{
                "name": "TEEEEXT",
                defaultText: "Click me, meta to granazi kai tha deite to delete :)"
            },
            "category": "Text",
            "color" : "#00ff00",
            "position": {"x":40,"y":20}
        },

        {
            "meta":{
                "name": "InfoForKey",
                defaultText: "Ta panta einai antikeimena. grapste ena script me blockly \
                kai patiste ena koympi apo to keyboard kai meta patiste ayto to key \
                sto pliktrologio"
            },
            "category": "Text",
            "color" : "#00ff00",
            "position": {"x":80,"y":40}
        }
    ]
}