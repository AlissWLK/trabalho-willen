document.getElementById('calculateBtn').addEventListener('click', function () {
    const calculationType = document.getElementById('calculationType').value;
    const execution = document.getElementById('execution').value;
    const matrix1 = document.getElementById('matrix1').value;
    const matrix2 = document.getElementById('matrix2').value;

    const matrices = {
        matrix1: parseMatrix(matrix1),
        matrix2: parseMatrix(matrix2)
    };

    if (execution === 'cliente') {
        const startTime = performance.now();
        let result;

        switch (calculationType) {
            case 'soma':
                result = somaMatrizes(matrices.matrix1, matrices.matrix2);
                break;
            case 'multiplicacao':
                result = multiplicaMatrizes(matrices.matrix1, matrices.matrix2);
                break;
            case 'vetor':
                result = produtoVetorial(matrices.matrix1, matrices.matrix2);
                break;
            // Adicione mais cálculos aqui...
        }

        const endTime = performance.now();
        const clientTime = (endTime - startTime).toFixed(2);

        document.getElementById('result').querySelector('span').innerText = JSON.stringify(result);
        document.getElementById('clientTime').querySelector('span').innerText = `${clientTime} ms`;
    } else {
        calcularNoServidor(matrices, calculationType);
    }
});

function parseMatrix(matrixString) {
    return matrixString.trim().split('\n').

map(row => row.split(',').map(Number));
}

function somaMatrizes(A, B) {
    if (A.length !== B.length || A[0].length !== B[0].length) {
        return 'Erro: Matrizes de tamanhos diferentes';
    }
    return A.map((row, i) => row.map((value, j) => value + B[i][j]));
}

function multiplicaMatrizes(A, B) {
    if (A[0].length !== B.length) {
        return 'Erro: Matrizes incompatíveis para multiplicação';
    }
    return A.map((row, i) =>
        B[0].map((_, j) =>
            row.reduce((sum, _, n) => sum + A[i][n] * B[n][j], 0)
        )
    );
}

function produtoVetorial(v1, v2) {
    if (v1.length !== v2.length) {
        return 'Erro: Vetores de tamanhos diferentes';
    }
    return v1.map((value, i) => value * v2[i]);
}

function calcularNoServidor(matrices, calculationType) {
    const data = {
        matrix1: matrices.matrix1,
        matrix2: matrices.matrix2,
        calculationType: calculationType
    };

    fetch('calcular.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(result => {
            document.getElementById('result').querySelector('span').innerText = JSON.stringify(result.resultado);
            document.getElementById('serverTime').querySelector('span').innerText = `${result.tempo} ms`;
        })
        .catch(error => console.error('Erro na requisição:', error));
}

