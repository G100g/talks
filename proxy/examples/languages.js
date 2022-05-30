const defaultLanguage = {
    DAY: "Day",
    MONTH: "Month",
    YEAR: "Year",
    SECONDS: "Seconds",
};

const itLanguage = {
    DAY: "Giorno",
    MONTH: "Mese",
    YEAR: "Anno",
};

const languag = new Proxy(itLanguage, {
    get(target, name) {
        if (name in target) {
            return Reflect.get(target, name);
        } else if (name in defaultLanguage) {
            return Reflect.get(defaultLanguage, name);
        }
        return `Key ${name} not found`;
    },
});

console.log(languag.DAY);
console.log(languag.MONTH);
console.log(languag.YEAR);
console.log(languag.SECONDS);
console.log(languag.MARIO);
