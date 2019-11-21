/**
 *
 * Asynchronously loads the component for VideoShowGame
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
    loader: () => import('./index'),
    loading: () => null,
});
