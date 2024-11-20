"use strict"
// TODO adicionar horários para CFP e CCJS
// TODO funciona apenas para a homepage por enquanto...

const expr = /^[1-7][MTN][1-5][1-5]$/g;

const diasDaSemana = {
    1: "dom",
    2: "seg",
    3: "ter",
    4: "qua",
    5: "qui",
    6: "sex",
    7: "sab"
};

const horariosInicioManha = {
    1: "07:00",
    2: "08:00",
    3: "09:00",
    4: "10:10",
    5: "11:10"
};

const horariosFimManha = {
    1: "08:00",
    2: "09:00",
    3: "10:00",
    4: "11:10",
    5: "12:10"
};

const horariosInicioTarde = {
    1: "13:00",
    2: "14:00",
    3: "15:00",
    4: "16:10",
    5: "17:10"
};

const horariosFimTarde = {
    1: "14:00",
    2: "15:00",
    3: "16:00",
    4: "17:10",
    5: "18:10"
};

const horariosInicioNoite = {
    1: "18:30",
    2: "19:20",
    3: "20:10",
    4: "22:10",
};

const horariosFimNoite = {
    1: "19:20",
    2: "20:10",
    3: "21:10",
    4: "22:00",
};

function horarioInicio(turno, num) {
    if (turno === "M") {
        return horariosInicioManha[num]
    } else if (turno === "T") {
        return horariosInicioTarde[num]
    } else {
        return horariosInicioNoite[num]
    };
};

function horarioFim(turno, num) {
    if (turno === "M") {
        return horariosFimManha[num]
    } else if (turno === "T") {
        return horariosFimTarde[num]
    } else {
        return horariosFimNoite[num]
    };
};

function converterHorarioParcial(horarioParcial) {
    const dia = parseInt(horarioParcial[0]);
    const turno = horarioParcial[1];
    const inicio = parseInt(horarioParcial[2]);
    const fim = parseInt(horarioParcial[3]);

    let out = "";

    out += diasDaSemana[dia] + ": ";
    out += horarioInicio(turno, inicio) + "–" + horarioFim(turno, fim);

    return out;
};

function converterHorarioCompleto(horarioCompleto) {
    let out = "";

    for (let horario of horarioCompleto.split(" ")) {
        if (horario.match(expr)) {
            out += converterHorarioParcial(horario) + " ";
        } else {
            out += horario + " ";
        }
    }

    return out;

};

function converterHorarios() {
    function traverseAndReplace(elemento) {
        elemento.nodeValue = converterHorarioCompleto(elemento.nodeValue);

        for (let child of elemento.childNodes) {
            traverseAndReplace(child);
        }
    }

    traverseAndReplace(document.body);
}

converterHorarios();
