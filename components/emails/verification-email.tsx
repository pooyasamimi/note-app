export default function VerificationEmail({ userName, verificationUrl }: { userName: string; verificationUrl: string }) {
  return (
    <div>
      <p>Hi {userName || "there"},</p>
      <p>Thanks for signing up for <strong>Note App</strong> 🎉</p>
      <p>Please verify your email address by clicking the link below:</p>
      <p>
        <a href={verificationUrl} target="_blank" rel="noreferrer">
          Verify Email
        </a>
      </p>
      <p>If you did not create this account, you can safely ignore this email.</p>
      <p>— The Note App Team</p>
    </div>
  );
}
