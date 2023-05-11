import { Container, Icon } from "semantic-ui-react";
import styles from "./Reviews.module.scss";
import { useState, useEffect } from "react";
import { map } from "lodash";
import { Review as ReviewCtrl } from "@/api";

import "semantic-ui-css/semantic.min.css";

const reviewCtrl = new ReviewCtrl();

export function Reviews(props) {
  const { gameId } = props;
  const [reviews, setReviews] = useState(null);
  console.log(reviews);
  useEffect(() => {
    (async () => {
      try {
        const response = await reviewCtrl.getAll(gameId);
        setReviews(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (!reviews) return null;

  return (
    <Container className={styles.info}>
      {map(reviews, (rev) => (
        <>
          <div className={styles.content}>
            <p>{rev.attributes.review}</p>
            <div className={styles.content_start}>
              {Array.from({ length: 5 }, (_, index) => (
                <Icon
                  key={index}
                  name="star"
                  className={
                    index < rev.attributes.rating
                      ? styles.star_on
                      : styles.star_off
                  }
                ></Icon>
              ))}
            </div>

            <div style={{diplay:"flex",flexDirection:"column"}}>
            <span>{rev.attributes.publishedAt.slice(0, 10)} </span>
            <p>{rev.attributes.user.data.attributes.username} </p>
            </div>

          </div>
        </>
      ))}
    </Container>
  );
}
