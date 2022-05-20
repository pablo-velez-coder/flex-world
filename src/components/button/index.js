import styles from './styles.module.scss'

const Button = ({text,children,...rest}) => {
    return (
        <button
        {...rest}
        className={styles.button}>
            {children}
        </button>
    )
}

export default Button
