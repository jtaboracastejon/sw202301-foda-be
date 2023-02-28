var personas  = [];
for (var i = 0; i < 20; i++){
    var persona = {
        nombre: 'Sujeto ' + (i+1),
        edad: Math.ceil(Math.random() * (41 - 21) + 21),
        correo: 'sujeto' + (i+1)+'@mail.com',
        grupo: i < 4 ? 0 : i < 8 ? 1 : i < 12 ? 2 : i < 16 ? 3 : 4,
        tratamiento: i < 4 ? 0 : i < 8 ? 2 : i < 12 ? 4 : i < 16 ? 12 : 20,
        medicionSegs: Math.ceil(Math.random() * (80 - 10) + 10),
    }
    personas.push(persona);
}
db.experimento.insertMany(personas);