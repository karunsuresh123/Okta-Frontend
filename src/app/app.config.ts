export default {
  oidc: {
    clientId: '0oa3wd2aojKRkaCMG5d7',
    issuer: 'https://dev-74629593.okta.com/oauth2/default',
    redirectUri: 'http://localhost:8080/login/callback',
    scopes: ['openid', 'profile', 'email'],
  },
/*   widget: {
    useInteractionCodeFlow: `${USE_INTERACTION_CODE}`,
  }, */
   resourceServer: {
    messagesUrl: 'http://localhost:8088/api/messages',
  }, 
};
