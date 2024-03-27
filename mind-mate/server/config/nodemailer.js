


// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     host: 'smtp.gmail.com',
//     port : 587,
//     secure: false,
//     auth: {
//         user: 'siyunkr@gmail.com',
//         pass: 'zxrstlgutfmcwzdv'
//     }
// })

// async function sendMail({to, from, html, subject}){

//     try{
//         const info = await transporter.sendMail({ 
//             from,
//             to,
//             subject,
//             html
//         })
    
//         console.log(info);
//     }catch(error){
//         console.log('error :', error);
//     }
    
// }

// sendMail({
// 	from: 'siyunkr@gmail.com',
//     to: 'perfect0301@naver.com',
//     subject: '테스트',
//     html: '<p>dfdsf</p>'
// })

