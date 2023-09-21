import {Vector} from "./Vector";
import {Color} from "./Color";


export class Canvas {
    canvas: HTMLCanvasElement
    width: number
    height: number
    resolutionMult: number
    ctx: CanvasRenderingContext2D

    constructor(canvas: HTMLCanvasElement, width: number, height: number, resolutionMult: number = window.devicePixelRatio) {
        this.canvas = canvas
        this.ctx = this.canvas.getContext('2d')

        this.width = width
        this.height = height
        this.resolutionMult = resolutionMult

        this.canvas.style.width = this.width + 'px'
        this.canvas.style.height = this.height + 'px'

        this.canvas.width = this.width * this.resolutionMult
        this.canvas.height = this.height * this.resolutionMult
        this.ctx.scale(this.resolutionMult, this.resolutionMult)
    }

    setResolution(width: number, height: number, resolutionMult = window.devicePixelRatio) {
        this.width = width
        this.height = height
        this.canvas.width = width * resolutionMult;
        this.canvas.height = height * resolutionMult;
        this.ctx.scale(resolutionMult, resolutionMult);
    }

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height)
    }
    fill(color: Color) {
        this.ctx.beginPath()
        this.ctx.rect(0, 0, this.width, this.height)
        this.ctx.fillStyle = color.rgbaString
        this.ctx.fill()
        this.ctx.closePath()
    }

    static setImageDataPixel(imageData: ImageData, position: Vector, color: Color) {
        const index = (position.y * imageData.width + position.x) * 4;

        imageData.data[index] = color.r;   // Red channel
        imageData.data[index + 1] = color.g; // Green channel
        imageData.data[index + 2] = color.b; // Blue channel
        imageData.data[index + 3] = color.a; // Alpha channel
    }
}
