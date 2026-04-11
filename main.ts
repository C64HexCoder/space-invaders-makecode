namespace SpriteKind {
    export const Sheild = SpriteKind.create()
    export const AlignProjectile = SpriteKind.create()
    export const UFO = SpriteKind.create()
    export const Image = SpriteKind.create()
}
function readhighScore () {
    highScoreTable = []
    highScoreTable = settings.readJSON("highscores") as HighScoreEntry[] || []
    if (highScoreTable.length > 0) {
        bestScore = highScoreTable[4].score
    }
}
function killAllEnemyProjectiles () {
    for (let EnemyProjectiles of alianProjectiles) {
        EnemyProjectiles.destroy()
    }
}
sprites.onOverlap(SpriteKind.AlignProjectile, SpriteKind.Sheild, function (sprite, otherSprite) {
    otherSprite.destroy()
    music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.UntilDone)
    sprite.destroy()
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (ProjectilesList.length < 3) {
        ProjectilesList.push(sprites.createProjectileFromSprite(assets.image`CanonFire`, Canon, 0, -50))
        music.play(music.createSoundEffect(WaveShape.Sine, 5000, 0, 255, 0, 500, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    }
})
function setLivesArray () {
    for (let index = 0; index <= Lives - 1; index++) {
        LiveImage[index] = sprites.create(CanonImage, SpriteKind.Image)
        LiveImage[index].setPosition(10 + 15 * index, 115)
        LiveImage[index].flags = SpriteFlag.Ghost
    }
}
function PlaceAliens () {
    // Draw the alians
    for (let y = 0; y <= 2; y++) {
        // pause (100)
        for (let x = 0; x <= 5; x++) {
            Alians[y * 6 + x] = new Align()
            Alians[y * 6 + x].spr = sprites.create(AlignAnimations[y][0])
animation.runImageAnimation(
            Alians[y * 6 + x].spr,
            AlignAnimations[y],
            500,
            true
            )
            let w = AlignAnimations[y][0].width
offset = (12 - w) / 2
            Alians[y * 6 + x].spr.left = (x + 1) * 15 + offset
Alians[y * 6 + x].spr.top = (y + 1) * 14
Alians[y * 6 + x].spr.setKind(SpriteKind.Enemy)
            Alians[y * 6 + x].images = AlignAnimations[y]
Alians[y * 6 + x].score = (y + 1) * 100
        }
    }
}
sprites.onDestroyed(SpriteKind.AlignProjectile, function (sprite) {
    alianProjectiles.removeElement(sprite)
})
function killAllPlayerProjectiles () {
    for (let PlayerProjectiles of ProjectilesList) {
        PlayerProjectiles.destroy()
    }
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.UFO, function (sprite, otherSprite) {
    music.stopAllSounds()
    otherSprite.setImage(explostion_original)
    otherSprite.lifespan = 300
    otherSprite.flags = SpriteFlag.Ghost
info.setScore(info.score() + 1000)
    music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.InBackground)
})
function showGameOverScreen () {
    // קריאה בטוחה לנתונים
    table2 = settings.readJSON("highscores") as HighScoreEntry[] || []
    if (!(Array.isArray(table2))) {
        table2 = []
    }
    // ניקוי מסך
    screen.fill(0)
    screen.print("GAME OVER", 56, 10)
screen.print("HIGH SCORES", 30, 30)
// הדפסת טבלה
    y2 = 50
    for (let i = 0; i < table2.length && i < 5; i++) {
        const e = table2[i]

        // הגנה מפני רשומות פגומות
        if (!e || !e.name) continue

        screen.print(
            `${i + 1}. ${e.name}  W:${e.wave}  S:${e.score}`,
            10,
            y2
        )
        y2 += 12
    }
screen.print("Press A to continue", 10, 110)
pause(150)
    pauseUntil(() => controller.A.isPressed())
    game.reset()
}
function gameOver () {
    music.stopAllSounds()
    screen.fill(0)
    screen.print("GAME OVER",56,50)
if (info.score() >= bestScore) {
        music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.UntilDone)
    } else {
        music.play(music.melodyPlayable(music.wawawawaa), music.PlaybackMode.UntilDone)
        pause(1000)
        game.reset()
    }
    pause(1000)
    name = game.askForString("What's your Name?")
    table = settings.readJSON("highscores") as HighScoreEntry[] || []
    if (!(Array.isArray(table))) {
        table = []
    }
    table.push({
        name: name,
        score: info.score(),
        wave: Wave
    })
    table.sort((a, b) => {
        if (b.wave == a.wave) return b.score - a.score
        return b.wave - a.wave
    })
