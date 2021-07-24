import styles from "./title.module.css";

const Title = ({ title }) => {
    return <h1 className={styles.title__main}>{title}</h1>;
};

export default Title;
