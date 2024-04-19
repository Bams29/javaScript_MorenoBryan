const readline = require('readline');

// Crear una interfaz de lectura desde la entrada estándar
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function solveNQueens(n) {
    // Función auxiliar para verificar si una reina puede ser colocada en la posición (row, col)
    function isSafe(board, row, col) {
        // Verificar la fila en la dirección izquierda
        for (let i = 0; i < col; i++)
            if (board[row][i] === 1)
                return false;

        // Verificar la diagonal superior izquierda
        for (let i = row, j = col; i >= 0 && j >= 0; i--, j--)
            if (board[i][j] === 1)
                return false;

        // Verificar la diagonal inferior izquierda
        for (let i = row, j = col; j >= 0 && i < n; i++, j--)
            if (board[i][j] === 1)
                return false;

        return true;
    }

    // Función recursiva para encontrar todas las soluciones
    function solveUtil(board, col) {
        // Si todas las reinas están colocadas, retornar true
        if (col >= n)
            return true;

        // Intentar colocar esta reina en todas las filas de la columna 'col' una por una
        for (let i = 0; i < n; i++) {
            // Verificar si la reina puede ser colocada en la posición (i, col)
            if (isSafe(board, i, col)) {
                // Colocar la reina en esta posición
                board[i][col] = 1;

                // Recursivamente colocar las reinas restantes
                if (solveUtil(board, col + 1))
                    return true;

                // Si colocar la reina en (i, col) no lleva a una solución, entonces volver atrás y probar otras filas
                board[i][col] = 0;
            }
        }

        // Si no es posible colocar la reina en ninguna fila de esta columna, retornar false
        return false;
    }

    // Inicializar el tablero con todas las celdas en 0
    let board = Array.from({ length: n }, () => Array(n).fill(0));

    // Llamar a la función recursiva empezando desde la columna 0
    if (!solveUtil(board, 0)) {
        console.log(`Tableros distintos posibles: 0`);
        return;
    }

    // Imprimir el número de soluciones encontradas
    console.log(`Tableros distintos posibles: 1`);
}

// Solicitar al usuario el orden del tablero
rl.question("Ingrese el orden del tablero: ", (ordenDelTablero) => {
    // Convertir el input a un número entero
    const orden = parseInt(ordenDelTablero);

    // Validar la entrada
    if (isNaN(orden) || orden < 1 || orden > 15) {
        console.log("Por favor, ingrese un número entre 1 y 15.");
    } else {
        // Llamar a la función principal
        solveNQueens(orden);
    }

    // Cerrar la interfaz de lectura
    rl.close();
});
