import { useEffect, useRef, useState } from "react"

const aluno = {
  nome: "Leen_mistica",
  turma: "3º Ano — Técnico",
  matricula: "2025001",
  presenca: 92,
  tarefasPendentes: 6,
  notificacoes: 126,
  mediaGeral: 9,
}

function PixelSquirrel({ eating }: { eating: boolean }) {
  return (
    <svg
      className={`squirrel ${eating ? "is-eating" : ""}`}
      viewBox="0 0 112 124"
      role="img"
      aria-label="Esquilo em pixel art dentro do tronco"
      shapeRendering="crispEdges"
    >
      <g className="squirrel-tail">
        <path fill="#4c2415" d="M78 32h16v8h8v16h6v28h-8v12H84V84h8V64h-6V52H74z" />
        <path fill="#9c4c26" d="M82 36h12v8h8v28h-8v12h-8V68h4V52H78z" />
        <path fill="#e07a35" d="M88 44h8v8h4v16h-8V56h-8z" />
      </g>
      <path fill="#4c2415" d="M24 30h12v-8h12v12h28V22h12v20h-8v18H32V42h-8z" />
      <path fill="#b85d2c" d="M32 34h12v-6h6v10h22v-10h8v18h-4v12H36V46h-4z" />
      <path fill="#e48943" d="M42 40h30v8h6v20H38V48h4z" />
      <path fill="#f2b66d" d="M48 48h22v8h8v10H42V56h6z" />
      <g className="squirrel-eyes">
        <rect x="44" y="45" width="6" height="7" rx="2" fill="#17110d" />
        <rect x="69" y="45" width="6" height="7" rx="2" fill="#17110d" />
        <rect x="45" y="45" width="2" height="2" fill="#fff8d5" />
        <rect x="70" y="45" width="2" height="2" fill="#fff8d5" />
      </g>
      <path fill="#5a2b1a" d="M56 56h9v5h-3v5h-4v-5h-2z" />
      <path fill="none" stroke="#5a2b1a" strokeWidth="2" d="M53 66h5m4 0h5" />
      <path fill="#4c2415" d="M36 65h42v10h8v33H72v10H40v-10H28V76h8z" />
      <path fill="#b85d2c" d="M40 65h34v12h8v29H68v10H44v-10H34V78h6z" />
      <path fill="#f0aa5d" d="M47 72h20v8h6v28H43V80h4z" />
      <path className="squirrel-arm" fill="#7b3b23" d="M32 77h12v7h8v9H40v-5h-8zm45 0h10v11h-8v5H67v-9h10z" />
      <path fill="#4c2415" d="M34 106h18v12H27v-6h7zm31 0h17v6h7v6H65z" />
      {eating && (
        <g className="squirrel-nut">
          <path fill="#5a2f16" d="M53 79h15v7H53z" />
          <path fill="#c47a2f" d="M55 85h11v12H55z" />
          <path fill="#e4a24d" d="M58 87h5v7h-5z" />
        </g>
      )}
    </svg>
  )
}

function ScrollIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" shapeRendering="crispEdges">
      <path fill="#f4d98a" d="M7 5h18v22H7z" />
      <path fill="#73451e" d="M5 3h22v6H9v14h18v6H5z" />
      <path fill="#a66a2c" d="M10 12h12v3H10zm0 6h9v3h-9z" />
    </svg>
  )
}

function NutIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" shapeRendering="crispEdges">
      <path fill="#4b2b17" d="M11 3h13v5h4v5H7V8h4z" />
      <path fill="#c3762f" d="M7 12h21v7h-4v7h-5v4h-7v-4H8v-7H4v-4h3z" />
      <path fill="#e9a74f" d="M10 15h10v4h-4v7h-4v-5h-2z" />
    </svg>
  )
}

