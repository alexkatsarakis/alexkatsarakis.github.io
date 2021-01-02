export default {
    state:{
        name: 'initial_pac',
        background_color: '#000000',
        background: './assets/textures/sky.jpeg'
    },
    objects: [
        {
            id: "U0Aox2uTtKHINKh",
            meta:{
                name: "player",
                dim: {
                    width: 60,
                    height: 120
                },
                film: "mario_big_right_idle"
            },
            category: "Rectangle",
            color : "#ffffff",
            position: {x:500,y:780}
        },
        {
            id: "ITG9NaKdTa8C0fN",
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
            position: {x:600,y:775}
        },
        {
            id: "Whu6GiXZlHEwzqF",
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
            position: {x:700,y:775}
        },
        {
            id: "VhgKmEu8oTQMJqC",
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
            position: {x:800,y:775}
        },
        {
            id: "y1gYI2yyo1QzjmH",
            meta:{
                name: "score",
            },
            fields: {
                counter: 0
            },
            events: [
                "increaseCounterAndShow"
            ],
            attributes: {
                isCollidable: false
            },
            category: "Text",
            color : "#ffffff",
            position: {x:1150,y:100}
        },
        {
            id: "E9E6IUVr9Wp9Bba",
            meta:{
                name: "floor",
                dim: {
                    width: 1920,
                    height: 80
                }
            },
            attributes: {
                isSolid: true,
                isMovable: false
            },
            category: "Rectangle",
            color : "#00ff00",
            position: {x:0,y:900}
        }
    ]
}