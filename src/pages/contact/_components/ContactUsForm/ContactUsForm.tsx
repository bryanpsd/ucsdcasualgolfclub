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
		} catch {
			toast.error("There was a problem submitting the form. Please try again.");
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
					autoComplete="name"
					aria-required="true"
					aria-invalid={!!errors.name}
					aria-describedby={errors.name ? `${nameId}-error` : undefined}
					{...register("name", { required: "Enter a name." })}
				/>
				{errors.name && (
					<span id={`${nameId}-error`} className={styles.error} role="alert">
						{errors.name.message}
					</span>
				)}
			</div>

			<div className={styles.formField}>
				<label htmlFor={emailId}>Email:</label>
				<input
					className={styles.input}
					id={emailId}
					type="email"
					autoComplete="email"
					aria-required="true"
					aria-invalid={!!errors.email}
					aria-describedby={errors.email ? `${emailId}-error` : undefined}
					{...register("email", {
						required: "Enter an Email address",
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
							message: "Enter a valid email address.",
						},
					})}
				/>
				{errors.email && (
					<span id={`${emailId}-error`} className={styles.error} role="alert">
						{errors.email.message}
					</span>
				)}
			</div>

			<div className={styles.formField}>
				<label htmlFor={messageId}>Message:</label>
				<textarea
					className={styles.textarea}
					id={messageId}
					aria-required="true"
					aria-invalid={!!errors.message}
					aria-describedby={errors.message ? `${messageId}-error` : undefined}
					{...register("message", { required: "Enter a message." })}
				/>
				{errors.message && (
					<span id={`${messageId}-error`} className={styles.error} role="alert">
						{errors.message.message}
					</span>
				)}
			</div>

			<div>
				<Button
					type="submit"
					color="primary"
					size="small"
					variant="contained"
					track={true}
					trackLabel="Contact Form Submit"
					trackCategory="contact_form"
					trackPriority="critical"
				>
					Submit
				</Button>
			</div>
		</form>
	);
};
