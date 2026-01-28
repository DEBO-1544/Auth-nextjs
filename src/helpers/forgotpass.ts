import sendgrid from "@sendgrid/mail"
sendgrid.setApiKey(process.env.SENDGRID_API_KEY!)
async function Forggotpassword(email:string, userid:string,name:string){

    const Response=await sendgrid.send({
        from:process.env.SENDGRID_EMAIL!,
        to:email,
        subject:"Forgot Password",
        html:`
          <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Reset Your Password</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f6fb;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #1f2937;
    }
    .container {
      max-width: 520px;
      margin: 40px auto;
      background: #ffffff;
      border-radius: 14px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
      overflow: hidden;
    }
    .header {
      padding: 28px 32px;
      background: linear-gradient(135deg, #2563eb, #1e40af);
      color: #ffffff;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 22px;
      font-weight: 600;
    }
    .content {
      padding: 32px;
    }
    .content p {
      margin: 0 0 16px;
      font-size: 15px;
      line-height: 1.6;
      color: #374151;
    }
    .username {
      font-weight: 600;
      color: #111827;
    }
    .button-wrapper {
      text-align: center;
      margin: 32px 0;
    }
    .btn {
      display: inline-block;
      padding: 14px 28px;
      background: linear-gradient(135deg, #2563eb, #1e40af);
      color: #ffffff;
      text-decoration: none;
      font-size: 15px;
      font-weight: 600;
      border-radius: 10px;
      box-shadow: 0 10px 20px rgba(37, 99, 235, 0.35);
    }
    .btn:hover {
      opacity: 0.95;
    }
    .link-box {
      margin-top: 24px;
      padding: 16px;
      background: #f9fafb;
      border-radius: 10px;
      font-size: 13px;
      color: #6b7280;
      word-break: break-all;
    }
    .footer {
      padding: 20px 32px;
      background: #f9fafb;
      font-size: 12px;
      color: #6b7280;
      text-align: center;
    }
    a{
      
      text-decoration: none;
    }
  </style>
</head>
<body>

  <div class="container">
    <div class="header">
      <h1>Password Reset Request</h1>
    </div>

    <div class="content">
      <p>Hi <span class="username">${name}</span>,</p>

      <p>
        We received a request to reset your password. Click the button below
        to securely create a new password for your account.
      </p>

      <div class="button-wrapper">
        <a href="http://localhost:3000/Resetpassword/user?id=${userid}" class="btn"> Reset Password</a>
      </div>

      <p>
        This link will expire for security reasons. If you didn’t request a
        password reset, you can safely ignore this email.
      </p>

      <div class="link-box">
        If the button doesn’t work, Resend It<br />
        <a href="http://localhost:3000/login/forgot-password">Resend Page</a>
      </div>
    </div>

    <div class="footer">
      © 2026 Your Company Name. All rights reserved.<br />
      This is an automated message, please do not reply.
    </div>
  </div>

</body>
</html>

        `
       
    })
    if(!Response){
        throw new Error("Failed to send email")
    }
    return Response
    
}
export {Forggotpassword}