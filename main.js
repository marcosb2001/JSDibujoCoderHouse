/*
////////////////////////    JSDibujo para final CODERHOUSE JavaScript 36930    /////////////////////////////////////////
Hola profe! Ésta es una versión adaptada de un programa que estaba desarrollando por diversión hace unos días llamada JSDibujo.
Decidí adaptarla para la entrega final después de que me convencieran, cambiando un poco de su funcionalidad.
La historia de commits comienza con el programa relativamente desarrollado, las actualizaciones/commits anteriores se pueden encontrar en el repositorio del JSDibujo original: https://github.com/marcosb2001/jsDibujo
Quería mantener ambas versiones separadas ya que planeo seguir trabajando en el programa en el futuro y no toda la funcionalidad que agregue a esta versión me es útil para mi idea final.
*/

/////////////////////////setup////////////////////////////////////////


//Fetch para colores
const colorlista = document.querySelector(".nav")
fetch('https://raw.githubusercontent.com/marcosb2001/coderjson36930/main/colores.json')
  .then(response => response.json())
  .then(data => {
    html = ""
    data.forEach(colores => {
      html += `
      <div class="clr" data-clr=${colores.dat}></div>`
  })
    colorlista.innerHTML = html
    let clrs = document.querySelectorAll('.clr')
    clrsArr = Array.from(clrs)
    //declarar usuario
function Item(nombre, edad, info) {
    this.nombre = nombre
    this.edad = edad
    this.info = nombre + ', ' + edad + ' años'
}
//guardar info de usuario en LocalStorage
if (localStorage.getItem("usuario") === null) {
    const nombre = prompt('ingrese su nombre')
    const edad = parseInt(prompt('ingrese su edad'))
    const info = this.info
    
    const usuario = new Item(nombre, edad, info)
    console.log(usuario.info)
    localStorage.setItem("usuario", usuario.info)
  }
  //cambiar título de la página con información del usuario
  document.title = "JsDibujo (" + localStorage.getItem("usuario") + ')';




//declarar lienzo
const canvas = document.getElementById('canvas')
canvas.height = window.innerHeight
canvas.width = window.innerWidth

const ctx = canvas.getContext("2d")

const databoton = document.getElementById('databoton')
databoton.onclick = () => {
    Toastify({
        text: "JSDibujo - Desarrollado por Marcos Benítez para CODER HOUSE 36930 y Arturo Verbel. Haga click en el lienzo para dibujar. Los botones de colores eligen el color de la línea. Los botones con números eligen el tamaño de la línea. Los botones 'bubble', 'block', y 'fuzzy', eligen la forma de la línea.",
        className: "infobotones",
        position: "center",
        gravity: "top",
        duration: 5000,
        style: {
          background: "white",
          color: 'black',
        }
      }).showToast();
}

//declarar prevX y prevY (posición previa del mouse)
let prevX = null
let prevY = null

//ancho y estilo de la linea
ctx.lineWidth = 3
ctx.lineCap = 'round'

//para que no dibuje una línea automáticamente
let draw = false

/////////////////////////////botones/////////////////////////////////////




//cambiar el color de linea
clrsArr.forEach(clr => {
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

//limpiar el lienzo
let clearBtn = document.querySelector('.clear')
clearBtn.addEventListener('click', () => {

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    //alerta
    Toastify({
        text: "Se vació el lienzo",
        className: "info",
        style: {
          background: "white",
          color: 'black',
        }
      }).showToast();
})

//guardar dibujo
let saveBtn = document.querySelector('.save')
saveBtn.addEventListener('click', () => {
    let data = canvas.toDataURL('imag/png')
    let a = document.createElement('a')
    a.href = data

    a.download = 'dibujo.png'
    a.click()

    Toastify({
        text: "Se guardó el dibujo.",
        className: "info",
        style: {
          background: "white",
          color: 'black',
        }
      }).showToast();
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

  })



