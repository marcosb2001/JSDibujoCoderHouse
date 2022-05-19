/////////////////////////setup////////////////////////////////////////////
//declarar lienzo
const canvas = document.getElementById('canvas')
canvas.height = window.innerHeight
canvas.width = window.innerWidth

const ctx = canvas.getContext("2d")

//declarar prevX y prevY (posición previa del mouse)
let prevX = null
let prevY = null

//ancho y estilo de la linea
ctx.lineWidth = 3
ctx.lineCap = 'round'

//para q no dibuje solo
let draw = false

/////////////////////////////botones/////////////////////////////////////

///////////Color
//tomar la clase .clr
let clrs = document.querySelectorAll('.clr')
//convertir a array
clrs = Array.from(clrs)

//cambiar el color de linea
clrs.forEach(clr => {
    clr.addEventListener('click', () => {
        ctx.strokeStyle = clr.dataset.clr
    })
})

/////////Tamaño
//cambiar tamaño de linea
let selWidth = document.querySelectorAll('.size')
selWidth = Array.from(selWidth)

selWidth.forEach(sizes => {
    sizes.addEventListener('click', () => {
        ctx.lineWidth = sizes.dataset.size
    })
})

///////////Estilo
let selStroke = document.querySelectorAll('.stroke')
selStroke = Array.from(selStroke)

selStroke.forEach(stroke => {
    stroke.addEventListener('click', () => {
        ctx.lineCap = stroke.dataset.stroke
    })
})


let clearBtn = document.querySelector('.clear')
clearBtn.addEventListener('click', () => {
    //limpiar el lienzo
    ctx.clearRect(0, 0, canvas.width, canvas.height)
})

//guardar dibujo
let saveBtn = document.querySelector('.save')
saveBtn.addEventListener('click', () => {
    let data = canvas.toDataURL('imag/png')
    let a = document.createElement('a')
    a.href = data

    a.download = 'dibujo.png'
    a.click()
})

//dibujar cuando MouseDown
window.addEventListener('mousedown', (e) => draw = true)
//dejar de dibujar cuando MouseUp
window.addEventListener('mouseup', (e) => draw = false)

//evento para saber la posición del mouse de usuario
window.addEventListener('mousemove', (e) => {

    //pos previa
    if(prevX == null || prevY == null || !draw){
        prevX = e.clientX
        prevY = e.clientY
        return
    }

    //pos actual
    let currentX = e.clientX
    let currentY = e.clientY

    //dibujar una linea desde la posición previa a la actual
    ctx.beginPath()
    ctx.moveTo(prevX, prevY)
    ctx.lineTo(currentX, currentY)
    ctx.stroke()

    //update pos previa
    prevX = currentX
    prevY = currentY

    //esta función toma la posición previa del mouse y dibuja una linea desde esa posición a la posición actual
})
