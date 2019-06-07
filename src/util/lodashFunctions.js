import _isEmpty from 'lodash/isEmpty';
import _clone from 'lodash/clone';

export const isEmpty = (data) => {
    return _isEmpty(data);
};

export const clone = (data) => {
    return _clone(data);
};