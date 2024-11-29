namespace SpriteKind {
    export const Sheild = SpriteKind.create()
    export const AlignProjectile = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.AlignProjectile, SpriteKind.Sheild, function (sprite, otherSprite) {
    sprite.startEffect(effects.fire)
    sprite.destroy()
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    FireSoot = true
    if (ProjectilesList.length < 3) {
        ProjectilesList.push(sprites.createProjectileFromSprite(assets.image`CanonFire`, Canon, 0, -50))
        music.play(music.createSoundEffect(WaveShape.Sine, 5000, 0, 255, 0, 500, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
    }
})
sprites.onOverlap(SpriteKind.AlignProjectile, SpriteKind.Player, function (sprite, otherSprite) {
    game.gameOver(false)
})
sprites.onDestroyed(SpriteKind.Projectile, function (sprite) {
    ProjectilesList.removeAt(ProjectilesList.indexOf(sprite))
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Sheild, function (sprite, otherSprite) {
    sprite.startEffect(effects.fire)
    sprite.destroy()
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    for (let value of Alians) {
        for (let project of ProjectilesList) {
            if (project.overlapsWith(value)) {
                value.startEffect(effects.fire)
                sprites.destroy(value)
                Alians.removeElement(value)
if (Step > 0) {
                    Step += 0.05
                } else {
                    Step += 0 - 0.05
                }
                // ProjectilesList.removeElement(project)
                sprites.destroy(project)
                FireSoot = false
                info.setScore(info.score() + 100)
                if (Alians.length == 0) {
                    game.gameOver(true)
                } else {
                    music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.UntilDone)
                }
            }
        }
    }
})
let Align1Image = 0
let ChangeDirection = false
let Canon: Sprite = null
let FireSoot = false
let Step = 0
let ProjectilesList: Sprite[] = []
let list: number[] = []
let selectedAlign = 0
let Alians: Sprite[] = []
let projectile = null
let fireRate = 1000
ProjectilesList = []
let Align1Images = [assets.image`space invader enemy 0`, assets.image`space invader enemy 1`]
let Sheilds = [sprites.create(assets.image`Sheild`, SpriteKind.Sheild), sprites.create(assets.image`Sheild`, SpriteKind.Sheild), sprites.create(assets.image`Sheild`, SpriteKind.Sheild)]
Step = 0.5
FireSoot = false
let Direction = 0.01
scene.setBackgroundImage(assets.image`background`)
Alians = [
sprites.create(assets.image`space invader enemy 1`, SpriteKind.Enemy),
sprites.create(assets.image`space invader enemy 1`, SpriteKind.Enemy),
sprites.create(assets.image`space invader enemy 1`, SpriteKind.Enemy),
sprites.create(assets.image`space invader enemy 1`, SpriteKind.Enemy),
sprites.create(assets.image`space invader enemy 1`, SpriteKind.Enemy),
sprites.create(assets.image`space invader enemy 1`, SpriteKind.Enemy),
sprites.create(assets.image`space invader enemy 1`, SpriteKind.Enemy),
sprites.create(assets.image`space invader enemy 1`, SpriteKind.Enemy),
sprites.create(assets.image`space invader enemy 1`, SpriteKind.Enemy),
sprites.create(assets.image`space invader enemy 1`, SpriteKind.Enemy),
sprites.create(assets.image`space invader enemy 1`, SpriteKind.Enemy),
sprites.create(assets.image`space invader enemy 1`, SpriteKind.Enemy),
sprites.create(assets.image`space invader enemy 1`, SpriteKind.Enemy),
sprites.create(assets.image`space invader enemy 1`, SpriteKind.Enemy),
sprites.create(assets.image`space invader enemy 1`, SpriteKind.Enemy),
sprites.create(assets.image`space invader enemy 1`, SpriteKind.Enemy),
sprites.create(assets.image`space invader enemy 1`, SpriteKind.Enemy),
sprites.create(assets.image`space invader enemy 1`, SpriteKind.Enemy)
]
let i = 1
let y = 1
for (let align of Alians) {
    align.setPosition(i * 15, y * 14)
    i += 1
    if (i > 6) {
        i = 1
        y += 1
    }
}
Canon = sprites.create(assets.image`Canon`, SpriteKind.Player)
Canon.setPosition(76, 102)
i = 1
for (let SheildSprite of Sheilds) {
    SheildSprite.setPosition(10 + 35 * i, 85)
    i += 1
}
info.setScore(0)
info.setBackgroundColor(0)
info.setFontColor(1)
info.setBorderColor(1)
music.play(music.stringPlayable("A F E F D G E F ", 100), music.PlaybackMode.UntilDone)
game.onUpdate(function () {
    if (controller.left.isPressed()) {
        if (Canon.x > 10) {
            Canon.x += -1
        }
    } else {
        if (controller.right.isPressed()) {
            if (Canon.x < 150) {
                Canon.x += 1
            }
        }
    }
})
game.onUpdate(function () {
    for (let align2 of Alians) {
        align2.x += Step
        if (align2.x >= 150) {
            ChangeDirection = true
        }
        if (align2.x <= 10) {
            ChangeDirection = true
        }
    }
    if (ChangeDirection) {
        Step = Step * -1
        ChangeDirection = false
        for (let align3 of Alians) {
            align3.y += 1
        }
    }
})
game.onUpdateInterval(fireRate, function () {
    let alianProjectiles: Sprite[] = []
    selectedAlign = Math.round(selectedAlign = Math.random() * Alians.length)
    alianProjectiles.push(sprites.createProjectileFromSprite(assets.image`AlignFire`, Alians[selectedAlign], 0, 50))
    alianProjectiles[alianProjectiles.length - 1].setKind(SpriteKind.AlignProjectile)
})
game.onUpdateInterval(500, function () {
    for (let value4 of Alians) {
        value4.setImage(Align1Images[Align1Image])
    }
    Align1Image += 1
    if (Align1Image > 1) {
        Align1Image = 0
    }
})
