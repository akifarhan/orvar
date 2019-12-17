const globalScope = {
    token: '',
    isAdmin: false,
    profile: {},
    api: process.env.API_URL,
    fb_id: process.env.FACEBOOK_APP_ID,
    cdn: process.env.CDN_URL,
    reco: process.env.RECO_URL,
    url_store_general: process.env.URL_STORE_GENERAL,
    previousPage: '',
    config: {},
    axios: null, // create in initialiseApp.js
};

export default globalScope;