export default function App() {
  const [showData, setShowData] = useState(false)
  const [eating, setEating] = useState(false)
  const [fed, setFed] = useState(() => sessionStorage.getItem("pet-fed") === "true")
  const [message, setMessage] = useState("")
  const dataButtonRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const hasPendingTasks = aluno.tarefasPendentes > 0

  useEffect(() => {
    if (showData) closeButtonRef.current?.focus()
  }, [showData])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && showData) {
        setShowData(false)
        requestAnimationFrame(() => dataButtonRef.current?.focus())
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [showData])

  function closeData() {
    setShowData(false)
    requestAnimationFrame(() => dataButtonRef.current?.focus())
  }

  function feedPet() {
    if (hasPendingTasks) {
      setMessage(
        `Você possui ${aluno.tarefasPendentes} atividades pendentes. Conclua-as primeiro! Consulte “Visualizar dados” para saber mais.`,
      )
      return
    }
    if (fed || eating) {
      setMessage("O esquilo já recebeu sua noz nesta visita!")
      return
    }

    setEating(true)
    setMessage("O esquilo encontrou uma noz e está comendo!")
    window.setTimeout(() => {
      setEating(false)
      setFed(true)
      sessionStorage.setItem("pet-fed", "true")
      setMessage("Nhac, nhac! Obrigado pela noz!")
    }, 2300)
  }

  return (
    <main className="game">
      <div className="forest-scene" aria-hidden="true" />

      <section className="scene" aria-label="Encontro com o esquilo na floresta">
        <div className="tree">
          <div className="tree-hole">
            <PixelSquirrel eating={eating} />
          </div>
        </div>

        <div className="actions">
          <p className="prompt">O que deseja Leen?</p>
          <button
            ref={dataButtonRef}
            className="game-button"
            type="button"
            onClick={() => {
              setShowData(true)
              setMessage("")
            }}
            disabled={eating}
          >
            <span className="button-leaf button-leaf-top" aria-hidden="true" />
            <span className="button-icon"><ScrollIcon /></span>
            <span className="button-copy">
              <strong>Visualizar dados</strong>
              <small>Consultar informações escolares</small>
            </span>
            <span className="button-arrow" aria-hidden="true">›</span>
          </button>
          <button
            className={`game-button ${hasPendingTasks || fed ? "is-locked" : ""}`}
            type="button"
            onClick={feedPet}
            disabled={eating}
            aria-disabled={hasPendingTasks || fed}
          >
            <span className="button-leaf button-leaf-bottom" aria-hidden="true" />
            <span className="button-icon"><NutIcon /></span>
            <span className="button-copy">
              <strong>Alimentar o pet</strong>
              <small>
                {hasPendingTasks
                  ? "Conclua suas atividades primeiro"
                  : fed
                    ? "Pet alimentado nesta visita"
                    : "Oferecer uma noz ao esquilo"}
              </small>
            </span>
            <span className="button-arrow" aria-hidden="true">›</span>
          </button>
          <p className={`message ${message ? "is-visible" : ""}`} role="status" aria-live="polite">
            {message}
          </p>
        </div>

        {eating && <div className="flying-nut"><NutIcon /></div>}
      </section>

      {showData && (
        <section
          className="data-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="data-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeData()
          }}
        >
          <div className="held-board">
            <button
              ref={closeButtonRef}
              className="close-button"
              type="button"
              onClick={closeData}
              aria-label="Fechar informações"
            >
              ×
            </button>
            <div className="hand hand-left" aria-hidden="true"><span /></div>
            <div className="hand hand-right" aria-hidden="true"><span /></div>
            <div className="board-content">
              <span className="board-eyebrow">MEU REGISTRO ESCOLAR</span>
              <h2 id="data-title">Informações de Leen</h2>
              <div className="data-grid">
                <div className="data-item data-wide"><span>Aluno</span><strong>{aluno.nome}</strong></div>
                <div className="data-item"><span>Turma</span><strong>{aluno.turma}</strong></div>
                <div className="data-item"><span>Matrícula</span><strong>{aluno.matricula}</strong></div>
                <div className="data-item data-wide">
                  <span>Presença</span><strong>{aluno.presenca}%</strong>
                  <div className="progress" aria-label={`${aluno.presenca}% de presença`}>
                    <span style={{ width: `${Math.max(0, Math.min(100, aluno.presenca))}%` }} />
                  </div>
                </div>
                <div className="data-item"><span>Tarefas pendentes</span><strong>{aluno.tarefasPendentes}</strong></div>
                <div className="data-item"><span>Não lidas</span><strong>{aluno.notificacoes}</strong></div>
                <div className="data-item data-wide score">
                  <span>Média geral</span>
                  <strong>{aluno.mediaGeral.toLocaleString("pt-BR", { minimumFractionDigits: 1 })}</strong>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
