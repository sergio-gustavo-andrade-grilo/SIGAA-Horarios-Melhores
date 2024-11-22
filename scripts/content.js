"use strict";

const exprHorarioOriginal = /^[1-7]+[MTN][1-5]+$/g;

const diasDaSemana = {
  1: "dom",
  2: "seg",
  3: "ter",
  4: "qua",
  5: "qui",
  6: "sex",
  7: "sab",
};

const horariosInicioManha = {
  1: "07:00",
  2: "08:00",
  3: "09:00",
  4: "10:10",
  5: "11:10",
};

const horariosFimManha = {
  1: "08:00",
  2: "09:00",
  3: "10:00",
  4: "11:10",
  5: "12:10",
};

const horariosInicioTarde = {
  1: "13:00",
  2: "14:00",
  3: "15:00",
  4: "16:10",
  5: "17:10",
};

const horariosFimTarde = {
  1: "14:00",
  2: "15:00",
  3: "16:00",
  4: "17:10",
  5: "18:10",
};

const horariosInicioNoite = {
  1: "19:00",
  2: "19:50",
  3: "20:50",
  4: "21:40",
};

const horariosFimNoite = {
  1: "19:50",
  2: "20:40",
  3: "21:40",
  4: "22:30",
};

function horarioInicio(turno, num) {
  if (turno === "M") {
    return horariosInicioManha[num];
  } else if (turno === "T") {
    return horariosInicioTarde[num];
  } else {
    return horariosInicioNoite[num];
  }
}

function horarioFim(turno, num) {
  if (turno === "M") {
    return horariosFimManha[num];
  } else if (turno === "T") {
    return horariosFimTarde[num];
  } else {
    return horariosFimNoite[num];
  }
}

function diasString(dias) {
  let out = "";

  for (let dia of dias) {
    out += diasDaSemana[dia] + " ";
  }

  return out.trim().split(" ").join(", ");
}

function converterHorarioParcial(horario) {
  const turno = horario.match(/\D/)[0];
  const horarioSplit = horario.split(turno);

  const numsHorario = horarioSplit[1];

  const inicio = parseInt(numsHorario[0]);
  const fim = parseInt(numsHorario[numsHorario.length - 1]);

  const out =
    diasString(horarioSplit[0]) +
    ": " +
    horarioInicio(turno, inicio) +
    "-" +
    horarioFim(turno, fim);

  return out.trim();
}

function converterHorarioCompleto(horario) {
  let out = "";

  for (let hor of horario.split(" ")) {
    if (hor.match(exprHorarioOriginal)) {
      out += converterHorarioParcial(hor) + " ";
    } else {
      out += hor + " ";
    }
  }

  return out.trim();
}

function converterHorarios() {
  function converterHorariosRecursivo(elemento) {
    if (elemento.nodeType === Node.TEXT_NODE) {
      elemento.nodeValue = converterHorarioCompleto(elemento.nodeValue);
    }

    for (let filho of elemento.childNodes) {
      converterHorariosRecursivo(filho);
    }
  }

  converterHorariosRecursivo(document.body);
}

converterHorarios();
