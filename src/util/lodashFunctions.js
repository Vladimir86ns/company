import _isEmpty from 'lodash/isEmpty';
import _clone from 'lodash/clone';
import _findIndex from 'lodash/findIndex';

export const isEmpty = (data) => {
    return _isEmpty(data);
};

export const clone = (data) => {
    return _clone(data);
};

export const findIndex = (data) => {
    return _findIndex(data);
};