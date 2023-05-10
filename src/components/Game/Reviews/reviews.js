import { Container } from "semantic-ui-react";
import styles from "./Reviews.module.scss";
import { useState, useEffect } from "react";
import { map } from "lodash";
import { Review as ReviewCtrl} from "@/api";


const reviewCtrl = new ReviewCtrl();

export function Reviews(props) {
  const { gameId } = props;
  const [reviews, setReviews] = useState(null);
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
      {map(reviews, (rev)=>(<>
        <div className={styles.summary}>
        <p>{rev.attributes.review}</p>
      </div>

      <div className={styles.more}>
        <ul>
          <li>
            <span>rating:</span> {rev.attributes.rating}
          </li>
        </ul>
      </div>
      </>))}
      
      
    </Container>
  );
}
