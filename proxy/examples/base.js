// GET

const target = { foo: 2 };

const proxy = new Proxy(target, {
    get(target, name) {
        console.log(target);
        console.log(name);
        return target[name];
    },
});

console.log(proxy.foo);

proxy.fighters = 3;

console.log(proxy.fighters);

// SET

const proxySet = new Proxy(target, {
    set(target, name, value) {
        console.log(target);
        console.log(name);
        console.log(value);

        target[name] += value;
        // Reflect.set(target, name, )
        return true;
    },
});

console.log(proxySet.foo);

proxySet.foo = 2;
console.log(proxySet.foo);

proxySet.foo = 2;
console.log(proxySet.foo);

proxySet.foo = 10;
console.log(proxySet.foo);

proxySet.foo = 20;
console.log(proxySet.foo);

// Constructor

const targetFunction = function FooFunction(arg1, arg2) {
    this.foo = arg1 + arg2;
};

const proxyConstructor = new Proxy(targetFunction, {
    construct(target, arguments) {
        console.log(arguments[0]);
        console.log(Number.isInteger(arguments[0]));
        if (
            !Number.isInteger(arguments[0]) ||
            !Number.isInteger(arguments[1])
        ) {
            throw new Error("Give me numbers");
        }

        return new target(...arguments);
    },
});

const constructorOK = new proxyConstructor(1, 2);

console.log(constructorOK.foo);

try {
    const constructorKO = new proxyConstructor("10", 2);
} catch (e) {
    console.log(e.message);
}

// ownKeys and has

const targetHas = {
    foo: "martin mcfly",
    pluto: 30,
    _mysecret: "***",
};

const objectWithoutSecrets = new Proxy(targetHas, {
    ownKeys(target) {
        return Object.keys(target).filter((key) => !key.startsWith("_"));
    },
    // get(target, name) {
    //     if (name.startsWith("_")) {
    //         return;
    //     }
    //     return Reflect.get(target, name);
    // },
    // has(target, name) {
    //     if (name.startsWith("_")) {
    //         return false;
    //     }
    //     return Reflect.has(target, name);
    // },
});

// "ownKeys" filters out _mysecret
for (let key in objectWithoutSecrets) console.log(key); // name, then: age

// same effect on these methods:
console.log(Object.keys(objectWithoutSecrets)); // name,age
console.log(Object.values(objectWithoutSecrets)); // John,30
console.log(Object.entries(objectWithoutSecrets)); // John,30

console.log(objectWithoutSecrets.foo);
console.log(objectWithoutSecrets.pluto);
console.log(objectWithoutSecrets._mysecret);

console.log("_mysecret" in objectWithoutSecrets);
