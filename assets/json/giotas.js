export default {
    state:{
        name: 'initial_pac',
        background_color: '#aaaaaa'
    },
    objects: [
        
        {
            meta:{
                name: "kylindros1",
                dim: {
                    width: 50,
                    height: 170
                }
            },
            attributes: {
                isSolid: true,
                isMovable: false
            },
            category: "Rectangle",
            color : "#00ffff",
            position: {x:600,y:530}
        },
        {
            meta:{
                name: "vasikylindros1",
                dim: {
                    width: 100,
                    height: 50
                }
            },
            attributes: {
                isSolid: true,
                isMovable: false
            },
            category: "Rectangle",
            color : "#00ffff",
            position: {x:575,y:700}
        },
        {
            meta:{
                name: "kylindros2",
                dim: {
                    width: 50,
                    height: 120
                }
            },
            attributes: {
                isSolid: true,
                isMovable: false
            },
            category: "Rectangle",
            color : "#00ffff",
            position: {x:800,y:580}
        },
        {
            meta:{
                name: "vasikylindros2",
                dim: {
                    width: 100,
                    height: 50
                }
            },
            attributes: {
                isSolid: true,
                isMovable: false
            },
            category: "Rectangle",
            color : "#00ffff",
            position: {x:775,y:700}
        },
        {
            meta:{
                name: "kylindros3",
                dim: {
                    width: 50,
                    height: 70
                }
            },
            attributes: {
                isSolid: true,
                isMovable: false
            },
            category: "Rectangle",
            color : "#00ffff",
            position: {x:1000,y:630}
        },
        {
            meta:{
                name: "vasikylindros3",
                dim: {
                    width: 100,
                    height: 50
                }
            },
            attributes: {
                isSolid: true,
                isMovable: false
            },
            category: "Rectangle",
            color : "#00ffff",
            position: {x:975,y:700}
        },
        {
            meta:{
                name: "prasino",
                dim: {
                    width: 90,
                    height: 50
                }
            },
            attributes: {
            },
            category: "Rectangle",
            color : "#00ff00",
            position: {x:780,y:650}
        },
        {
            meta:{
                name: "mple",
                dim: {
                    width: 90,
                    height: 50
                }
            },
            attributes: {
            },
            category: "Rectangle",
            color : "#0000ff",
            position: {x:980,y:650}
        },
        {
            meta:{
                name: "portokali",
                dim: {
                    width: 90,
                    height: 50
                }
            },
            attributes: {
            },
            category: "Rectangle",
            color : "#00ff00",
            position: {x:580,y:650}
        },
        {
            meta:{
                name: "moveCounter",
                defaultText: "moves: 0"
            },
            fields: {
                moveCounter: 0
            },
            events: [
                "increaseCounterAndShow"
            ],
            attributes: {
                isCollidable: false
            },
            category: "Text",
            color : "#ffffff",
            position: {x:1000,y:250}
        }
    ]
}