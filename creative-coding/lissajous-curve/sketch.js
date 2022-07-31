const RADIUS = 60
const DIAMETER = RADIUS * 2
const GAP = 30

let runnersX = []
let runnersY = []

let currentIndex = 0
let lastPos = []

class Runner {
    constructor(pos, radius, omega) {
        this._pos = pos
        this._omega = omega
        this._radius = radius

        this._phi = 0
    }

    update() {
        this._phi += this._omega
    }

    draw() {
        push()
        noFill()
        stroke(160)
        strokeWeight(2)
        circle(this._pos.x, this._pos.y, this._radius * 2)
        pop()

        push()
        noStroke()
        fill(255)
        circle(
            this._pos.x + cos(this._phi) * this._radius,
            this._pos.y + sin(this._phi) * this._radius,
            8
        )
        pop()
    }

    getCurrentPosition() {
        return {
            x: this._pos.x + cos(this._phi) * this._radius,
            y: this._pos.y + sin(this._phi) * this._radius
        }
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight)

    colorMode(HSB)

    for (let i = 1; i < Math.floor(windowWidth / (DIAMETER + GAP)) - 1; i++) {
        runnersX.push(
            new Runner(
                {
                    x: (i + 1) * (DIAMETER + GAP),
                    y: GAP + RADIUS
                },
                RADIUS,
                0.01 * i
            )
        )
    }

    for (let i = 1; i < Math.floor(windowHeight / (DIAMETER + GAP)) - 1; i++) {
        runnersY.push(
            new Runner(
                {
                    x: GAP + RADIUS,
                    y: (i + 1) * (DIAMETER + GAP)
                },
                RADIUS,
                0.01 * i
            )
        )
    }

    background(20)
}

function draw() {
    // background(20)

    push()
    noStroke()
    fill(20)
    rect(0, 0, DIAMETER + 2 * GAP, windowHeight)
    rect(0, 0, windowWidth, DIAMETER + 2 * GAP)

    pop()

    const time = new Date()
    const hue = Math.round(time.getMilliseconds() / 360)

    const currentXs = []
    runnersX.forEach((runner) => {
        runner.update()
        runner.draw()

        push()
        stroke(160)
        const currentX = runner.getCurrentPosition().x
        // line(currentX, 0, currentX, windowHeight)

        currentXs.push(currentX)
        pop()
    })

    runnersY.forEach((runner) => {
        runner.update()
        runner.draw()

        push()
        stroke(160)
        const currentY = runner.getCurrentPosition().y
        // line(0, currentY, windowWidth, currentY)
        pop()

        push()
        noStroke()
        fill(hue, 50, 100)
        currentXs.forEach((x) => {
            if (lastPos.length == 0) {
                circle(x, currentY, 1)
            } else {
                line(
                    lastPos[currentIndex].x,
                    lastPos[currentIndex].y,
                    x,
                    currentY
                )
                lastPos.push({})
                currentIndex += 1
            }
        })
        pop()
    })
}
