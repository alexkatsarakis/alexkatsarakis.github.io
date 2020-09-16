export default {
    "meta": {
        "renderer": "three.js",
    },
    "objects": [
        {
            "meta":{
                "name": "BOOOOOX",
                "texture": "./assets/textures/wood.jpeg",
                dim:{
                    width: 2,
                    height: 2,
                    depth: 2
                }
            },
            "category": "Box",
            "position": {x:1,y:1,z:-1}
        },
        {
            "meta":{
                "name": "SPHEEERE",
                "texture": "./assets/textures/wood.jpeg"
            },
            "category": "Sphere",
            "position": {x:0,y:0,z:0}
        },
        {
            "meta":{
                "name": "SQUAAAARE"
            },
            "category": "Square",
            "color" : "#00ffff",
            "position": {"x":90,"y":10}
        },
        {
            "meta":{
                "name": "HUUUMAN"
            },
            "category": "Humanoid",
            "color" : "#00ff00",
            "position": {"x":80,"y":10}
        },
        {
            "meta":{
                "name": "PLAAANE",
                "texture": "./assets/textures/blueprint.jpg",
                "dim":{
                    "width": 100,
                    "height": 100
                },
                "rotation":{"x":-1.57}
            },
            "category": "Plane",
            "color" : "#0080ff",
            "position": {x:0,y:0,z:0}
        },
        {
            "meta":{
                "name": "TEEEEXT",
                defaultText: "This is a text"
            },
            "category": "Text",
            "color" : "#00ff00",
            "position": {"x":40,"y":10}
        }
    ]
}