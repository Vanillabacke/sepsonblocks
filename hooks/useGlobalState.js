// https://github.com/Foreinyel/react-use-shared-state

import { useEffect, useState } from "react";
class Subject {
    constructor() {
        this.next = (dto) => {
            this.subscribers.forEach((subscriber) => {
                // setTimeout(() => {
                subscriber.next(dto);
                // }, 0);
            });
        };
        this.subscribe = (subscriber) => {
            this.subscribers.push(subscriber);
        };
        this.subscribers = [];
        // this.next.bind(this);
    }
}
const SubjectsMap = new Map();
const StatesMap = new Map();
const getSubject = (stateName) => {
    let _subject = SubjectsMap.get(stateName);
    if (!_subject) {
        _subject = new Subject();
        SubjectsMap.set(stateName, _subject);
    }
    return _subject;
};
const getState = (stateName, initValue) => {
    if (initValue !== undefined && !StatesMap.get(stateName)) {
        StatesMap.set(stateName, initValue);
    }
    return StatesMap.get(stateName);
};
const setState = (stateName, initValue) => {
    StatesMap.set(stateName, initValue);
};
export const usePubState = (stateName, initValue) => {
    const [uuid] = useState(Symbol(stateName));
    const subject = getSubject(stateName);
    const publishValue = (newValue) => {
        setState(stateName, newValue);
        subject.next({
            value: newValue,
            uuid,
        });
    };
    return [publishValue];
};
export const useGlobalState = (stateName, initValue) => {
    const [value, setValue] = useState(getState(stateName, initValue));
    const [uuid] = useState(Symbol(stateName));
    const subject = getSubject(stateName);
    useEffect(() => {
        subject.next({
            value,
            uuid,
        });
    }, []);
    const publishValue = (newValue) => {
        setState(stateName, newValue);
        subject.next({
            value: newValue,
            uuid,
        });
    };
    const setAndPublishValue = (newValue) => {
        setValue(newValue);
        publishValue(newValue);
        // setState(stateName, newValue);
        // subject.next({
        //   value: newValue,
        //   uuid,
        // });
    };
    useEffect(() => {
        subject.subscribe({
            next: (v) => {
                if (v.uuid !== uuid) {
                    setValue(v.value);
                }
            },
        });
    }, []);
    return [value, setAndPublishValue];
};
export const getSharedState = (stateName) => getState(stateName);
export default useGlobalState;