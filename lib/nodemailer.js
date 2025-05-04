// This is a mock implementation for the frontend
// In a real application, this would be implemented in the backend

export const sendEmail = async ({ to, subject, html }) => {
  // In a real application, this would be an API call to your backend
  console.log(`Sending email to ${to}`)
  console.log(`Subject: ${subject}`)
  console.log(`Content: ${html}`)

  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true })
    }, 1000)
  })
}

export const emailTemplates = {
  approvalNotification: (employeeName, loginUrl, tempPassword) => ({
    subject: "Your Onboarding Application Has Been Approved",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <div style="background: linear-gradient(135deg, #8F87F1, #C68EFD); padding: 20px; border-radius: 5px 5px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0;">Application Approved</h1>
        </div>
        <div style="padding: 20px;">
          <p>Dear ${employeeName},</p>
          <p>We are pleased to inform you that your onboarding application has been approved.</p>
          <p>You can now access your employee portal using the following credentials:</p>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <p style="margin: 5px 0;"><strong>Temporary Password:</strong> ${tempPassword}</p>
          </div>
          <p>Please click the button below to login to your account. You will be prompted to change your password on first login.</p>
          <div style="text-align: center; margin: 25px 0;">
            <a href="${loginUrl}" style="background-color: #8F87F1; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Login to Your Account</a>
          </div>
          <p>If you have any questions, please contact HR.</p>
          <p>Best regards,<br>HR Team</p>
        </div>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 0 0 5px 5px; text-align: center; font-size: 12px; color: #666;">
          <p>This is an automated email. Please do not reply to this message.</p>
        </div>
      </div>
    `,
  }),

  rejectionNotification: (employeeName, reason) => ({
    subject: "Update on Your Onboarding Application",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <div style="background: linear-gradient(135deg, #E9A5F1, #FED2E2); padding: 20px; border-radius: 5px 5px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0;">Application Status Update</h1>
        </div>
        <div style="padding: 20px;">
          <p>Dear ${employeeName},</p>
          <p>Thank you for your interest in joining our organization.</p>
          <p>After careful review of your application, we regret to inform you that we are unable to proceed with your onboarding at this time.</p>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <p style="margin: 5px 0;"><strong>Reason:</strong> ${reason}</p>
          </div>
          <p>If you have any questions or would like to discuss this further, please feel free to contact our HR department.</p>
          <p>We wish you the best in your future endeavors.</p>
          <p>Best regards,<br>HR Team</p>
        </div>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 0 0 5px 5px; text-align: center; font-size: 12px; color: #666;">
          <p>This is an automated email. Please do not reply to this message.</p>
        </div>
      </div>
    `,
  }),

  passwordReset: (employeeName, resetUrl, otp) => ({
    subject: "Password Reset Request",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <div style="background: linear-gradient(135deg, #8F87F1, #C68EFD); padding: 20px; border-radius: 5px 5px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0;">Password Reset</h1>
        </div>
        <div style="padding: 20px;">
          <p>Dear ${employeeName},</p>
          <p>We received a request to reset your password. Please use the verification code below to complete the process:</p>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0; text-align: center;">
            <p style="font-size: 24px; letter-spacing: 5px; font-weight: bold; margin: 5px 0;">${otp}</p>
          </div>
          <p>Alternatively, you can click the button below to reset your password:</p>
          <div style="text-align: center; margin: 25px 0;">
            <a href="${resetUrl}" style="background-color: #8F87F1; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
          </div>
          <p>If you did not request a password reset, please ignore this email or contact support if you have concerns.</p>
          <p>Best regards,<br>HR Team</p>
        </div>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 0 0 5px 5px; text-align: center; font-size: 12px; color: #666;">
          <p>This is an automated email. Please do not reply to this message.</p>
          <p>This link will expire in 10 minutes.</p>
        </div>
      </div>
    `,
  }),

  applicationSubmitted: (employeeName) => ({
    subject: "Onboarding Application Received",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <div style="background: linear-gradient(135deg, #8F87F1, #C68EFD); padding: 20px; border-radius: 5px 5px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0;">Application Received</h1>
        </div>
        <div style="padding: 20px;">
          <p>Dear ${employeeName},</p>
          <p>Thank you for submitting your onboarding application. We have received your information and documents.</p>
          <p>Our HR team will review your application and get back to you soon. The review process typically takes 2-3 business days.</p>
          <p>If you have any questions in the meantime, please contact our HR department.</p>
          <p>Best regards,<br>HR Team</p>
        </div>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 0 0 5px 5px; text-align: center; font-size: 12px; color: #666;">
          <p>This is an automated email. Please do not reply to this message.</p>
        </div>
      </div>
    `,
  }),
}
