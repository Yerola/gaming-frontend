/* import { useState } from 'react';
import { Form,TextArea,Radio } from "semantic-ui-react";
import { useFormik } from "formik";
import { initialValues,validationSchema } from './ReviewForm.Form';
import { Review as ReviewCtrl} from "@/api";

import { Icon } from "semantic-ui-react";

import { Confirm } from '@/components/Shared';

const reviewCtrl = new ReviewCtrl();


export function ReviewForm(props) {
  
 const {userId,gameId,onClose}=props;


  const formik=useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit:async(formValue)=>{
      const {review,rating}=formValue;

      try {
       const response=await reviewCtrl.add(userId,gameId,review,rating)
       console.log(userId,gameId,review,rating)
      } catch (error) {
        
      }
      onClose();
    }
})

  return (
    <div>
        <Form onSubmit={formik.handleSubmit}>
        <Form.Input
          name="review"
          control={TextArea}
          placeholder="Reseña"
          label="Reseña" 
          value={formik.values.review}
          onChange={formik.handleChange}
          error={formik.errors.review}
        />
        <Form.Input
        name="rating"
        type='number'
        value={formik.values.rating}
        onChange={formik.handleChange}
        error={formik.errors.rating}
        />

       <Form.Button primary 
        type="submit"
        fluid
        loading={formik.isSubmitting}
        >
        Enviar
      </Form.Button>
      <Icon
        name="star"
      ></Icon>
        </Form>
    </div>
  )
} */
import { useState } from 'react';
import { Form, TextArea, Radio, Icon } from "semantic-ui-react";
import { useFormik } from "formik";
import { initialValues, validationSchema } from './ReviewForm.Form';
import { Review as ReviewCtrl } from "@/api";
import { Confirm } from '@/components/Shared';
import styles from './reviewForm.module.scss';

const reviewCtrl = new ReviewCtrl();

export function ReviewForm(props) {

  const { userId, gameId, onClose } = props;

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      const { review, rating } = formValue;

      try {
        const response = await reviewCtrl.add(userId, gameId, review, rating);
        console.log(userId, gameId, review, rating);
      } catch (error) {

      }
      onClose();
    }
  });
//
  const [selectedRating, setSelectedRating] = useState(null);
  const ratingOptions = [1, 2, 3, 4, 5];
  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
    formik.setFieldValue("rating", rating.toString()); // Actualizar el rating en el formik
  };
//
  return (
    <div>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Input
          name="review"
          control={TextArea}
          placeholder="Reseña"
          label="Reseña"
          value={formik.values.review}
          onChange={formik.handleChange}
          error={formik.errors.review}
        />
        <label>Rating</label>
        <Form.Group inline
        error={formik.errors.rating}
        className={styles.content_star}
        >
          {ratingOptions.map((option) => (
            <Form.Field key={option} error={formik.errors.rating}>
              <Radio
                name="rating"
                label={<Icon name="star" size="huge" className={selectedRating >= option ? styles.star_on : styles.star_off} />}
                value={option.toString()}
                checked={formik.values.rating === option.toString()}
                onChange={() => handleRatingChange(option)}
                className={styles.content_stars}
              />
            </Form.Field>
          ))}
        </Form.Group>
        {formik.errors.rating && <div style={{ color: "red" }}>{formik.errors.rating}</div>}
        <Form.Button
          primary
          type="submit"
          fluid
          loading={formik.isSubmitting}
        >
          Enviar
        </Form.Button>
      </Form>
    </div>
  )
}