settings.writeJSON("highscores", table)
showGameOverScreen()
}
function populateScreen () {
    PlaceAliens()
}
sprites.onOverlap(SpriteKind.AlignProjectile, SpriteKind.Player, function (sprite, otherSprite) {
    gamestat = GameStat.Died
music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.UntilDone)
    animation.runImageAnimation(
    Canon,
    assets.animation`explosion`,
    50,
    false
    )
    pause(200)
    Canon.destroy()
    LiveImage[--Lives].destroy()
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
        if ((countsToFire-=1) < 1) {
            countsToFire = 1
        }
        fireCounter = countsToFire
        game.splash("Wave " + Wave + " cleared!", "Get ready...")
        Wave += 1
        killAllEnemyProjectiles()
        
        PlaceAliens()
    } else {
        music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.InBackground)
    }
})
function setNewWave()
{
    if (Wave % 5 == 0)
    {

    }   
}
sprites.onDestroyed(SpriteKind.Projectile, function (sprite) {
    ProjectilesList.removeElement(sprite)
})
sprites.onDestroyed(SpriteKind.Player, function (sprite) {
    pause(500)
    Canon = sprites.create(assets.image`Canon`, SpriteKind.Player)
    Canon.setPosition(76, 102)
    gamestat = GameStat.GameOn
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Sheild, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy()
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    animation.stopAnimation(animation.AnimationTypes.All, otherSprite)
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
let projectile22: Sprite = null
let ChangeDirection = false
let Canon: Sprite = null
let explostion_original: Image = null
let CanonImage: Image = null
let isHit = false
let highScoreTable = []
let table3 = false
let name2 = ""
let y22 = 0
let table22 = false
let Wave = 0
let AlignAnimations: Image[][] = []
let countsToFire = 0
let fireCounter = 0
let Step = 0
let ProjectilesList: Sprite[] = []
let MotherShipImage = 0
let projectile3 = null
let Alians: Align[] = []
let selectedAlign = 0
let MotherShip: Sprite = null
let alianProjectiles: Sprite[] = []
let spr: Sprite = null
let LiveImage: Sprite[] = []
let offset = 0
let name = ""
let y2 = 0
let table2: HighScoreEntry[] = []
let table: HighScoreEntry[] = []
let bestScore = 0
let Lives = 0
info.setLifeImage(assets.image`Live`)
interface HighScoreEntry {
    name: string
    wave: number
    score: number
}
Wave = 1
enum GameStat {
    GameOn,
    Died,
    GameOver
}
let gamestat : GameStat
gamestat = GameStat.GameOn
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
readhighScore()
let ufo :UFO
CanonImage = assets.image`Live`
explostion_original = assets.image`Explotion2`
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
AlignAnimations = [assets.animation`Squid`, assets.animation`Puppy`, assets.animation`Faty`]
Step = 1
let Direction = 0.01
scene.setBackgroundImage(assets.image`background`)
setLivesArray()
PlaceAliens()
Canon = sprites.create(assets.image`Canon`, SpriteKind.Player)
Canon.setPosition(76, 102)
for (let sh2 = 0; sh2 <= 2; sh2++) {
    for (let y222 = 0; y222 <= 1; y222++) {
        for (let x2 = 0; x2 <= 3; x2++) {
            ShieldParts[sh2][y222][x2].x = 25 + 50 * sh2 + x2 * 4
            ShieldParts[sh2][y222][x2].y = 90 + y222 * 5
        }
    }
}
info.setBackgroundColor(0)
info.setFontColor(1)
info.setBorderColor(1)
music.play(music.stringPlayable("A F E F D G E F ", 100), music.PlaybackMode.UntilDone)
fireCounter = 6
countsToFire = 6
interface HighScoreEntry {
    name: string
    score: number
    wave: number
}
game.onUpdate(function () {
    if (gamestat == GameStat.GameOn) {
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
                    gameOver()
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
    }
})
game.onUpdate(function () {
    if (Lives == 0) {
        gameOver()
    }
    if (gamestat == GameStat.Died) {
        return
    }
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
game.onUpdateInterval(5000, function () {
    if (gamestat == GameStat.Died) {
        return
    }
    if (Math.random() * 100 <= 50) {
        return
    }
    if (MotherShip == null) {
        MotherShip = sprites.create(img`
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
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.UFO)
        MotherShip.setPosition(160, 10)
        animation.runImageAnimation(
        MotherShip,
        assets.animation`MotherShipAnim`,
        100,
        true
        )
        music.play(music.melodyPlayable(music.zapped), music.PlaybackMode.LoopingInBackground)
    }
})
game.onUpdateInterval(500, function () {
    if (gamestat == GameStat.Died) {
        return
    }
    if (--fireCounter == 0) {
        fireCounter = countsToFire
        selectedAlign = Math.round(selectedAlign = Math.random() * (Alians.length-1))
        projectile22 = sprites.createProjectileFromSprite(assets.image`AlignFire`, Alians[selectedAlign].spr, 0, 50)
        projectile22.setKind(SpriteKind.AlignProjectile)
        alianProjectiles.push(projectile22)
        music.play(music.createSoundEffect(WaveShape.Sine, 2517, 1, 244, 8, 513, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
    }
})
