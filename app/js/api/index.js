import 'es6-promise';
import fetch from 'isomorphic-fetch';

export function testAsync() {
    return new Promise(resolve => {
        setTimeout(() => {
            const date = new Date();
            let seconds = date.getSeconds();
            let minutes = date.getMinutes();

            seconds = seconds < 10 ? `0${ seconds }` : seconds;
            minutes = minutes < 10 ? `0${ minutes }` : minutes;

            resolve(`Current time: ${ date.getHours() }:${ minutes }:${ seconds }`);
        }, (Math.random() * 1000) + 1000); // 1-2 seconds delay
    });
}

export function getLenses(params) { // array of id
    return fetch(`/api/lenses?${params}`, {}).then(response => response.json());
}
