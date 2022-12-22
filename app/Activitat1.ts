// CONTROL DE ERRORES
    let testear = false;
    let indicador_dificultad = false;
// DIFICULTADES
    let francia:any|null = document.getElementById("fr");
    let polonia:any|null = document.getElementById("po");
    let ucrania:any|null = document.getElementById("uc");
    let irak:any|null = document.getElementById("ik");
// USERNAME
    let username:any|null = document.getElementById("username");
    let errorN:any|null = document.getElementById("error_name");
    let errorD:any|null = document.getElementById("error_difi");
    errorN.style.display = "none";
    errorD.style.display = "none";
// TEXTOS
    let p_dificultad:any|null = document.getElementById("add_diff");
    let p_aciertos:any|null = document.getElementById("aciertos");
    let p_fallos:any|null = document.getElementById("fallos");
    let p_tiempo_win:any|null = document.getElementById("add_time_win");
    let p_tiempo_lose:any|null = document.getElementById("add_time_lose");
    let p_nintents:any|null = document.getElementById("n_intents");
    // Section win
        let p_text_win:any|null = document.getElementById("add_text_win");
        let p_username_win:any|null = document.getElementById("add_username_win");
        let p_dificultad_win:any|null = document.getElementById("add_diff_win");
        let p_temps_win:any|null = document.getElementById("add_time_win");
        let p_aciertos_win:any|null = document.getElementById("add_aciertos_win");
        let p_fallos_win:any|null = document.getElementById("add_fallos_win");
    // Section lose
        let p_text_lose:any|null = document.getElementById("add_text_lose");
        let p_username_lose:any|null = document.getElementById("add_username_lose");
        let p_dificultad_lose:any|null = document.getElementById("add_diff_lose");
        let p_temps_lose:any|null = document.getElementById("add_time_lose");
        let p_aciertos_lose:any|null = document.getElementById("add_aciertos_lose");
        let p_fallos_lose:any|null = document.getElementById("add_fallos_lose");
    // Section datos
        let p_datos:any|null = document.getElementById("datos");
// SECTIONS
    let s_dificultad:any = document.getElementById("dificultad");
    let s_jugar:any = document.getElementById("juego");
    let s_win:any = document.getElementById("win");
    let s_lose:any = document.getElementById("lose");
    let s_consulta:any = document.getElementById("consulta");
    s_dificultad.style.display = "flex";
    s_jugar.style.display = "none";
    s_win.style.display = "none";
    s_lose.style.display = "none";
    s_consulta.style.display = "none";
// VARIABLES
    let dificultad:number = 0;
    let celda:any[][] = [];
    let aciertos:number = 0;
    let fallos:number = 0;
    let contadorBombas:any = 0;
    let tamaño_dificultad:any = 10;
    let tiros:any;
    let partidas:any = [];
// CONTADOR
    var contador = 30;
    var tiempo_total = 0;
    var l:any|null = document.getElementById("contador");
// TABLERO
    let tablero:any = document.getElementById("tablero");

