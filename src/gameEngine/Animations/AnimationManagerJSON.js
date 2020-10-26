export default {
    defaultValues: {
        start: 0,
        end: "max",
        reps: -1,
        dx: 0,
        dy: 0,
        delay: 80
    },
    animations: [
        {
            id: "mario_big_r_r",
            film: "mario_big_right_walking",
            reps: 2,
            dx: 26,
            delay: 90
        },
        {
            id: "mario_big_r_l",
            film: "mario_big_left_walking",
            reps: 2,
            dx: -26,
            delay: 90
        },
        {
            id: "coin_spin",
            film: "coin_spinning",
            delay: 90
        },
        {
            id: "coin_spin_fast",
            film: "coin_spinning",
            delay: 60
        }
    ]

}