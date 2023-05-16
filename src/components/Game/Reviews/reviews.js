import { Container, Icon,Button } from "semantic-ui-react";
import styles from "./Reviews.module.scss";
import { useState, useEffect } from "react";
import { map } from "lodash";
import { Review as ReviewCtrl } from "@/api";
import { BasicModal, Confirm } from "@/components/Shared";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";
import {signOut } from "next-auth/react";
import "semantic-ui-css/semantic.min.css";
const reviewCtrl = new ReviewCtrl();

export function Reviews(props) {
  const { gameId } = props;
  const [reviews, setReviews] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const openCloseConfirm = () =>setShowConfirm((prevState) => !prevState );
  const { user, logout } = useAuth();
  const router = useRouter();
  const onDelete = async (id) => {
  await reviewCtrl.delete(id)
  location.reload();
  }
  
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
            <div className={styles.actions}>
          {  user&&user.role?<Button primary icon onClick={openCloseConfirm}>
            <Icon name="delete" />
          </Button>:null}
            </div>
            <Confirm
        open={showConfirm}
        onCancel={openCloseConfirm}
        onConfirm={()=>onDelete(rev.id)}
        content="¿Estas seguro de que quieres eliminar la reseña?"
      />
          </div>
        </>
      ))}
    </Container>
  );
}
