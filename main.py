def on_a_pressed():
    global FireSoot, projectile
    FireSoot = True
    projectile = sprites.create_projectile_from_sprite(img("""
            . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . 2 . . . . . . . . 
                    . . . . . . . 2 . . . . . . . . 
                    . . . . . . . 2 . . . . . . . . 
                    . . . . . . . 2 . . . . . . . .
        """),
        Canon,
        0,
        -50)
    music.play(music.create_sound_effect(WaveShape.SINE,
            5000,
            0,
            255,
            0,
            500,
            SoundExpressionEffect.VIBRATO,
            InterpolationCurve.LINEAR),
        music.PlaybackMode.UNTIL_DONE)
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_on_overlap(sprite, otherSprite):
    global FireSoot
    for value in Alians:
        if projectile.overlaps_with(value):
            value.start_effect(effects.fire)
            sprites.destroy(value)
            sprites.destroy(projectile)
            FireSoot = False
            info.set_score(info.score() + 100)
            music.play(music.melody_playable(music.big_crash),
                music.PlaybackMode.UNTIL_DONE)
sprites.on_overlap(SpriteKind.projectile, SpriteKind.enemy, on_on_overlap)

projectile: Sprite = None
Canon: Sprite = None
Align1Image = 0
Alians: List[Sprite] = []
FireSoot = False
Align1Images = [assets.image("""
        space invader enemy 0
    """),
    assets.image("""
        space invader enemy 1
    """)]
Step = 0.5
FireSoot = False
Direction = 0.01
scene.set_background_image(assets.image("""
    myImage
"""))
Alians = [sprites.create(Align1Images[Align1Image], SpriteKind.enemy),
    sprites.create(assets.image("""
            space invader enemy 1
        """),
        SpriteKind.enemy),
    sprites.create(assets.image("""
            space invader enemy 1
        """),
        SpriteKind.enemy),
    sprites.create(assets.image("""
            space invader enemy 1
        """),
        SpriteKind.enemy),
    sprites.create(assets.image("""
            space invader enemy 1
        """),
        SpriteKind.enemy),
    sprites.create(assets.image("""
        SpaceInvader2
    """), SpriteKind.enemy),
    sprites.create(assets.image("""
        SpaceInvader2
    """), SpriteKind.enemy),
    sprites.create(assets.image("""
        SpaceInvader2
    """), SpriteKind.enemy),
    sprites.create(assets.image("""
        SpaceInvader2
    """), SpriteKind.enemy),
    sprites.create(assets.image("""
        SpaceInvader2
    """), SpriteKind.enemy)]
i = 1
y = 1
for value2 in Alians:
    value2.set_position(i * 15, y * 14)
    i += 1
    if i > 5:
        i = 1
        y += 1
Canon = sprites.create(img("""
        . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 8 . . . . . . . . 
            . . . . . . . 8 . . . . . . . . 
            . . . . . . 8 8 8 . . . . . . . 
            . . . . . . 8 8 8 . . . . . . . 
            . . 8 8 8 8 8 8 8 8 8 8 8 . . . 
            . 8 8 8 8 8 8 8 8 8 8 8 8 8 . . 
            8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 . 
            8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8
    """),
    SpriteKind.player)
Canon.set_position(76, 102)
info.set_score(0)
music.play(music.string_playable("A F E F D G E F ", 100),
    music.PlaybackMode.UNTIL_DONE)

def on_on_update():
    global Step, FireSoot
    for value3 in Alians:
        value3.x += Step
        if value3.x >= 150:
            Step = Step * -1
        if value3.x <= 10:
            Step = Step * -1
        if projectile:
            if projectile.y <= 0:
                FireSoot = False
game.on_update(on_on_update)

def on_on_update2():
    if controller.left.is_pressed():
        if Canon.x > 10:
            Canon.x += -1
    else:
        if controller.right.is_pressed():
            if Canon.x < 150:
                Canon.x += 1
game.on_update(on_on_update2)

def on_update_interval():
    global Align1Image
    for value4 in Alians:
        value4.set_image(Align1Images[Align1Image])
    Align1Image += 1
    if Align1Image > 1:
        Align1Image = 0
game.on_update_interval(500, on_update_interval)
