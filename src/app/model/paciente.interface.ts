import { Especialidad } from "./especialidad.interface";

export interface Paciente{
    id: number,
    apellidoPaterno: string,
    apellidoMaterno: string,
    nombres: string,
    dni: string,
    peso: number,
    talla: number,
    imc: number,
    especialidad: Especialidad
}