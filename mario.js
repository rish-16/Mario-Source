// implementation of Crack Mario

function mario() {
    return stack_frac(0.15,
        beside(
            color(square, 196/255, 69/255, 105/255), 
            stack(
                color(sail, 196/255, 69/255, 105/255),
                color(square, 196/255, 69/255, 105/255)
            )
        ),
        stack_frac(
            0.75,
            stack(
                beside_frac(0.75, color(square, 231/255, 127/255, 103/255), blank),
                stack(
                    beside_frac(0.8, 
                        beside(
                            color(square, 196/255, 69/255, 105/255),
                            beside(
                                stack(
                                    color(square, 196/255, 69/255, 105/255),
                                    color(square, 231/255, 127/255, 103/255)
                                    ),
                                color(square, 196/255, 69/255, 105/255)
                                )
                            )
                    , blank),
                    beside_frac(0.8, color(square, 48/255, 57/255, 82/255), blank)
                    )
            ),
            beside(
                color(square, 48/255, 57/255, 82/255),
                color(square, 48/255, 57/255, 82/255)
                )
            )
    );
}

function get_row(n, colour) {
    return n === 0
        ? colour(square)
        : beside_frac(1/n, colour(square), get_row(n-1, colour));
}

function cloud() {
    const cloud_colour = rune => color(rune, 223/255, 249/255, 251/255);
    
    return beside(
            beside(
                beside(
                    cloud_colour(square),
                    cloud_colour(square)
                ), 
                cloud_colour(square)
            ),
            cloud_colour(square)
        );
}

function pipe() {
    function pipe_right() {
        return quarter_turn_right(stack(
                stack(
                    green(square),
                    green(square)
                ),
                beside_frac(0.45, green(square), blank)
            ));
    } 
    
    function pipe_left() {
        return quarter_turn_left(stack(
                stack(
                    green(square),
                    green(square)
                ),
                beside_frac(0.55, blank, green(square))
            ));
    } 

    return beside(pipe_right(), pipe_left());
}

function background(n) {
    if (n === 0) {
        return blue(square);
    } else {
        return stack_frac(1/n, get_row(n, blue), background(n-1));
    }
}

function soil(n) {
    return get_row(n, brown);
}

function get_cloud_cover() {
    return beside(
        scale_independent(0.6, 0.6, cloud()),
        beside(
            blank,
            scale_independent(1.1, 0.4, cloud())
            )
        );
}

function get_mid_sky() {
    return blank;
}

function get_player_level() {
    return beside(
            beside(blank, mario()),
            beside(blank, pipe())
        );
}

function final_render() {
    return stack_frac(
            0.2,
            get_cloud_cover(),
            stack_frac(
                    0.6,
                    get_mid_sky(),
                    get_player_level()
                )
        );
}

// My contest entry
function runes_contest_rishabh_anand() {
    return overlay(
            final_render(),
            background(15)
        );
}

show(runes_contest_rishabh_anand());
