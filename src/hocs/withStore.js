import {observer, inject} from 'mobx-react';

export default function(Component){
    return inject('store')(observer(Component));
}
