import _isEmpty from 'lodash/isEmpty';
import _clone from 'lodash/clone';
import _findIndex from 'lodash/findIndex';
import _get from 'lodash/get';

export const isEmpty = (data) => {
    return _isEmpty(data);
};

export const clone = (data) => {
    return _clone(data);
};

export const findIndex = (data) => {
    return _findIndex(data);
};

export const get = (data, property) => {
    return _get(data, property);
};