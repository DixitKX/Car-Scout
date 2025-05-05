const mailer=require("nodemailer")

const sendingMail=async( to,subject,text)=>{

    const transporter=mailer.createTransport({
        service:'gmail',
        auth:{
            user:"dixitkumbhani588@gmail.com",
            pass:"juni lyxj zygx wfew"
            // user:"bikeScout111@gmail.com",
            // pass:"nlqz xefu ovgi fdvv"
        }
    })


const mailOption={
    from:"bikeScout111@gmail.com",
    to:to,
    subject:subject,
    html:text
}

const mailResponse=await transporter.sendMail(mailOption)
console.log(mailResponse);
return mailResponse


}
module.exports={
    sendingMail
}
