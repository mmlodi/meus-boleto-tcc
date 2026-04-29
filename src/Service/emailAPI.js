import emailjs from '@emailjs/browser';
const PUBLIC_KEY_EMAIL = import.meta.env.VITE_EMAILJ_PUBLIC_KEY; // Replace with your actual API URL


export const sendWellcomeMail = async (userInfo) => {
  try {
    emailjs
        .send(
            'service_meusboleto_email'
            , 'template_mb_wellcome'
            , userInfo
            ,PUBLIC_KEY_EMAIL
        )
        .then(
            () => {
                console.log('SUCCESS!');
            },
            (error) => {
                console.log('FAILED...', error.text);
            }
        ,);
    
  } catch (error) {
    console.error('emailAPI request error:', error);
    throw error;
  }
};


export const sendResetPasswordMail = async (userInfo) => {
    try {
      emailjs
        .sendForm('service_meusboleto_email', 'template_renew_password', userInfo, {
            publicKey: PUBLIC_KEY_EMAIL,
        })
        .then(
            () => {
                console.log('SUCCESS!');
            },
            (error) => {
                console.log('FAILED...', error.text);
            }
          ,);
      
    } catch (error) {
      console.error('emailAPI request error:', error);
      throw error;
    }
  };
  


