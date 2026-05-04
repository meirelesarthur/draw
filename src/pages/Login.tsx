import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { verificarSenha, autenticar, isAutenticado } from '../auth/auth'
import LoadingScreen from '../components/LoadingScreen'
import logoDrawLight from '../assets/logo-draw-light.svg'
import logoDrawDark from '../assets/logo-draw.svg'
import styles from './Login.module.css'

export default function Login() {
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [errKey, setErrKey] = useState(0)
  const [showLoading, setShowLoading] = useState(false)
  const [loadingExiting, setLoadingExiting] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAutenticado()) navigate('/', { replace: true })
  }, [navigate])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setErro(false)
    setTimeout(async () => {
      if (await verificarSenha(senha)) {
        autenticar()
        setShowLoading(true)
        setTimeout(() => setLoadingExiting(true), 4600)
        setTimeout(() => navigate('/', { replace: true }), 5000)
      } else {
        setErro(true)
        setErrKey(k => k + 1)
        setSenha('')
        setLoading(false)
      }
    }, 600)
  }

  if (showLoading) return <LoadingScreen exiting={loadingExiting} />

  return (
    <div className={styles.root}>
      <div className={styles.card}>

        {/* ── LEFT PANEL ── */}
        <div className={styles.left}>
          <div className={styles.leftTop}>
            <div className={styles.brand}>
              <img src={logoDrawDark} alt="Draw the Law" className={styles.brandLogoImg} />
            </div>
            <h1 className={styles.leftTitle}>
              Memorial<br />Jurídico<br />Digital
            </h1>
            <p className={styles.leftSub}>
              Plataforma privada para acompanhamento estratégico de processos complexos.
            </p>
          </div>

          <div className={styles.leftBottom}>
            <div className={styles.leftDivider} />
            <p className={styles.leftLegal}>
              Acesso restrito. Uso exclusivo de clientes e colaboradores autorizados de NERY Advogados.
            </p>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className={styles.right}>
          <form className={styles.form} onSubmit={handleSubmit}>

            <div className={styles.rightHeader}>
              <div className={styles.rightLogo}>
                <img src={logoDrawLight} alt="Draw the Law" className={styles.rightLogoImg} />
              </div>
              <h2 className={styles.cardTitle}>Bem-vindo de volta</h2>
              <p className={styles.cardEyebrow}>Acesse sua conta para continuar</p>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="senha">Senha de acesso</label>
              <div className={styles.inputWrap}>
                <input
                  key={errKey}
                  id="senha"
                  type={showPass ? 'text' : 'password'}
                  className={`${styles.input} ${erro ? styles.inputError : ''}`}
                  value={senha}
                  onChange={e => { setSenha(e.target.value); setErro(false) }}
                  placeholder="••••••••••"
                  autoComplete="current-password"
                  autoFocus
                />
                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setShowPass(v => !v)}
                  aria-label={showPass ? 'Ocultar senha' : 'Mostrar senha'}
                  tabIndex={-1}
                >
                  {showPass ? <EyeOff /> : <Eye />}
                </button>
              </div>
              {erro && (
                <p className={styles.errorMsg}>Senha incorreta. Tente novamente.</p>
              )}
            </div>

            <button
              type="submit"
              className={styles.btn}
              disabled={loading || !senha}
            >
              {loading
                ? <><span className={styles.spinner} /> Verificando…</>
                : 'Entrar na plataforma'
              }
            </button>

            <p className={styles.hint}>NERY Advogados · Confidencial</p>
          </form>
        </div>

      </div>
    </div>
  )
}

function Eye() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 10s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6z"/>
      <circle cx="10" cy="10" r="2.5"/>
    </svg>
  )
}

function EyeOff() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 2l16 16M8.5 8.6A2.5 2.5 0 0012.4 12.5M6 5.2C3.5 6.8 2 10 2 10s3 5.5 8 5.5a8 8 0 003.7-.9M14.5 14C16.8 12.3 18 10 18 10s-3-5.5-8-5.5c-.8 0-1.6.1-2.3.3"/>
    </svg>
  )
}
