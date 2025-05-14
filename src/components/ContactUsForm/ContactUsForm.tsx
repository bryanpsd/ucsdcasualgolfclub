import { useForm } from 'react-hook-form'
import { useCaptcha } from '~utils/useCaptcha'

import * as styles from './ContactUsForm.css'

type ContactUsFormData = {
  firstName: string
  lastName: string
  email: string
  message?: string
  captchaToken?: string
}

export const ContactUsForm = () => {
  const captcha = useCaptcha()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactUsFormData>()

  const onSubmit = async (data: ContactUsFormData) => {
    try {
      const captchaToken = await captcha.execute()
      data.captchaToken = captchaToken

      // Add the destination email address to the submission payload
      const submission = {
        ...data,
        to: 'test@gmail.com',
      }

      console.log('Submitting to:', submission.to)
      console.log(submission)
      // Here you would send `submission` to your backend/email service
    } catch (error) {
      console.error('Captcha execution failed:', error)
      return
    }
  }

  return (
    <form
      name="contact"
      className={styles.formWrapper}
      onSubmit={handleSubmit(onSubmit)}
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      noValidate
    >
      <input type="hidden" name="contact" value="contact" />
      <input type="text" {...register('firstName', { required: true })} placeholder="First Name" />
      {errors.firstName && <span>This field is required</span>}

      <input type="text" {...register('lastName', { required: true })} placeholder="Last Name" />
      {errors.lastName && <span>This field is required</span>}

      <input type="email" {...register('email', { required: true })} placeholder="Email Address" />
      {errors.email && <span>Email is required</span>}

      <textarea {...register('message', { required: true })} placeholder="Your message" />
      {errors.message && <span>Message is required</span>}

      <input type="submit" />
    </form>
  )
}
