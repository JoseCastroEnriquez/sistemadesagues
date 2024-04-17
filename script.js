let Aparato = ["BAÑERA", "BIDET", "DUCHA PRIVADA", "DUCHA PUBLICA", "LAVADERO", "INODORO TANQUE", "INODORO FLUXOMETRO", "LAVAPLATOS", "LAVAPLATOS CON TRITURADOS", "FUENTE DE AGUA POTABLE", "LAVAMANOS", "ORINAL TANQUE", "ORINAL FLUXOMETRO", "ORINAL PARED"]
let diametroPulAparato = [2, 1.5, 2, 2, 1.5, 4, 4, 2, 2, 1, 2, 1.5, 3, 2]
let unidadesDescarga = [3, 1, 2, 3, 2, 3, 8, 1, 3, 2, 2, 2, 8, 2]
let campoAparatos = document.querySelector(".lista-aparatos")
let diametro = 0;
let unidades = 0;

let entrada = document.querySelector(".entrada");
let boton = document.querySelector(".boton");
let Q = 0;
let V = 0;
let yc;
let ynD
let S = 0.02;
let g = 9.81;

let todosDatos = [];
// Programa con el que se impriman los aparatos.

// Valores de salida.
let tramo = [];
let uniDesca = [];
let QmaxProba = [];
let pendiente = [];
let diametroComer = [];
let diametroComerNo = [];
let VtuLLeno = [];
let Ycos = [];
let Ynles = [];
let seteDiams = [];
let diamn = []
let resultado = 0;

for (i of Aparato) {
    let elemento = document.createElement("li");
    elemento.textContent = i;
    elemento.className = "elementos";
    campoAparatos.appendChild(elemento)
}

function unidadesDesDiame () {
    entrada = document.querySelector(".entrada");
    entrada = entrada.value;
    for (j in Aparato) {
        if (Aparato[j] == entrada) {
            diametro =  diametroPulAparato[j]
            unidades = unidadesDescarga[j]
            break
        }
    }

}

function calcYn(Qmax, D, V) {
    Qmax = Qmax / 1000;
    D = parseFloat(D);
    V = parseFloat(V);

    teta = (Qmax * 0.012) / ((D**(8/3))*(0.02**(1/2)));
    ynD = ((1.56*(teta**0.4666)*(1-0.565*((0.3353-teta)**0.4971))*D)).toFixed(4);

    teta = (Qmax * 0.012) / ((D**(8/3))*(0.02**(1/2)));

    while (true) {
        tata = Math.random() * 2*Math.PI;
        A = ((tata-Math.sin(tata))*D**2)/8;
        T = D * Math.sin(tata/2);
        operacion = Qmax / (Math.sqrt(g*(A/T))*A);
        
        if (operacion <= 1  && operacion>=0.9999) {
            yc = ((D / 2)*(1-Math.cos(tata/2))).toFixed(4);
            break
        }
    }

    Ycos.push(yc);
    Ynles.push(ynD);
}

let tabla = document.querySelector(".tabla");
boton.addEventListener("click", function (){
    diamn = [];
    tramo = [];
    uniDesca = [];
    QmaxProba = [];
    pendiente = [];
    VtuLLeno = [];
    seteDiams = [];
    Ycos = [];
    Ynles = [];

    entrada = document.querySelector(".entrada");
    entrada = entrada.value;
    entrada = entrada.split(", ")

    for (j in Aparato) {
        
        for (m in entrada){
            if (Aparato[j] == entrada[m]) {
                diametro =  diametroPulAparato[j];
                unidades = unidadesDescarga[j];
                uniDesca.push(unidades);
                diametroComer.push(diametro);
                diametroComerNo.push(diametro);
                seteDiams.push(0.75*diametro);
                Q = (0.1163*(unidades**0.6875)).toFixed(3);
                V = ((1/0.012)*(((diametro*0.0254)/4)**(2/3))*((0.02)**(1/2))).toFixed(3);
                QmaxProba.push(Q);
                VtuLLeno.push(V);
                calcYn(Q, diametro*0.0254, V);
            }
        }
    }

    for (i of uniDesca) {
        resultado += parseInt(i)
    }

    diametroComerNo.push(diametroComerNo.sort().reverse()[0]);
    diametro = diametroComerNo[0]
    uniDesca.push(resultado);
    seteDiams.push(0.75*diametro);

    Q = (0.1163*(resultado**0.6875)).toFixed(3);
    V = ((1/0.012)*(((diametro*0.0254)/4)**(2/3))*((0.02)**(1/2))).toFixed(3);
    QmaxProba.push(Q);
    VtuLLeno.push(V);
    calcYn(Q, diametro*0.0254, V);

    for (h in uniDesca) {
        tramo.push(h);
        pendiente.push(0.02);
    }

    for (i in uniDesca) {

        let general = document.createElement("tr");

        let elemento1 = document.createElement("td");
        elemento1.textContent = tramo[i]
        elemento1.style.backgroundColor = "rgb(197, 226, 254)"
        elemento1.setAttribute("contentEditable", "true")

        let elemento2 = document.createElement("td");
        elemento2.textContent = uniDesca[i]

        let elemento3 = document.createElement("td");
        elemento3.textContent = QmaxProba[i]

        let elemento4 = document.createElement("td");
        elemento4.textContent = pendiente[i]

        let elemento5;

        if (i <= uniDesca.length -2) {
            elemento5 = document.createElement("td");
            elemento5.setAttribute("contentEditable", "true")
            elemento5.style.backgroundColor = "rgb(197, 226, 254)"
            elemento5.textContent = (diametroComer[i]*0.0254).toFixed(4);
        }


        else {
                elemento5 = document.createElement("td");
                elemento5.setAttribute("contentEditable", "true")
                elemento5.style.backgroundColor = "rgb(197, 226, 254)"
                elemento5.textContent = (diametroComerNo[0]*0.0254).toFixed(4);
        }
        

        let elemento6 = document.createElement("td");
        elemento6.textContent = VtuLLeno[i]
        
        let elemento7 = document.createElement("td");
        elemento7.textContent = Ycos[i]

        let elemento8 = document.createElement("td");
        elemento8.textContent = Ynles[i]

        let elemento9 = document.createElement("td");
        elemento9.textContent = (seteDiams[i]*0.0254).toFixed(4)

        general.appendChild(elemento1);
        general.appendChild(elemento2);
        general.appendChild(elemento3);
        general.appendChild(elemento4);
        general.appendChild(elemento5); 
        general.appendChild(elemento6);
        general.appendChild(elemento7);
        general.appendChild(elemento8);
        general.appendChild(elemento9);
        tabla.appendChild(general);

    }
})

