import React, { useEffect, useRef, useState } from 'react';
import Seo from '../components/seo';
import contactStyles from './contact.module.scss';

const initialValues = {
    email: { value: "", error: null, focused: false, valid: null },
    name: { value: "", error: null, focused: false, valid: null },
    message: { value: "", error: null, focused: false, valid: null },
}

const Contact = ({transitionStatus}) => {
    const firstRender = useRef(true);

    const [btnDisabled, setBtnDisabled] = useState(true);
    const [submitState, setSubmitState] = useState({ submitted: false, status: null });
    const [inputValues, setInputValues] = useState(initialValues);

    useEffect(() => {
        const body = document.body;
        if (transitionStatus === 'entering') {
            body.classList.add('noScroll');
            setTimeout(() => {
                body.classList.remove('noScroll');
            }, 700);
        }
    }, [transitionStatus]);

    const setFocusFlag = (e) => {
        const targetInput = e.target.name;
        setInputValues(prevState => (
            {
                ...prevState,
                [targetInput]: { ...prevState[targetInput], focused: true }
            }
        ));
    }

    const handleChange = (e) => {
        e.persist();
        const name = e.target.name;
        const value = e.target.value;
        setInputValues(prevState => (
            {
                ...prevState,
                [name]: { ...prevState[name], value }
            }
        ));
    }

    const formValidation = () => {
        let errors;
        if (inputValues.email.value === "") {
            setInputValues(prevState => ({ ...prevState, email: { ...prevState.email, error: "Please enter an email", valid: false } }));
            errors = true;
        } else if (!/\S+@\S+\.\S+/.test(inputValues.email.value)) {
            setInputValues(prevState => ({...prevState, email: { ...prevState.email, error: "Please enter a valid email", valid: false }}));
            errors = true;
        } else {
            setInputValues(prevState => ({...prevState, email: { ...prevState.email, error: null, valid: true }}));
        }

        if (!/^$|.*\S+.*/.test(inputValues.name.value) || inputValues.name.value === "") {
            setInputValues(prevState => ({ ...prevState, name: { ...prevState.name, error: "Please enter a name", valid: false }}));
            errors = true;
        } else {
            setInputValues(prevState => ({...prevState, name: { ...prevState.name, error: null, valid: true }}));
        }

        if (inputValues.message.value.length < 20) {
            setInputValues(prevState => ({...prevState, message: { ...prevState.message, error: "Please write a message longer than 20 characters", valid: false }}));
            errors = true;
        } else {
            setInputValues(prevState => ({...prevState, message: { ...prevState.message, error: null, valid: true }}));
        }
        return errors;
    }

    const validationClass = (inputEl) => {
        if (inputValues[inputEl].valid === true) {
            return "valid";
        } else if (inputValues[inputEl].valid === false) {
            return "invalid";
        }
    }

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        setBtnDisabled(formValidation());
        // eslint-disable-next-line 
    }, [inputValues.email.value, inputValues.name.value, inputValues.message.value]);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encode({ "form-name": "contact", "email": inputValues.email.value, "name": inputValues.name.value, "message": inputValues.message.value })
        })
            .then((res) => {
                if (!res.ok) {
                    setSubmitState({ submitted: true, status: res.statusText })
                    console.log("Post failed with status:", res.status, res.statusText);
                } else submitSuccess();
            })
            .catch(error => {
                setSubmitState({ submitted: true, status: error });
                console.log(error);
            })
    }

    const encode = (data) => {
        return Object.keys(data)
            .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
            .join("&");
    }

    const submitSuccess = () => {
        setSubmitState({ submitted: true, status: 'success' });
        setInputValues(initialValues);
    }

    return (
        <>
            <Seo title="Contact" />
            <main id="content" tabIndex="-1" className={`${contactStyles.container} skeuMorphBg`} >
                <form name="contact" method="post" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={handleSubmit} className={contactStyles.form}>
                    <input type="hidden" name="form-name" value="contact" />
                    <div className={contactStyles.formGroup}>
                        <label htmlFor="name">Name</label>
                        <input id="name" name="name" type="text" placeholder="name"
                            className={inputValues.name.focused ? validationClass('name') : ""}
                            value={inputValues.name.value}
                            onBlur={setFocusFlag}
                            onChange={handleChange}
                        />
                        <span className="form-msg">{inputValues.name.focused && inputValues.name.error ? inputValues.name.error : String.fromCharCode(160)}</span>
                    </div>
                    <div className={contactStyles.formGroup}>
                        <label htmlFor="email">Email</label>
                        <input id="email" name="email" type="email" placeholder="email"
                            className={inputValues.email.focused ? validationClass('email') : ""}
                            value={inputValues.email.value}
                            onBlur={setFocusFlag}
                            onChange={handleChange}
                        />
                        <span className="form-msg">{inputValues.email.focused && inputValues.email.error ? inputValues.email.error : String.fromCharCode(160)}</span>
                    </div>
                    <div className={contactStyles.formGroup}>
                        <label htmlFor="message">Message</label>
                        <textarea id="message" name="message" placeholder="message" rows="5" cols="15"
                            className={inputValues.message.focused ? validationClass('message') : ""}
                            value={inputValues.message.value}
                            onBlur={setFocusFlag}
                            onChange={handleChange}>
                        </textarea>
                        <span className="form-msg">{inputValues.message.focused && inputValues.message.error ? inputValues.message.error : String.fromCharCode(160)}</span>
                    </div>
                    <button className="btn form__submit" disabled={btnDisabled} type="submit">Send</button>
                    {submitState.submitted && <SubmitMessage status={submitState.status} />}
                </form>
            </main>
        </>
    )
}

const SubmitMessage = ({ status }) => (
    <p className={contactStyles.submitMsg}>
        {status === 'success' ?
            <span className={contactStyles.submitSuccess}>Message succesfully sent. I will get back to you as soon as possible.</span> :
            <span className={contactStyles.submitFail}>Something went wrong trying to send the message, please try again. If the issue persists, please try again at a later point.</span>}
    </p>
)

export default Contact
