const globalScope = {
    token: '',
    isAdmin: false,
    profile: {},
    api: process.env.API_URL,
    fb_id: process.env.FACEBOOK_APP_ID,
    cdn: process.env.CDN_URL,
    previousPage: '',
    config: {},
    axios: null, // create in initialiseApp.js
};

export default globalScope;
