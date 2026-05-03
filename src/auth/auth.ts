// Senha da plataforma: nery2025
// Para alterar: substitua os charCodes abaixo pelos do(s) caractere(s) da nova senha
// Exemplo: 'A'=65, 'a'=97, '0'=48, '@'=64 — use String.fromCharCode(x).charCodeAt(0) no console
const _P = String.fromCharCode(110, 101, 114, 121, 50, 48, 50, 53)
const SESSION_KEY = 'dtl_v1'

export function verificarSenha(input: string): boolean {
  return input === _P
}

export function autenticar(): void {
  sessionStorage.setItem(SESSION_KEY, 'ok')
}

export function sair(): void {
  sessionStorage.removeItem(SESSION_KEY)
}

export function isAutenticado(): boolean {
  return sessionStorage.getItem(SESSION_KEY) === 'ok'
}
