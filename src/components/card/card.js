import React from "react";
import styles from "./card.module.css";
export const Card = ({ image }) => {
  return (
    <div className={styles.card}>
      <img className={styles.image} src={image}></img>
    </div>
  );
};
