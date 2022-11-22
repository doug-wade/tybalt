import matchesPattern from './matches-pattern';

const urlPattern = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;

export default () => {
    return matchesPattern(urlPattern);
};