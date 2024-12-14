export interface LoginOutput{
    success: boolean,
    respuesta: string,
    token: string
}

export interface LoginInput{
    usuario: string,
    clave: string
}