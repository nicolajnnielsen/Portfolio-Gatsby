import React, { useEffect, useRef, useState } from 'react';
import Layout from '../components/layout'
import Seo from '../components/seo';

import contactStyles from './contact.module.scss';

const Contact = () => {
    const firstRender = useRef(true);

    const [btnDisabled, setBtnDisabled] = useState(true);
    const [emailState, setEmailState] = useState({ value: "", error: null, focused: false, valid: null });
    const [nameState, setNameState] = useState({ value: "", error: null, focused: false, valid: null });
    const [msgState, setMsgState] = useState({ value: "", error: null, focused: false, valid: null });
    const [submitState, setSubmitState] = useState({ submitted: false, status: null });

    const setFocusFlag = (e) => {
        const targetInput = e.target.id;
        if (targetInput === "email") {
            setEmailState(prevState => ({ ...prevState, focused: true }));
        } else if (targetInput === "name") {
            setNameState(prevState => ({ ...prevState, focused: true }));
        } else if (targetInput === "message") {
            setMsgState(prevState => ({ ...prevState, focused: true }));
        }
    }

    const handleChange = (e) => {
        e.persist();
        if (e.target.name === "name") {
            setNameState(prevState => ({ ...prevState, value: e.target.value }));
        } else if (e.target.name === "email") {
            setEmailState(prevState => ({ ...prevState, value: e.target.value }));
        } else if (e.target.name === "message") {
            setMsgState(prevState => ({ ...prevState, value: e.target.value }));
        }
    }

    const formValidation = () => {
        let errors;
        if (emailState.value === "") {
            setEmailState(prevState => ({ ...prevState, error: "Please enter an email", valid: false }));
            errors = true;
        } else if (!/\S+@\S+\.\S+/.test(emailState.value)) {
            setEmailState(prevState => ({ ...prevState, error: "Please enter a valid email", valid: false }));
            errors = true;
        } else {
            setEmailState(prevState => ({ ...prevState, error: null, valid: true }));
        }

        if (!/^$|.*\S+.*/.test(nameState.value) || nameState.value === "") {
            setNameState(prevState => ({ ...prevState, error: "Please enter a name", valid: false }));
            errors = true;
        } else {
            setNameState(prevState => ({ ...prevState, error: null, valid: true }));
        }

        if (msgState.value.length < 20) {
            setMsgState(prevState => ({ ...prevState, error: "Please write a message longer than 20 characters", valid: false }));
            errors = true;
        } else {
            setMsgState(prevState => ({ ...prevState, error: null, valid: true }));
        }
        return errors;
    }

    const validationClass = (inputEl) => {
        if (inputEl === 'name') {
            if (nameState.valid === true) {
                return "valid";
            } else if (nameState.valid === false) {
                return "invalid";
            }
        }
        if (inputEl === 'email') {
            if (emailState.valid === true) {
                return "valid";
            } else if (emailState.valid === false) {
                return "invalid";
            }
        }
        if (inputEl === 'message') {
            if (msgState.valid === true) {
                return "valid";
            } else if (msgState.valid === false) {
                return "invalid";
            }
        }
    }

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        setBtnDisabled(formValidation());
        // eslint-disable-next-line 
    }, [nameState.value, emailState.value, msgState.value]);

    const handleSubmit = (e) => {
        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encode({ "form-name": "contact", "email": emailState.value, "name": nameState.value, "message": msgState.value })
        })
            .then(() => submitSuccess())
            .catch(error => setSubmitState({ submitted: true, status: error }));

        e.preventDefault();
    }

    const encode = (data) => {
        return Object.keys(data)
            .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
            .join("&");
    }

    const submitSuccess = () => {
        setSubmitState({ submitted: true, status: 'success' })
        setEmailState({ value: "", error: null, focused: false, valid: null });
        setNameState({ value: "", error: null, focused: false, valid: null });
        setMsgState({ value: "", error: null, focused: false, valid: null });
    }
    return (
        <Layout>
            <Seo title="Contact" />
            <main id="content" tabindex="-1" className={`${contactStyles.container} skeuMorphBg`} >
                <form name="contact" onSubmit={handleSubmit} className={contactStyles.form}>
                    <input type="hidden" name="form-name" value="contact" />
                    <div className={contactStyles.formGroup}>
                        <label htmlFor="name">Name</label>
                        <input id="name" name="name" type="text" placeholder="name"
                            className={nameState.focused ? validationClass('name') : ""}
                            value={nameState.value}
                            onBlur={setFocusFlag}
                            onChange={handleChange}
                        />
                        <span className="form-msg">{nameState.focused && nameState.error ? nameState.error : String.fromCharCode(160)}</span>
                    </div>
                    <div className={contactStyles.formGroup}>
                        <label htmlFor="email">Email</label>
                        <input id="email" name="email" type="email" placeholder="email"
                            className={emailState.focused ? validationClass('email') : ""}
                            value={emailState.value}
                            onBlur={setFocusFlag}
                            onChange={handleChange}
                        />
                        <span className="form-msg">{emailState.focused && emailState.error ? emailState.error : String.fromCharCode(160)}</span>
                    </div>
                    <div className={contactStyles.formGroup}>
                        <label htmlFor="message">Message</label>
                        <textarea id="message" name="message" placeholder="message" rows="5" cols="15"
                            className={msgState.focused ? validationClass('message') : ""}
                            value={msgState.value}
                            onBlur={setFocusFlag}
                            onChange={handleChange}>
                            ></textarea>
                        <span className="form-msg">{msgState.focused && msgState.error ? msgState.error : String.fromCharCode(160)}</span>
                    </div>
                    <button className="btn form__submit" disabled={btnDisabled} type="submit">Send</button>
                    {/* {submitState.submitted && <SubmitMessage status={submitState.status} />} */}
                </form>
            </main>
        </Layout>
    )
}

export default Contact
