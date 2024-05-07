document.addEventListener("DOMContentLoaded", function(e) {

    var frmDataHero = document.getElementById('frmDataHero');
    frmDataHero.onsubmit = function(e) {
        e.preventDefault();
        var formData = new FormData(this);
        var jsonData = {};
        for (var [k, v] of formData) {
            jsonData[k] = v;
        }
        
        // Obtener los datos existentes del almacenamiento local
        var existingData = localStorage.getItem('formData');
        var dataArray = existingData ? JSON.parse(existingData) : [];
        
        // Agregar los nuevos datos al array
        dataArray.push(jsonData);
        
        // Guardar el array actualizado en el almacenamiento local
        localStorage.setItem('formData', JSON.stringify(dataArray));
        
        // Opcionalmente, puedes redirigir a otra página después de guardar los datos
        // window.location.href = 'otra_pagina.html';
        
        console.log(jsonData);
    }


});


