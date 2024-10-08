<?php
header('Content-Type: application/json');

// Função para somar matrizes
function somaMatrizes($A, $B) {
    $resultado = [];
    for ($i = 0; $i < count($A); $i++) {
        for ($j = 0; $j < count($A[$i]); $j++) {
            $resultado[$i][$j] = $A[$i][$j] + $B[$i][$j];
        }
    }
    return $resultado;
}

// Função para multiplicar matrizes
function multiplicaMatrizes($A, $B) {
    $resultado = [];
    for ($i = 0; $i < count($A); $i++) {
        for ($j = 0; $j < count($B[0]); $j++) {
            $soma = 0;
            for ($k = 0; $k < count($A[0]); $k++) {
                $soma += $A[$i][$k] * $B[$k][$j];
            }
            $resultado[$i][$j] = $soma;
        }
    }
    return $resultado;
}

// Função para calcular produto vetorial
function produtoVetorial($v1, $v2) {
    $resultado = [];
    for ($i = 0; $i < count($v1); $i++) {
        $resultado[$i] = $v1[$i] * $v2[$i];
    }
    return $resultado;
}

// Receber os dados JSON enviados pelo cliente
$input = json_decode(file_get_contents('php://input'), true);

$inicio = microtime(true);

// Verificar qual operação realizar
switch ($input['calculationType']) {
    case 'soma':
        $resultado = somaMatrizes($input['matrix1'], $input['matrix2']);
        break;
    case 'multiplicacao':
        $resultado = multiplicaMatrizes($input['matrix1'], $input['matrix2']);
        break;
    case 'vetor':
        $resultado = produtoVetorial($input['matrix1'], $input['matrix2']);
        break;
    // Adicione outros cálculos aqui...
}

$fim = microtime(true);
$tempoGasto = ($fim - $inicio) * 1000; // Tempo em milissegundos

// Enviar o resultado e o tempo de execução
echo json_encode([
    'resultado' => $resultado,
    'tempo' => $tempoGasto
]);

