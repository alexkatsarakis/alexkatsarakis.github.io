export default {
    state:{
        name: 'initial_pac',
        background_color: '#000000'
    },
    objects: [
        {
            meta:{
                name: "player",
                dim: {
                    width: 30,
                    height: 60
                },
                film: "mario_big_right_idle"
            },
            category: "Rectangle",
            color : "#ffffff",
            position: {x:500,y:800}
        },
        {
            meta:{
                name: "leftWall",
                dim: {
                    width: 10,
                    height: 800
                },
            },
            category: "Rectangle",
            color : "#ffffff",
            position: {x:300,y:150}
        },
        {
            meta:{
                name: "rightWall",
                dim: {
                    width: 10,
                    height: 800
                },
            },
            category: "Rectangle",
            color : "#ffffff",
            position: {x:1200,y:150}
        },
        {
            meta:{
                name: "topWall",
                dim: {
                    width: 890,
                    height: 10
                },
            },
            category: "Rectangle",
            color : "#ffffff",
            position: {x:310,y:150}
        },
        {
            meta:{
                name: "botWall",
                dim: {
                    width: 890,
                    height: 10
                },
            },
            category: "Rectangle",
            color : "#ffffff",
            position: {x:310,y:940}
        },
        {
            meta:{
                name: "coin1",
                dim: {
                    width: 20,
                    height: 35
                },
                film: "coin_spinning"
            },
            category: "Rectangle",
            color : "#ffffff",
            position: {x:600,y:460}
        },
        {
            meta:{
                name: "coin2",
                dim: {
                    width: 20,
                    height: 35
                },
                film: "coin_spinning"
            },
            category: "Rectangle",
            color : "#ffffff",
            position: {x:700,y:460}
        },
        {
            meta:{
                name: "coin3",
                dim: {
                    width: 20,
                    height: 35
                },
                film: "coin_spinning"
            },
            category: "Rectangle",
            color : "#ffffff",
            position: {x:800,y:460}
        },
        {
            meta:{
                name: "score",
            },
            fields: {
                counter: 0
            },
            events: [
                "increaseCounterAndShow"
            ],
            category: "Text",
            color : "#ffffff",
            position: {x:1150,y:100}
        }
    ]
}