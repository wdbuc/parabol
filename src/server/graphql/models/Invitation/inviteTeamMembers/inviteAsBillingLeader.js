import asyncInviteTeam from './asyncInviteTeam';
import removeOrgApprovalAndNotification from 'server/graphql/models/Organization/rejectOrgApproval/removeOrgApprovalAndNotification';

export default async function inviteAsBillingLeader(invitees, orgId, authToken, teamId) {
  const inviteeEmails = invitees.map((i) => i.email);
  // remove queued approvals
  const promises = [
    removeOrgApprovalAndNotification(orgId, inviteeEmails),
    asyncInviteTeam(authToken, teamId, invitees)
  ];
  await Promise.all(promises);
}
