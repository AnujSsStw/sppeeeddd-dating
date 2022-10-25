import { RtcRole, RtcTokenBuilder } from "agora-access-token";

export const tokenGen = (matchId: string, userId: string) => {
  // Rtc Examples
  const appID = process.env.AGORA_APP_ID!;
  const appCertificate = process.env.AGORA_APP_CERTIFICATE!;
  const channelName = matchId;
  const account = userId;
  const role = RtcRole.PUBLISHER;

  const expirationTimeInSeconds = 3600;

  const currentTimestamp = Math.floor(Date.now() / 1000);

  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  // Build token with user account

  const tokenB = RtcTokenBuilder.buildTokenWithAccount(
    appID,
    appCertificate,
    channelName,
    account,
    role,
    privilegeExpiredTs
  );
  console.log("Token With UserAccount: " + tokenB);
  return tokenB;
};
