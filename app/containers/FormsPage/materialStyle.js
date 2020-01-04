const styles = {
    header: {
        zIndex: 2000,
    },
    headerBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    content: {
        marginTop: '6rem',
        marginBottom: '6rem',
    },
    footer: {
        top: 'auto',
        bottom: 0,
        zIndex: 2000,
    },
    footerBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    snackbar: {
        bottom: '10rem',
    },
    nextButton: {
        width: '10rem',
        height: '3.5rem',
    },
    loader: {
        background: 'transparent',
    },
    productDetails: {
        position: 'relative',
        width: '100%',
        height: '100%',
    },
    stepper: {
        background: 'transparent',
    },
    productLoading: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contact: {
        margin: 'auto',
        maxWidth: '30rem',
    },
    summaryHeader: {
        paddingLeft: '1rem',
        paddingRight: '1rem',
        display: 'flex',
        alignItems: 'center',
    },
    summaryContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
};

export default styles;
