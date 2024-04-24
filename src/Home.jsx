import styles from "./home.module.css"
import "./globals.css"
import App from "./App"

const Home = () => {
  return (
    <div className={styles.main}>
      <div className={styles.description}>
        <div>
          <h3>Desenvolvido por Lucas Cotta</h3>
        </div>
      </div>

      <div className={styles.center}>
        <div className={styles.titulo}>Horas Complementares</div>
      </div>
      <div className={styles.listaDeHoras}>
        <App/>
      </div>
    </div>
  )
}
export default Home