// FUNCIONES
    // Funcion para generar el tablero
        function generarTablero() {
            // Inicializamos el tablero a 0 para poder insertar las celdas
            for (let i = 0; i < tamaño_dificultad; i++) { 
                celda[i] = []; 
                for (let j = 0; j < tamaño_dificultad; j++) {  
                    celda[i][j] = 0; 
                } 
            }
            // Gneramos el tablero y lo almacenamos en la variable html
            let html:string = "";
            if ( testear == false ) {
                for (let x = 0; x < tamaño_dificultad; x++) {
                    html += "<div class='line'>";
                    for (let y = 0; y < tamaño_dificultad; y++) {
                        let random = Math.floor(Math.random() * 10) + 1;
                        if (random <= dificultad) {
                            html += "<div id='tab"+x+"-"+y+"' class='empty' name='tab' onclick='clicar("+x+","+y+")'></div>";
                        }
                        else {
                            html += "<div id='tab"+x+"-"+y+"' class='bomb' name='tab' onclick='clicar("+x+","+y+")'></div>";
                            contadorBombas++;
                        }
                    }
                    html += "</div>";
                }
            } else {
                for (let x = 0; x < tamaño_dificultad; x++) {
                    html += "<div class='line'>";
                    for (let y = 0; y < tamaño_dificultad; y++) {
                        let random = Math.floor(Math.random() * 10) + 1;
                        if (random <= dificultad) {
                            html += "<div id='tab"+x+"-"+y+"' class='empty_test' name='tab' onclick='clicar("+x+","+y+")'></div>";
                        }
                        else {
                            html += "<div id='tab"+x+"-"+y+"' class='bomb_test' name='tab' onclick='clicar("+x+","+y+")'></div>";
                            contadorBombas++;
                        }
                    }
                    html += "</div>";
                }
            }
            // Insertamos el tablero en el html y guardamos el numero de tiros posibles
            tablero.innerHTML = html;
            tiros = contadorBombas + 3;
            // Almacenamos las celdas en el array
            for (let x = 0; x < tamaño_dificultad; x++) {
                for (let y = 0; y < tamaño_dificultad; y++) {
                    celda[x][y] = document.getElementById("tab"+x+"-"+y);
                }
            }
        }

    // Funcion para jugar una vez se haya generado el juego
        function clicar( x:number, y:number) {
            if (celda[x][y].className == "bomb" || celda[x][y].className == "bomb_test" ) {
                celda[x][y].className = "bomb_click";
                aciertos++;
                contador = 30;
            } else if (celda[x][y].className == "empty" || celda[x][y].className == "empty_test" ) {
                celda[x][y].className = "empty_click";
                fallos++;
            }
            tiros--;
            p_nintents.innerText = tiros;
            p_aciertos.innerText = aciertos;
            p_fallos.innerText = fallos;
            if (aciertos == contadorBombas) {
                generarFinalWin();
            } else if (tiros == 0) {
                generarFinalLose();
            }
        }

    // Funcion para consultar de dificultad
        function consultarDificultad() {
            if (dificultad == 8) {
                tamaño_dificultad = 5;
                return "França";
            } else if (dificultad == 6) {
                tamaño_dificultad = 8;
                return "Polonia";
            } else if (dificultad == 4) {
                tamaño_dificultad = 11;
                return "Ucrania";
            } else {
                tamaño_dificultad = 14;
                return "Irak";
            }
        }
        
    // Funcion para iniciar el juego
        function jugar() {
            errorN.style.display = "none";
            errorD.style.display = "none";
            setInterval(function contar(){ 
                contador--;
                l.innerHTML = contador; 
                tiempo_total++;
                if (contador == -1) {
                    generarFinalLose();
                } 
            },1000);
            if ( indicador_dificultad == false ) { 
                errorD.style.display = "block";
                if ( username.value == "" ) { errorN.style.display = "block"; } 
            } else {
                if ( username.value != "" ) {
                    s_dificultad.style.display = "none";
                    s_jugar.style.display = "flex";
                    p_dificultad.innerText = consultarDificultad();
                    generarTablero();
                    p_nintents.innerText = (contadorBombas + 3);
                    p_aciertos.innerText = 0;
                    p_fallos.innerText = 0;
                } else {
                    errorN.style.display = "block";
                }
            }
        }

    // Funcion para seleccionar la dificultad
        function seleccionar_dificultad( a:number ) {
            if ( a == 8) {
                resetDificultad();
                indicador_dificultad = true;
                francia.className = "pres";
            } else if ( a == 6) {
                resetDificultad();
                indicador_dificultad = true;
                polonia.className = "pres";
            } else if ( a == 4) {
                resetDificultad();
                indicador_dificultad = true;
                ucrania.className = "pres";
            } else {
                resetDificultad();
                indicador_dificultad = true;
                irak.className = "pres";
            }
            dificultad = a;
            errorD.style.display = "none";
        }

    // Funcion para reiniciar el juego
        function reset() { location.reload(); }

    // Funcion para ir añadiendo los datos de la partida en un array que se guarde en el localstorage
        function guardar( a:boolean ) {
            cogerDatos();
            let partida = {
                username: username.value,
                dificultad: consultarDificultad(),
                tiempo_total: tiempo_total,
                aciertos: aciertos,
                fallos: fallos,
                win: a
            }
            partidas.push(partida);
            localStorage.setItem("partidas", JSON.stringify(partidas));
        }

    // Funcion para mostrar las partidas guardadas en el local storage
        function mostrar() {
            s_dificultad.style.display = "none";
            s_consulta.style.display = "flex";
            cogerDatos();
            let html = "";
            partidas.forEach((partida:any) => {
                html += `
                <div class="partida">
                    <p>${partida.username}</p>
                    <p>${partida.dificultad}</p>
                    <p>${partida.tiempo_total}</p>
                    <p>${partida.aciertos}</p>
                    <p>${partida.fallos}</p>
                `;
                if (partida.win == true) {
                    html += '<p class="partida_win">Guanyat</p>';
                } else {
                    html += ' <p class="partida_lose">Perdut</p> ';
                }
                html += ' </div> ';
            });
            p_datos.innerHTML = html;
        }

    // Funcion para coger los datos del local
        function cogerDatos() {
            partidas = JSON.parse(localStorage.getItem("partidas")!);
            if ( partidas == "" ) {
                partidas = [];
            } else if ( partidas == null ) {
                partidas = [];
            }
        }

    // Funcion para generar la parte final en caso de ganar
        function generarFinalWin() {
            s_jugar.style.display = "none";
            s_win.style.display = "flex";
            p_text_win.innerText = "Has guanyat la guerra, quina pena!";
            p_username_win.innerText = username.value;
            p_dificultad_win.innerText = consultarDificultad();
            p_temps_win.innerText = tiempo_total;
            p_aciertos_win.innerText = aciertos;
            p_fallos_win.innerText = fallos;
            guardar(true);
        }

    // Funcion para generar la parte final en caso de perder
        function generarFinalLose() {
            s_jugar.style.display = "none";
            s_lose.style.display = "flex";
            p_text_lose.innerText = "Has reventat, literalment!";
            p_username_lose.innerText = username.value;
            p_dificultad_lose.innerText = consultarDificultad();
            p_temps_lose.innerText = tiempo_total;
            p_aciertos_lose.innerText = aciertos;
            p_fallos_lose.innerText = fallos;
            guardar(false);
        }

    // Funcion para resetear las dificultades
        function resetDificultad() {
            francia.className = "unpres";
            polonia.className = "unpres";
            ucrania.className = "unpres";
            irak.className = "unpres";
        }

        function tester() {
            testear = true;
        }