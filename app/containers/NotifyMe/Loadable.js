/**
 *
 * Asynchronously loads the component for NotifyMe
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
    loader: () => import('./index'),
    loading: () => null,
});
