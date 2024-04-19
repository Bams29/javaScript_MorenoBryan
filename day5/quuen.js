function colocarReinas(fila, columna, tablero, numReinas) {
    if (numReinas === 0) {
        mostrarTablero(tablero);
        return;
    }

    for (let i = 0; i < tablero.length; i++) {
        if (!esAmenazada(fila, i, tablero)) {
            tablero[fila][i] = 'R';
            colocarReinas(fila + 1, 0, tablero, numReinas - 1);
            tablero[fila][i] = 'O';
        }
    }
}

function esAmenazada(fila, columna, tablero) {
    // Verificar en la misma fila
    for (let i = 0; i < tablero.length; i++) {
        if (tablero[fila][i] === 'R' && i !== columna) {
            return true;
        }
    }

    // Verificar en la misma columna
    for (let i = 0; i < tablero.length; i++) {
        if (tablero[i][columna] === 'R' && i !== fila) {
            return true;
        }
    }

    // Verificar diagonales
    let i, j;

    // Diagonal principal
    for (i = fila, j = columna; i >= 0 && j >= 0; i--, j--) {
        if (tablero[i][j] === 'R' && i !== fila && j !== columna) {
            return true;
        }
    }

    for (i = fila, j = columna; i < tablero.length && j < tablero.length; i++, j++) {
        if (tablero[i][j] === 'R' && i !== fila && j !== columna) {
            return true;
        }
    }

    // Diagonal secundaria
    for (i = fila, j = columna; i >= 0 && j < tablero.length; i--, j++) {
        if (tablero[i][j] === 'R' && i !== fila && j !== columna) {
            return true;
        }
    }

    for (i = fila, j = columna; i < tablero.length && j >= 0; i++, j--) {
        if (tablero[i][j] === 'R' && i !== fila && j !== columna) {
            return true;
        }
    }

    return false;
}

function mostrarTablero(tablero) {
    for (let i = 0; i < tablero.length; i++) {
        console.log(tablero[i].join(' '));
    }
}

// Interacción con el usuario
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('Posición de la primera reina (fila columna): ', (input) => {
    const [fila, columna] = input.split(' ').map(Number);

    // Crear el tablero inicial
    const tablero = Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => 'O'));

    // Colocar la primera reina
    tablero[fila - 1][columna - 1] = 'R';

    // Llamar a la función para colocar las demás reinas
    colocarReinas(0, 0, tablero, 7);

    readline.close();
});
