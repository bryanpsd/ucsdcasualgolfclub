import { useId } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "~components/Button/Button";
import { useCaptcha } from "~utils/useCaptcha";
import * as styles from "./ContactUsForm.css";

type ContactUsFormData = {
	name: string;
	email: string;
	message?: string;
	"bot-field"?: string;
};

export const ContactUsForm = () => {
	const captcha = useCaptcha();
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ContactUsFormData>();
	const nameId = useId();
	const emailId = useId();
	const messageId = useId();

	const onSubmit: SubmitHandler<ContactUsFormData> = async (data) => {
		try {
			const captchaToken = await captcha.execute();

			const response = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ...data, captchaToken }),
			});

			if (response.ok) {
				toast.success("Form submitted successfully!");
				reset();
			} else {
				const { error } = await response.json();
				toast.error(error || "There was a problem submitting the form.");
			}
		} catch (error) {
			toast.error("There was a problem submitting the form. Please try again.");
			console.error("Error sending form:", error);
		}
	};

	return (
		<form
			name="contact"
			className={styles.formWrapper}
			onSubmit={handleSubmit(onSubmit)}
			data-netlify="true"
			data-netlify-honeypot="bot-field"
			noValidate
			method="POST"
		>
			<input type="hidden" name="form-name" value="contact" />
			<input type="hidden" {...register("bot-field")} />

			<div className={styles.formField}>
				<label htmlFor={nameId}>Name:</label>
				<input
					className={styles.input}
					id={nameId}
					type="text"
					{...register("name", { required: true })}
				/>
				{errors.name && <span className={styles.error}>Enter a Name</span>}
			</div>

			<div className={styles.formField}>
				<label htmlFor={emailId}>Email:</label>
				<input
					className={styles.input}
					id={emailId}
					type="email"
					{...register("email", {
						required: "Enter an Email address",
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
							message: "Enter a valid email address.",
						},
					})}
				/>
				{errors.email && <span className={styles.error}>{errors.email.message}</span>}
			</div>

			<div className={styles.formField}>
				<label htmlFor={messageId}>Message:</label>
				<textarea
					className={styles.textarea}
					id={messageId}
					{...register("message", { required: "Enter a message." })}
				/>
				{errors.message && <span className={styles.error}>{errors.message.message}</span>}
			</div>

			<div>
				<Button type="submit" color="primary" size="small" variant="contained">
					Submit
				</Button>
			</div>
		</form>
	);
};
