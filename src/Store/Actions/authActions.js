import * as emailjs from "emailjs-com";

export const signIn = (credentials) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase
            .auth()
            .signInWithEmailAndPassword(credentials.email, credentials.password)
            .then(() => {
                dispatch({ type: "LOGIN_SUCCESS" });
            })
            .catch((err) => {
                dispatch({ type: "LOGIN_ERROR", err });
            });
    };
};

export const signOut = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase
            .auth()
            .signOut()
            .then(() => {
                dispatch({ type: "SIGNOUT_SUCCESS" });
            });
    };
};
const sendEmail = (member) => {
    let templateParams = {
        from_name: "noReply@pensaumat",
        to_name: member.name,
        to_email: member.email,
        reply_to: "pensaumat@gmail.com",
        // subject: "subject",
        // message_html: "message",
    };
    emailjs
        .send(
            "gmail",
            "template_qYHocBcQ",
            templateParams,
            "user_qBb9Yd4R48fB4y4xPD7t1"
        )
        .then(
            (result) => {
                console.log(result.text);
            },
            (error) => {
                console.log(error.text);
            }
        );
};

export const register = (newUser) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase
            .auth()
            .createUserWithEmailAndPassword(newUser.email, newUser.password)
            .then((memb) => {
                return firestore.collection("member").doc(memb.user.uid).set({
                    name: newUser.name,
                    member: newUser.member,
                    gender: newUser.gender,
                    status: newUser.status,
                    phone: newUser.momo,
                    email: newUser.email,
                    pensa: newUser.pensa,
                    institution: newUser.institution,
                    expectation: newUser.expectation,
                    dateRegistered: new Date.now(),
                });
            })
            .then(() => sendEmail(newUser))
            .then(() => {
                dispatch({ type: "SIGNUP_SUCCESS" });
            })
            .catch((err) => {
                dispatch({ type: "SIGNUP_ERROR", err });
            });
    };
};

// const credentials = {
//     userSecret: "82fc4d50e0314a4cbd57ae64ce1b70f5",
//     userId: "5ededbd1-cc21-4ada-ac11-0c0e481800ad",
//     primaryKey: "6a31f6cd066c47eaa3414ad72a0e5526",
// };

// export const signUpEC = (newUser) => {
//     return (dispatch, getState, { getFirebase, getFirestore }) => {
//         const firebase = getFirebase();
//         const firestore = getFirestore();

//         firebase
//             .auth()
//             .createUserWithEmailAndPassword(newUser.email, newUser.password)

//         .then((resp) => {
//                 return firestore.collection("ec").doc(resp.user.uid).set({
//                     firstName: newUser.firstname,
//                     lastName: newUser.lastname,
//                     status: newUser.status,
//                     image: newUser.url,
//                 });
//             })
//             .then(() => {
//                 dispatch({ type: "EC_SIGNUP_SUCCESS" });
//             })
//             .catch((err) => {
//                 dispatch({ type: "EC_SIGNUP_ERROR", err });
//             });
//     };
// };