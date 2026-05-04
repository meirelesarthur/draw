import MagicRings from './MagicRings'
import styles from './LoadingScreen.module.css'

interface Props {
  exiting?: boolean
}

export default function LoadingScreen({ exiting = false }: Props) {
  return (
    <div className={`${styles.overlay} ${exiting ? styles.exiting : ''}`}>
      <div className={styles.rings}>
        <MagicRings
          color="#c85c0e"
          colorTwo="#f0a060"
          ringCount={6}
          speed={1.1}
          attenuation={9}
          lineThickness={2.5}
          baseRadius={0.28}
          radiusStep={0.09}
          scaleRate={0.12}
          opacity={1}
          noiseAmount={0.06}
          ringGap={1.6}
          fadeIn={0.6}
          fadeOut={0.55}
          followMouse={false}
          parallax={0}
        />
        <div className={styles.label}>
          <span className={styles.labelText}>DRAW THE LAW</span>
        </div>
      </div>
    </div>
  )
}
