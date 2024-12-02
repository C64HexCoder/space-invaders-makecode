namespace SpriteKind {
    export const Sheild = SpriteKind.create()
    export const AlignProjectile = SpriteKind.create()
    export const UFO = SpriteKind.create()
    export const Image = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.AlignProjectile, SpriteKind.Sheild, function (sprite, otherSprite) {
    // for (let sh = 0; sh <= 2; sh++) {
    // for (let y = 0; y <= 1; y++) {
    // for (let x = 0; x <= 3; x++) {
    // if (ShieldParts[sh][y][x].overlapsWith(sprite)) {
    // otherSprite.destroy()
    // }
    // }
    // }
    // }
    otherSprite.destroy()
    sprite.destroy()
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    //FireSoot = true
    if (ProjectilesList.length < 3) {
        ProjectilesList.push(sprites.createProjectileFromSprite(assets.image`CanonFire`, Canon, 0, -50))
        music.play(music.createSoundEffect(WaveShape.Sine, 5000, 0, 255, 0, 500, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    }
})
function PlaceAliens () {
    // Draw the alians
    for (let y = 0; y <= 2; y++) {
        for (let x = 0; x <= 5; x++) {
            Alians[y * 6 + x] = new Align()
            Alians[y * 6 + x].spr = sprites.create(AlignsImages[y][0])
            Alians[y * 6 + x].spr.setPosition((x + 1) * 15, (y + 1) * 14)
            Alians[y * 6 + x].spr.setKind(SpriteKind.Enemy)
            Alians[y * 6 + x].images = AlignsImages[y]
            Alians[y * 6 + x].score = (y + 1) * 100
            //pause (100)
        }
    }
}
sprites.onDestroyed(SpriteKind.AlignProjectile, function (sprite) {
    alianProjectiles.removeElement(sprite)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.UFO, function (sprite, otherSprite) {
    music.stopAllSounds()
    otherSprite.setImage(explostion_original)
    otherSprite.lifespan = 300
    otherSprite.flags = SpriteFlag.Ghost
info.setScore(info.score() + 1000)
    music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.InBackground)
})
sprites.onOverlap(SpriteKind.AlignProjectile, SpriteKind.Player, function (sprite, otherSprite) {
    Canon.setImage(assets.image`CanonExplode`)
    Canon.flags = SpriteFlag.Ghost
Canon.lifespan = 200
    LiveImage[--Lives].destroy()
    if (Lives == 0) {
        game.gameOver(false)
    }
})
sprites.onDestroyed(SpriteKind.Enemy, function (sprite) {
    let tempAlign = new Align()
tempAlign.spr = sprite;
for (let align of Alians) {
        if (align.spr == sprite) {
            info.setScore(info.score() + align.score)
            Alians.removeElement(align);
        }
    }
    if (Alians.length == 0) {
        Step = 1
        if ((countsToFire-=1) < 1)
            countsToFire = 1;
        
        fireCounter = countsToFire
        PlaceAliens()
    } else {
        music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.InBackground)
    }
})
sprites.onDestroyed(SpriteKind.Projectile, function (sprite) {
    ProjectilesList.removeElement(sprite)
})
sprites.onDestroyed(SpriteKind.Player, function (sprite) {
    // Create 3 sheilds
    Canon = sprites.create(assets.image`Canon`, SpriteKind.Player)
    Canon.setPosition(76, 102)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Sheild, function (sprite, otherSprite) {
    sprite.destroy()
})
// ProjectilesList.removeElement(otherSprite)
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.setImage(explostion_original)
    otherSprite.lifespan = 300
    otherSprite.flags = SpriteFlag.Ghost
sprite.destroy()
    if (Step > 0) {
        Step += 0.1
    } else {
        Step += -0.1
    }
})
let Align1Image = 0
let projectile2: Sprite = null
let ChangeDirection = false
//let FireSoot = false
let explostion_original: Image = null
let LiveImage: Sprite[] = []
let spr: Sprite = null
let alianProjectiles: Sprite[] = []
let MotherShip: Sprite = null
let selectedAlign = 0
let Alians: Align[] = []
let projectile = null
let MotherShipImage =0
let ProjectilesList: Sprite[] = []
let Step = 0
let Lives = 0
let Canon: Sprite = null
Lives = 3
class Align {
    spr :Sprite
    images :Image[]
    isDistroyed :Boolean
    score :number
}
class UFO extends Sprite{
    frames :Image[]
    score  :Number
}
let ufo :UFO
let CanonImage = assets.image`Live`
explostion_original = assets.image`Explotion2`
let MothershipFrames = [
assets.image`MotherShip1`,
assets.image`MotherShip2`,
assets.image`MotherShip3`,
assets.image`MotherShip4`
]
let ShieldParts = [[[
sprites.create(assets.image`SheildLeftUp`, SpriteKind.Sheild),
sprites.create(assets.image`SheildPart2`, SpriteKind.Sheild),
sprites.create(assets.image`SheildPart2`, SpriteKind.Sheild),
sprites.create(assets.image`SheildRightUP`, SpriteKind.Sheild)
], [
sprites.create(assets.image`SheildPart2`, SpriteKind.Sheild),
sprites.create(assets.image`SheildPart2`, SpriteKind.Sheild),
sprites.create(assets.image`SheildPart2`, SpriteKind.Sheild),
sprites.create(assets.image`SheildPart2`, SpriteKind.Sheild)
]], [[
sprites.create(assets.image`SheildLeftUp`, SpriteKind.Sheild),
sprites.create(assets.image`SheildPart2`, SpriteKind.Sheild),
sprites.create(assets.image`SheildPart2`, SpriteKind.Sheild),
sprites.create(assets.image`SheildRightUP`, SpriteKind.Sheild)
], [
sprites.create(assets.image`SheildPart2`, SpriteKind.Sheild),
sprites.create(assets.image`SheildPart2`, SpriteKind.Sheild),
sprites.create(assets.image`SheildPart2`, SpriteKind.Sheild),
sprites.create(assets.image`SheildPart2`, SpriteKind.Sheild)
]], [[
sprites.create(assets.image`SheildLeftUp`, SpriteKind.Sheild),
sprites.create(assets.image`SheildPart2`, SpriteKind.Sheild),
sprites.create(assets.image`SheildPart2`, SpriteKind.Sheild),
sprites.create(assets.image`SheildRightUP`, SpriteKind.Sheild)
], [
sprites.create(assets.image`SheildPart2`, SpriteKind.Sheild),
sprites.create(assets.image`SheildPart2`, SpriteKind.Sheild),
sprites.create(assets.image`SheildPart2`, SpriteKind.Sheild),
sprites.create(assets.image`SheildPart2`, SpriteKind.Sheild)
]]]
let fireRate = 2000
ProjectilesList = []
let AlignsImages = [[assets.image`space invader enemy 0`, assets.image`space invader enemy 1`], [assets.image`Align3_28pxh`, assets.image`Align3_18pxh`], [assets.image`Align1_18p`, assets.image`Align1_28p`]]
Step = 1
// FireSoot = false
let Direction = 0.01
scene.setBackgroundImage(assets.image`background`)
for (let index = 0; index <= Lives - 1; index++) {
    LiveImage[index] = sprites.create(CanonImage, SpriteKind.Image)
    LiveImage[index].setPosition(10 + 15 * index, 115)
    LiveImage[index].flags = SpriteFlag.Ghost
}
PlaceAliens()
// Create 3 sheilds
Canon = sprites.create(assets.image`Canon`, SpriteKind.Player)
Canon.setPosition(76, 102)
for (let sh2 = 0; sh2 <= 2; sh2++) {
    for (let y22 = 0; y22 <= 1; y22++) {
        for (let x2 = 0; x2 <= 3; x2++) {
            ShieldParts[sh2][y22][x2].x = 25 + 50 * sh2 + x2 * 4
            ShieldParts[sh2][y22][x2].y = 90 + y22 * 5
        }
    }
}
info.setBackgroundColor(0)
info.setFontColor(1)
info.setBorderColor(1)
music.play(music.stringPlayable("A F E F D G E F ", 100), music.PlaybackMode.UntilDone)
game.onUpdate(function () {
    if (controller.left.isPressed()) {
        if (Canon.x > 10) {
            Canon.x += -3
        }
    } else {
        if (controller.right.isPressed()) {
            if (Canon.x < 150) {
                Canon.x += 3
            }
        }
    }
})
game.onUpdate(function () {
    for (let align2 of Alians) {
        if (align2.spr.flags != SpriteFlag.Ghost) {
            align2.spr.x += Step
        }
        if (align2.spr.x >= 150) {
            ChangeDirection = true
        }
        if (align2.spr.x <= 10) {
            ChangeDirection = true
        }
    }
    if (ChangeDirection) {
        Step = Step * -1
        ChangeDirection = false
        for (let align3 of Alians) {
            align3.spr.y += 2
if (align3.spr.y > 80) {
                music.stopAllSounds()
                game.gameOver(false)
            }
        }
    }
    if (MotherShip != null && MotherShip.flags != SpriteFlag.Ghost) {
        if ((MotherShip.x-=0.5) <= 0) {
            music.stopAllSounds()
            MotherShip.destroy()
            MotherShip = null;
        }
    }
})
game.onUpdateInterval(5000, function () {
    if (Math.random() * 100 <= 50) {
        return
    }
    if (MotherShip == null) {
        MotherShip = sprites.create(MothershipFrames[0], SpriteKind.UFO)
        MotherShip.setPosition(160, 10)
        music.play(music.melodyPlayable(music.zapped), music.PlaybackMode.LoopingInBackground)
    }
})
let fireCounter = 6
let countsToFire = 6
game.onUpdateInterval(500, function () {
    if (--fireCounter == 0)
    {
        fireCounter = countsToFire
    selectedAlign = Math.round(selectedAlign = Math.random() * (Alians.length-1))
    projectile2 = sprites.createProjectileFromSprite(assets.image`AlignFire`, Alians[selectedAlign].spr, 0, 50)
    projectile2.setKind(SpriteKind.AlignProjectile)
    alianProjectiles.push(projectile2)
    // alianProjectiles[alianProjectiles.length - 1].setKind(SpriteKind.AlignProjectile)
    music.play(music.createSoundEffect(WaveShape.Sine, 2517, 1, 244, 8, 513, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
    }
})
game.onUpdateInterval(500, function () {
    for (let value4 of Alians) {
        if (value4.spr.image != explostion_original) {
            value4.spr.setImage(value4.images[Align1Image])
        }
    }
    Align1Image += 1
    if (Align1Image > 1) {
        Align1Image = 0
    }
})
game.onUpdateInterval(100, function () {
    if (MotherShip != null && MotherShip.image != explostion_original) {
        MotherShip.setImage(MothershipFrames[MotherShipImage+=5])
        if (MotherShipImage > 4) {
            MotherShipImage = 0
        }
    }
})
