const styles = {
    header: {
        zIndex: 2000,
    },
    headerBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    leftHeader: {
        display: 'flex',
        alignItems: 'center',
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
    footerPrice: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerButton: {
        width: '10rem',
        height: '3.5rem',
    },
    snackbar: {
        bottom: '10rem',
    },
    loader: {
        background: 'transparent',
        zIndex: 1500,
    },
    loaderContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    productDetails: {
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
    paymentRadio: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    voucher: {
        paddingTop: '1rem',
    },
};

export default styles;
