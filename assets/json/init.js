export default {
    state:{
        name: 'initial',
        background_color: '#000000',
        background: './assets/textures/sky.jpeg'
    },
    objects: [
        {
            meta:{
                name: "from454ENGINE",
                dim: {
                    width: 60,
                    height: 120
                },
                film: "mario_big_right_idle"
            },
            category: "Rectangle",
            color : "#ffffff",
            position: {x:300,y:800}
        },
        {
            meta:{
                name: "coin",
                dim: {
                    width: 40,
                    height: 60
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
                    width: 40,
                    height: 60
                },
                film: "coin_spinning"
            },
            category: "Rectangle",
            color : "#ffffff",
            position: {x:700,y:460}
        },
        {
            meta:{
                name: "HUUUMAN",
                dim: {
                    width: 100,
                    height: 100
                }
            },
            category: "Humanoid",
            color : "#00ff00",
            position: {x:1080,y:310}
        },
        {
            meta:{
                name: "TEEEEXT",
                defaultText: "This is a text"
            },
            category: "Text",
            color: "#00ff00",
            position: {x:640,y:220},
        }
    ]
}