const HASH = '5b834c3ad9542660ced48c3024e6c6f0abe7a1d9967c686095990129e8e4a583'
const SESSION_KEY = 'dtl_v1'

export async function verificarSenha(input: string): Promise<boolean> {
  const msgBuffer = new TextEncoder().encode(input)
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  return hashHex === HASH
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
