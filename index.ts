class Departamento {
  nombre: string;
  constructor(nombre: string) {
    this.nombre = nombre;
  }
  getName() {
    return this.nombre;
  }
}

class Piso {
  nombre: string;
  deptos: Departamento[];
  constructor(nombre: string) {
    this.nombre = nombre;
    this.deptos = [];
  }
  pushDepartamento(depto: Departamento) {
    return this.deptos.push(depto);
  }
  getDepartamentos(): Departamento[] {
    return this.deptos;
  }
}

class Edificio {
  pisos: Piso[];
  constructor(pisos: Piso[]) {
    this.pisos = pisos;
  }
  addDepartamentoToPiso(nombreDePiso: string, departamento: Departamento) {
    const pisoEncontrado = this.pisos.find((p) => p.nombre == nombreDePiso);
    if (pisoEncontrado) {
      pisoEncontrado.pushDepartamento(departamento);
    } else {
      console.error(`El piso "${nombreDePiso}" no existe.`);
    }
  }
  getDepartamentosByPiso(nombreDelPiso: string): Departamento[] {
    const pisoEncontrado = this.pisos.find((p) => p.nombre == nombreDelPiso);

    // Verificamos si el piso fue encontrado
    if (pisoEncontrado) {
      return pisoEncontrado.getDepartamentos();
    } else {
      console.error(`El piso "${nombreDelPiso}" no existe.`);
      return []; // Retornamos un array vacío si no se encuentra el piso
    }
  }
}

function testClaseEdificio() {
  const unPiso = new Piso("planta baja");
  const otroPiso = new Piso("primer piso");
  const unEdificio = new Edificio([unPiso, otroPiso]);
  const deptoUno = new Departamento("depto uno");
  const deptoDos = new Departamento("depto dos");
  const deptoTres = new Departamento("depto tres");
  unEdificio.addDepartamentoToPiso("planta baja", deptoUno);
  unEdificio.addDepartamentoToPiso("planta baja", deptoDos);
  unEdificio.addDepartamentoToPiso("planta baja", deptoTres);

  const deptos = unEdificio.getDepartamentosByPiso("planta baja");
  const deptosEmpty = unEdificio.getDepartamentosByPiso("primer piso");

  if (
    Array.isArray(deptosEmpty) &&
    deptosEmpty.length == 0 &&
    deptos.length == 3 &&
    deptos[2].getName() == "depto tres"
  ) {
    console.log("testClaseBandaApartment passed");
  } else {
    throw "testClaseBandaApartment not passed";
  }
}

function main() {
  testClaseEdificio();
}
main();
